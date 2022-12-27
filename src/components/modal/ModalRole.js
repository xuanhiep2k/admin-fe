import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import * as RoleService from "../../services/RoleService"
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ModalRole = ({show,  handleCancelForm,handleCloseModal, data, act}) => {
    const [showModal, setShowModal] = useState(show)
    const [isLoading, setIsLoading] = useState(false)
    const [titleModal, setTitleModal] = useState(show)
    useEffect(() => {
        setShowModal(show);
        if (act === "lock") {
            setTitleModal("Bạn có muốn khoá quyền này?");
        } else if (act === "unlock") {
            setTitleModal("Bạn có muốn mở khoá quyền này?");
        } else if (act === "delete") {
            setTitleModal("Bạn có muốn xoá quyền này?");
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
                RoleService.lockRole(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Khoá quyền thành công")
                    }
                })
            } else if (act === "unlock") {
                RoleService.unlockRole(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Mở khoá quyền thành công")
                    }
                })
            } else if (act === "delete") {
                RoleService.deleteRole(data.code).then(response => {
                    if (response.data.code === "200") {
                        handleCloseModal();
                        NotificationManager.success("Xoá quyền thành công")
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

export default ModalRole;