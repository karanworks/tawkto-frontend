import React, { useState } from "react";
import { Card, CardBody, Col, Container, Input, Row, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDepartment = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "Spider" },
    { id: 2, name: "Batman" },
    { id: 3, name: "Tim" },
    { id: 4, name: "Zahid Raza" },
  ]);

  const [newMember, setNewMember] = useState("");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Add Department"
            pageTitle="Department"
            link={"/departments"}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody
                  style={{
                    minHeight: "500px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label style={{ marginTop: "20px" }}>Name</label>
                  <Input type="text"></Input>

                  <label style={{ marginTop: "10px" }}>Description</label>
                  <Input
                    type="textarea"
                    style={{ minHeight: "200px", verticalAlign: "top" }}
                  ></Input>

                  <label style={{ marginTop: "10px" }}>Members</label>

                  {/* Display list of members in rows */}
                  <Card>
                    <CardBody>
                      <div style={{ marginTop: "10px" }}>
                        {members.map((member) => (
                          <Row key={member.id} style={{ marginBottom: "10px" }}>
                            <Col xs={1}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={member.id}
                                  id={`checkbox-${member.id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`checkbox-${member.id}`}
                                ></label>
                              </div>
                            </Col>
                            <Col xs={11}>
                              <div className="member-row">
                                <span>{member.name}</span>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </CardBody>
                  </Card>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "auto",
                    }}
                  >
                    <button
                      className="px-4 py-2"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-white"
                      style={{
                        backgroundColor: "#3CAAE5",
                        borderRadius: "4px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        border: "none",
                        marginLeft: "10px",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AddDepartment;
