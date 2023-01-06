import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, InputGroup } from "react-bootstrap";
import * as UserService from "../../services/UserService";
import * as model from "../model/ModelUser";
import * as modelDepartment from "../model/ModelDepartment";
import Validator from "../../utils/Validator";
import * as rules from "../validation/ValidatorUser";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { message, Upload } from "antd";
import * as modelPartner from "../model/ModelPartner";
import * as modelRole from "../model/ModelRole";
import * as PartnerService from "../../services/PartnerService";
import * as RoleService from "../../services/RoleService";
import * as DepartmentService from "../../services/DepartmentService";
import { PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const { Option } = Select;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const FormUser: React.FC = ({ show, handleCancelForm, handleCloseForm, data, act }) => {
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState("");
  const [showForm, setShowForm] = useState(show);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(model.User);
  const [partners, setPartners] = useState([]);
  const [departments, setDepartments] = useState([]);
  const validator = new Validator(rules);
  const [fileUpload, setFileUpload] = useState();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setShowPass(false);
    modelPartner.Partner.status = "ACTIVE";
    modelPartner.Partner.pageSize = 0;
    PartnerService.getAllPartners(modelPartner.Partner).then(response => {
      setPartners(response.data.data.content);
    });
    modelRole.Role.status = "ACTIVE";
    modelRole.Role.pageSize = 0;
    RoleService.getAllRoles(modelRole.Role).then(response => {
      setRoles(response.data.data.content);
    });
    setUser({
      "username": data ? data.username : "",
      "fullName": data ? data.fullName : "",
      "email": data ? data.email : "",
      "phone": data ? data.phone : "",
      "password": data ? data.password : "",
      "roles": data ? data.roles : "",
      "partnerCode": data ? data.partnerCode : "",
      "departmentCode": data ? data.departmentCode : "",
      "avatar": data ? data.avatar : ""
    });
    setShowForm(show);
    setIsLoading(!show);
  }, [show, data]);

  const showOrHidePass = () => {
    setShowPass(!showPass);
  };

  const onChangeInput = (e) => {
    const { name = "", value = "" } = e.target;
    setUser(user => ({
      ...user,
      [name]: value ? value : ""
    }));
    if (e.target.name === "partnerCode") {
      modelDepartment.Department.partnerCode = e.target.value;
      DepartmentService.getAllByPartnerCode(modelDepartment.Department).then(response => {
        if (response.data.data.length !== 0) {
          setDepartments(response.data.data);
        } else {
          setDepartments([]);
        }
      });
    }
  };

  function functionClose() {
    setFileUpload();
    setErrors({});
    setDepartments([]);
    handleCancelForm();
  }

  const submitSucess = () => {
    setFileUpload();
    setErrors({});
    setDepartments([]);
    handleCloseForm();
  };

  const handleSubmitForm = async () => {
    if (Object.keys(validator.validate(user)).length !== 0) {
      setErrors(validator.validate(user));
    } else {
      setIsLoading(true);
      const formData = new FormData();
      const dataUser = new Blob([JSON.stringify(user)], {
        type: "application/json"
      });

      formData.append("user", dataUser);
      formData.append("avatar", fileUpload);
      try {
        if (act === "add") {
          UserService.createUser(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
          }).then(response => {
            if (response.data.code === "201") {
              submitSucess();
              NotificationManager.success("Thêm người dùng thành công");
            }
          }, errors => {
            setIsLoading(false);
            NotificationManager.error(errors.response.data.message);
          });
        } else if (act === "update") {
          UserService.updateUser(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
          }).then(response => {
            if (response.data.code === "200") {
              submitSucess();
              NotificationManager.success("Cập nhật người dùng thành công");
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

  const handleChange = (value: string[]) => {
    setUser(user => ({
      ...user,
      "roles": value
    }));
  };

  const props = {
    onRemove: () => {
      setFileUpload();
    },
    beforeUpload: (file) => {
      setFileUpload(file);
      return false;
    },
    fileUpload
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <>
        <Modal size="lg" show={showForm} onHide={functionClose}>
          <Modal.Header>
            <Modal.Title>Nhập thông tin người dùng</Modal.Title>
            <button type="button" className="close" data-dismiss="modal" onClick={functionClose}
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Nhập Username:</Form.Label>
                    <Form.Control type="text" placeholder="Username"
                                  name="username"
                                  onChange={onChangeInput}
                                  value={user.username} />
                    {errors.username &&
                    <div className="validation" style={{ "color": "red" }}>{errors.username}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nhập Password:</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control type={showPass ? "text" : "password"} placeholder="Password"
                                    onChange={onChangeInput}
                                    name="password"
                                    disabled={act === "update"} />
                      <span onClick={showOrHidePass} id="basic-addon1">
                                                {showPass ? <VisibilityOff /> : <Visibility />}</span>
                    </InputGroup>
                    {act !== "update" && errors.password &&
                    <div className="validation" style={{ "color": "red" }}>{errors.password}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicFullName">
                    <Form.Label>Nhập họ tên:</Form.Label>
                    <Form.Control type="text" placeholder="Họ tên"
                                  name="fullName"
                                  onChange={onChangeInput}
                                  value={user.fullName} />
                    {errors.fullName &&
                    <div className="validation" style={{ "color": "red" }}>{errors.fullName}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nhập Email:</Form.Label>
                    <Form.Control type="text" placeholder="Email"
                                  name="email"
                                  onChange={onChangeInput}
                                  value={user.email} />
                    {errors.email &&
                    <div className="validation" style={{ "color": "red" }}>{errors.email}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Nhập số điện thoại:</Form.Label>
                    <Form.Control type="text" placeholder="Số điện thoại"
                                  name="phone"
                                  onChange={onChangeInput}
                                  value={user.phone} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formRoles">
                    <Form.Label>Danh sách quyền:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Select dropdownStyle={{ "zIndex": "100000" }} mode="multiple" allowClear="true"
                            style={{ width: "100%" }}
                            placeholder="--- Chọn ---" onChange={handleChange}
                            value={user.roles}
                            optionLabelProp="label">
                      {roles.map(role => (
                        <Option key={role.code} value={role.code} label={role.name}>
                          <div className="demo-option-label-item">
                            {role.code} - {role.name}
                          </div>
                        </Option>
                      ))}

                    </Select>
                    {errors.roles &&
                    <div className="validation" style={{ "color": "red" }}>{errors.roles}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPartner">
                    <Form.Label>Chọn đối tác:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Form.Select onChange={onChangeInput}
                                 name="partnerCode"
                                 value={user.partnerCode}>
                      <option value="">--- Chọn ---</option>
                      {partners.map(partner => (
                        <option key={partner.code}
                                value={partner.code}>{partner.code} - {partner.name}</option>))}
                    </Form.Select>
                    {errors.partnerCode &&
                    <div className="validation" style={{ "color": "red" }}>{errors.partnerCode}</div>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formDepartment">
                    <Form.Label>Chọn phòng ban:
                      <span style={{ "color": "red" }}>*</span>
                    </Form.Label>
                    <Form.Select onChange={onChangeInput}
                                 name="departmentCode"
                                 value={user.departmentCode}>
                      <option value="">--- Chọn ---</option>
                      {departments.map(department => (
                        <option key={department.code}
                                value={department.code}>{department.code} - {department.name}</option>))}
                    </Form.Select>
                    {errors.departmentCode &&
                    <div className="validation"
                         style={{ "color": "red" }}>{errors.departmentCode}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formAvatar">
                    <Form.Label>Chọn avatar:</Form.Label>
                    <Upload name="avatar"
                            listType="picture-card"
                            accept="image/png, image/jpeg"
                            beforeUpload={beforeUpload}
                            className="avatar-uploader" {...props}>
                      {fileUpload === undefined &&
                      uploadButton
                      }
                    </Upload>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={functionClose}>
              Huỷ
            </Button>
            {act === "add" ? (
              <Button variant="primary" disabled={isLoading} onClick={handleSubmitForm}>
                {isLoading ? <span className="spinner-border spinner-border-sm" role="status"
                                   aria-hidden="true" /> : ""}
                <span> Thêm</span>
              </Button>) : (
              <Button variant="primary" disabled={isLoading} onClick={handleSubmitForm}>
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

export default FormUser;