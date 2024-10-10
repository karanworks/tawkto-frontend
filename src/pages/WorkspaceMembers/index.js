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
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const WorkspaceMembers = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Workspace Members" pageTitle="Administration" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between  align-items-center ">
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
                    <div className="d-flex align-items-center flex-wrap gap-4">
                      <div className="flex-shrink-0 ">
                        <div className="hstack text-nowrap gap-2">
                          <button className="btn btn-soft-primary">
                            <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                            Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="live-preview">
                    <div className="table-responsive table-card">
                      <table className="table align-middle table-nowrap table-striped-columns mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "46px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="cardtableCheck"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="cardtableCheck"
                                ></label>
                              </div>
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">Admin</th>

                            <th scope="col" style={{ width: "200px" }}>
                              Admin
                            </th>
                            <th scope="col">Agent Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="cardtableCheck01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="cardtableCheck01"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <Link to="#" className="fw-medium">
                                #VL2110
                              </Link>
                            </td>
                            <td>William Elmore</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-light"
                              >
                                Details
                              </button>
                            </td>

                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="cardtableCheck01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="cardtableCheck01"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <Link to="#" className="fw-medium">
                                #VL2111
                              </Link>
                            </td>
                            <td>Paul</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-light"
                              >
                                Details
                              </button>
                            </td>

                            <td>
                              <span className="badge bg-success">Pending</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
              <div className="col-sm-auto">
                <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                  <li>
                    <Link to="#" className="page-link">
                      Previous
                    </Link>
                  </li>

                  <React.Fragment>
                    <li className="page-item">
                      <Link to="#" onClick={() => setPageIndex(item)}></Link>
                    </li>
                  </React.Fragment>

                  <li>
                    <Link to="#" className="page-link">
                      Next
                    </Link>
                  </li>
                </ul>
              </div>
            </Row>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WorkspaceMembers;
