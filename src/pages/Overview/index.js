import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Input,
  Label,
  Button,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { FilePond } from "react-filepond";

const Overview = () => {
  // State to manage the switch status
  const [isActive, setIsActive] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const [isIPSecure, setIsIPSecure] = useState(false);

  // Function to toggle the switch
  const handleSwitchToggle = () => {
    setIsActive((prevState) => !prevState);
  };
  const handleSwitchEnable = () => {
    setIsEnable((prevState) => !prevState);
  };
  const handleSwitchSecure = () => {
    setIsSecure((prevState) => !prevState);
  };
  const handleSwitchIPSecure = () => {
    setIsIPSecure((prevState) => !prevState);
  };

  // key
  const [isExpanded, setIsExpanded] = useState(false);
  const [keyterm, setKeyterm] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleExpand = () => setIsExpanded(true);

  const handleCollapse = () => {
    setIsExpanded(false);
    setKeyterm("");
    setIsCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(keyterm).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleCopy();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Overview" pageTitle="Administration" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col
                      md={8}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <div style={{ marginBottom: "20px" }}>
                        <Label style={{ marginTop: "20px" }}>
                          <i
                            className="ri-pencil-line"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Property Name
                        </Label>
                        <Input type="text" placeholder="Enter Company Name" />
                      </div>
                      <div>
                        <Label style={{ marginTop: "20px" }}>
                          <i
                            className=" ri-user-smile-line"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Status
                        </Label>
                        <div
                          style={{
                            backgroundColor: "#F7F7F9",
                            border: "solid 1px #CED4DA",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="form-check form-switch form-switch-right form-switch-md">
                            <label
                              htmlFor="link-colors-showcode"
                              className="form-label text-muted"
                            >
                              {isActive ? "Active" : "Inactive"}
                            </label>
                            <input
                              className="form-check-input code-switcher"
                              type="checkbox"
                              id="link-colors-showcode"
                              checked={isActive}
                              onChange={handleSwitchToggle}
                              style={{ marginLeft: " 360px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label style={{ marginTop: "20px" }}>
                          <i
                            className="  ri-links-fill"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Property URL
                        </Label>
                        <Input type="text" placeholder="Enter Company URL" />
                      </div>
                      <div>
                        <Label style={{ marginTop: "20px" }}>
                          <i
                            className="  ri-map-pin-line"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Property Region
                        </Label>
                        <Input type="ID" />
                      </div>
                    </Col>

                    {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

                    <Col md={6}>
                      <div
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        <Label style={{ marginTop: "20px" }}>
                          <i
                            className="ri-image-fill"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Property Image
                        </Label>
                        <div className="position-relative d-inline-block">
                          <div className="position-absolute top-0 end-0 me-0 mt-2">
                            <label
                              htmlFor="product-image-input"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title=""
                              data-bs-original-title="Select Image"
                            >
                              <div className="avatar-xs">
                                <div
                                  className="avatar-title bg-light border rounded-circle text-muted cursor-pointer"
                                  style={{ marginLeft: "30px" }}
                                >
                                  <i className="ri-image-fill"></i>
                                </div>
                              </div>
                            </label>

                            <input
                              className="form-control d-none"
                              defaultValue=""
                              id="product-image-input"
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                            />
                          </div>
                        </div>

                        <div
                          class="avatar-xl"
                          style={{ display: "flex", width: "330px" }}
                        >
                          <div
                            class="avatar-title rounded bg-danger-subtle text-danger"
                            style={{ height: "152px" }}
                          >
                            Xl
                          </div>
                          <div>
                            <p
                              class="fst-italic"
                              style={{ margin: "20px 20px 0px 20px" }}
                            >
                              {" "}
                              We recommend an image of at least 512x512 for the
                              property.
                            </p>
                            <button
                              type="button"
                              class="btn rounded-pill btn-secondary waves-effect waves-light"
                              style={{ margin: "10px 20px 0px 20px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: "53px" }}>
                        <Label>
                          <i
                            className=" ri-settings-6-line"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Property ID
                        </Label>
                        <Input type="text" />
                      </div>
                      <div>
                        <Label style={{ marginTop: "20px" }}>
                          <i
                            className=" ri-mail-lock-line"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Ticket Forwarding Email
                        </Label>
                        <Input type="email" />
                      </div>
                    </Col>

                    {/* --------------------------------------------------------------------- */}
                    <div>
                      <Label className="fw-bold" style={{ marginTop: "20px" }}>
                        <i
                          className="  ri-find-replace-line"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Discovery Settings
                      </Label>
                    </div>
                    <Col
                      md={8}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <Label style={{ marginTop: "20px" }}>
                        Discovery Listing
                      </Label>
                      <div
                        style={{
                          backgroundColor: "#F7F7F9",
                          border: "solid 1px #CED4DA",
                          padding: "8px",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="form-check form-switch form-switch-right form-switch-md">
                          <label
                            htmlFor="link-colors-showcode"
                            className="form-label text-muted"
                          >
                            {isEnable ? "Enable" : "Disable"}
                          </label>
                          <input
                            className="form-check-input code-switcher"
                            type="checkbox"
                            id="link-colors-showcode"
                            checked={isEnable}
                            onChange={handleSwitchEnable}
                            style={{ marginLeft: " 360px" }}
                          />
                        </div>
                      </div>
                      <p style={{ marginTop: "20px" }}>
                        By enabling this feature this property will be listed in
                        the tawk.to discovery listings. Prospects will be able
                        to discover your business via search and through the
                        category listing pages.
                      </p>
                    </Col>

                    {/* +++++++++++++++++++++++++++++++++++++++++++++ */}

                    <Col md={6}>
                      <div
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        <div>
                          <Label style={{ marginTop: "20px" }}>Category</Label>
                          <Input type="text" />
                        </div>
                        <div>
                          <Label style={{ marginTop: "20px" }}>
                            Sub Category
                          </Label>
                          <Input type="text" />
                        </div>
                      </div>
                    </Col>
                    {/* ------------------------------------------------------------------ */}

                    <Col
                      md={8}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <div>
                        <Label style={{ marginTop: "20px" }}>Description</Label>
                        <Input type="text" style={{ minHeight: "150px" }} />
                      </div>
                    </Col>

                    {/* +++++++++++++++++++++++++++++++++++++++++++++ */}

                    <Col md={6}>
                      <div
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        <div>
                          <Label style={{ marginTop: "20px" }}>Key Terms</Label>
                          {/* ?????????? */}

                          <div className="relative inline-block">
                            {!isExpanded ? (
                              <button onClick={handleExpand}>
                                <i className=" ri-add-box-line"></i>
                              </button>
                            ) : (
                              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                                <input
                                  type="text"
                                  value={keyterm}
                                  onChange={(e) => setKeyterm(e.target.value)}
                                  onKeyPress={handleKeyPress}
                                  placeholder="Enter keyterm"
                                  autoFocus
                                  className="p-2 border-none outline-none text-sm w-36 bg-transparent"
                                />
                                <button
                                  onClick={handleCopy}
                                  className="p-2 bg-transparent border-none outline-none cursor-pointer text-gray-500 text-base"
                                >
                                  📋
                                </button>
                                <button
                                  onClick={handleCollapse}
                                  className="p-2 bg-transparent border-none outline-none cursor-pointer text-gray-500 text-base"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                            {isCopied && (
                              <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-emerald-500 text-white rounded text-xs whitespace-nowrap">
                                Copied!
                              </div>
                            )}
                          </div>

                          {/* ???????/?? */}
                        </div>
                      </div>
                    </Col>

                    <div>
                      <Label className="fw-bold" style={{ marginTop: "20px" }}>
                        <i
                          className=" ri-code-s-slash-fill"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Javascript API
                      </Label>
                    </div>
                    <Col
                      md={8}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <div>
                        <Label style={{ marginTop: "10px" }}>Key</Label>
                        <Input type="text" />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        <Label style={{ marginTop: "10px" }}>Secure Mode</Label>
                        <div
                          style={{
                            backgroundColor: "#F7F7F9",
                            border: "solid 1px #CED4DA",
                            padding: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="form-check form-switch form-switch-right form-switch-md">
                            <label
                              htmlFor="link-colors-showcode"
                              className="form-label text-muted"
                            >
                              {isSecure ? "Enable" : "Disable"}
                            </label>
                            <input
                              className="form-check-input code-switcher"
                              type="checkbox"
                              id="link-colors-showcode"
                              checked={isSecure}
                              onChange={handleSwitchSecure}
                              style={{ marginLeft: " 360px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>

                    <div>
                      <Label className="fw-bold" style={{ marginTop: "10px" }}>
                        <i
                          className=" ri-database-2-line"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Data & Privacy
                      </Label>
                    </div>
                    <Col
                      md={8}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <div>
                        <Label style={{ marginTop: "10px" }}>
                          Visitor IP Tracking
                        </Label>
                        <div
                          style={{
                            backgroundColor: "#F7F7F9",
                            border: "solid 1px #CED4DA",
                            padding: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="form-check form-switch form-switch-right form-switch-md">
                            <label
                              htmlFor="link-colors-showcode"
                              className="form-label text-muted"
                            >
                              {isIPSecure ? "Enable" : "Disable"}
                            </label>
                            <input
                              className="form-check-input code-switcher"
                              type="checkbox"
                              id="link-colors-showcode"
                              checked={isIPSecure}
                              onChange={handleSwitchIPSecure}
                              style={{ marginLeft: " 360px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "50px",
                        }}
                      >
                        <button
                          type="button"
                          class="btn btn-danger waves-effect waves-light"
                        >
                          Delete Property
                        </button>
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

export default Overview;
