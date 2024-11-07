import React from "react";
import { Link } from "react-router-dom";

import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const LiveUsers = () => {
  const members = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Johnson" },
  ];

  const favouriteBtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Live Users" pageTitle="Customers" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="live-preview">
                    <div className="table-responsive table-card">
                      <table className="table align-middle table-nowrap table-striped-columns mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Website</th>

                            <th scope="col">Member Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>User 1</td>
                            <td> Tidio.com</td>

                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                            <td>
                              <Button
                                color="danger"
                                className="custom-toggle active btn-sm"
                                onClick={(e) => favouriteBtn(e.target)}
                              >
                                <span className="icon-on">Block</span>
                                <span className="icon-off">UnBlock</span>
                              </Button>
                            </td>
                          </tr>

                          <tr>
                            <td>User 2</td>
                            <td> fiber.com</td>

                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                            <td>
                              <Button
                                color="danger"
                                className="custom-toggle active btn-sm"
                                onClick={(e) => favouriteBtn(e.target)}
                              >
                                <span className="icon-on">Block</span>
                                <span className="icon-off">UnBlock</span>
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default LiveUsers;
