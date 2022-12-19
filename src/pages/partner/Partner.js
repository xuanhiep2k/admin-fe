import React, {useEffect, useState} from 'react';
import * as PartnerService from "../../services/PartnerService";
import FormPartner from "../../components/form/FormPartner";

function Partner() {
    const [partners, setPartners] = useState([])
    let [partner, setPartner] = useState({
        "code": "",
        "name": "",
        "description": "",
        "sizeRole": "",
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
    const getAllParners = () => {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        };
        try {
            PartnerService.getAllPartners(partner, config).then(response => {
                setPartners(response.data.data.content)
            })
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const handleClose = () => {
        setShowModal(false);
        partner = {
            "code": "",
            "name": "",
            "description": "",
            "sizeRole": "",
            "pageNumber": 0,
            "pageSize": 5,
            "sortDirection": "ASC",
            "sortBy": "createdDate"
        }
        getAllParners();
    };


    const handleShowModal = (e, partner, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setPartner(partner)
        setShowModal(true);
    }

    useEffect(() => {
        getAllParners();
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
            // const {data} = await axios.get("/api/partner/search", config);
            // setPartners([...data.data.content])
            // setTotalPages(data.data.totalPages)
            // setTotalElements(data.data.totalElements)
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const handleDeletepartner = async (e, id) => {
        e.preventDefault();

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            }
        };

        try {
            // await axios.delete("/api/partner/deletepartner/" + id, config);
            alert("Xoá khách hàng thành công")
            window.location.reload()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    return (
        <div className="searchpartner">

            {/*Form add and update car*/}
            <FormPartner show={showModal} handleClose={handleClose} data={partner} act={act}/>

            <div className="nav-table">
                <div className="text-manager">
                    <i className="bi bi-layers"/>
                    QUẢN LÝ ĐỐI TÁC
                </div>
                <div className="btn-addpartner">
                    <a href="/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => handleShowModal(e, partner, "add")}>
                        <i className="bi bi-plus"/>Thêm mới</a>
                </div>
            </div>

            {/*form search partners*/}
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

            {/*Table show list partners*/}
            <table className="table table-bordered table-hover">
                <thead>
                <tr className="table-primary text-center">
                    <th scope="col">#</th>
                    <th scope="col">Mã</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Số lượng quyền</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức năng</th>
                </tr>
                </thead>

                <tbody>
                {partners.length ?
                    (partners.map((partner, index) => (
                        <tr className="text-center" key={partner.code}>
                            <th scope="row">{index + 1}</th>
                            <td>{partner.code}</td>
                            <td>{partner.name}</td>
                            <td>{partner.sizeRole}</td>
                            <td>{partner.description}</td>
                            < td
                                style={partner.status === "ACTIVE" ? {"color": "blue"} : {"color": "red"}}>{partner.status}</td>
                            <td>
                                <a href="/#" className="btn btn-primary btn-icon btn-sm" title="Cập nhật khách hàng"
                                   onClick={(e) => handleShowModal(e, partner, "update")}>
                                    <i className="bi bi-pencil-fill"/>
                                </a>
                                <a href="/#" className="btn btn-danger btn-icon btn-sm" title="Xoá khách hàng"
                                   onClick={(e) => handleDeletepartner(e, partner.id)}>
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

export default Partner;