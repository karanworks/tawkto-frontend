import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddMemberModal from "./AddMemberModal";
import {
  inviteWorkspaceMember,
  getWorkspaceMembers,
  deleteUser,
  updateMember,
} from "../../slices/WorkspaceMembers/thunk";
import { useDispatch } from "react-redux";
import { getLoggedinUser } from "../../helpers/api_helper";
import userIcon from "./user-icon.png";
import { useSelector } from "react-redux";
import { getWorkspaces } from "../../slices/Workspace/thunk";
import Loader from "../../Components/Common/Loader";
import { ToastContainer } from "react-toastify";
import MemberDeleteModal from "./MemberDeleteModal";

const WorkspaceMembers = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const dispatch = useDispatch();

  const [roleStatus, setroleStatus] = useState(null);

  const [workspace, setWorkspace] = useState(
    JSON.parse(localStorage.getItem("workspace"))
  );

  const [loading, setLoading] = useState(false);

  const [isEditingMember, setIsEditingMember] = useState(null);

  const { workspaceMembers } = useSelector((state) => state.WorkspaceMembers);

  console.log("READING WORKSPACE MEMBERS -> ", workspaceMembers);

  const loggedInUserData = getLoggedinUser();

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    if (!workspace) {
      dispatch(getWorkspaces(loggedInUserData.id)).then((res) => {
        if (res.payload?.data) {
          localStorage.setItem("workspace", JSON.stringify(res.payload.data));
          setWorkspace(res.payload.data);
        }
      });
    }
  }, [workspace, dispatch]);

  useEffect(() => {
    if (workspace) {
      setLoading(true);
      dispatch(getWorkspaceMembers(workspace.id)).then((res) =>
        setLoading(false)
      );
    }
  }, [dispatch, workspace]);

  const roleValues = [
    { label: "Admin", value: "Admin" },
    { label: "Agent", value: "Agent" },
  ];

  const validation = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter name"),
      email: Yup.string().required("Please enter your email"),
      role: Yup.string().required("Please select role"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("IS EDITING MEMBER ->", isEditingMember);

      isEditingMember
        ? dispatch(
            updateMember({
              ...values,
              userId: isEditingMember,
            })
          )
        : dispatch(
            inviteWorkspaceMember({
              ...values,
              workspaceId: workspace.id,
            })
          );

      resetForm();
      setmodal_list(false);
    },
  });

  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingMember(null);
    validation.setValues({
      name: "",
      email: "",
      role: "",
    });

    setroleStatus(null);
  }

  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();

    if (!validation.errors) {
      setmodal_list(false);
    }
    return false;
  }

  function handleRoleStatus(role) {
    setroleStatus(role);
    validation.setFieldValue("role", role.value);
  }

  function handleDeleteMember() {
    dispatch(deleteUser(isEditingMember));
    setmodal_delete(false);
    setIsEditingMember(null);
  }

  function handleEditMember(member) {
    setIsEditingMember(member.id);
    setmodal_list(!modal_list);

    const selectedRole = roleValues.find(
      (role) => role.label === (member.roleId === 1 ? "Admin" : "Agent")
    );

    validation.setValues({
      name: member.name,
      email: member.email,
      // role: member.roleId === 1 ? "Admin" : "Agent",
    });
    handleRoleStatus(selectedRole);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Workspace Members" pageTitle="Administration" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between  align-items-center ">
                    <div className="d-flex  align-items-center gap-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Search Members"
                          style={{ width: "350px" }}
                        />
                      </div>
                      <div>
                        <Button
                          className="btn btn-primary tour-step-four"
                          style={{
                            marginInlineEnd: "5px",
                            backgroundColor: "#25A0E2",
                            border: "none",
                          }}
                          onClick={tog_list}
                        >
                          <i className=" align-bottom me-1"></i> Invite Members
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col xl={12}>
              <Card>
                <CardBody>
                  {workspaceMembers && workspaceMembers.length > 0 ? (
                    <div className="live-preview">
                      <div className="table-responsive table-card">
                        <table className="table align-middle table-nowrap table-striped-columns mb-0">
                          <thead className="table-light">
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Role</th>
                              <th scope="col">Invitation Status</th>
                              {/* <th scope="col">Status</th> */}
                              <th scope="col">Settings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td
                                  colSpan={7}
                                  style={{
                                    border: "none",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <Loader />
                                </td>
                              </tr>
                            ) : (
                              workspaceMembers?.map((member, i) => (
                                <tr key={i}>
                                  <td>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <div>
                                        <img
                                          src={userIcon}
                                          alt="member-icon"
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                          }}
                                        />
                                      </div>

                                      <div>
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "8px",
                                          }}
                                        >
                                          <p style={{ margin: "0" }}>
                                            {member.name}
                                          </p>

                                          {member.email ===
                                          loggedInUserData.email ? (
                                            <p
                                              style={{
                                                margin: "0",
                                                color: "#737582",
                                              }}
                                            >
                                              ( You )
                                            </p>
                                          ) : null}
                                        </div>
                                        <p
                                          style={{
                                            margin: "0",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {member.email}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {member.roleId === 1 ? "Admin" : "Agent"}
                                  </td>

                                  <td>
                                    <span
                                      className={`badge bg-${
                                        member.invitationAccepted
                                          ? "success"
                                          : "danger"
                                      }`}
                                    >
                                      {member.invitationAccepted
                                        ? "Accepted"
                                        : "Pending"}
                                    </span>
                                  </td>
                                  {/* <td>
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger btn-sm"
                                    >
                                      Deactivate
                                    </button>
                                  </td> */}
                                  <td>
                                    <div
                                      style={{ display: "flex", gap: "8px" }}
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                          console.log(
                                            "TESTING MEMBER ->",
                                            member
                                          );

                                          handleEditMember(member);
                                        }}
                                      >
                                        Edit Profile
                                      </button>

                                      {member.id !== loggedInUserData.id ? (
                                        <button
                                          type="button"
                                          className="btn btn-danger btn-sm"
                                          onClick={() => {
                                            tog_delete();
                                            setIsEditingMember(member.id);
                                          }}
                                        >
                                          Delete
                                        </button>
                                      ) : null}
                                      {/* <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          handleDeleteMember(member.id)
                                        }
                                      >
                                        Delete
                                      </button> */}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "#bfbfbf",
                      }}
                    >
                      <p> No Members !</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
              <div className="col-sm-auto">
                <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                  <li>
                    <Link to="#" className="page-link">
                      Previous
                    </Link>
                  </li>

                  <React.Fragment>
                    <li className="page-item">
                      <Link to="#" onClick={() => setPageIndex(item)}></Link>
                    </li>
                  </React.Fragment>

                  <li>
                    <Link to="#" className="page-link">
                      Next
                    </Link>
                  </li>
                </ul>
              </div>
            </Row>
          </Row>
        </Container>
      </div>

      <AddMemberModal
        validation={validation}
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        handleRoleStatus={handleRoleStatus}
        roleStatus={roleStatus}
        roleValues={roleValues}
        isEditingMember={isEditingMember}
      />
      <MemberDeleteModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteTask={handleDeleteMember}
      />
      <ToastContainer />
    </React.Fragment>
  );
};

export default WorkspaceMembers;
