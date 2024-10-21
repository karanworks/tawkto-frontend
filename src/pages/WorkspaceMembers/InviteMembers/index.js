import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InviteMembers = () => {
  // Import CSV file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
    }
  };

  const [entries, setEntries] = useState([{ email: "", role: "Admin" }]);

  const handleEmailChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index].email = value;
    setEntries(newEntries);
  };

  const handleRoleChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index].role = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { email: "", role: "Admin" }]);
  };

  const deleteEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Invite Members"
            pageTitle="Workspace Members"
            link={"/workspace-members"}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-0">
                      Invite agents by entering their email address
                    </h6>

                    <div>
                      <input
                        type="file"
                        accept=".csv"
                        id="csvUpload"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="csvUpload" className="btn btn-primary">
                        Import from CSV
                      </label>
                    </div>
                  </div>
                </CardHeader>

                <CardBody
                  style={{
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="mb-6">
                    <table
                      className="table align-middle table-nowrap"
                      id="userTable"
                    >
                      <thead className="table-light">
                        <tr>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  {entries.map((entry, index) => (
                    <div key={index} className="mb-4">
                      <div className="display-flex align-middle ">
                        <input
                          type="email"
                          value={entry.email}
                          onChange={(e) =>
                            handleEmailChange(index, e.target.value)
                          }
                          style={{
                            width: "500px",
                            flexGrow: 1,
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                            outline: "none",

                            transition: "box-shadow 0.2s ease-in-out",
                          }}
                          placeholder="Enter email"
                        />

                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="Admin"
                            checked={entry.role === "Admin"}
                            onChange={() => handleRoleChange(index, "Admin")}
                            className="form-radio"
                            style={{
                              color: "#3CAAE5",
                              marginLeft: "70px",
                            }}
                          />
                          <span className="ml-2">Admin</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="Agent"
                            checked={entry.role === "Agent"}
                            onChange={() => handleRoleChange(index, "Agent")}
                            className="form-radio"
                            style={{ color: "#ccc", marginLeft: "70px" }}
                          />
                          <span className="ml-2">Agent</span>
                        </label>

                        {entries.length > 1 && (
                          <button
                            className=" bx bx-trash inline-flex items-center"
                            onClick={() => deleteEntry(index)}
                            style={{
                              color: "#ff5c5c",
                              cursor: "pointer",
                              background: "none",
                              border: "none",
                              fontSize: "18px",
                              lineHeight: "1",
                              marginLeft: "30px",
                            }}
                            aria-label="Delete entry"
                          ></button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addEntry}
                    style={{
                      color: "#3CAAE5",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      fontSize: "16px",
                      border: "2px solid #3CAAE5",
                      borderRadius: "4px",
                      marginTop: "15px",
                      padding: "5px",
                      marginLeft: "auto",
                      marginBottom: "10px",
                    }}
                  >
                    <span className="mr-1 bx bx-plus-circle"></span>{" "}
                    <span marginLeft>Add Another</span>
                  </button>
                  {/* Buttons container at the bottom */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      height: "100%",
                      marginTop: "auto",
                    }}
                  >
                    <button
                      className="px-4 py-2 text-gray-600"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
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
                      Send Invitation
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

export default InviteMembers;
