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
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from "react";
import { Scale } from "chart.js";

function RunModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  alreadyRegisteredError,
  campaignOptions,
  selectedSingleCampaign,
  handleSelectSingleCampaign,
  setDataFile,
  testPhoneNumber,
  setTestPhoneNumber,
  handleCallTestPhoneNumber,
  testPhoneNumberErrors,
  handleCheckboxValues,
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
        Add Run
      </ModalHeader>
      <ModalBody style={{ paddingTop: "0px" }}>
        <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          <div className="mb-2">
            <Label htmlFor="campaignId" className="form-label">
              Campaign
            </Label>

            <Select
              id="campaignId"
              name="campaignId"
              value={selectedSingleCampaign}
              onChange={(campaign) => {
                handleSelectSingleCampaign(campaign);
                validation.setFieldValue("campaignId", campaign.id);
              }}
              options={campaignOptions}
              placeholder="Select campaign"
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
            {validation.touched.campaignId && validation.errors.campaignId ? (
              <FormFeedback type="invalid">
                {validation.errors.campaignId}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="welcomeMessageText" className="form-label">
              Text / CSV File
            </Label>

            <Input
              id="dataFile"
              name="dataFile"
              className="form-control"
              type="file"
              onChange={(e) => setDataFile(e.target.files[0])}
            />
          </div>

          {/* <div className="mb-3">
            <Label htmlFor="date" className="form-label">
              Date
            </Label>
            <Flatpickr
              id="date"
              name="date"
              // value={validation.values.dob || ""}
              className="form-control border dash-filter-picker"
              placeholder="Choose Date"
              options={{
                dateFormat: "d/m/Y",
                defaultDate: validation.values.date || "",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                validation.setFieldValue("date", formattedDate);
              }}
            />
          </div> */}
          <div className="mb-2">
            <Label className="form-label">Allowed Days</Label>
            <div style={{ display: "flex", gap: "15px", fontSize: "16px" }}>
              <label className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
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
                  onChange={(e) => {
                    handleCheckboxValues(e.target.checked, "6");
                  }}
                />
                Sat
              </label>
            </div>
          </div>

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
                  value={validation.values.startTime || ""}
                  onChange={(date) => {
                    validation.setFieldValue(
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

              {validation.touched.startTime && validation.errors.startTime ? (
                <FormFeedback type="invalid">
                  {validation.errors.startTime}
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
                  value={validation.values.endTime || ""}
                  onChange={(date) => {
                    validation.setFieldValue(
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

              {validation.touched.endTime && validation.errors.endTime ? (
                <FormFeedback type="invalid">
                  {validation.errors.endTime}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="phoneNumber" className="form-label">
              Test
            </Label>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                placeholder="Enter Mobile For Test"
                type="text"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
                minLength={10}
                maxLength={10}

                // onChange={testIvrRunValidation.handleChange}
                // onBlur={testIvrRunValidation.handleBlur}
                // value={testIvrRunValidation.values.phoneNumber || ""}
                // invalid={
                //   testIvrRunValidation.touched.phoneNumber &&
                //   testIvrRunValidation.errors.phoneNumber
                //     ? true
                //     : false
                // }
              />

              <button
                className="btn btn-sm btn-primary"
                type="button"
                // onClick={tog_testIVR_Run}
                onClick={handleCallTestPhoneNumber}
              >
                <FeatherIcon icon="play" />
              </button>
            </div>

            <div>
              <span style={{ color: "red" }}>{testPhoneNumberErrors}</span>
            </div>
          </div>
          <div
            className="mb-2"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Input
              id="retry"
              name="retry"
              className="form-control"
              type="checkbox"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.retry || ""}
              invalid={
                validation.touched.email && validation.errors.retry
                  ? true
                  : false
              }
            />

            <span>Retry (Every number will be re-called)</span>

            {validation.touched.retry && validation.errors.retry ? (
              <FormFeedback type="invalid">
                {validation.errors.retry}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default RunModal;
