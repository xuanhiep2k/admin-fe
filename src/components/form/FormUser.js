import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import * as UserService from "../../services/UserService"
import * as model from "../model/ModelUser";
// import * as model from "../model/Mo";
import Validator from "../../utils/Validator";
import * as rules from "../validation/ValidatorPartner";
import {NotificationManager} from "react-notifications";
import {TreeSelect} from 'antd';

const {SHOW_PARENT} = TreeSelect;
const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
                children: []
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
                children: []
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
                children: []
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
                children: []
            },
        ],
    },
];

const Formpartner: React.FC = ({show, handleCancelFrom, handleCloseForm, data, act}) => {
    const [roles,setRoles]=useState(model);
    const [errors, setErrors] = useState("")
    const [showForm, setShowForm] = useState(show)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(model.User);
    const validator = new Validator(rules);

    useEffect(() => {
        setUser({
            // "code": data ? data.code : "",
            // "name": data ? data.name : "",
            // "description": data ? data.description : "",
            // "sizeRole": data ? data.sizeRole : "",
        })
        setShowForm(show);
        setIsLoading(!show);
    }, [show, data])

    const onChangeInput = (e) => {
        const {name = "", value = ""} = e.target;
        setUser(user => ({
            ...user,
            [name]: value ? value : ""
        }))
    }

    function functionClose() {
        setErrors({});
        handleCancelFrom();
    }

    const submitSucess = () => {
        setErrors({})
        handleCloseForm();
    }

    const handleSubmitForm = async () => {
        if (Object.keys(validator.validate(user)).length !== 0) {
            setErrors(validator.validate(user))

        } else {
            setIsLoading(true);
            try {
                if (act === "add") {
                    UserService.createUser(user).then(response => {
                        if (response.data.code === "201") {
                            submitSucess();
                            NotificationManager.success("Thêm người dùng thành công")
                        }
                    }, errors => {
                        setIsLoading(false)
                        NotificationManager.error(errors.response.data.message)
                    })
                }
                // else if (act === "update") {
                //     PartnerService.updatePartner(partner).then(response => {
                //         if (response.data.code === "200") {
                //             submitSucess();
                //             NotificationManager.success("Cập nhật đối tác thành công")
                //         }
                //     }, errors => {
                //         setIsLoading(false)
                //         NotificationManager.error(errors.response.data.message)
                //     })
                // }
            } catch (error) {
                setTimeout(() => {
                }, 5000);
            }
        }
    }

    const [value, setValue] = useState(['0-0-0']);
    const onChange = (newValue: string[]) => {
        console.log('onChange ', newValue);
        setValue(newValue);
    };

    const tProps = {
        treeData, value, onChange, treeCheckable: true, showCheckedStrategy: SHOW_PARENT, placeholder: 'Please select',
        style: {
            width: '100%',
        },
    };
    return (
        <div>
            <>
                <Modal size="lg"  show={showForm} onHide={functionClose}>
                    <Modal.Header>
                        <Modal.Title>Nhập thông tin khách hàng</Modal.Title>
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
                                                      value={user.username}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Nhập Password:</Form.Label>
                                        <Form.Control type="text" placeholder="Password"
                                                      onChange={onChangeInput}
                                                      name="password"
                                                      value={user.password}/>
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
                                                      value={user.fullName}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Nhập Email:</Form.Label>
                                        <Form.Control type="text" placeholder="Email"
                                                      name="email"
                                                      onChange={onChangeInput}
                                                      value={user.email}/>
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
                                                      value={user.phone}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formRoles">
                                        <Form.Label>Danh sách quyền:
                                            <span style={{"color": "red"}}>*</span>
                                        </Form.Label>
                                        <TreeSelect dropdownStyle={{zIndex: "10000"}}  {...tProps} />
                                        {/*{errors.appCode &&*/}
                                        {/*<div className="validation" style={{"color": "red"}}>{errors.appCode}</div>}*/}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPartner">
                                        <Form.Label>Chọn đối tác:
                                            <span style={{"color": "red"}}>*</span>
                                        </Form.Label>
                                        {/*<Form.Select onChange={onChange}*/}
                                        {/*             name="partnerCode"*/}
                                        {/*             value={func.appCode}>*/}
                                        {/*    <option value="">--- Chọn ---</option>*/}
                                        {/*    {apps.map(app => (*/}
                                        {/*        <option key={app.code}*/}
                                        {/*                value={app.code}>{app.code} - {app.name}</option>))}*/}
                                        {/*</Form.Select>*/}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formRoles">
                                        <Form.Label>Danh sách quyền:
                                            <span style={{"color": "red"}}>*</span>
                                        </Form.Label>
                                        <TreeSelect {...tProps} />
                                        {/*{errors.appCode &&*/}
                                        {/*<div className="validation" style={{"color": "red"}}>{errors.appCode}</div>}*/}
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseForm}>
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
        </div>
    );
}

export default Formpartner;