import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createWorkspace } from "../../slices/ConnectWebsite/thunk";

const ConnectWebsite = () => {
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      websiteAddress: "",
      workspaceName: "",
    },
    validationSchema: Yup.object({
      websiteAddress: Yup.string().required("Please Enter Your websiteAddress"),
      workspaceName: Yup.string().required("Please Enter Your Workspace Name "),
    }),
    onSubmit: (values, { resetForm }) => {
      // this code works for default login feature
      console.log("WORKSPACE FORM VALUES ->", values);
      dispatch(createWorkspace(values));
      resetForm();
    },
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }

  document.title = "ConnectWebsite | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="ConnectWebsite" pageTitle="Pages" />
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={4}>
              <div className="p-2 mt-4">
                <Form onSubmit={handleFormSubmit} action="#">
                  <div className="mb-3">
                    <Label htmlFor="websiteAddress" className="form-label">
                      Website Address
                    </Label>
                    <Input
                      name="websiteAddress"
                      className="form-control"
                      placeholder="Enter Website Address"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.websiteAddress || ""}
                      invalid={
                        validation.touched.websiteAddress &&
                        validation.errors.websiteAddress
                          ? true
                          : false
                      }
                    />
                    {validation.touched.websiteAddress &&
                    validation.errors.websiteAddress ? (
                      <FormFeedback type="invalid">
                        {validation.errors.websiteAddress}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label htmlFor="workspaceName" className="form-label">
                      Workspace Name
                    </Label>
                    <Input
                      name="workspaceName"
                      className="form-control"
                      placeholder="Enter Workspace Name"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.workspaceName || ""}
                      invalid={
                        validation.touched.workspaceName &&
                        validation.errors.workspaceName
                          ? true
                          : false
                      }
                    />
                    {validation.touched.workspaceName &&
                    validation.errors.workspaceName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.workspaceName}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <Button
                      color="success"
                      className="btn btn-success w-100"
                      type="submit"
                    >
                      Connect Website
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ConnectWebsite;
