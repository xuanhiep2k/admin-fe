import "./role.css"
import React, {useEffect, useState} from 'react';
import * as RoleService from "../../services/RoleService";
import FormRole from "../../components/form/FormRole";
import ModalRole from "../../components/modal/ModalRole";
import * as model from "../../components/model/ModelRole"
import Navbar from "../../components/navbar/Navbar";

function Role() {
    const [roles, setRoles] = useState([])
    let [role, setRole] = useState(model.Role);
    const [isLoading, setIsLoading] = useState(false);
    const statusList = ["ACTIVE", "LOCKED"];
    const [totalElements, setTotalElements] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [active, setActive] = useState(1);
    const number = [];
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [act, setAct] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getAllRoles();
    }, []);

    // set number page
    for (let i = 1; i <= totalPages; i++) {
        number.push(i)
    }
    const getAllRoles = () => {
        role.status = "";
        setRole(role);
        try {
            RoleService.getAllRoles(role).then(response => {
                setRoles(response.data.data.content)
                setTotalElements(response.data.data.totalElements)
                setTotalPages(response.data.data.totalPages)
                setIsLoading(false)
            })
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const handleCloseForm = () => {
        setShowForm(false);
        setIsLoading(true);
        role = model.Role;
        setRole(role);
        getAllRoles();
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setShowModal(false);
        role = model.Role;
        setRole(role);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setIsLoading(true);
        role = model.Role
        setRole(role)
        getAllRoles();
    }

    const handleShowForm = (e, role, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setRole(role)
        setShowForm(true);
    }

    const paginate = (e, i) => {
        e.preventDefault();
        role.pageNumber = i - 1;
        setActive(i)
        setIsLoading(true)
        getAllRoles();
    }

    const handleShowModal = (e, role, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setRole(role);
        setShowModal(true);
    }

    const reload = (e) => {
        setIsLoading(true)
        e.preventDefault();
        getAllRoles();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRole(role => ({
            ...role,
            [name]: value ? value : ""
        }))
    }

    function onSubmitSearch(e) {
        e.preventDefault();
        setIsLoading(true);
        paginate(e, 1);
    }

    const handleCancel = () => {
        document.getElementById("myFormRef").reset();
        setRole(model.Role);
    }

    return (
        <div className="searchrole">
            <Navbar title={"QUẢN LÝ QUYỀN"}/>
            {/*Form add and update car*/}
            <FormRole show={showForm} handleCancelForm={handleCancelForm} handleCloseForm={handleCloseForm}
                      data={role} act={act}/>

            {/*/!*Modal*!/*/}
            <ModalRole show={showModal} handleCancelForm={handleCancelForm} handleCloseModal={handleCloseModal}
                       data={role} act={act}/>

            {/*form search roles*/}
            <form id={"myFormRef"} onSubmit={(e) => onSubmitSearch(e)}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="code" className="form-label">Mã</label>
                        <input type="text" onChange={handleChange} name="code" className="form-control"
                               placeholder="Nhập mã"/>
                    </div>
                    <div className="col">
                        <label htmlFor="name" className="form-label">Tên</label>
                        <input type="text" onChange={handleChange} name="name" className="form-control"
                               placeholder="Nhập tên"/>
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="status">Trạng thái</label>
                        <select className="form-control" name="status" onChange={handleChange}>
                            <option>--- Chọn ---</option>
                            {statusList.map(status => (
                                <option key={status} defaultValue={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <button onClick={handleCancel} className="btn btn-danger my-sm-2">Huỷ</button>
                    <button className="btn btn-primary my-sm-2" style={{"marginLeft": "5px"}}
                            type="submit">Tìm kiếm
                    </button>
                </div>
            </form>
            <div className="d-flex justify-content-between">
                <div className="btn-addrole">
                    <a href="!/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => reload(e)}>
                        <i className="bi bi-arrow-clockwise"/>Cập nhật</a>
                </div>
                <div className="btn-addrole">
                    <a href="/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => handleShowForm(e, role, "add")}>
                        <i className="bi bi-plus"/>Thêm mới</a>
                </div>
            </div>
            {/*Table show list roles*/}
            <table className="table table-bordered table-hover">
                <thead>
                <tr className="table-primary text-center">
                    <th scope="col">#</th>
                    <th scope="col">Mã quyền</th>
                    <th scope="col">Tên quyền</th>
                    <th scope="col">Đối tác</th>
                    <th style={{"width": "30%"}} scope="col">Danh sách chức năng</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức năng</th>
                </tr>
                </thead>

                <tbody>
                {roles.length && !isLoading ?
                    (roles.map((role, index) => (
                        <tr style={{"vertical-align": "middle"}} className="text-center" key={role.code}>
                            <th scope="row">{index + 1}</th>
                            <td>{role.code}</td>
                            <td>{role.name}</td>
                            <td>{role.partnerCode}</td>
                            <td>{role.functionNames.map(func => {
                                return func + ", "
                            })}</td>
                            <td>{role.description}</td>
                            < td>
                                <span style={role.status === "ACTIVE" ? {
                                    "color": "blue", "fontWeight": "bold"
                                } : {"color": "red", "fontWeight": "bold"}}>{role.status}</span>
                            </td>
                            <td>
                                {role.status === "ACTIVE" && role.code !== "ADMIN" &&
                                <div className="list-user-action">
                                    <a href="/#" className="mb-1 mr-1 text-bg-primary" title="Cập nhật quyền"
                                       onClick={(e) => handleShowForm(e, role, "update")}>
                                        <i className="bi bi-pencil-fill"/>
                                    </a>
                                    <a href="/#" className="mb-1 mr-1 text-bg-warning" title="Khoá quyền"
                                       onClick={(e) => handleShowModal(e, role, "lock")}>
                                        <i className="bi bi-lock"/>
                                    </a>
                                </div>}
                                {role.status !== "ACTIVE" && role.code !== "ADMIN" &&
                                <div className="align-items-center justify-content-center list-user-action">
                                    <a href="/#" className="mb-1 mr-1 text-bg-warning"
                                       title="Mở khoá quyền"
                                       onClick={(e) => handleShowModal(e, role, "unlock")}>
                                        <i className="bi bi-unlock"/>
                                    </a>
                                    <a href="/#" className="mb-1 mr-1 text-bg-danger" title="Xoá quyền"
                                       onClick={(e) => handleShowModal(e, role, "delete")}>
                                        <i className="bi bi-trash"/>
                                    </a>
                                </div>}
                            </td>
                        </tr>
                    ))) : ""}
                {roles.length === 0 && !isLoading ? (<tr className="no-search">
                    <td colSpan="8" className="text-center">
                        Không có quyền tìm thấy
                    </td>
                </tr>) : ""}
                </tbody>
            </table>
            {isLoading ? (
                <span className="spinner-border spinner-border-sm"
                      role="status" aria-hidden="true"/>) : ""}
            (Trang {active}/{totalPages}) (Tổng {totalElements} kết quả)
            {/*pagination*/}
            <div className="paging-custom">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li
                            className={"page-item" + (active === 1 ? " disabled" : "")}>
                            <a onClick={(e) => paginate(e, active - 1)}
                               className="page-link" href="/#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {number.map(i => (
                            <li key={i} onClick={(e) => paginate(e, i)}
                                className={"page-item" + (i === active ? " active" : "")}>
                                <a className="page-link" href="!#">{i}</a>
                            </li>
                        ))}
                        <li
                            className={"page-item" + (active === totalPages ? " disabled" : "")}>
                            <a onClick={(e) => paginate(e, active + 1)}
                               className="page-link" href="/!#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );
}

export default Role;