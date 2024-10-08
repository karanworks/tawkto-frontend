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
} from "reactstrap";
//Import images
import classnames from "classnames";
import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
import FeatherIcon from "feather-icons-react";
import avatar from "./avatar.png";
import { color } from "echarts";
import ChatWidgetPreview from "./ChatWidgetPreview";
import ChatWidgetSettings from "./ChatWidgetSettings";

// register lottie and define custom element
defineElement(loadAnimation);

const FormWizard = () => {
  const [activeVerticalTab, setactiveVerticalTab] = useState(7);
  const [passedverticalSteps, setPassedverticalSteps] = useState([1]);

  const [widgetColour, setWidgetColour] = useState("#25A0E2");

  const [welcomeMessage, setWelcomeMessage] = useState(
    "👋 Hi, How can we help?"
  );

  const [suggestedMessages, setSuggestedMessages] = useState([
    { id: 1, message: "I have a question" },
    { id: 2, message: "Tell me more" },
  ]);

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
                  <h4 className="card-title mb-0">Create An Account</h4>
                </CardHeader>
                <CardBody>
                  <form className="vertical-navs-step form-steps">
                    <Row className="gy-5">
                      <Col lg={2}>
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
                                <div style={{ width: "400px" }}>
                                  <div>
                                    <h5>Account Details</h5>
                                    <p className="text-muted">
                                      Fill all information below
                                    </p>
                                  </div>

                                  <div>
                                    {/* <Row className="g-3">
                                  <Col sm={12}> */}
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
                                      defaultValue=""
                                    />
                                    {/* </Col>

                                  <Col xs={12}> */}
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
                                    />
                                    {/* </Col>
                                  <Col xs={12}> */}
                                    <Label
                                      htmlFor="password"
                                      className="form-label"
                                    >
                                      Password{" "}
                                    </Label>
                                    <Input
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      placeholder="Enter Password"
                                    />
                                    {/* </Col>
                                </Row> */}
                                  </div>

                                  <div className="d-flex align-items-start gap-3 mt-4">
                                    <button
                                      type="button"
                                      className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                      onClick={() => {
                                        toggleVerticalTab(
                                          activeVerticalTab + 1
                                        );
                                      }}
                                    >
                                      <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </TabPane>

                            <TabPane tabId={8}>
                              <div className="d-flex justify-content-center">
                                <div>
                                  <div>
                                    <h5>What's your website address?</h5>
                                  </div>

                                  <div style={{ width: "400px" }}>
                                    {/* <Row className="g-3">
                                  <Col xs={12}> */}
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
                                    {/* </Col>
                                </Row> */}

                                    <hr className="my-4 text-muted" />
                                  </div>
                                  <div className="d-flex align-items-start gap-3 mt-4">
                                    <button
                                      type="button"
                                      className="btn btn-light btn-label previestab"
                                      onClick={() => {
                                        toggleVerticalTab(
                                          activeVerticalTab - 1
                                        );
                                      }}
                                    >
                                      <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                      Back to Account Details
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-success btn-label right ms-auto nexttab"
                                      onClick={() => {
                                        toggleVerticalTab(
                                          activeVerticalTab + 1
                                        );
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
                                    {/* <Row className="g-3">
                                  <Col xs={12}> */}
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
                                    {/* </Col>
                                </Row> */}

                                    <hr className="my-4 text-muted" />
                                  </div>
                                  <div className="d-flex align-items-start gap-3 mt-4">
                                    <button
                                      type="button"
                                      className="btn btn-light btn-label previestab"
                                      onClick={() => {
                                        toggleVerticalTab(
                                          activeVerticalTab - 1
                                        );
                                      }}
                                    >
                                      <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                      Back to Account Details
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-success btn-label right ms-auto nexttab"
                                      onClick={() => {
                                        toggleVerticalTab(
                                          activeVerticalTab + 1
                                        );
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

                                  {/* <Row className="gy-3">
                                <Col md={6}> */}
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
                                    {/* </Col> */}

                                    {/* <Col md={6}> */}
                                    <div style={{ flex: 1 }}>
                                      <ChatWidgetPreview
                                        widgetColour={widgetColour}
                                        welcomeMessage={welcomeMessage}
                                        suggestedMessages={suggestedMessages}
                                      />
                                    </div>
                                  </div>
                                  {/* </Col> */}
                                  {/* </Row> */}

                                  <div className="d-flex align-items-start gap-3 mt-4">
                                    <button
                                      type="button"
                                      className="btn btn-light btn-label previestab"
                                      onClick={() => {
                                        toggleVerticalTab(
                                          activeVerticalTab - 1
                                        );
                                      }}
                                    >
                                      <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                      Back to Website Address
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-success btn-label right ms-auto nexttab"
                                      onClick={() => {
                                        toggleVerticalTab(
                                          activeVerticalTab + 1
                                        );
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

                      {/* <Col lg={3}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="fs-14 text-primary mb-0">
                            <i className="ri-shopping-cart-fill align-middle me-2"></i>{" "}
                            Your cart
                          </h5>
                          <span className="badge bg-primary rounded-pill">
                            3
                          </span>
                        </div>
                        <ul className="list-group mb-3">
                          <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 className="my-0">Product name</h6>
                              <small className="text-muted">
                                Brief description
                              </small>
                            </div>
                            <span className="text-muted">$12</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 className="my-0">Second product</h6>
                              <small className="text-muted">
                                Brief description
                              </small>
                            </div>
                            <span className="text-muted">$8</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 className="my-0">Third item</h6>
                              <small className="text-muted">
                                Brief description
                              </small>
                            </div>
                            <span className="text-muted">$5</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                              <h6 className="my-0">Discount code</h6>
                              <small>−$5 Discount</small>
                            </div>
                            <span className="text-success">−$5</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>$20</strong>
                          </li>
                        </ul>
                      </Col> */}
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormWizard;
