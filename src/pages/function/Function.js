import "./function.css"
import React, {useEffect, useState} from 'react';
import * as FunctionService from "../../services/FunctionService";
import * as model from "../../components/model/ModelFunction"
import Navbar from "../../components/navbar/Navbar";
import FormFunction from "../../components/form/FormFunction";
import BootstrapTreeTable from 'bootstrap-react-treetable';
import ModalFunction from "../../components/modal/ModalFunction";
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";

function Function() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let [func, setFunc] = useState(model.Function);
    const [isLoading, setIsLoading] = useState(false);
    const statusList = ["ACTIVE", "LOCKED"];
    const [totalElements, setTotalElements] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [active, setActive] = useState(1);
    const number = [];
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [act, setAct] = useState("");
    const [getTree, setGetTree] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        getTreeNode();
    }, []);

    // set number page
    for (let i = 1; i <= totalPages; i++) {
        number.push(i)
    }

    const getTreeNode = () => {
        try {
            FunctionService.getTree(func).then(response => {
                setGetTree(response.data.data.content);
                setTotalElements(response.data.data.totalElements)
                setTotalPages(response.data.data.totalPages)
                setIsLoading(false)
            });
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const treeControls = {};

    const handleCloseForm = () => {
        setShowForm(false);
        setIsLoading(true)
        func = model.Function
        setFunc(func)
        getTreeNode();
    };

    const handleCancelForm = () => {
        func = model.Function
        setFunc(func)
        setShowModal(false);
        setShowForm(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setIsLoading(true)
        func = model.Function
        setFunc(func)
        getTreeNode();
    }

    const handleShowForm = (e, func, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setFunc(func)
        setShowForm(true);
    }

    const paginate = (e, i) => {
        e.preventDefault();
        setIsLoading(true)
        func.pageNumber = i - 1;
        setActive(i)
        getTreeNode();
    }

    const handleShowModal = (e, func, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setFunc(func);
        setShowModal(true);
    }

    const reload = (e) => {
        setIsLoading(true)
        e.preventDefault();
        getTreeNode();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFunc(func => ({
            ...func,
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
        setFunc(model.Function);
    }

    function actionRenderer(dataRow, dataField) {
        if (dataRow.data.status === "ACTIVE") {
            return (
                <div className="list-user-action">
                    <a href="/#" className="mb-1 mr-1 text-bg-primary" title="Thêm mới chức năng con"
                       onClick={(e) => handleShowForm(e, dataRow.data, "addChild")}>
                        <i className="bi bi-plus-lg"/>
                    </a>
                    <a href="/#" className="mb-1 mr-1 text-bg-primary" title="Cập nhật chức năng"
                       onClick={(e) => handleShowForm(e, dataRow.data, "update")}>
                        <i className="bi bi-pencil-fill"/>
                    </a>
                    <a href="/#" className="mb-1 mr-1 text-bg-warning" title="Khoá chức năng"
                       onClick={(e) => handleShowModal(e, dataRow.data, "lock")}>
                        <i className="bi bi-lock"/>
                    </a>
                </div>
            )

        } else {
            return (
                <div className="align-items-center justify-content-center list-user-action">
                    <a href="/#" className="mb-1 mr-1 text-bg-warning"
                       title="Mở khoá chức năng"
                       onClick={(e) => handleShowModal(e, dataRow.data, "unlock")}>
                        <i className="bi bi-unlock"/>
                    </a>
                    <a href="/#" className="mb-1 mr-1 text-bg-danger" title="Xoá chức năng"
                       onClick={(e) => handleShowModal(e, dataRow.data, "delete")}>
                        <i className="bi bi-trash"/>
                    </a>
                </div>
            )
        }
    }

    let statusRenderer = function (dataRow, dataField) {
        if (dataRow.data.status === "ACTIVE") {
            return (
                <span style={{"color": "blue"}} dangerouslySetInnerHTML={{__html: dataRow.data[dataField]}}
                />
            );
        } else {
            return (
                <span style={{"color": "red"}} dangerouslySetInnerHTML={{__html: dataRow.data[dataField]}}
                />
            );
        }
    };

    const treeColumns = [
        {
            dataField: 'name',
            heading: 'Tên chức năng',
        },
        {
            dataField: 'code',
            heading: 'Mã chức năng',
        },
        {
            dataField: 'appCode',
            heading: 'Ứng dụng',
        },
        {
            dataField: 'type',
            heading: 'Loại',
        },
        {
            dataField: 'path',
            heading: 'Đường dẫn',
        },
        {
            dataField: 'icon',
            heading: 'Icon',
        },
        {
            dataField: 'description',
            heading: 'Mô tả',
        },
        {
            dataField: 'status',
            heading: 'Trạng thái',
            renderer: statusRenderer
        },
        {
            dataField: 'action',
            heading: 'Chức năng',
            renderer: actionRenderer
        },
    ];
    return (
        <div className="searchfunc">
            <Navbar title={"QUẢN LÝ CHỨC NĂNG"}/>
            {/*Form add and update car*/}
            <FormFunction show={showForm} handleCancelForm={handleCancelForm} handleCloseForm={handleCloseForm}
                          data={func} act={act}/>

            {/*Modal*/}
            <ModalFunction show={showModal} handleCancelForm={handleCancelForm} handleCloseModal={handleCloseModal}
                           data={func} act={act}/>

            {/*form search functions*/}
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
                <div className="btn-addfunc">
                    <a href="!/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => reload(e)}>
                        <i className="bi bi-arrow-clockwise"/>Cập nhật</a>
                </div>
                <div className="btn-addfunc">
                    <a href="/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => handleShowForm(e, func, "add")}>
                        <i className="bi bi-plus"/>Thêm mới</a>
                </div>
            </div>

            {/*Table show list functions*/}
            {!isLoading && getTree.length ? (
                <BootstrapTreeTable columns={treeColumns} tableData={getTree} control={treeControls}/>
            ) : (
                <>
                    <BootstrapTreeTable columns={treeColumns} tableData={[]} control={treeControls}/>
                    <span className="spinner-border spinner-border-sm"
                          role="status" aria-hidden="true"/>
                </>
            )}

            {getTree.length === 0 && !isLoading && (
                <div className="text-center">Không có chức năng tìm thấy</div>
            )}

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

export default Function;