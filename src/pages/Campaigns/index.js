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
import AddCampaignModal from "./AddCampaignModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import CampaignRemoveModal from "./CampaignRemoveModal";
import {
  getCampaigns,
  createCampaign,
  updateCampaign,
  removeCampaign,
} from "../../slices/Campaigns/thunk";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getGateway } from "../../slices/Gateway/thunk";
import Loader from "../../Components/Common/Loader";

const Campaigns = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isEditingCampaign, setIsEditingCampaign] = useState(false);

  const [listCampaignId, setListCampaignId] = useState(null);

  // const [welcomeMessageAudio, setWelcomeMessageAudio] = useState("");

  // const [invalidMessageAudio, setInvalidMessageAudio] = useState(null);

  // const [timeOutMessageAudio, setTimeOutMessageAudio] = useState(null);

  const [selectSingleWelcomeTextOrAudio, setSelectSingleWelcomeTextOrAudio] =
    useState(null);

  const [selectSingleInvalidTextOrAudio, setSelectSingleInvalidTextOrAudio] =
    useState(null);

  const [selectSingleTimeOutTextOrAudio, setSelectSingleTimeOutTextOrAudio] =
    useState(null);

  const [selectedSingleGateway, setSelectedSingleGateway] = useState(null);

  const dispatch = useDispatch();

  const { campaigns, alreadyRegisteredError } = useSelector(
    (state) => state.Campaigns
  );
  const { gateways } = useSelector((state) => state.Gateways);

  function tog_list() {
    setmodal_list(!modal_list);
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    if (alreadyRegisteredError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyRegisteredError]);

  useEffect(() => {
    setLoading(true);
    dispatch(getCampaigns()).finally(() => {
      setLoading(false);
    });
    dispatch(getGateway());
  }, [dispatch]);

  const welcomeMessageTextOrAudioOptions = [
    { label: "Text", value: "Text" },
    { label: "Audio", value: "Audio" },
  ];

  function handleSelectSingleWelcomeMessageTextOrAudio(welcomeMessageType) {
    setSelectSingleWelcomeTextOrAudio(welcomeMessageType);
  }
  const invalidMessageTextOrAudioOptions = [
    { label: "Text", value: "Text" },
    { label: "Audio", value: "Audio" },
  ];

  function handleSelectSingleInvalidMessageTextOrAudio(invalidMessageType) {
    setSelectSingleInvalidTextOrAudio(invalidMessageType || null);
  }
  const timeOutMessageTextOrAudioOptions = [
    { label: "Text", value: "Text" },
    { label: "Audio", value: "Audio" },
  ];

  function handleSelectSingleTimeOutMessageTextOrAudio(timeOutMessageType) {
    setSelectSingleTimeOutTextOrAudio(timeOutMessageType);
  }

  const gatewayOptions = gateways?.map((gateway) => {
    return {
      id: gateway.id,
      value: gateway.gatewayIpAddress,
      label: gateway.gatewayIpAddress,
    };
  });

  function handleSelectSingleGateway(gateway) {
    setSelectedSingleGateway(gateway);
  }

  const validation = useFormik({
    initialValues: {
      campaignName: "",
      gatewayId: "",
      welcomeMessageText: "",
      welcomeMessageAudio: null,
      invalidMessageText: "",
      invalidMessageAudio: null,
      timeOutMessageText: "",
      timeOutMessageAudio: null,
    },
    validationSchema: Yup.object({
      campaignName: Yup.string().required("Please enter campaign name"),
      gatewayId: Yup.string().required("Gateway is required"),
      welcomeMessageText: Yup.string().when(["welcomeMessageAudio"], {
        is: (WMA) => !WMA,
        then: () => Yup.string().required(),
      }),
      welcomeMessageAudio: Yup.mixed().nullable(),
      invalidMessageText: Yup.string().when(["invalidMessageAudio"], {
        is: (IMA) => !IMA,
        then: () => Yup.string().required(),
      }),
      invalidMessageAudio: Yup.mixed().nullable(),
      timeOutMessageText: Yup.string().when(["timeOutMessageAudio"], {
        is: (TOMA) => !TOMA,
        then: () => Yup.string().required(),
      }),
      timeOutMessageAudio: Yup.mixed().nullable(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditingCampaign) {
        dispatch(
          updateCampaign({
            ...values,
            campaignId: listCampaignId,
            gatewayId: selectedSingleGateway.id,
          })
        );
      } else {
        dispatch(
          createCampaign({
            ...values,
            gatewayId: selectedSingleGateway.id,
          })
        );
      }

      resetForm();

      setSelectedSingleGateway(null);
      setSelectSingleInvalidTextOrAudio(null);
      setSelectSingleTimeOutTextOrAudio(null);
      setSelectSingleWelcomeTextOrAudio(null);

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

  function handleEditCampaign(campaignData) {
    setIsEditingCampaign(true);
    setmodal_list(!modal_list);
    setListCampaignId(campaignData.id);

    console.log("CAMPAIGN DATA WHILE EDITING ->", campaignData);

    const selectedGateway = gatewayOptions?.find(
      (gateway) => (gateway.id = campaignData.gatewayId)
    );

    if (campaignData.welcomeMessageText) {
      const selectedOption = welcomeMessageTextOrAudioOptions.find(
        (option) => option.value === "Text"
      );

      setSelectSingleWelcomeTextOrAudio(selectedOption);
    } else {
      validation.setFieldValue("welcomeMessageText", ""); // Ensure welcomeMessageText is cleared
    }

    if (campaignData.invalidMessageText) {
      const selectedOption = invalidMessageTextOrAudioOptions.find(
        (option) => option.value === "Text"
      );

      setSelectSingleInvalidTextOrAudio(selectedOption);
    }
    if (campaignData.timeOutMessageText) {
      const selectedOption = timeOutMessageTextOrAudioOptions.find(
        (option) => option.value === "Text"
      );

      setSelectSingleTimeOutTextOrAudio(selectedOption);
    }

    setSelectedSingleGateway(selectedGateway);

    validation.setValues({
      campaignName: campaignData.campaignName,
      welcomeMessageText: campaignData.welcomeMessageText,
      welcomeMessageAudio: campaignData.welcomeMessageAudio,
      invalidMessageText: campaignData.invalidMessageText,
      invalidMessageAudio: campaignData.invalidMessageAudio,
      timeOutMessageText: campaignData.timeOutMessageText,
      timeOutMessageAudio: campaignData.timeOutMessageAudio,
      gatewayId: campaignData.gatewayId,
    });
  }

  function tog_list() {
    validation.resetForm();
    setSelectedSingleGateway(null);
    setSelectSingleInvalidTextOrAudio(null);
    setSelectSingleTimeOutTextOrAudio(null);
    setSelectSingleWelcomeTextOrAudio(null);

    setmodal_list(!modal_list);
  }

  document.title = "Campaigns";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Campaigns" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a Campaign</h4>
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
                          Campaign
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
                            <th>Welcome Text</th>
                            <th>Invalid Text</th>
                            <th>TimeOut Text</th>

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
                              {campaigns?.map((campaign, idx) => (
                                <tr key={campaign.id}>
                                  <td>{idx + 1}</td>
                                  <td>{campaign.campaignName}</td>
                                  <td>{campaign.welcomeMessageText}</td>
                                  <td>{campaign.invalidMessageText}</td>
                                  <td>{campaign.timeOutMessageText}</td>

                                  <td>
                                    <div className="d-flex gap-2">
                                      <div className="edit">
                                        <button
                                          className="btn btn-sm btn-primary edit-item-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() => {
                                            handleEditCampaign(campaign);
                                          }}
                                        >
                                          Edit
                                        </button>
                                      </div>

                                      <div className="remove">
                                        <button
                                          className="btn btn-sm btn-danger edit-item-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() => {
                                            setListCampaignId(campaign.id);
                                            tog_delete();
                                          }}
                                        >
                                          Remove
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

      <AddCampaignModal
        validation={validation}
        isEditingCampaign={isEditingCampaign}
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        alreadyRegisteredError={alreadyRegisteredError}
        // setWelcomeMessageAudio={setWelcomeMessageAudio}
        // setInvalidMessageAudio={setInvalidMessageAudio}
        // setTimeOutMessageAudio={setTimeOutMessageAudio}
        welcomeMessageTextOrAudioOptions={welcomeMessageTextOrAudioOptions}
        selectSingleWelcomeTextOrAudio={selectSingleWelcomeTextOrAudio}
        handleSelectSingleWelcomeMessageTextOrAudio={
          handleSelectSingleWelcomeMessageTextOrAudio
        }
        invalidMessageTextOrAudioOptions={invalidMessageTextOrAudioOptions}
        selectSingleInvalidTextOrAudio={selectSingleInvalidTextOrAudio}
        handleSelectSingleInvalidMessageTextOrAudio={
          handleSelectSingleInvalidMessageTextOrAudio
        }
        selectSingleTimeOutTextOrAudio={selectSingleTimeOutTextOrAudio}
        timeOutMessageTextOrAudioOptions={timeOutMessageTextOrAudioOptions}
        handleSelectSingleTimeOutMessageTextOrAudio={
          handleSelectSingleTimeOutMessageTextOrAudio
        }
        gatewayOptions={gatewayOptions}
        handleSelectSingleGateway={handleSelectSingleGateway}
        selectedSingleGateway={selectedSingleGateway}
      />

      <CampaignRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        tog_delete={tog_delete}
        handleDeleteCampaign={() => {
          dispatch(removeCampaign(listCampaignId));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Campaigns;
