import React, { useEffect, useState } from "react";
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
import CopyCode from "./CopyCode";

const Overview = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const workspace = JSON.parse(localStorage.getItem("workspace") || "{}");

  useEffect(() => {
    if (workspace?.name) {
      setWorkspaceName(workspace.name);
    }
  }, [workspace]);

  let widgetCode;

  if (workspace && workspace.id) {
    // widgetCode = `<script src="http://localhost:3010/api/widget/${workspace.id}" async > </script>`;
    widgetCode = `<script src="${process.env.REACT_APP_SERVER_URL}/widget/${workspace.id}" async > </script>`;
  }

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
                      md={6}
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
                          Workspace Name
                        </Label>
                        <Input
                          type="text"
                          placeholder="Workspace Name"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <CopyCode code={workspace ? widgetCode : ""} />
                      </div>
                    </Col>

                    {/* <Col md={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "50px",
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-danger waves-effect waves-light"
                        >
                          Delete Workspace
                        </button>
                      </div>
                    </Col> */}
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
