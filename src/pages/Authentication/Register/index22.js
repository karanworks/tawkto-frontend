import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//redux

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  document.title = "Basic SignUp | Velzon - React Admin & Dashboard Template";

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: false,

    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your name"),
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please enter your password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      console.log("Button submitted=>", values);
    },
  });

  return (
    <React.Fragment>
      <div className="auth-page-content">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Create New Account</h5>
                  </div>
                  <div className="p-2 mt-4">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                      className="needs-validation"
                      action="#"
                    >
                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          Name <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="name"
                          type="text"
                          placeholder="Enter Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name
                              ? true
                              : false
                          }
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.name}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="useremail" className="form-label">
                          Email <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email address"
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
                            <div>{validation.errors.email}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="password" className="form-label">
                          Password <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.password}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-2">
                        <Label htmlFor="confirmPassword" className="form-label">
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirmPassword || ""}
                          invalid={
                            validation.touched.confirmPassword &&
                            validation.errors.confirmPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.confirmPassword &&
                        validation.errors.confirmPassword ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.confirmPassword}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Sign Up
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                            {" "}
                            Signin{" "}
                          </Link>{" "}
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
