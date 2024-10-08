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

function AddGatewayModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingGateway,
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
        {isEditingGateway ? "Update Gateway" : "Add Gateway"}
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {/* <div className="mb-2">
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
          </div> */}

          <div className="mb-2">
            <Label htmlFor="gatewayIpAddress" className="form-label">
              Gateway IP Address
            </Label>

            <Input
              id="gatewayIpAddress"
              name="gatewayIpAddress"
              className="form-control"
              placeholder="Enter Gateway Ip Address"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.gatewayIpAddress || ""}
              invalid={
                validation.touched.gatewayIpAddress &&
                validation.errors.gatewayIpAddress
                  ? true
                  : false
              }
            />

            {validation.touched.gatewayIpAddress &&
            validation.errors.gatewayIpAddress ? (
              <FormFeedback type="invalid">
                {validation.errors.gatewayIpAddress}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="channels" className="form-label">
              Channels
            </Label>

            <Input
              id="channels"
              name="channels"
              className="form-control"
              placeholder="Enter Channels"
              type="number"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.channels || ""}
              invalid={
                validation.touched.channels && validation.errors.channels
                  ? true
                  : false
              }
            />

            {validation.touched.channels && validation.errors.channels ? (
              <FormFeedback type="invalid">
                {validation.errors.channels}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="userId" className="form-label">
              User Id
            </Label>

            <Input
              id="userId"
              name="userId"
              className="form-control"
              placeholder="Enter User Id"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.userId || ""}
              invalid={
                validation.touched.channels && validation.errors.userId
                  ? true
                  : false
              }
            />

            {validation.touched.userId && validation.errors.userId ? (
              <FormFeedback type="invalid">
                {validation.errors.userId}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="password" className="form-label">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.password || ""}
              invalid={
                validation.touched.password && validation.errors.password
                  ? true
                  : false
              }
            />

            {validation.touched.password && validation.errors.password ? (
              <FormFeedback type="invalid">
                {validation.errors.password}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingGateway ? "Update" : "Save"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddGatewayModal;
