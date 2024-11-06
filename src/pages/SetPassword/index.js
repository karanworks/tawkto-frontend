import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { setPasswordWorkspaceMember } from "../../slices/WorkspaceMembers/thunk";
import { useDispatch } from "react-redux";
import { getLoggedinUser } from "../../helpers/api_helper";

const SetPassword = () => {
  document.title = "Create New Password";

  const { token } = useParams();

  const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);
  const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);

  const [passwordCreated, setPasswordCreated] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: "",
      confrim_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("This field is required"),
      confrim_password: Yup.string()
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: () =>
            Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
        })
        .required("Confirm Password Required"),
    }),
    onSubmit: (values) => {
      dispatch(
        setPasswordWorkspaceMember({
          ...values,
          token,
        })
      ).then((res) => {
        setPasswordCreated(true);
      });
    },
  });
  return (
    <div
      className="auth-page-content"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="mt-4">
              <CardBody className="p-4">
                {passwordCreated ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "23px", fontWeight: "bold" }}>
                      Congratulations 🎊
                    </p>
                    <p style={{ fontSize: "20px" }}>
                      Your password has been set!
                    </p>
                    <Link to="/login">
                      <p
                        style={{
                          fontSize: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        Login
                      </p>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="text-center mt-2">
                      <h3 className="text-primary">Create new password</h3>
                    </div>

                    <div className="p-2">
                      <Form
                        onSubmit={validation.handleSubmit}
                        action="/auth-signin-basic"
                      >
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup">
                            <Input
                              type={passwordShow ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              name="password"
                              value={validation.values.password}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.password &&
                                validation.touched.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.errors.password &&
                            validation.touched.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                            <Button
                              color="link"
                              onClick={() => setPasswordShow(!passwordShow)}
                              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </Button>
                          </div>
                        </div>

                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="confirm-password-input"
                          >
                            Confirm Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type={confrimPasswordShow ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Confirm password"
                              id="confirm-password-input"
                              name="confrim_password"
                              value={validation.values.confrim_password}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.confrim_password &&
                                validation.touched.confrim_password
                                  ? true
                                  : false
                              }
                            />
                            {validation.errors.confrim_password &&
                            validation.touched.confrim_password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.confrim_password}
                              </FormFeedback>
                            ) : null}
                            <Button
                              color="link"
                              onClick={() =>
                                setConfrimPasswordShow(!confrimPasswordShow)
                              }
                              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button
                            color="success"
                            className="w-100"
                            type="submit"
                          >
                            Create Password
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SetPassword;
