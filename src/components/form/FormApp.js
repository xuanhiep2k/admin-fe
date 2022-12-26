import 'react-notifications/lib/notifications.css';
import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import * as rules from '../validation/ValidatorApp'
import Validator from "../../utils/Validator";
import * as AppService from '../../services/AppService'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import * as model from "../../components/model/ModelApp"

const FormApp = ({show, handleCancelForm, handleCloseForm, data, act}) => {
    const [errors, setErrors] = useState("")
    const [showForm, setShowForm] = useState(show)
    const [isLoading, setIsLoading] = useState(false)
    const [app, setApp] = useState(model.App);
    const validator = new Validator(rules);
    useEffect(() => {
        setApp({
            "code": data ? data.code : "",
            "name": data ? data.name : "",
            "description": data ? data.description : "",
            "sizeRole": data ? data.sizeRole : "",
        })
        setShowForm(show);
        setIsLoading(!show);
    }, [show, data])
    const onChange = (e) => {
        const {name = "", value = ""} = e.target;
        setApp(app => ({
            ...app,
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
        if (Object.keys(validator.validate(app)).length !== 0) {
            setErrors(validator.validate(app))

        } else {
            setIsLoading(true);

            try {
                if (act === "add") {
                    AppService.createApp(app).then(response => {
                        if (response.data.code === "201") {
                            submitSucess();
                            NotificationManager.success("Thêm ứng dụng thành công")
                        }
                    }, errors => {
                        setIsLoading(false)
                        NotificationManager.error(errors.response.data.message)
                    })
                } else if (act === "update") {
                    AppService.updateApp(app).then(response => {
                        if (response.data.code === "200") {
                            submitSucess();
                            NotificationManager.success("Cập nhật ứng dụng thành công")
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

    return (
        <div>
            <>
                <Modal show={showForm} onHide={functionClose}>
                    <Modal.Header>
                        <Modal.Title>Nhập thông tin ứng dụg</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" onClick={functionClose}
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formCode">
                                <Form.Label>Nhập mã ứng dụng:</Form.Label>
                                <Form.Control disabled={act === "update"} type="text" aria-valuemin={3}
                                              aria-valuemax={20} placeholder="Mã ứng dụng"
                                              name="code"
                                              onChange={onChange}
                                              value={app.code}/>
                                {errors.code &&
                                <div className="validation" style={{"color": "red"}}>{errors.code}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nhập tên ứng dụng:</Form.Label>
                                <Form.Control type="text" placeholder="Tên ứng dụng"
                                              onChange={onChange}
                                              name="name"
                                              value={app.name}/>
                                {errors.name &&
                                <div className="validation" style={{"color": "red"}}>{errors.name}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Nhập mô tả:</Form.Label>
                                <Form.Control type="text" placeholder="Mô tả"
                                              name="description"
                                              onChange={onChange}
                                              value={app.description}/>
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

export default FormApp;