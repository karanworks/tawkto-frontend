import React, { useEffect, useState } from "react";
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

// action
import {
  registerUser,
  apiError,
  resetRegisterFlag,
} from "../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images
// import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";
import RegistrationModal from "./RegistrationModal";

const Register = () => {
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
  }
  const history = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      name: Yup.string().required("Please Enter Your Name"),
      password: Yup.string().required("Please enter your password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      console.log("Register values->", values);
      dispatch(registerUser(values)).then((res) => {
        console.log("DISPATCH RESPONSE ->", res);
      });
    },
  });

  const selectLayoutState = (state) => state.Account;
  const registerdatatype = createSelector(selectLayoutState, (account) => ({
    success: account.success,
    error: account.error,
  }));
  // Inside your component
  const { error, success } = useSelector(registerdatatype);

  console.log("REGISTER SUCCESS ->", success);

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      // setTimeout(() => history("/login"), 3000);
      setmodal_backdrop(true);
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 3000);
  }, [dispatch, success, error, history]);

  function formHandleSubmit(e) {
    console.log("FORM GETTING SUBMITTED");

    e.preventDefault();
    validation.handleSubmit();

    return false;
  }

  document.title = "Basic Register";

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
                      onSubmit={formHandleSubmit}
                      className="needs-validation"
                    >
                      {/* {success && success ? (
                        <>
                          {toast("Your Redirect To Login Page...", {
                            position: "top-right",
                            hideProgressBar: false,
                            className: "bg-success text-white",
                            progress: undefined,
                            toastId: "",
                          })}
                          <ToastContainer autoClose={2000} limit={1} />
                          <Alert color="success">
                            Register User Successfully and Your Redirect To
                            Login Page...
                          </Alert>
                        </>
                      ) : null} */}

                      {/* {error && error ? (
                        <Alert color="danger">
                          <div>
                            Email has been Register Before, Please Use Another
                            Email Address...{" "}
                          </div>
                        </Alert>
                      ) : null} */}

                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          Name <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="name"
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
                        <Label htmlFor="email" className="form-label">
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
                          id="password"
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
                          id="confirmPassword"
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
                          Register
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account ?{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <RegistrationModal
          modal_backdrop={modal_backdrop}
          tog_backdrop={tog_backdrop}
          setmodal_backdrop={setmodal_backdrop}
        />
      </div>
    </React.Fragment>
  );
};

export default Register;
