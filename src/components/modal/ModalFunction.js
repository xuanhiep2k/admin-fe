import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import * as FunctionService from "../../services/FunctionService"
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ModalFunction = ({show, handleCancelForm, handleCloseModal, data, act}) => {
    const [showModal, setShowModal] = useState(show)
    const [isLoading, setIsLoading] = useState(false)
    const [titleModal, setTitleModal] = useState(show)
    useEffect(() => {
        setShowModal(show);
        if (act === "lock") {
            setTitleModal("Bạn có muốn khoá chức năng này?");
        } else if (act === "unlock") {
            setTitleModal("Bạn có muốn mở khoá chức năng này?");
        } else if (act === "delete") {
            setTitleModal("Bạn có muốn xoá chức năng này?");
        }
        setIsLoading(!show);
    }, [show])

    function handleCancel() {
        handleCancelForm();
    }

    const handleModal = async () => {
        setIsLoading(true);
        try {
            if (act === "lock") {
                FunctionService.lockFunction(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Khoá chức năng thành công")
                    }
                }, errors => {
                    setIsLoading(false)
                    handleCloseModal();
                    NotificationManager.error(errors.response.data.message)
                })
            } else if (act === "unlock") {
                FunctionService.unlockFunction(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Mở khoá chức năng thành công")
                    }
                }, errors => {
                    setIsLoading(false)
                    handleCloseModal();
                    NotificationManager.error(errors.response.data.message)
                })
            } else if (act === "delete") {
                FunctionService.deleteFunction(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Xoá chức năng thành công")
                    }
                }, errors => {
                    setIsLoading(false)
                    handleCloseModal();
                    NotificationManager.error(errors.response.data.message)
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

export default ModalFunction;