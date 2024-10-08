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
import RunModal from "./RunModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCampaigns } from "../../slices/Campaigns/thunk";
import {
  getRun,
  createRun,
  updateRun,
  removeRun,
} from "../../slices/Run/thunk";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestIVRModal from "./TestIVRModal";
import SettingsModal from "./SettingsModal";
import { testIvr } from "../../helpers/fakebackend_helper";
import Loader from "../../Components/Common/Loader";

const Run = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_testIVR, setmodal_testIVR] = useState(false);

  const [modal_settings, setmodal_settings] = useState(false);

  const [loading, setLoading] = useState(false);

  const [listRunId, setListRunId] = useState(null);

  const [selectedSingleCampaign, setSelectedSingleCampaign] = useState(null);

  const [dataFile, setDataFile] = useState(null);

  const [listCampaignId, setListCampaignId] = useState(null);

  const [testPhoneNumber, setTestPhoneNumber] = useState("");

  const [testPhoneNumberErrors, setTestPhoneNumberErrors] = useState("");

  const [workDays, setWorkDays] = useState([]);

  const [callingTestNumber, setCallingTestNumber] = useState(false);

  const dispatch = useDispatch();

  const { campaigns, alreadyRegisteredError } = useSelector(
    (state) => state.Campaigns
  );

  const { runs } = useSelector((state) => state.Run);

  function tog_list() {
    setmodal_list(!modal_list);
  }

  function tog_settings() {
    setmodal_settings(!modal_settings);
  }

  useEffect(() => {
    if (alreadyRegisteredError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyRegisteredError]);

  useEffect(() => {
    setLoading(true);
    dispatch(getCampaigns());
    dispatch(getRun()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const campaignOptions = campaigns?.map((campaign) => ({
    id: campaign.id,
    label: campaign.campaignName,
    value: campaign.campaignName,
  }));

  function handleSelectSingleCampaign(campaign) {
    setSelectedSingleCampaign(campaign);
  }

  const validation = useFormik({
    initialValues: {
      campaignId: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: Yup.object({
      campaignId: Yup.string().required("Please select campaign"),
      startTime: Yup.string(),
      endTime: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        createRun({ ...values, workDays: workDays.join(","), dataFile })
      );

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

  const settingsValidation = useFormik({
    initialValues: {
      startTime: "",
      endTime: "",
    },
    validationSchema: Yup.object({
      startTime: Yup.string(),
      endTime: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        updateRun({ values, runId: listRunId, workDays: workDays.join(",") })
      );
      setmodal_settings(false);
    },
  });

  function settingsFormHandleSubmit(e) {
    e.preventDefault();

    settingsValidation.handleSubmit();

    if (!settingsValidation.errors) {
      setmodal_list(false);
    }
    return false;
  }

  function handleSettings(runData) {
    setmodal_settings(!modal_settings);
    setListRunId(runData.id);

    settingsValidation.setValues({
      startTime: runData.timeStart,
      endTime: runData.timeEnd,
    });

    setWorkDays(runData.workDays.split(","));
  }

  const testIvrValidation = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string(),
    }),
    onSubmit: (values) => {
      testIvr({ ...values, campaignId: listCampaignId }).then((res) =>
        console.log("TEST NUMBER CHECKED SUCCESSFULLY ->", res)
      );

      setCallingTestNumber(true);
    },
  });

  function tog_testIVR() {
    setmodal_testIVR(!modal_testIVR);
    testIvrValidation.resetForm();
    setCallingTestNumber(false);
  }

  function testIvrFormHandleSubmit(e) {
    e.preventDefault();

    testIvrValidation.handleSubmit();

    if (!testIvrValidation.errors) {
      setmodal_testIVR(false);
    }
    return false;
  }

  function handleCallTestPhoneNumber() {
    let errors = "";

    if (!selectedSingleCampaign && !testPhoneNumber) {
      errors = "Please select a campaign and enter phone number";
    } else if (!selectedSingleCampaign) {
      errors = "Please select a campaign";
    } else if (!testPhoneNumber) {
      errors = "Please Enter Phone Number";
    } else if (testPhoneNumber.length < 10) {
      errors = "Phone number must be at least 10 characters long";
    }

    setTestPhoneNumberErrors(errors);

    if (!errors) {
      testIvr({
        phoneNumber: testPhoneNumber,
        campaignId: selectedSingleCampaign.id,
      }).then((res) => console.log("TEST NUMBER CHECKED SUCCESSFULLY ->", res));
    }
  }

  function handleCheckboxValues(checked, value) {
    if (checked) {
      const updatedWorkDays = [...workDays, value].sort();
      setWorkDays(updatedWorkDays);
    } else {
      const filteredCheckbox = workDays.filter((val) => val !== value);
      const updatedWorkDays = [...filteredCheckbox].sort();
      setWorkDays(updatedWorkDays);
    }
  }

  document.title = "Run";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Run" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Run OBD</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row
                      className="g-4 mb-3"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Col className="col-sm-auto d-flex justify-content-between">
                        <Button
                          color="primary"
                          className="add-btn me-1"
                          onClick={tog_list}
                          id="create-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Run
                          OBD
                        </Button>
                      </Col>
                      <Col className="col-sm-auto d-flex justify-content-between">
                        <Button
                          color="primary"
                          className="add-btn me-1 btn-sm"
                          id="create-btn"
                          onClick={() => {
                            setLoading(true);
                            dispatch(getRun()).finally(() => {
                              setLoading(false);
                            });
                          }}
                        >
                          <i className="ri-refresh-line align-bottom me-1"></i>
                          Refresh
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
                            <th>Campaign Name</th>
                            {/* <th>Date</th> */}
                            {/* <th>Time</th> */}
                            <th>Total Data</th>
                            <th>Pending Data</th>
                            <th>Tested Data</th>
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
                              {runs?.map((run, idx) => (
                                <tr key={run.id}>
                                  <td>{idx + 1}</td>
                                  <td>{run.campaignName}</td>
                                  <td>{run.totalData}</td>
                                  <td>{run.pendingData}</td>
                                  <td>{run.testedData}</td>

                                  <td>
                                    <div
                                      style={{ display: "flex", gap: "5px" }}
                                    >
                                      <div>
                                        <button
                                          className={`btn btn-sm btn-soft-${
                                            run.status === 0
                                              ? "success"
                                              : "danger"
                                          } edit-item-btn`}
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() =>
                                            dispatch(removeRun(run.id))
                                          }
                                        >
                                          {run.status === 0
                                            ? "Activate"
                                            : "Deactivate"}
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          className="btn btn-sm btn-soft-primary edit-item-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() => {
                                            tog_testIVR();

                                            setListCampaignId(run.campaignId);
                                          }}
                                        >
                                          Test IVR
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          className="btn btn-sm btn-soft-secondary edit-item-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() => {
                                            handleSettings(run);
                                          }}
                                        >
                                          Settings
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

      <RunModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        campaignOptions={campaignOptions}
        selectedSingleCampaign={selectedSingleCampaign}
        handleSelectSingleCampaign={handleSelectSingleCampaign}
        alreadyRegisteredError={alreadyRegisteredError}
        setDataFile={setDataFile}
        testPhoneNumber={testPhoneNumber}
        setTestPhoneNumber={setTestPhoneNumber}
        handleCallTestPhoneNumber={handleCallTestPhoneNumber}
        testPhoneNumberErrors={testPhoneNumberErrors}
        handleCheckboxValues={handleCheckboxValues}
      />

      <TestIVRModal
        modal_testIVR={modal_testIVR}
        tog_testIVR={tog_testIVR}
        testIvrValidation={testIvrValidation}
        testIvrFormHandleSubmit={testIvrFormHandleSubmit}
        callingTestNumber={callingTestNumber}
      />

      <SettingsModal
        modal_settings={modal_settings}
        tog_settings={tog_settings}
        settingsValidation={settingsValidation}
        settingsFormHandleSubmit={settingsFormHandleSubmit}
        workDays={workDays}
        handleCheckboxValues={handleCheckboxValues}
      />
    </React.Fragment>
  );
};

export default Run;
