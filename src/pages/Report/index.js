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
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getReports } from "../../slices/Report/thunk";
import { getCampaigns } from "../../slices/Campaigns/thunk";
import Loader from "../../Components/Common/Loader";
import { CSVLink } from "react-csv";

const Report = () => {
  const [selectedSingleCampaign, setSelectedSingleCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { campaigns } = useSelector((state) => state.Campaigns);
  const { reports } = useSelector((state) => state.Report);

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  const campaignOptions = campaigns?.map((campaign) => ({
    id: campaign.id,
    label: campaign.campaignName,
    value: campaign.campaignName,
  }));

  function handleSelectSingleCampaign(campaign) {
    setLoading(true);
    setSelectedSingleCampaign(campaign);
    dispatch(getReports({ campaignId: campaign.id })).finally(() => {
      setLoading(false);
    });
  }

  const csvData = [
    [
      "Campaign Name",
      "Phone Number",
      "Call Status",
      "Start Time",
      "End Time",
      "Call Number Answered",
      "Ringing",
      "Talktime",
      "Result",
      "Key Press",
    ],
  ];

  console.log("REPORTS ->", reports);

  reports?.forEach((report) => {
    const convertedStartTime = new Date(report.startTime).toLocaleString(
      "en-US",
      { timeZone: "Asia/Kolkata" }
    );
    const convertedEndTime = new Date(report.endTime).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const answerDate = report.answerTime
      ? new Date(report.answerTime).toLocaleDateString("en-US", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";

    const convertedExten =
      isNaN(parseInt(report.exten, 10)) || report.exten.length > 1
        ? "No Response"
        : parseInt(report.exten, 10);

    const csvDataArr = new Array(
      report.CampaignName,
      report.phoneNumber,
      report.channelStateDesc,
      convertedStartTime,
      convertedEndTime,
      answerDate,
      report.duration,
      report.billsec,
      report.causeTxt,
      convertedExten
    );

    csvData.push(csvDataArr);
  });

  document.title = "Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Generate Report</h4>
                </CardHeader>

                <CardBody>
                  <Row className="g-4 w-100">
                    <Col className="col-sm-auto">
                      <div className="mb-2">
                        <div className="mb-2">
                          <Select
                            id="campaignId"
                            name="campaignId"
                            value={selectedSingleCampaign}
                            onChange={(campaign) => {
                              handleSelectSingleCampaign(campaign);
                              // validation.setFieldValue(
                              //   "campaignId",
                              //   campaign.id
                              // );
                            }}
                            options={campaignOptions}
                            placeholder="Select campaign"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                borderColor: state.isFocused
                                  ? "#a8d9f3"
                                  : "#ced4da",
                                "&:hover": {
                                  borderColor: "#ced4da",
                                },
                              }),
                            }}
                          />
                          {/* {validation.touched.campaignId &&
                          validation.errors.campaignId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.campaignId}
                            </FormFeedback>
                          ) : null} */}
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" style={{ marginLeft: "auto" }}>
                      <CSVLink
                        data={csvData}
                        filename="obd-report-data.csv"
                        style={{ color: "white" }}
                      >
                        <button
                          type="button"
                          className="btn btn-success custom-toggle"
                          data-bs-toggle="button"
                        >
                          <span className="icon-on">
                            <i className="ri-download-fill align-bottom me-1"></i>
                            Download Data
                          </span>
                        </button>
                      </CSVLink>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="listjs-table" id="userList">
                        <div className="table-responsive table-card mt-3 mb-1">
                          <table
                            className="table align-middle table-nowrap"
                            id="userTable"
                          >
                            <thead className="table-light">
                              <tr>
                                <th>S.No</th>
                                <th>Campaign Name</th>
                                <th>Phone Number</th>
                                <th>Call Status</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Call Number Answered</th>
                                <th>Ringing</th>
                                <th>Talktime</th>
                                <th>Result</th>
                                <th>Key Press</th>
                              </tr>
                            </thead>
                            <tbody className="list form-check-all">
                              {loading ? (
                                <tr>
                                  <td
                                    colSpan={10}
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
                                  {reports?.map((report, idx) => (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td>{report.CampaignName}</td>
                                      <td>{report.phoneNumber}</td>

                                      <td>{report.channelStateDesc}</td>
                                      <td>
                                        {report.startTime
                                          ? new Date(
                                              report.startTime
                                            ).toLocaleString("en-US", {
                                              timeZone: "Asia/Kolkata",
                                            })
                                          : ""}
                                      </td>
                                      <td>
                                        {report.endTime
                                          ? new Date(
                                              report.endTime
                                            ).toLocaleString("en-US", {
                                              timeZone: "Asia/Kolkata",
                                            })
                                          : ""}
                                      </td>
                                      {/* <td>{report.calldate}</td> */}
                                      <td>
                                        {report.answerTime
                                          ? new Date(
                                              report.answerTime
                                            ).toLocaleDateString("en-US", {
                                              timeZone: "Asia/Kolkata",
                                              year: "numeric",
                                              month: "2-digit",
                                              day: "2-digit",
                                            })
                                          : ""}
                                      </td>
                                      <td>{report.duration}</td>
                                      <td>{report.billsec}</td>
                                      <td>{report.causeTxt}</td>
                                      <td>
                                        {isNaN(parseInt(report.exten, 10)) ||
                                        report.exten.length > 1 ? (
                                          <span className="text-muted">
                                            {" "}
                                            No Response
                                          </span>
                                        ) : (
                                          parseInt(report.exten, 10)
                                        )}
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
                    </Col>{" "}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Report;
