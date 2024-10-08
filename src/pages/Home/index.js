import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Home = () => {
  document.title = "Home";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Home" pageTitle="Dashboard" />
          This is going to be Dashboard
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
