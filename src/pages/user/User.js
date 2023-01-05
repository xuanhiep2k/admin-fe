import React, {useEffect, useState} from 'react';
import * as UserService from "../../services/UserService";
import FormUser from "../../components/form/FormUser";
import * as model from "../../components/model/ModelUser";
import Navbar from "../../components/navbar/Navbar";

function User() {
    const [users, setUsers] = useState([])
    let [user, setUser] = useState(model.User);
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
        getAllUsers();
    }, []);

    // set number page
    for (let i = 1; i <= totalPages; i++) {
        number.push(i)
    }
    const handleCloseForm = () => {
        setShowForm(false);
        setIsLoading(true);
        user = model.User;
        setUser(user);
        getAllUsers();
    };
    const handleShowModal = (e, user, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setUser(user)
        setShowModal(true);
    }


    const handleCancelForm = () => {
        setShowForm(false);
        setShowModal(false);
        user = model.User;
        setUser(user);
    }

    const getAllUsers = () => {
        try {
            UserService.getAllUsers(user).then(response => {
                setUsers(response.data.data.content)
                setTotalElements(response.data.data.totalElements)
                setTotalPages(response.data.data.totalPages)
                setIsLoading(false)

            })
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const paginate = async (e, i) => {
        e.preventDefault();
        setActive(i)

    }

    const reload = (e) => {
        setIsLoading(true)
        e.preventDefault();
        getAllUsers();
    }

    function handleShowForm(e, user, isAct) {
        e.preventDefault()
        setAct(isAct)
        setUser(user)
        setShowForm(true);
    }

    return (
        <div className="searchuser">
            <Navbar title={"QUẢN LÝ NGƯỜI DÙNG"}/>
            {/*Form add and update car*/}
            <FormUser show={showForm} handleCancelForm={handleCancelForm} handleCloseForm={handleCloseForm} data={user}
                      act={act}/>
            {/*/!*form search users*!/*/}
            {/*<div className="form-search">*/}
            {/*    <form onSubmit={(e) => paginate(e, 1)} className="input-group mb-3">*/}
            {/*        <input className="form-control mr-sm-2" type="search"*/}
            {/*               placeholder="Tìm theo họ tên, địa chỉ, số điện thoại khách hàng..."*/}
            {/*               aria-label="Search"*/}
            {/*               onChange={(e) => setKey(e.target.value)} value={key}/>*/}
            {/*        <button className="btn btn-primary my-2 my-sm-0" type="submit">Tìm kiếm</button>*/}
            {/*    </form>*/}
            {/*    <div className="refresh-page" onClick={() => window.location.reload()}>*/}
            {/*        <i className="bi bi-arrow-clockwise"> Cập nhật</i>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="d-flex justify-content-between">
                <div className="btn-addpartner">
                    <a href="!/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => reload(e)}>
                        <i className="bi bi-arrow-clockwise"/>Cập nhật</a>
                </div>
                <div className="btn-addpartner">
                    <a href="/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => handleShowForm(e, user, "add")}>
                        <i className="bi bi-plus"/>Thêm mới</a>
                </div>
            </div>

            {/*Table show list users*/}
            <table className="table table-bordered table-hover">
                <thead>
                <tr className="table-primary text-center">
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Danh sách Role</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức năng</th>
                </tr>
                </thead>

                <tbody>
                {users.length && !isLoading ?
                    (users.map((user, index) => (
                        <tr className="text-center" key={user.username}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.roles.map(res => res.concat(", "))}</td>
                            < td>
                                <span style={user.status === "ACTIVE" ? {
                                    "color": "blue", "fontWeight": "bold"
                                } : {"color": "red", "fontWeight": "bold"}}>{user.status}</span>
                            </td>
                            <td>{user.avatar}</td>
                            <td>
                                {user.status === "ACTIVE" &&
                                <div className="list-user-action">
                                    <a href="/#" className="mb-1 mr-1 text-bg-primary" title="Cập nhật người dùng"
                                       onClick={(e) => handleShowForm(e, user, "update")}>
                                        <i className="bi bi-pencil-fill"/>
                                    </a>
                                    {user.username !== "admin" &&
                                    <a href="/#" className="mb-1 mr-1 text-bg-warning" title="Khoá người dùng"
                                       onClick={(e) => handleShowModal(e, user, "lock")}>
                                        <i className="bi bi-lock"/>
                                    </a>}
                                </div>}
                                {user.status !== "ACTIVE" &&
                                <div className="align-items-center justify-content-center list-user-action">
                                    <a href="/#" className="mb-1 mr-1 text-bg-warning"
                                       title="Mở khoá người dùng"
                                       onClick={(e) => handleShowModal(e, user, "unlock")}>
                                        <i className="bi bi-unlock"/>
                                    </a>
                                    {user.username !== "admin" &&
                                    <a href="/#" className="mb-1 mr-1 text-bg-danger" title="Xoá người dùng"
                                       onClick={(e) => handleShowModal(e, user, "delete")}>
                                        <i className="bi bi-trash"/>
                                    </a>}
                                </div>
                                }
                            </td>
                        </tr>
                    ))) : ""}
                {users.length === 0 && !isLoading ? (<tr className="no-search">
                    <td colSpan="8" className="text-center">
                        Không có người dùng tìm thấy
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

export default User;