import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../src/Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const WorkspaceMembers = () => {
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
          <BreadCrumb title="Workspace Members" pageTitle="Administration" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex  align-items-center gap-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Search Members"
                        style={{ width: "350px" }}
                      />
                    </div>
                    <div>
                      <Link
                        to="/invite-members"
                        className="btn btn-primary"
                        style={{ marginInlineEnd: "5px" }}
                      >
                        <i className=" align-bottom me-1"></i> Invite Members
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <div
                  className="flex justify-content-between items-center mb-4"
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #E9EBEC",
                    padding: "16px",
                  }}
                >
                  <Button
                    variant="outline"
                    className="d-flex items-center"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      color: "black",
                      gap: "10px",
                    }}
                  >
                    <span className="mr-2" style={{ color: "grey" }}>
                      ☰
                    </span>
                    <span>Filter</span>
                  </Button>
                  <div className="">
                    <span className="mr-2">1 - 2 of 2</span>
                    <Button
                      size="icon"
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }}
                    >
                      <i
                        className="mr-1 bx bx-chevrons-left"
                        style={{ color: "grey" }}
                      ></i>
                    </Button>
                    <Button
                      size="icon"
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }}
                    >
                      <i
                        className="bx bx-chevrons-right"
                        style={{ color: "grey" }}
                      ></i>
                    </Button>
                  </div>
                </div>
                <CardBody>Helopooo</CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default WorkspaceMembers;
