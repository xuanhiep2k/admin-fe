import React, {useEffect, useState} from 'react';
import * as UserService from "../../services/UserService";
import FormUser from "../../components/form/FormUser";

function User() {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        "pageNumber": 0,
        "pageSize": 5,
        "sortDirection": "ASC",
        "sortBy": "createdDate"
    })
    const [totalElements, setTotalElements] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [active, setActive] = useState(1);
    const number = [];
    const [key, setKey] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [act, setAct] = useState("");

    // set number page
    for (let i = 1; i <= totalPages; i++) {
        number.push(i)
    }

    const handleClose = () => {
        setShowModal(false);
        setUser({
            "name": "",
            "address": "",
            "tel": "",
            "note": "",
        })
    };

    const handleShowModal = (e, user, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setUser(user)
        setShowModal(true);
    }

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        };
        try {
            UserService.getAllUsers(user, config).then(response => {
                setUsers(response.data.data.content)
            })
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }, [])

    const paginate = async (e, i) => {
        e.preventDefault();
        setActive(i)

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "key": key,
                "pageNumber": i - 1,
                "pageSize": 5,
                "sortDirection": "ASC",
                "sortBy": "name"
            }
        };

        try {
            // const {data} = await axios.get("/api/user/search", config);
            // setUsers([...data.data.content])
            // setTotalPages(data.data.totalPages)
            // setTotalElements(data.data.totalElements)
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const handleDeleteuser = async (e, id) => {
        e.preventDefault();

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            }
        };

        try {
            // await axios.delete("/api/user/deleteuser/" + id, config);
            alert("Xoá khách hàng thành công")
            window.location.reload()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    return (
        <div className="searchuser">

            {/*Form add and update car*/}
            <FormUser show={showModal} handleClose={handleClose} data={user} act={act}/>

            <div className="nav-table">
                <div className="text-manager">
                    <i className="bi bi-layers"/>
                    QUẢN LÝ NGƯỜI DÙNG
                </div>
                <div className="btn-adduser">
                    <a href="/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => handleShowModal(e, user, "add")}>
                        <i className="bi bi-plus"/>Thêm mới</a>
                </div>
            </div>

            {/*form search users*/}
            <div className="form-search">
                <form onSubmit={(e) => paginate(e, 1)} className="input-group mb-3">
                    <input className="form-control mr-sm-2" type="search"
                           placeholder="Tìm theo họ tên, địa chỉ, số điện thoại khách hàng..."
                           aria-label="Search"
                           onChange={(e) => setKey(e.target.value)} value={key}/>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Tìm kiếm</button>
                </form>
                <div className="refresh-page" onClick={() => window.location.reload()}>
                    <i className="bi bi-arrow-clockwise"> Cập nhật</i>
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
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức năng</th>
                </tr>
                </thead>

                <tbody>
                {users.length ?
                    (users.map((user, index) => (
                        <tr className="text-center" key={user.username}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.roles.map(res => res.concat(", "))}</td>
                            < td
                                style={user.status === "ACTIVE" ? {"color": "blue"} : {"color": "red"}}>{user.status}</td>
                            <td>
                                <a href="/#" className="btn btn-primary btn-icon btn-sm" title="Cập nhật khách hàng"
                                   onClick={(e) => handleShowModal(e, user, "update")}>
                                    <i className="bi bi-pencil-fill"/>
                                </a>
                                <a href="/#" className="btn btn-danger btn-icon btn-sm" title="Xoá khách hàng"
                                   onClick={(e) => handleDeleteuser(e, user.id)}>
                                    <i className="bi bi-trash-fill"/>
                                </a>
                            </td>
                        </tr>
                    ))) :
                    (<tr className="no-search">
                        <td colSpan="8" className="text-center">
                            Không có người dùng tìm thấy
                        </td>
                    </tr>)}
                </tbody>
            </table>

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