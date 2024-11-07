import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import GeneralModal from "./GeneralModal";

const General = () => {
  const [activeTab, setActiveTab] = useState("1");

  const [modal_list, setmodal_list] = useState(false);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  function tog_list() {
    setmodal_list(!modal_list);
  }
  document.title =
    "Profile Settings | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Settings" pageTitle="General" />

          <Row>
            <Col xxl={9}>
              <Card>
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}
                      >
                        <i className="fas fa-home"></i>
                        Personal Details
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Form>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label"
                              >
                                First Name
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="firstnameInput"
                                placeholder="Enter your firstname"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="lastnameInput"
                                className="form-label"
                              >
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="lastnameInput"
                                placeholder="Enter your lastname"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="phonenumberInput"
                                className="form-label"
                              >
                                Phone Number
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="phonenumberInput"
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="emailInput"
                                className="form-label"
                              >
                                Email Address
                              </Label>
                              <Input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter your email"
                              />
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="websiteInput1"
                                className="form-label"
                              >
                                Website
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="websiteInput1"
                                placeholder="www.example.com"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label htmlFor="cityInput" className="form-label">
                                City
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="cityInput"
                                placeholder="City"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="countryInput"
                                className="form-label"
                              >
                                Country
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="countryInput"
                                placeholder="Country"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="zipcodeInput"
                                className="form-label"
                              >
                                Zip Code
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                minLength="5"
                                maxLength="6"
                                id="zipcodeInput"
                                placeholder="Enter zipcode"
                              />
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={tog_list}
                              >
                                Updates
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-secondary"
                              >
                                Cancel
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <GeneralModal
        // validation={validation}
        modal_list={modal_list}
        tog_list={tog_list}
        // formHandleSubmit={formHandleSubmit}
        // handleroleStatus={handleroleStatus}
        // rolestatus={rolestatus}
        // roleStatus={roleStatus}
      />
    </React.Fragment>
  );
};

export default General;
