import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import * as PartnerService from "../../services/PartnerService"
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ModalPartner = ({show, handleCloseModal, data, act}) => {
    const [showModal, setShowModal] = useState(show)
    const [isLoading, setIsLoading] = useState(false)
    const [titleModal, setTitleModal] = useState(show)
    useEffect(() => {
        setShowModal(show);
        if (act === "lock") {
            setTitleModal("Bạn có muốn khoá đối tác này?");
        } else if (act === "unlock") {
            setTitleModal("Bạn có muốn mở khoá đối tác này?");
        } else if (act === "delete") {
            setTitleModal("Bạn có muốn xoá đối tác này?");
        }
        setIsLoading(!show);
    }, [show])
    const handleModal = async () => {
        setIsLoading(true);
        try {
            if (act === "lock") {
                PartnerService.lockPartner(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Khoá đối tác thành công")
                    }
                })
            } else if (act === "unlock") {
                PartnerService.unlockPartner(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Mở khoá đối tác thành công")
                    }
                })
            } else if (act === "delete") {
                PartnerService.deletePartner(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Xoá đối tác thành công")
                    }
                })
            }
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }
    return (
        <div>
            <>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title>{titleModal}</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" onClick={handleCloseModal}
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseModal}>
                            Huỷ
                        </Button>

                        <Button className="btn btn-primary" disabled={isLoading} onClick={handleModal}>
                            {isLoading ? <span className="spinner-border spinner-border-sm" role="status"
                                               aria-hidden="true"/> : ""}
                            <span> Xác nhận</span>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <NotificationContainer/>
        </div>
    );
}

export default ModalPartner;