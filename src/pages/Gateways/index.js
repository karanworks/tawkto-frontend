import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import AddGatewayModal from "./AddGatewayModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCampaigns } from "../../slices/Campaigns/thunk";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getGateway,
  createGateway,
  updateGateway,
  removeGateway,
} from "../../slices/Gateway/thunk";
import Loader from "../../Components/Common/Loader";

const Gateways = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [isEditingGateway, setIsEditingGateway] = useState(false);

  const [listGatewayId, setListGatewayId] = useState(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { gateways } = useSelector((state) => state.Gateways);

  useEffect(() => {
    setLoading(true);
    dispatch(getGateway()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const validation = useFormik({
    initialValues: {
      gatewayIpAddress: "",
      channels: "",
      userId: "",
      password: "",
    },
    validationSchema: Yup.object({
      gatewayIpAddress: Yup.string().required("Please Enter IP Address"),
      channels: Yup.string()
        .min(1, "Minimum 1 channel is required")
        .max(32, "At max 32 channels can be there")
        .required("Please Enter Channels"),
      userId: Yup.string().required("Please Enter User Id"),
      password: Yup.string().required("Please Enter Password"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditingGateway) {
        dispatch(updateGateway({ values, gatewayId: listGatewayId }));
      } else {
        dispatch(createGateway(values));
      }

      resetForm();
      setmodal_list(false);
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    if (!validation.errors) {
      setmodal_list(false);
    }
    return false;
  }

  function handleEditGateway(gatewayData) {
    setmodal_list(!modal_list);
    setListGatewayId(gatewayData.id);
    setIsEditingGateway(true);

    validation.setValues({
      gatewayIpAddress: gatewayData.gatewayIpAddress,
      channels: gatewayData.channels,
      userId: gatewayData.userId,
      password: gatewayData.password,
    });
  }

  function tog_list() {
    validation.resetForm();
    setmodal_list(!modal_list);
  }

  document.title = "Gateways";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Gateways" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a Gateway</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex justify-content-between">
                        <Button
                          color="primary"
                          className="add-btn me-1"
                          onClick={tog_list}
                          id="create-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Gateway
                        </Button>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th>S.No</th>
                            <th>User Id</th>
                            <th>Password</th>
                            <th>Gateway IP</th>
                            <th>Channels</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
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
                            <>
                              {gateways?.map((gateway, idx) => (
                                <tr key={gateway.id}>
                                  <td>{idx + 1}</td>
                                  <td>{gateway.userId}</td>
                                  <td>{gateway.password}</td>
                                  <td>{gateway.gatewayIpAddress}</td>
                                  <td>{gateway.channels}</td>

                                  <td>
                                    <div
                                      style={{ display: "flex", gap: "5px" }}
                                    >
                                      <div>
                                        <button
                                          className={`btn btn-sm btn-soft-${
                                            gateway.status === 0
                                              ? "success"
                                              : "danger"
                                          } edit-item-btn`}
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() =>
                                            dispatch(removeGateway(gateway.id))
                                          }
                                        >
                                          {gateway.status === 0
                                            ? "Activate"
                                            : "Deactivate"}
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          className="btn btn-sm btn-primary edit-item-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() =>
                                            handleEditGateway(gateway)
                                          }
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />

      <AddGatewayModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingGateway={isEditingGateway}
      />
    </React.Fragment>
  );
};

export default Gateways;
