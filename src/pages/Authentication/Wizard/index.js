import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Progress,
  Button,
  FormFeedback,
} from "reactstrap";
//Import images
import classnames from "classnames";
import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";

import ChatWidgetPreview from "./ChatWidgetPreview";
import ChatWidgetSettings from "./ChatWidgetSettings";
import { useFormik } from "formik";
import * as Yup from "yup";

// Wizard lottie and define custom element
defineElement(loadAnimation);

const Wizard = () => {
  const [activeVerticalTab, setactiveVerticalTab] = useState(7);
  const [passedverticalSteps, setPassedverticalSteps] = useState([1]);
  const [passwordShow, setPasswordShow] = useState(false);

  const [widgetColour, setWidgetColour] = useState("#25A0E2");

  const [welcomeMessage, setWelcomeMessage] = useState(
    "👋 Hi, How can we help?"
  );

  const [suggestedMessages, setSuggestedMessages] = useState([
    { id: 1, message: "I have a question" },
    { id: 2, message: "Tell me more" },
  ]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please enter your password"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),

    onSubmit: (values) => {
      // dispatch(WizardUser(values));
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    return false;
  }

  function toggleVerticalTab(tab) {
    if (activeVerticalTab !== tab) {
      var modifiedSteps = [...passedverticalSteps, tab];

      if (tab >= 7 && tab <= 12) {
        setactiveVerticalTab(tab);
        setPassedverticalSteps(modifiedSteps);
      }
    }
  }

  function handleChangeWidgetColor(color) {
    setWidgetColour(color);
  }

  function handleChangeWelcomeMessage(e) {
    setWelcomeMessage(e.target.value);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create An Account hello</h4>
                </CardHeader>
                <CardBody>
                  <Row className="gy-5">
                    <Col lg={3}>
                      <Nav className="flex-column custom-nav nav-pills">
                        <NavItem>
                          <NavLink
                            href="#"
                            className={classnames({
                              active: activeVerticalTab === 7,
                              done:
                                activeVerticalTab <= 12 &&
                                activeVerticalTab > 7,
                            })}
                            onClick={() => {
                              toggleVerticalTab(7);
                            }}
                          >
                            <span className="step-title me-2">
                              <i className="ri-close-circle-fill step-icon me-2"></i>
                              Step 1
                            </span>
                            Account Details
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="#"
                            className={classnames({
                              active: activeVerticalTab === 8,
                              done:
                                activeVerticalTab <= 12 &&
                                activeVerticalTab >= 8,
                            })}
                            onClick={() => {
                              toggleVerticalTab(8);
                            }}
                          >
                            <span className="step-title me-2">
                              <i className="ri-close-circle-fill step-icon me-2"></i>
                              Step 2
                            </span>
                            Website Address
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="#"
                            className={classnames({
                              active: activeVerticalTab === 9,
                              done:
                                activeVerticalTab <= 12 &&
                                activeVerticalTab >= 9,
                            })}
                            onClick={() => {
                              toggleVerticalTab(9);
                            }}
                          >
                            <span className="step-title me-2">
                              <i className="ri-close-circle-fill step-icon me-2"></i>
                              Step 3
                            </span>
                            Workspace
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="#"
                            className={classnames({
                              active: activeVerticalTab === 10,
                              done:
                                activeVerticalTab <= 12 &&
                                activeVerticalTab >= 10,
                            })}
                            onClick={() => {
                              toggleVerticalTab(10);
                            }}
                          >
                            <span className="step-title me-2">
                              <i className="ri-close-circle-fill step-icon me-2"></i>
                              Step 4
                            </span>
                            Customize Widget
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="#"
                            className={classnames({
                              active: activeVerticalTab === 11,
                              done:
                                activeVerticalTab <= 12 &&
                                activeVerticalTab >= 11,
                            })}
                            onClick={() => {
                              toggleVerticalTab(11);
                            }}
                          >
                            <span className="step-title me-2">
                              <i className="ri-close-circle-fill step-icon me-2"></i>
                              Step 5
                            </span>
                            Widget Ready
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col lg={9}>
                      <div className="px-lg-4">
                        <TabContent activeTab={activeVerticalTab}>
                          <TabPane tabId={7}>
                            <div className="d-flex justify-content-center">
                              <Form onSubmit={formHandleSubmit}>
                                <div style={{ width: "400px" }}>
                                  <div>
                                    <h5>Account Details</h5>
                                    <p className="text-muted">
                                      Fill all information below
                                    </p>
                                  </div>

                                  <div>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="name"
                                        className="form-label"
                                      >
                                        Name
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter Name"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.name || ""}
                                        invalid={
                                          validation.touched.name &&
                                          validation.errors.name
                                            ? true
                                            : false
                                        }
                                      />
                                      {validation.touched.name &&
                                      validation.errors.name ? (
                                        <FormFeedback type="invalid">
                                          <div>{validation.errors.name}</div>
                                        </FormFeedback>
                                      ) : null}
                                    </div>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="email"
                                        className="form-label"
                                      >
                                        Email{" "}
                                      </Label>
                                      <Input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.email || ""}
                                        invalid={
                                          validation.touched.email &&
                                          validation.errors.email
                                            ? true
                                            : false
                                        }
                                      />
                                      {validation.touched.email &&
                                      validation.errors.email ? (
                                        <FormFeedback type="invalid">
                                          <div>{validation.errors.email}</div>
                                        </FormFeedback>
                                      ) : null}
                                    </div>
                                    <div className="mb-3">
                                      <Label
                                        className="form-label"
                                        htmlFor="password"
                                      >
                                        Password
                                      </Label>
                                      <div className="position-relative auth-pass-inputgroup mb-3">
                                        <Input
                                          name="password"
                                          value={
                                            validation.values.password || ""
                                          }
                                          type={
                                            passwordShow ? "text" : "password"
                                          }
                                          className="form-control pe-5"
                                          placeholder="Enter Password"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
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
                                            {validation.errors.password}
                                          </FormFeedback>
                                        ) : null}
                                        <button
                                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                          onClick={() =>
                                            setPasswordShow(!passwordShow)
                                          }
                                          type="button"
                                          id="password-addon"
                                        >
                                          <i className="ri-eye-fill align-middle"></i>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <Label
                                        className="form-label"
                                        htmlFor="confirm_password"
                                      >
                                        Confirm Password
                                      </Label>
                                      <div className="position-relative auth-pass-inputgroup mb-3">
                                        <Input
                                          name="confirm_password"
                                          value={
                                            validation.values
                                              .confirm_password || ""
                                          }
                                          type={
                                            passwordShow ? "text" : "password"
                                          }
                                          className="form-control pe-5"
                                          placeholder="Enter Confirm Password"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          invalid={
                                            validation.touched
                                              .confirm_password &&
                                            validation.errors.confirm_password
                                              ? true
                                              : false
                                          }
                                        />
                                        {validation.touched.confirm_password &&
                                        validation.errors.confirm_password ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.confirm_password}
                                          </FormFeedback>
                                        ) : null}
                                        <button
                                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                          onClick={() =>
                                            setPasswordShow(!passwordShow)
                                          }
                                          type="button"
                                          id="password-addon"
                                        >
                                          <i className="ri-eye-fill align-middle"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="d-flex align-items-start gap-3 mt-4">
                                    <button
                                      type="submit"
                                      className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                      // onClick={() => {
                                      //   toggleVerticalTab(
                                      //     activeVerticalTab + 1
                                      //   );
                                      // }}
                                    >
                                      <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </Form>
                            </div>
                          </TabPane>

                          <TabPane tabId={8}>
                            <div className="d-flex justify-content-center">
                              <div>
                                <div>
                                  <h5>What's your website address?</h5>
                                </div>

                                <div style={{ width: "400px" }}>
                                  <Label
                                    htmlFor="websiteAddress"
                                    className="form-label"
                                  >
                                    Website Address
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="websiteAddress"
                                    placeholder="https://google.com"
                                  />

                                  <hr className="my-4 text-muted" />
                                </div>
                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => {
                                      toggleVerticalTab(activeVerticalTab - 1);
                                    }}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Account Details
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab"
                                    onClick={() => {
                                      toggleVerticalTab(activeVerticalTab + 1);
                                    }}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          </TabPane>
                          <TabPane tabId={9}>
                            <div className="d-flex justify-content-center">
                              <div>
                                <div>
                                  <h5>What's your workspace name?</h5>
                                </div>

                                <div style={{ width: "400px" }}>
                                  <Label
                                    htmlFor="workspaceName"
                                    className="form-label"
                                  >
                                    Workspace Name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="workspaceName"
                                    placeholder="My Workspace"
                                  />

                                  <hr className="my-4 text-muted" />
                                </div>
                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => {
                                      toggleVerticalTab(activeVerticalTab - 1);
                                    }}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Account Details
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab"
                                    onClick={() => {
                                      toggleVerticalTab(activeVerticalTab + 1);
                                    }}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          </TabPane>

                          <TabPane tabId={10}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div className="d-flex flex-column">
                                <div>
                                  <h3>
                                    Customize the widget to suit your brand
                                  </h3>
                                </div>

                                <div
                                  className="d-flex"
                                  style={{
                                    width: "900px",
                                    justifyContent: "space-between",
                                    gap: "50px",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <ChatWidgetSettings
                                      welcomeMessage={welcomeMessage}
                                      handleChangeWelcomeMessage={
                                        handleChangeWelcomeMessage
                                      }
                                      handleChangeWidgetColor={
                                        handleChangeWidgetColor
                                      }
                                      suggestedMessages={suggestedMessages}
                                      setSuggestedMessages={
                                        setSuggestedMessages
                                      }
                                    />
                                  </div>

                                  <div style={{ flex: 1 }}>
                                    <ChatWidgetPreview
                                      widgetColour={widgetColour}
                                      welcomeMessage={welcomeMessage}
                                      suggestedMessages={suggestedMessages}
                                    />
                                  </div>
                                </div>

                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => {
                                      toggleVerticalTab(activeVerticalTab - 1);
                                    }}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Website Address
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab"
                                    onClick={() => {
                                      toggleVerticalTab(activeVerticalTab + 1);
                                    }}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          </TabPane>

                          <TabPane tabId={11}>
                            <div className="text-center">
                              <div>
                                <h1>Your widget is ready!</h1>
                                <h5>
                                  Copy this code and place it at the end body
                                  tag on every page of your website:
                                </h5>
                              </div>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Wizard;
