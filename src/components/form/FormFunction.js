import "react-notifications/lib/notifications.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as rules from "../validation/ValidatorFunction";
import Validator from "../../utils/Validator";
import * as FunctionService from "../../services/FunctionService";
import { NotificationContainer, NotificationManager } from "react-notifications";
import * as model from "../../components/model/ModelFunction";
import { getAllApps } from "../../services/AppService";
import * as modelApp from "../model/ModelApp";

const FormFunction = ({ show, handleCancelForm, handleCloseForm, data, act }) => {
  const [errors, setErrors] = useState("");
  const [showForm, setShowForm] = useState(show);
  const [isLoading, setIsLoading] = useState(false);
  const [func, setFunc] = useState(model.Function);
  const [apps, setApps] = useState([]);
  const validator = new Validator(rules);
  useEffect(() => {
    modelApp.App.status = "ACTIVE";
    modelApp.App.pageSize = 0;
    getAllApps(modelApp.App).then(response => {
      setApps(response.data.data.content);
    });
    if (act === "update" || act === "add") {
      setFunc({
        "code": data ? data.code : "",
        "name": data ? data.name : "",
        "description": data ? data.description : "",
        "appCode": data ? data.appCode : "",
        "type": data ? data.type : "",
        "parentCode": data ? data.parentCode : "",
        "icon": data ? data.icon : "",
        "path": data ? data.path : ""
      });
    } else if (act === "addChild") {
      setFunc({
        "appCode": data.appCode,
        "path": data.path,
        "parentCode": data.code
      });
    }
    setShowForm(show);
    setIsLoading(!show);
  }, [show, data]);
  const onChange = (e) => {
    const { name = "", value = "" } = e.target;
    setFunc(func => ({
      ...func,
      [name]: value ? value : ""
    }));
  };

  function functionClose() {
    setErrors({});
    handleCancelForm();
  }

  const submitSucess = () => {
    setErrors({});
    handleCloseForm();
  };
  const handleSubmitForm = async () => {
    if (Object.keys(validator.validate(func)).length !== 0) {
      setErrors(validator.validate(func));

    } else {
      setIsLoading(true);
      try {
        if (act === "add" || act === "addChild") {
          FunctionService.createFunction(func).then(response => {
            if (response.data.code === "201") {
              submitSucess();
              NotificationManager.success("Thêm chức năng thành công");
            }
          }, errors => {
            setIsLoading(false);
            NotificationManager.error(errors.response.data.message);
          });
        } else if (act === "update") {
          FunctionService.updateFunction(func).then(response => {
            if (response.data.code === "200") {
              submitSucess();
              NotificationManager.success("Cập nhật chức năng thành công");
            }
          }, errors => {
            setIsLoading(false);
            NotificationManager.error(errors.response.data.message);
          });
        }
      } catch (error) {
        setIsLoading(false);
        setTimeout(() => {
        }, 5000);
      }
    }
  };

  return (
    <div>
      <>
        <Modal size="lg" show={showForm} onHide={functionClose}>
          <Modal.Header>
            <Modal.Title>Nhập thông tin chức năng</Modal.Title>
            <button type="button" className="close" data-dismiss="modal" onClick={functionClose}
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formApp">
                    <Form.Label>Chọn ứng dụng:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Form.Select onChange={onChange}
                                 name="appCode"
                                 value={func.appCode}>
                      <option value="">--- Chọn ---</option>
                      {apps.map(app => (
                        <option key={app.code}
                                value={app.code}>{app.code} - {app.name}</option>))}
                    </Form.Select>
                    {errors.appCode &&
                    <div className="validation" style={{ "color": "red" }}>{errors.appCode}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formCode">
                    <Form.Label>Nhập mã chức năng:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Form.Control disabled={act === "update"} type="text" aria-valuemin={3}
                                  aria-valuemax={20} placeholder="Mã chức năng"
                                  name="code"
                                  onChange={onChange}
                                  value={func.code} />
                    {errors.code &&
                    <div className="validation" style={{ "color": "red" }}>{errors.code}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nhập tên chức năng:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Tên chức năng"
                                  onChange={onChange}
                                  name="name"
                                  value={func.name} />
                    {errors.name &&
                    <div className="validation" style={{ "color": "red" }}>{errors.name}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formPath">
                    <Form.Label>Nhập đường dẫn:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Đường dẫn"
                                  name="path"
                                  onChange={onChange}
                                  pat
                                  value={func.path} />
                    {errors.path &&
                    <div className="validation" style={{ "color": "red" }}>{errors.path}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>Nhập loại:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Form.Select name="type"
                                 onChange={onChange}
                                 value={func.type}>
                      <option value="">--- Chọn ---</option>
                      <option value="FUNCTION">FUNCTION</option>
                      <option value="MODULE">MODULE</option>
                    </Form.Select>
                    {errors.type &&
                    <div className="validation" style={{ "color": "red" }}>{errors.type}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formIcon">
                    <Form.Label>Nhập icon:</Form.Label>
                    <Form.Control type="text" placeholder="Icon"
                                  name="icon"
                                  onChange={onChange}
                                  value={func.icon} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formDescriprion">
                    <Form.Label>Nhập mô tả:</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Mô tả"
                                  name="description"
                                  onChange={onChange}
                                  value={func.description} />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={functionClose}>
              Huỷ
            </Button>
            {act === "add" || act === "addChild" ? (
              <Button className="btn btn-primary" disabled={isLoading} onClick={handleSubmitForm}>
                {isLoading ? <span className="spinner-border spinner-border-sm" role="status"
                                   aria-hidden="true" /> : ""}
                <span> Thêm</span>
              </Button>) : (
              <Button className="btn btn-primary" disabled={isLoading} onClick={handleSubmitForm}>
                {isLoading ? <span className="spinner-border spinner-border-sm" role="status"
                                   aria-hidden="true" /> : ""}
                <span> Cập nhật</span>
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
      <NotificationContainer />
    </div>
  );
};

export default FormFunction;