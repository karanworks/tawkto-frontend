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

function AddWorkspaceModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
}) {
  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
      className="modal-md"
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        Add Workspace
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={formHandleSubmit}>
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="workspaceName" className="form-label">
              Workspace Name
            </Label>

            <Input
              id="workspaceName"
              name="workspaceName"
              className="form-control"
              placeholder="Enter workspaceName"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.workspaceName || ""}
              invalid={
                validation.touched.workspaceName &&
                validation.errors.workspaceName
                  ? true
                  : false
              }
            />

            {validation.touched.workspaceName &&
            validation.errors.workspaceName ? (
              <FormFeedback type="invalid">
                {validation.errors.workspaceName}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="websiteAddress" className="form-label">
              Website Address
            </Label>

            <Input
              id="websiteAddress"
              name="websiteAddress"
              className="form-control"
              placeholder="Enter Website URL"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.websiteAddress || ""}
              invalid={
                validation.touched.websiteAddress &&
                validation.errors.websiteAddress
                  ? true
                  : false
              }
            />

            {validation.touched.websiteAddress &&
            validation.errors.websiteAddress ? (
              <FormFeedback type="invalid">
                {validation.errors.websiteAddress}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Add Workspace
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddWorkspaceModal;
