import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DesignDialpad from "./DesignDialpad";
import DesignModal from "./DesignModal";
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from "../../slices/Campaigns/thunk";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getDesignsByCampaign,
  createDesign,
  updateDesign,
  removeDesign,
} from "../../slices/Design/thunk";
import DesignRemoveModal from "./DesignRemoveModal";
import Loader from "../../Components/Common/Loader";

const Design = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [clickedBtn, setClickedBtn] = useState("");

  const [isEditingDesign, setIsEditingDesign] = useState("");

  const [listDesignId, setListDesignId] = useState(null);

  const [selectSingleMessageType, setSelectSingleMessageType] = useState(null);

  const [selectedSingleCampaign, setSelectedSingleCampaign] = useState(null);

  // const [messageAudio, setMessageAudio] = useState(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { campaigns } = useSelector((state) => state.Campaigns);

  const { designs } = useSelector((state) => state.Design);

  const campaignOptions = campaigns?.map((campaign) => ({
    id: campaign.id,
    label: campaign.campaignName,
    value: campaign.campaignName,
  }));

  function handleSelectSingleCampaign(campaign) {
    setLoading(true);
    setSelectedSingleCampaign(campaign);
    dispatch(getDesignsByCampaign(campaign.id)).finally(() =>
      setLoading(false)
    );
  }

  function handleDialpadBtn(key) {
    setClickedBtn(key);
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  function tog_list() {
    setmodal_list(!modal_list);
  }

  useEffect(() => {
    dispatch(getCampaigns());
    // dispatch(getDesigns());
  }, [dispatch]);

  const messageValueOptions = [
    { value: "Text", label: "Text" },
    { value: "Audio", label: "Audio" },
    { value: "Mobile Number", label: "Mobile Number" },
  ];

  function handleSelectSingleMessageType(messageType) {
    setSelectSingleMessageType(messageType);
  }

  const validation = useFormik({
    initialValues: {
      messageText: "",
      mobileNumber: "",
      messageAudio: "",
    },
    validationSchema: Yup.object({
      messageText: Yup.string()
        .nullable()
        .when(["mobileNumber", "messageAudio"], {
          is: (mobNum, msgAud) => {
            console.log("FORM VALIDATION CHECK ->", !mobNum && !msgAud);

            return !mobNum && !msgAud;
          },
          then: () => Yup.string().required(),
        }),
      mobileNumber: Yup.string().nullable(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditingDesign) {
        dispatch(updateDesign({ values, designId: listDesignId }));
      } else {
        dispatch(
          createDesign({
            ...values,
            campaignId: selectedSingleCampaign.id,
            key: clickedBtn,
            // messageAudio,
          })
        );
      }

      resetForm();
      setSelectSingleMessageType(null);
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

  function handleEditDesign(designData) {
    setIsEditingDesign(true);
    setmodal_list(!modal_list);
    setListDesignId(designData.id);

    if (designData.messageText) {
      setSelectSingleMessageType({ value: "Text", label: "Text" });
    } else if (designData.mobileNumber) {
      setSelectSingleMessageType({
        value: "Mobile Number",
        label: "Mobile Number",
      });
    } else if (designData.messageAudio) {
      setSelectSingleMessageType(null);
    }

    validation.setValues({
      messageText: designData.messageText,
      mobileNumber: designData.mobileNumber,
    });
  }

  document.title = "Design";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="IVR Design" pageTitle="IVR Admin" />

          <Row>
            <Col xs={12}>
              <Card className="card-height-100">
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Create New IVR
                  </h4>
                </CardHeader>
                <CardBody className="p-0">
                  <Row
                    className="g-4 w-100"
                    style={{
                      margin: "0",
                      borderBottom: "1px solid #e8e6e6",
                      paddingBlock: "10px",
                    }}
                  >
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
                  </Row>
                  <Row>
                    <Col className="d-flex align-items-start">
                      <div className="ivr-design-dialpad-container">
                        <DesignDialpad
                          tog_list={tog_list}
                          handleDialpadBtn={handleDialpadBtn}
                          designs={designs}
                        />
                      </div>
                      <div
                        className="table-responsive"
                        style={{
                          width: "100%",
                          border: "1px solid #e8e6e6",
                          borderBottom: "0",
                          borderTop: "0",
                          height: "100%",
                        }}
                      >
                        <table
                          className="table align-middle table-nowrap"
                          style={{ marginBottom: "0" }}
                        >
                          <thead className="table-light">
                            <tr>
                              <th>IVR</th>
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
                                {designs?.map((design) => (
                                  <tr key={design.id}>
                                    <td>
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "10px" }}
                                      >
                                        {design.messageText ? (
                                          <span>{design.messageText}</span>
                                        ) : design.mobileNumber ? (
                                          <span>{design.mobileNumber}</span>
                                        ) : design.messageAudio ? (
                                          <audio
                                            src={design.messageAudio}
                                            controls
                                          ></audio>
                                        ) : null}

                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          {design.key}
                                        </div>
                                        <div
                                          className="d-flex"
                                          style={{ gap: "2px" }}
                                        >
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                            onClick={() => {
                                              handleEditDesign(design);
                                            }}
                                          >
                                            <i className="ri-edit-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                            onClick={() => {
                                              tog_delete();
                                              setListDesignId(design?.id);
                                            }}
                                          >
                                            <i className="ri-delete-bin-2-line"></i>
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
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>

      <DesignModal
        modal_list={modal_list}
        tog_list={tog_list}
        validation={validation}
        formHandleSubmit={formHandleSubmit}
        // setMessageAudio={setMessageAudio}
        selectedSingleCampaign={selectedSingleCampaign}
        selectSingleMessageType={selectSingleMessageType}
        messageValueOptions={messageValueOptions}
        handleSelectSingleMessageType={handleSelectSingleMessageType}
        isEditingDesign={isEditingDesign}
      />

      <DesignRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteDesign={() => {
          dispatch(removeDesign(listDesignId));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Design;
