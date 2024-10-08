import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

function AddCampaignModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingCampaign,
  alreadyRegisteredError,
  // setWelcomeMessageAudio,
  // setInvalidMessageAudio,
  // setTimeOutMessageAudio,
  welcomeMessageTextOrAudioOptions,
  selectSingleWelcomeTextOrAudio,
  handleSelectSingleWelcomeMessageTextOrAudio,
  invalidMessageTextOrAudioOptions,
  selectSingleInvalidTextOrAudio,
  handleSelectSingleInvalidMessageTextOrAudio,
  selectSingleTimeOutTextOrAudio,
  timeOutMessageTextOrAudioOptions,
  handleSelectSingleTimeOutMessageTextOrAudio,
  selectedSingleGateway,
  handleSelectSingleGateway,
  gatewayOptions,
}) {
  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
      className="modal-lg"
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        {isEditingCampaign ? "Update Campaign" : "Add Campaign"}
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          <Row>
            <Col md={6}>
              <div className="mb-2">
                <Label htmlFor="campaignName" className="form-label">
                  Campaign Name
                </Label>

                <Input
                  id="campaignName"
                  name="campaignName"
                  className="form-control"
                  placeholder="Enter Campaign Name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.campaignName || ""}
                  invalid={
                    validation.touched.campaignName &&
                    validation.errors.campaignName
                      ? true
                      : false
                  }
                />

                {validation.touched.campaignName &&
                validation.errors.campaignName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.campaignName}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-2">
                <Label htmlFor="gatewayId" className="form-label">
                  Gateways
                </Label>

                <Select
                  id="gatewayId"
                  name="gatewayId"
                  value={selectedSingleGateway}
                  onChange={(gateway) => {
                    handleSelectSingleGateway(gateway);
                    validation.setFieldValue("gatewayId", gateway.id);
                  }}
                  gateway
                  options={gatewayOptions}
                  placeholder="Select Gateway"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? "#a8d9f3" : "#ced4da",
                      "&:hover": {
                        borderColor: "#ced4da",
                      },
                    }),
                  }}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-2">
                <Label
                  htmlFor="welcomeMessageTextOrAudioSelect"
                  className="form-label"
                >
                  Welcome Message Type
                </Label>

                <Select
                  id="welcomeMessageTextOrAudioSelect"
                  name="welcomeMessageTextOrAudioSelect"
                  value={selectSingleWelcomeTextOrAudio || ""}
                  onChange={(messageOrAudio) => {
                    handleSelectSingleWelcomeMessageTextOrAudio(messageOrAudio);

                    if (messageOrAudio.value === "Text") {
                      validation.setFieldValue("welcomeMessageAudio", null);
                    } else if (messageOrAudio.value === "Audio") {
                      validation.setFieldValue("welcomeMessageText", "");
                    }
                  }}
                  options={welcomeMessageTextOrAudioOptions}
                  placeholder="Select Welcome Message Type"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? "#a8d9f3" : "#ced4da",
                      "&:hover": {
                        borderColor: "#ced4da",
                      },
                    }),
                  }}
                />
              </div>
            </Col>

            {selectSingleWelcomeTextOrAudio?.value === "Text" ? (
              <Col md={6}>
                <div className="mb-2">
                  <Label htmlFor="welcomeMessageText" className="form-label">
                    Welcome Message Text
                  </Label>

                  <Input
                    id="welcomeMessageText"
                    name="welcomeMessageText"
                    className="form-control"
                    placeholder="Enter Welcome Text"
                    type="text"
                    onChange={(e) => {
                      validation.handleChange(e);
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.welcomeMessageText || ""}
                    invalid={
                      validation.touched.welcomeMessageText &&
                      validation.errors.welcomeMessageText
                        ? true
                        : false
                    }
                  />

                  {validation.touched.welcomeMessageText &&
                  validation.errors.welcomeMessageText ? (
                    <FormFeedback type="invalid">
                      {validation.errors.welcomeMessageText}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            ) : selectSingleWelcomeTextOrAudio?.value === "Audio" ? (
              <Col lg={6}>
                <div>
                  <Label htmlFor="formFile" className="form-label">
                    Welcome Message Audio
                  </Label>
                  <Input
                    id="welcomeMessageAudio"
                    name="welcomeMessageAudio"
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      validation.setFieldValue(
                        "welcomeMessageAudio",
                        e.target.files[0]
                      );

                      // validation.setFieldValue("welcomeMessageText", "");
                    }}
                  />
                </div>
              </Col>
            ) : (
              <Col lg={6}></Col>
            )}

            <Col md={6}>
              <div className="mb-2">
                <Label htmlFor="invalidMessageText" className="form-label">
                  Invalid Message Type
                </Label>

                <Select
                  id="invalidMessageTextOrAudioSelect"
                  name="invalidMessageTextOrAudioSelect"
                  value={selectSingleInvalidTextOrAudio}
                  onChange={(messageOrAudio) => {
                    handleSelectSingleInvalidMessageTextOrAudio(messageOrAudio);
                    if (messageOrAudio.value === "Text") {
                      validation.setFieldValue("invalidMessageAudio", null);
                    } else if (messageOrAudio.value === "Audio") {
                      validation.setFieldValue("invalidMessageText", "");
                    }
                  }}
                  options={invalidMessageTextOrAudioOptions}
                  placeholder="Select Welcome Message Type"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? "#a8d9f3" : "#ced4da",
                      "&:hover": {
                        borderColor: "#ced4da",
                      },
                    }),
                  }}
                />
              </div>
            </Col>

            {selectSingleInvalidTextOrAudio?.value === "Text" ? (
              <Col md={6}>
                <div className="mb-2">
                  <Label htmlFor="welcomeMessageText" className="form-label">
                    Invalid Message Text
                  </Label>

                  <Input
                    id="invalidMessageText"
                    name="invalidMessageText"
                    className="form-control"
                    placeholder="Enter Invalid Text"
                    type="text"
                    onChange={(e) => {
                      validation.handleChange(e);
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.invalidMessageText || ""}
                    invalid={
                      validation.touched.invalidMessageText &&
                      validation.errors.invalidMessageText
                        ? true
                        : false
                    }
                  />

                  {validation.touched.invalidMessageText &&
                  validation.errors.invalidMessageText ? (
                    <FormFeedback type="invalid">
                      {validation.errors.invalidMessageText}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            ) : selectSingleInvalidTextOrAudio?.value === "Audio" ? (
              <Col lg={6}>
                <div>
                  <Label htmlFor="formFile" className="form-label">
                    Invalid Message Audio
                  </Label>
                  <Input
                    id="invalidMessageAudio"
                    name="invalidMessageAudio"
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      validation.setFieldValue(
                        "invalidMessageAudio",
                        e.target.files[0]
                      );
                      // validation.setFieldValue("invalidMessageText", "");
                    }}
                  />
                </div>
              </Col>
            ) : (
              <Col lg={6}></Col>
            )}

            <Col md={6}>
              <div className="mb-2">
                <Label
                  htmlFor="timeOutMessageTextOrAudioSelect"
                  className="form-label"
                >
                  TimeOut Message Type
                </Label>

                <Select
                  id="timeOutMessageTextOrAudioSelect"
                  name="timeOutMessageTextOrAudioSelect"
                  value={selectSingleTimeOutTextOrAudio}
                  onChange={(messageOrAudio) => {
                    handleSelectSingleTimeOutMessageTextOrAudio(messageOrAudio);
                    if (messageOrAudio.value === "Text") {
                      validation.setFieldValue("timeOutMessageAudio", null);
                    } else if (messageOrAudio.value === "Audio") {
                      validation.setFieldValue("timeOutMessageText", "");
                    }
                  }}
                  options={timeOutMessageTextOrAudioOptions}
                  placeholder="Select Time Out Message Type"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? "#a8d9f3" : "#ced4da",
                      "&:hover": {
                        borderColor: "#ced4da",
                      },
                    }),
                  }}
                />
              </div>
            </Col>

            {selectSingleTimeOutTextOrAudio?.value === "Text" ? (
              <Col md={6}>
                <div className="mb-2">
                  <Label htmlFor="timeOutMessageText" className="form-label">
                    TimeOut Message Text
                  </Label>

                  <Input
                    id="timeOutMessageText"
                    name="timeOutMessageText"
                    className="form-control"
                    placeholder="Enter TimeOut Text"
                    type="text"
                    onChange={(e) => {
                      validation.handleChange(e);
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.timeOutMessageText || ""}
                    invalid={
                      validation.touched.timeOutMessageText &&
                      validation.errors.timeOutMessageText
                        ? true
                        : false
                    }
                  />
                </div>
              </Col>
            ) : selectSingleTimeOutTextOrAudio?.value === "Audio" ? (
              <Col lg={6}>
                <div>
                  <Label htmlFor="formFile" className="form-label">
                    TimeOut Message Audio
                  </Label>
                  <Input
                    id="timeOutMessageAudio"
                    name="timeOutMessageAudio"
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      validation.setFieldValue(
                        "timeOutMessageAudio",
                        e.target.files[0]
                      );
                      // validation.setFieldValue("timeOutMessageText", "");
                    }}
                  />
                </div>
              </Col>
            ) : (
              <Col lg={6}></Col>
            )}
          </Row>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingCampaign ? "Update Campaign" : "Save Campaign"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddCampaignModal;
