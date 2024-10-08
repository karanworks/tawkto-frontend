import React from "react";
import { Row, Card, CardBody, Col } from "reactstrap";
import CountUp from "react-countup";

//Import Icons
import FeatherIcon from "feather-icons-react";

const Widgets = ({ VKYCDoneData, ApprovedData }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">VKYC</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value" data-target="33.48">
                      {/* <CountUp
                        start={0}
                        end={VKYCDoneDataAllTime.length}
                        decimals={0}
                        duration={2}
                      /> */}
                      {VKYCDoneData?.length || VKYCDoneData}
                    </span>{" "}
                  </h2>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-success-subtle rounded-circle fs-2">
                      <FeatherIcon
                        icon="check-circle"
                        className="text-success"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">Approved</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value" data-target="3">
                      {/* <CountUp start={0} end={0} duration={4} /> */}
                      {ApprovedData?.length || ApprovedData}
                    </span>{" "}
                  </h2>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-secondary-subtle rounded-circle fs-2">
                      <FeatherIcon icon="users" className="text-secondary" />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Widgets;
