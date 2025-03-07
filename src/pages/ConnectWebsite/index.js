import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createWorkspace,
  getUserDetails,
} from "../../slices/ConnectWebsite/thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../helpers/fakebackend_helper";
import socket from "../../socket/socket";
import {
  handleisWorkspaceCreated,
  handleNextStep,
  handleRunningStatus,
} from "../../slices/Tour/reducer";

const ConnectWebsite = () => {
  const [workspace, setWorkspace] = useState(() =>
    localStorage.getItem("workspace")
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = getLoggedInUser();

  const { error } = useSelector((state) => state.ConnectWebsite);

  // useEffect(() => {
  //   if (!loggedInUser) {
  //     console.log("GET USER DETAILS THUNK CALLED ");

  //     dispatch(getUserDetails());
  //   }
  // }, []);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      websiteAddress: "",
      workspaceName: "",
    },
    validationSchema: Yup.object({
      websiteAddress: Yup.string().required("Please Enter Your websiteAddress"),
      workspaceName: Yup.string().required("Please Enter Your Workspace Name "),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createWorkspace(values)).then((res) => {
        if (res.payload.data) {
          localStorage.setItem("workspace", JSON.stringify(res.payload.data));
          setWorkspace(res.payload.data);
          socket.emit("agent-join", {
            agentId: loggedInUser?.id,
            workspaceId: res.payload.data.id,
          });

          dispatch(handleisWorkspaceCreated(true));
          // dispatch(handleRunningStatus(true));
          dispatch(handleNextStep(2));
          // setTimeout(() => {
          //   navigate("/overview");
          // }, 1000);

          resetForm();
        }
      });
    },
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }

  document.title = "Connect Website";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Connect Website" pageTitle="Administration" />
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={4}>
              <div className="p-2 mt-4">
                {error ? (
                  <Alert color="danger">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div>{error}</div>
                    </div>
                  </Alert>
                ) : null}
                {workspace ? (
                  <Alert color="info">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div>Workspace has already been created!</div>
                      <div>
                        Now copy the widget code and paste it at the bottom of
                        your body tag!
                      </div>
                    </div>
                  </Alert>
                ) : null}

                <Form
                  onSubmit={handleFormSubmit}
                  action="#"
                  className="tour-step-two"
                >
                  <div className="mb-3">
                    <Label htmlFor="websiteAddress" className="form-label">
                      Website Address
                    </Label>
                    <Input
                      name="websiteAddress"
                      className="form-control"
                      placeholder="Enter Website Address"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.websiteAddress || ""}
                      invalid={
                        validation.touched.websiteAddress &&
                        validation.errors.websiteAddress
                          ? true
                          : false
                      }
                    />
                    {validation.touched.websiteAddress &&
                    validation.errors.websiteAddress ? (
                      <FormFeedback type="invalid">
                        {validation.errors.websiteAddress}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label htmlFor="workspaceName" className="form-label">
                      Workspace Name
                    </Label>
                    <Input
                      name="workspaceName"
                      className="form-control"
                      placeholder="Enter Workspace Name"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.workspaceName || ""}
                      invalid={
                        validation.touched.workspaceName &&
                        validation.errors.workspaceName
                          ? true
                          : false
                      }
                    />
                    {validation.touched.workspaceName &&
                    validation.errors.workspaceName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.workspaceName}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <Button
                      color="primary"
                      className="btn btn-primary w-100"
                      type="submit"
                      disabled={Boolean(workspace)}
                    >
                      Create Workspace
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default ConnectWebsite;
