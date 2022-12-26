import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import * as AppService from "../../services/AppService"
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ModalApp = ({show, handleCancelForm, handleCloseModal, data, act}) => {
    const [showModal, setShowModal] = useState(show)
    const [isLoading, setIsLoading] = useState(false)
    const [titleModal, setTitleModal] = useState(show)
    useEffect(() => {
        setShowModal(show);
        if (act === "lock") {
            setTitleModal("Bạn có muốn khoá ứng dụng này?");
        } else if (act === "unlock") {
            setTitleModal("Bạn có muốn mở khoá ứng dụng này?");
        } else if (act === "delete") {
            setTitleModal("Bạn có muốn xoá ứng dụng này?");
        }
        setIsLoading(!show);
    }, [show])

    function handleCancel() {
        handleCancelForm();
    }

    const handleModal = async () => {
        setIsLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        };
        try {
            if (act === "lock") {
                AppService.lockApp(data.code, config).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Khoá ứng dụng thành công")
                    }
                })
            } else if (act === "unlock") {
                AppService.unlockApp(data.code, config).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Mở khoá ứng dụng thành công")
                    }
                })
            } else if (act === "delete") {
                AppService.deleteApp(data.code, config).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Xoá ứng dụng thành công")
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
                <Modal show={showModal} onHide={handleCancel}>
                    <Modal.Header>
                        <Modal.Title>{titleModal}</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" onClick={handleCancel}
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCancel}>
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

export default ModalApp;