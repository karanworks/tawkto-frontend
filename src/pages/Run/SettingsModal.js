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
  Button,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Flatpickr from "react-flatpickr";

function SettingsModal({
  modal_settings,
  tog_settings,
  settingsValidation,
  settingsFormHandleSubmit,
  workDays,
  handleCheckboxValues,
}) {
  return (
    <Modal
      isOpen={modal_settings}
      toggle={() => {
        tog_settings();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_settings();
        }}
      >
        Update Settings
      </ModalHeader>

      <Form
        className="tablelist-form"
        onSubmit={(e) => settingsFormHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          <div
            className="mb-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div>
              <Label htmlFor="startTime" className="form-label">
                Start Time
              </Label>

              <div className="input-group">
                <Flatpickr
                  className="form-control"
                  name="startTime"
                  value={settingsValidation.values.startTime || ""}
                  onChange={(date) => {
                    settingsValidation.setFieldValue(
                      "startTime",
                      date[0].toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric",
                      })
                    );
                  }}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                  }}
                />
                <span className="input-group-text">
                  {" "}
                  <i className="ri-calendar-event-line"></i>{" "}
                </span>
              </div>

              {settingsValidation.touched.startTime &&
              settingsValidation.errors.startTime ? (
                <FormFeedback type="invalid">
                  {settingsValidation.errors.startTime}
                </FormFeedback>
              ) : null}
            </div>
            <div>
              <Label htmlFor="endTime" className="form-label">
                End Time
              </Label>

              <div className="input-group">
                <Flatpickr
                  className="form-control"
                  name="endTime"
                  value={settingsValidation.values.endTime || ""}
                  onChange={(date) => {
                    settingsValidation.setFieldValue(
                      "endTime",
                      date[0].toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric",
                      })
                    );
                  }}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                  }}
                />
                <span className="input-group-text">
                  {" "}
                  <i className="ri-calendar-event-line"></i>{" "}
                </span>
              </div>

              {settingsValidation.touched.endTime &&
              settingsValidation.errors.endTime ? (
                <FormFeedback type="invalid">
                  {settingsValidation.errors.endTime}
                </FormFeedback>
              ) : null}
            </div>
          </div>
          <div className="mb-2">
            <Label className="form-label">Allowed Days</Label>
            <div style={{ display: "flex", gap: "15px", fontSize: "16px" }}>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={workDays.includes("0")}
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "0");
                  }}
                />
                Sun
              </label>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={workDays.includes("1")}
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "1");
                  }}
                />
                Mon
              </label>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={workDays.includes("2")}
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "2");
                  }}
                />
                Tue
              </label>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={workDays.includes("3")}
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "3");
                  }}
                />
                Wed
              </label>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={workDays.includes("4")}
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "4");
                  }}
                />
                Thu
              </label>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={workDays.includes("5")}
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "5");
                  }}
                />
                Fri
              </label>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={workDays.includes("6")}
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "6");
                  }}
                />
                Sat
              </label>
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Update Settings
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default SettingsModal;
