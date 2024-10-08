import {
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import alertIcon from "./alert-icon.gif";
import Select from "react-select";

function DesignModal({
  modal_list,
  tog_list,
  validation,
  formHandleSubmit,
  // setMessageAudio,
  selectedSingleCampaign,
  selectSingleMessageType,
  messageValueOptions,
  handleSelectSingleMessageType,
  isEditingDesign,
}) {
  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        {" "}
        {!selectedSingleCampaign
          ? "Select Campaign"
          : isEditingDesign
          ? "Edit Design"
          : "Add Design"}
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={formHandleSubmit}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {selectedSingleCampaign ? (
            <>
              <div className="mb-2">
                <Label
                  htmlFor="welcomeMessageTextOrAudioSelect"
                  className="form-label"
                >
                  Message Type
                </Label>

                <Select
                  id="welcomeMessageTextOrAudioSelect"
                  name="welcomeMessageTextOrAudioSelect"
                  value={selectSingleMessageType}
                  onChange={(messageOrAudioOrNumber) => {
                    handleSelectSingleMessageType(messageOrAudioOrNumber);
                    validation.setValues({
                      messageText: null,
                      mobileNumber: null,
                      messageAudio: null,
                    });
                  }}
                  options={messageValueOptions}
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

              {selectSingleMessageType?.value === "Text" ? (
                <div className="mb-4">
                  {" "}
                  <Label htmlFor="messageText" className="form-label">
                    Message Text
                  </Label>
                  <Input
                    id="messageText"
                    name="messageText"
                    className="form-control"
                    placeholder="Enter Message Text"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.messageText || ""}
                    invalid={
                      validation.touched.messageText &&
                      validation.errors.messageText
                        ? true
                        : false
                    }
                  />
                  {validation.touched.messageText &&
                  validation.errors.messageText ? (
                    <FormFeedback type="invalid">
                      {validation.errors.messageText}
                    </FormFeedback>
                  ) : null}
                </div>
              ) : selectSingleMessageType?.value === "Audio" ? (
                <div className="mb-4">
                  <Label htmlFor="messageAudio" className="form-label">
                    Message Audio
                  </Label>
                  <Input
                    id="messageAudio"
                    name="messageAudio"
                    className="form-control"
                    placeholder="Enter Message Audio"
                    type="file"
                    onChange={(e) =>
                      validation.setFieldValue(
                        "messageAudio",
                        e.target.files[0]
                      )
                    }
                  />
                  {validation.touched.messageAudio &&
                  validation.errors.messageAudio ? (
                    <FormFeedback type="invalid">
                      {validation.errors.messageAudio}
                    </FormFeedback>
                  ) : null}
                </div>
              ) : selectSingleMessageType?.value === "Mobile Number" ? (
                <div className="mb-4">
                  {" "}
                  <Label htmlFor="mobileNumber" className="form-label">
                    Mobile Number
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mobileNumber || ""}
                    invalid={
                      validation.touched.mobileNumber &&
                      validation.errors.mobileNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.mobileNumber &&
                  validation.errors.mobileNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mobileNumber}
                    </FormFeedback>
                  ) : null}
                </div>
              ) : null}

              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  {isEditingDesign ? "Update Design" : "Add Design"}
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                fontSize: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <span>Select Campaign first</span>
              <img src={alertIcon} style={{ width: "50px", height: "50px" }} />
            </div>
          )}
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default DesignModal;
