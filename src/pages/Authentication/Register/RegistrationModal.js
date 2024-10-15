import { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const RegistrationModal = ({
  modal_backdrop,
  tog_backdrop,
  setmodal_backdrop,
}) => {
  return (
    <Modal
      isOpen={modal_backdrop}
      toggle={() => {
        tog_backdrop();
      }}
      backdrop={"static"}
      id="staticBackdrop"
      centered
    >
      <ModalHeader
        toggle={() => {
          tog_backdrop();
        }}
      ></ModalHeader>
      <div className="modal-body text-center p-5">
        <lord-icon
          src="https://cdn.lordicon.com/lupuorrc.json"
          trigger="loop"
          colors="primary:#25a0e2,secondary:#00bd9d"
          style={{ width: "120px", height: "120px" }}
        ></lord-icon>

        <div className="mt-4">
          <h4 className="mb-3" style={{ color: "#00BC9D" }}>
            Registration Successfull
          </h4>
          <p
            className="mb-4"
            style={{
              fontSize: "18px",

              fontWeight: "bold",
            }}
          >
            {" "}
            Verification email sent, Verify your email
          </p>
          <div className="hstack gap-2 justify-content-center">
            <Link
              to="/login"
              className="btn btn-primary"
              onClick={() => setmodal_backdrop(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegistrationModal;
