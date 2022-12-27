import 'react-notifications/lib/notifications.css';
import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import * as rules from '../validation/ValidatorRole'
import Validator from "../../utils/Validator";
import * as RoleService from '../../services/RoleService'
import * as PartnerService from '../../services/PartnerService'
import * as FunctionService from '../../services/FunctionService'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import * as model from "../model/ModelRole"
import * as modelPartner from "../model/ModelPartner"
import * as modelFunction from "../../components/model/ModelFunction"
import {TreeSelect} from "antd";

const {SHOW_ALL} = TreeSelect;

const FormRole = ({show, handleCancelForm, handleCloseForm, data, act}) => {
    const [errors, setErrors] = useState("")
    const [showForm, setShowForm] = useState(show)
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState(model.Role);
    const [partners, setPartners] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [value, setValue] = useState([]);

    const validator = new Validator(rules);
    useEffect(() => {
        modelPartner.Partner.status = "ACTIVE";
        modelPartner.Partner.pageSize = 0;
        PartnerService.getAllPartners(modelPartner.Partner).then(response => {
            setPartners(response.data.data.content);
        });
        modelFunction.Function.status = "ACTIVE";
        modelFunction.Function.pageSize = 0;
        FunctionService.getTree(modelFunction.Function).then(response => {
            setTreeData(response.data.data.content)
        });
        setRole({
            "code": data ? data.code : "",
            "name": data ? data.name : "",
            "description": data ? data.description : "",
            "partnerCode": data ? data.partnerCode : "",
            "functionCodes": data ? data.functionCodes : "",
        })
        setValue(data.functionCodes)

        setShowForm(show);
        setIsLoading(!show);
    }, [show, data])
    const onChangeInput = (e) => {
        const {name = "", value = ""} = e.target;
        setRole(role => ({
            ...role,
            [name]: value ? value : ""
        }))
    }

    function functionClose() {
        setErrors({});
        handleCancelForm();
    }

    const submitSucess = () => {
        setErrors({})
        handleCloseForm();
    }
    const handleSubmitForm = async () => {
        if (Object.keys(validator.validate(role)).length !== 0) {
            setErrors(validator.validate(role))
        } else {
            setIsLoading(true);
            try {
                if (act === "add") {
                    RoleService.createRole(role).then(response => {
                        if (response.data.code === "201") {
                            submitSucess();
                            NotificationManager.success("Thêm quyền thành công")
                        }
                    }, errors => {
                        setIsLoading(false)
                        NotificationManager.error(errors.response.data.message)
                    })
                } else if (act === "update") {
                    RoleService.updateRole(role).then(response => {
                        if (response.data.code === "200") {
                            submitSucess();
                            NotificationManager.success("Cập nhật quyền thành công")
                        }
                    }, errors => {
                        setIsLoading(false)
                        NotificationManager.error(errors.response.data.message)
                    })
                }
            } catch (error) {
                setTimeout(() => {
                }, 5000);
            }
        }
    }
    const onChange = (newValue: string[]) => {
        setValue(newValue);
        setRole(role => ({
            ...role,
            "functionCodes": newValue
        }))
    };
    const tProps = {
        treeData,
        allowClear: true,
        value,
        onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_ALL,
        placeholder: '--- Chọn ---',
        style: {
            width: '100%',
        },
    };
    return (
        <div>
            <>
                <Modal show={showForm} onHide={functionClose}>
                    <Modal.Header>
                        <Modal.Title>Nhập thông tin quyền</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" onClick={functionClose}
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formCode">
                                <Form.Label>Nhập mã quyền:</Form.Label>
                                <Form.Control disabled={act === "update"} type="text" aria-valuemin={3}
                                              aria-valuemax={20} placeholder="Mã quyền"
                                              name="code"
                                              onChange={onChangeInput}
                                              value={role.code}/>
                                {errors.code &&
                                <div className="validation" style={{"color": "red"}}>{errors.code}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nhập tên quyền:</Form.Label>
                                <Form.Control type="text" placeholder="Tên quyền"
                                              onChange={onChangeInput}
                                              name="name"
                                              value={role.name}/>
                                {errors.name &&
                                <div className="validation" style={{"color": "red"}}>{errors.name}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSizeRole">
                                <Form.Label>Chọn đối tác:
                                    <span style={{"color": "red"}}>*</span>
                                </Form.Label>
                                <Form.Select onChange={onChangeInput}
                                             name="partnerCode"
                                             value={role.partnerCode}>
                                    <option value="">--- Chọn ---</option>
                                    {partners.map(partner => (
                                        <option key={partner.code}
                                                value={partner.code}>{partner.code} - {partner.name}</option>))}
                                </Form.Select>
                                {errors.partnerCode &&
                                <div className="validation" style={{"color": "red"}}>{errors.partnerCode}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formRoles">
                                <Form.Label>Danh sách chức năng:
                                    <span style={{"color": "red"}}>*</span>
                                </Form.Label>
                                <TreeSelect dropdownStyle={{zIndex: "10000"}}  {...tProps} />
                                {/*{errors.appCode &&*/}
                                <div className="validation" style={{"color": "red"}}>{errors.functionCodes}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Nhập mô tả:</Form.Label>
                                <Form.Control type="text" placeholder="Mô tả"
                                              name="description"
                                              onChange={onChangeInput}
                                              value={role.description}/>
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
                                                   aria-hidden="true"/> : ""}
                                <span> Thêm</span>
                            </Button>) : (
                            <Button className="btn btn-primary" disabled={isLoading} onClick={handleSubmitForm}>
                                {isLoading ? <span className="spinner-border spinner-border-sm" role="status"
                                                   aria-hidden="true"/> : ""}
                                <span> Cập nhật</span>
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </>
            <NotificationContainer/>
        </div>
    );
}

export default FormRole;