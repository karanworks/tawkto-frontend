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

const Departments = () => {
  // dropdown element for mombers
  const members = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Johnson" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Departments" pageTitle="Administration" />
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
                          to="/add-department"
                          className="btn btn-primary"
                          style={{ marginInlineEnd: "5px" }}
                        >
                          <i className=" align-bottom me-1"></i> Add Departments
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
                            <th scope="col">Departments</th>
                            <th scope="col">Description</th>

                            <th scope="col" style={{ width: "200px" }}>
                              Members
                            </th>
                            <th scope="col">Member Status</th>
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
                            <td>IT Department</td>
                            <td>
                              {" "}
                              is simply dummy text of the printing and
                              typesetting industry.
                            </td>
                            <td>
                              <select id="memberDropdown" className="btn ">
                                {members.map((member) => (
                                  <option key={member.id} value={member.id}>
                                    {member.name}
                                  </option>
                                ))}
                              </select>
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
                            <td>HR Department</td>
                            <td>
                              {" "}
                              It is a long established by the readable content
                              of a page when looking at its layout.
                            </td>
                            <td>
                              <select id="memberDropdown" className="btn ">
                                {members.map((member) => (
                                  <option key={member.id} value={member.id}>
                                    {member.name}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
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
            </Row> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Departments;
