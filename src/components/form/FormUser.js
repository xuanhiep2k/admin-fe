import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

const Formpartner = ({show, handleClose, data, act}) => {
    const [showForm, setShowForm] = useState(show)
    const [partner, setPartner] = useState({
        "name": "",
        "address": "",
        "tel": "",
        "note": "",
    });

    useEffect(() => {
        setPartner({
            "id": data ? data.id : "",
            "name": data ? data.name : "",
            "address": data ? data.address : "",
            "tel": data ? data.tel : "",
            "note": data ? data.note : "",
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

    const handleForm = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        };
        try {
            if (act === "add") {
                const {data} = await axios.post("/api/partner/add", partner, config)
                if (data.status === "ok") {
                    alert("Thêm khách hàng thành công")
                    window.location.reload()
                }
            } else if (act === "update") {
                const {data} = await axios.put("/api/partner/updatepartner/" + partner.id, partner, config)
                if (data.status === "ok") {
                    alert("Cập nhật khách hàng thành công")
                    window.location.reload()
                }
            }
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }
    return (
        <div>
            <>
                <Modal show={showForm} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Nhập thông tin khách hàng</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" onClick={handleClose}
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nhập tên khách hàng:</Form.Label>
                                <Form.Control type="text" placeholder="Tên khách hàng"
                                              name="name"
                                              onChange={onChange}
                                              value={partner.name}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Nhập địa chỉ:</Form.Label>
                                <Form.Control type="text" placeholder="Địa chỉ"
                                              onChange={onChange}
                                              name="address"
                                              value={partner.address}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTel">
                                <Form.Label>Nhập số điện thoại:</Form.Label>
                                <Form.Control type="text" placeholder="Số điện thoại"
                                              name="tel"
                                              onChange={onChange}
                                              value={partner.tel}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNote">
                                <Form.Label>Nhập ghi chú:</Form.Label>
                                <Form.Control type="text" placeholder="Ghi chú"
                                              name="note"
                                              onChange={onChange}
                                              value={partner.note}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Huỷ
                        </Button>
                        {act === "add" ? (<Button variant="primary" onClick={handleForm}>
                            Thêm
                        </Button>) : (
                            <Button variant="primary" onClick={handleForm}>
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