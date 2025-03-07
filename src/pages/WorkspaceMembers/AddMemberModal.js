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

function AddMemberModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  handleRoleStatus,
  roleStatus,
  roleValues,
  isEditingMember,
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
        Add Member
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={formHandleSubmit}>
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="name" className="form-label">
              Name
            </Label>

            <Input
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ""}
              invalid={
                validation.touched.name && validation.errors.name ? true : false
              }
            />

            {validation.touched.name && validation.errors.name ? (
              <FormFeedback type="invalid">
                {validation.errors.name}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="name" className="form-label">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              type="email"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.email || ""}
              invalid={
                validation.touched.email && validation.errors.email
                  ? true
                  : false
              }
            />

            {validation.touched.email && validation.errors.email ? (
              <FormFeedback type="invalid">
                {validation.errors.email}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="role" className="form-label">
              Select Role
            </Label>
            <div>
              <Select
                // className={`form-control ${
                //   validation.touched.role && validation.errors.role
                //     ? "is-invalid"
                //     : ""
                // }`}
                value={roleStatus}
                onChange={(roleStatus) => {
                  handleRoleStatus(roleStatus);
                }}
                options={roleValues}
                name="role"
                id="role"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor:
                      validation.touched.role && validation.errors.role
                        ? "#f06548"
                        : base.borderColor,
                    "&:hover": {
                      borderColor:
                        validation.touched.role && validation.errors.role
                          ? "#f06548"
                          : base.borderColor,
                    },
                  }),
                }}
              ></Select>
            </div>

            {validation.touched.role && validation.errors.role ? (
              // <FormFeedback type="invalid">
              //   {validation.errors.role}
              // </FormFeedback>
              <div
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "0.25rem",
                  fontSize: "12.25px",
                  color: "#f06548",
                  fontFamily: "Open Sans",
                }}
              >
                {validation.errors.role}
              </div>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingMember ? "Update" : "Send Invite"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddMemberModal;
