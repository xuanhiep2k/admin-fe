import "react-notifications/lib/notifications.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as rules from "../validation/ValidatorPartner";
import Validator from "../../utils/Validator";
import * as PartnerService from "../../services/PartnerService";
import { NotificationContainer, NotificationManager } from "react-notifications";
import * as model from "../../components/model/ModelPartner";

const FormPartner = ({ show, handleCancelFrom, handleCloseForm, data, act }) => {
  const [errors, setErrors] = useState("");
  const [showForm, setShowForm] = useState(show);
  const [isLoading, setIsLoading] = useState(false);
  const [partner, setPartner] = useState(model.Partner);
  const validator = new Validator(rules);
  useEffect(() => {
    setPartner({
      "code": data ? data.code : "",
      "name": data ? data.name : "",
      "description": data ? data.description : "",
      "sizeRole": data ? data.sizeRole : ""
    });
    setShowForm(show);
    setIsLoading(!show);
  }, [show, data]);
  const onChange = (e) => {
    const { name = "", value = "" } = e.target;
    setPartner(partner => ({
      ...partner,
      [name]: value ? value : ""
    }));
  };

  function functionClose() {
    setErrors({});
    handleCancelFrom();
  }

  const submitSucess = () => {
    setErrors({});
    handleCloseForm();
  };
  const handleSubmitForm = async () => {
    partner.sizeRole = partner.sizeRole + "";
    setPartner(partner);
    if (Object.keys(validator.validate(partner)).length !== 0) {
      setErrors(validator.validate(partner));

    } else {
      setIsLoading(true);
      try {
        if (act === "add") {
          PartnerService.createPartner(partner).then(response => {
            if (response.data.code === "201") {
              submitSucess();
              NotificationManager.success("Thêm đối tác thành công");
            }
          }, errors => {
            setIsLoading(false);
            NotificationManager.error(errors.response.data.message);
          });
        } else if (act === "update") {
          PartnerService.updatePartner(partner).then(response => {
            if (response.data.code === "200") {
              submitSucess();
              NotificationManager.success("Cập nhật đối tác thành công");
            }
          }, errors => {
            setIsLoading(false);
            NotificationManager.error(errors.response.data.message);
          });
        }
      } catch (error) {
        setTimeout(() => {
        }, 5000);
      }
    }
  };

  return (
    <div>
      <>
        <Modal show={showForm} onHide={functionClose}>
          <Modal.Header>
            <Modal.Title>Nhập thông tin đối tác</Modal.Title>
            <button type="button" className="close" data-dismiss="modal" onClick={functionClose}
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formCode">
                <Form.Label>Nhập mã đối tác:</Form.Label>
                <Form.Control disabled={act === "update"} type="text" aria-valuemin={3}
                              aria-valuemax={20} placeholder="Mã đối tác"
                              name="code"
                              onChange={onChange}
                              value={partner.code} />
                {errors.code &&
                <div className="validation" style={{ "color": "red" }}>{errors.code}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nhập tên đối tác:</Form.Label>
                <Form.Control type="text" placeholder="Tên đối tác"
                              onChange={onChange}
                              name="name"
                              value={partner.name} />
                {errors.name &&
                <div className="validation" style={{ "color": "red" }}>{errors.name}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Nhập mô tả:</Form.Label>
                <Form.Control type="text" placeholder="Mô tả"
                              name="description"
                              onChange={onChange}
                              value={partner.description} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSizeRole">
                <Form.Label>Nhập số lượng quyền:</Form.Label>
                <Form.Control type="number" aria-valuemin="0" placeholder="Số lượng quyền"
                              name="sizeRole"
                              onChange={onChange}
                              pat
                              value={partner.sizeRole} />
                {errors.sizeRole &&
                <div className="validation" style={{ "color": "red" }}>{errors.sizeRole}</div>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={functionClose}>
              Huỷ
            </Button>
            {act === "add" ? (
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

export default FormPartner;