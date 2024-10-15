import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import LogoLight from "../../assets/images/webwersLogo.png";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="custom-footer bg-dark py-5 position-relative">
        <Container>
          <Row>
            <Col className="col-lg-4 mt-4">
              <div>
                <div>
                  <img src={LogoLight} alt="logo light" height="70" />
                </div>
                <div className="mt-2 fs-15">
                  {/* <p>
                    Our latest news, articles, and resources, we will sent to
                    your inbox weekly.
                  </p> */}
                  <p>
                    Providing seamless customer engagement solutions through
                    real-time chat. Our mission is to help businesses connect,
                    communicate, and convert effortlessly.
                  </p>
                  <ul className="list-inline mb-0 footer-social-link">
                    <li className="list-inline-item">
                      <Link
                        to="https://www.facebook.com/webwers/"
                        className="avatar-xs d-block"
                      >
                        <div className="avatar-title rounded-circle">
                          <i className="ri-facebook-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="https://www.instagram.com/webwerscloudtech/"
                        className="avatar-xs d-block"
                      >
                        <div className="avatar-title rounded-circle">
                          <i className="ri-instagram-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="https://twitter.com/web_wers"
                        className="avatar-xs d-block"
                      >
                        <div className="avatar-title rounded-circle">
                          <i className="ri-twitter-fill"></i>
                        </div>
                      </Link>
                    </li>
                    {/* <li className="list-inline-item">
                      <Link
                        to="https://in.pinterest.com/webwers/"
                        className="avatar-xs d-block"
                      >
                        <div className="avatar-title rounded-circle">
                          <i className="ri-pintrest-fill"></i>
                        </div>
                      </Link>
                    </li> */}
                    <li className="list-inline-item">
                      <Link
                        to="https://www.linkedin.com/company/webwers/"
                        className="avatar-xs d-block"
                      >
                        <div className="avatar-title rounded-circle">
                          <i className="ri-linkedin-line"></i>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col className="col-lg-7 ms-lg-auto">
              <Row>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Company</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link to="/pages-profile">About Us</Link>
                      </li>
                      <li>
                        <Link to="/pages-gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link to="/pages-team">Team</Link>
                      </li>
                      <li>
                        <Link to="/pages-pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/pages-timeline">Timeline</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Support</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link to="/apps-job-lists">Help Center</Link>
                      </li>
                      <li>
                        <Link to="/apps-job-lists">Documentation</Link>
                      </li>

                      <li>
                        <Link to="/apps-job-application">
                          Live Chat Support
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/apps-job-new">New Job</Link>
                      </li>
                      <li>
                        <Link to="/apps-job-companies-lists">Company List</Link>
                      </li> */}
                    </ul>
                  </div>
                </Col>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Contact Us</h5>
                  <div className="text-muted mt-3">
                    <p>Have questions or need help?</p>
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link to="/pages-faqs">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/pages-faqs">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="text-center text-sm-start align-items-center mt-5">
            <Col className="col-sm-6">
              <div>
                <p className="copy-rights mb-0">
                  {new Date().getFullYear()} © Webwers Right Reserved - Design
                  by Webwers
                </p>
              </div>
            </Col>
            <Col className="col-sm-6">
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-list gap-4 fs-15">
                  <li className="list-inline-item">
                    <Link to="/pages-privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/pages-term-conditions">Terms & Conditions</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/pages-privacy-policy">Security</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
