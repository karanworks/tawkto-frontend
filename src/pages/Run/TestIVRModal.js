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
import { useEffect, useState } from "react";

function TestIVRModal({
  modal_testIVR,
  tog_testIVR,
  testIvrValidation,
  testIvrFormHandleSubmit,
  callingTestNumber,
}) {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 6); // Cycles between 0 and 5
    }, 500); // Updates every 500ms (half a second)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Modal
      isOpen={modal_testIVR}
      toggle={() => {
        tog_testIVR();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_testIVR();
        }}
      >
        Test IVR
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => testIvrFormHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="phoneNumber" className="form-label">
              Mobile No
            </Label>

            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Mobile No"
              type="number"
              minLength={1}
              maxLength={10}
              onChange={testIvrValidation.handleChange}
              onBlur={testIvrValidation.handleBlur}
              value={testIvrValidation.values.phoneNumber || ""}
              invalid={
                testIvrValidation.touched.phoneNumber &&
                testIvrValidation.errors.phoneNumber
                  ? true
                  : false
              }
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
            {testIvrValidation.touched.phoneNumber &&
            testIvrValidation.errors.phoneNumber ? (
              <FormFeedback type="invalid">
                {testIvrValidation.errors.phoneNumber}
              </FormFeedback>
            ) : null}
          </div>

          {callingTestNumber && (
            <div>
              <span style={{ fontSize: "16px", color: "green" }}>
                Calling to the phone number{".".repeat(dotCount)}
              </span>
            </div>
          )}

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Test
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default TestIVRModal;
