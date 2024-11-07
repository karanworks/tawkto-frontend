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

function GeneralModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  handleroleStatus,
  rolestatus,
  roleStatus,
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
      <ModalBody className="text-center p-5">
        <div className="text-end">
          <button
            type="button"
            className="btn-close text-end"
            data-bs-dismiss="modal"
            onClick={tog_list}
            aria-label="Close"
          ></button>
        </div>
        <div className="mt-2">
          <lord-icon
            src="https://cdn.lordicon.com/tqywkdcz.json"
            trigger="hover"
            style={{ width: "150px", height: "150px" }}
          ></lord-icon>
          <h4 className="mb-3 mt-4">Your Profile is Successfully Updated !</h4>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default GeneralModal;
