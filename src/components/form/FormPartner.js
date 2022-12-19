import 'react-notifications/lib/notifications.css';
import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import * as rules from '../validation/ValidatorPartner'
import Validator from "../../utils/Validator";
import * as PartnerService from '../../services/PartnerService'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Partner from "../../pages/partner/Partner";

const FormPartner = ({show, handleClose, data, act}) => {
    const [errors, setErrors] = useState("")
    const [showForm, setShowForm] = useState(show)
    const [partner, setPartner] = useState({
        "code": "",
        "name": "",
        "description": "",
        "sizeRole": "",
    });
    const validator = new Validator(rules);
    useEffect(() => {
        setPartner({
            "code": data ? data.code : "",
            "name": data ? data.name : "",
            "description": data ? data.description : "",
            "sizeRole": data ? data.sizeRole : "",
        })
        setShowForm(show)
    }, [show, data])

    const onChange = (e) => {
        const {name, value} = e.target;
        setPartner(partner => ({
            ...partner,
            [name]: value ? value : ""
        }))
    }

    function functionClose() {
        setErrors({});
        handleClose();
    }

    const submitSucess = () => {
        setErrors({})
        handleClose();
    }

    const handleSubmitForm = async () => {
        if (Object.keys(validator.validate(partner)).length !== 0) {
            setErrors(validator.validate(partner))
        } else {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
            };
            try {
                if (act === "add") {
                    PartnerService.createPartner(partner, config).then(response => {
                        if (response.data.code === "201") {
                            submitSucess();
                            NotificationManager.success("Thêm đối tác thành công")
                        }
                    })
                } else if (act === "update") {
                    PartnerService.updatePartner(partner, config).then(response => {
                        if (response.data.code === "201") {
                            submitSucess();
                            NotificationManager.success("Cập nhật đối tác thành công")
                        }
                    })
                }
            } catch (error) {
                setTimeout(() => {
                }, 5000);
            }
        }
    }
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
                                              value={partner.code}/>
                                {errors.code &&
                                <div className="validation" style={{"color": "red"}}>{errors.code}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nhập tên đối tác:</Form.Label>
                                <Form.Control type="text" placeholder="Tên đối tác"
                                              onChange={onChange}
                                              name="name"
                                              value={partner.name}/>
                                {errors.name &&
                                <div className="validation" style={{"color": "red"}}>{errors.name}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Nhập mô tả:</Form.Label>
                                <Form.Control type="text" placeholder="Mô tả"
                                              name="description"
                                              onChange={onChange}
                                              value={partner.description}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSizeRole">
                                <Form.Label>Nhập số lượng quyền:</Form.Label>
                                <Form.Control type="number" aria-valuemin="0" placeholder="Số lượng quyền"
                                              name="sizeRole"
                                              onChange={onChange}
                                              value={partner.sizeRole}/>
                                {errors.sizeRole &&
                                <div className="validation" style={{"color": "red"}}>{errors.sizeRole}</div>}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={functionClose}>
                            Huỷ
                        </Button>
                        {act === "add" ? (<Button variant="primary" onClick={handleSubmitForm}>
                            Thêm
                        </Button>) : (
                            <Button variant="primary" onClick={handleSubmitForm}>
                                Cập nhật
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </>
            <NotificationContainer/>
        </div>
    );
}

export default FormPartner;