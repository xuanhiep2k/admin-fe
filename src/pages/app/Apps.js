import "./apps.css";
import React, { useEffect, useState } from "react";
import * as model from "../../components/model/ModelApp";
import Navbar from "../../components/navbar/Navbar";
import FormApp from "../../components/form/FormApp";
import ModalApp from "../../components/modal/ModalApp";
import { useDispatch, useSelector } from "react-redux";
import { getALlApps } from "../../redux/actions/appAction";

function Apps() {
  const dispatch = useDispatch();
  const { loading, error, apps, totalElements, totalPages } = useSelector((state) => (state.getApps));
  const { isAuth } = useSelector((state) => state.getAuth);
  let [app, setApp] = useState(model.App);
  const statusList = ["ACTIVE", "LOCKED"];
  const [active, setActive] = useState(1);
  const number = [];
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [act, setAct] = useState("");

  useEffect(() => {
    getAllApps();
  }, []);
  // set number page
  for (let i = 1; i <= totalPages; i++) {
    number.push(i);
  }
  const getAllApps = () => {
    app.status = "";
    dispatch(getALlApps(app));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    app = model.App;
    setApp(app);
    getAllApps();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    app = model.App;
    setApp(app);
    getAllApps();
  };


  const handleShowForm = (e, app, isAct) => {
    e.preventDefault();
    setAct(isAct);
    setApp(app);
    setShowForm(true);
  };

  const paginate = (e, i) => {
    e.preventDefault();
    app.pageNumber = i - 1;
    setActive(i);
    getAllApps();
  };

  const handleShowModal = (e, app, isAct) => {
    e.preventDefault();
    setAct(isAct);
    setApp(app);
    setShowModal(true);
  };

  const reload = (e) => {
    e.preventDefault();
    getAllApps();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApp(app => ({
      ...app,
      [name]: value ? value : ""
    }));
  };

  function onSubmitSearch(e) {
    e.preventDefault();
    paginate(e, 1);
  }

  const handleCancel = () => {
    document.getElementById("myFormRef").reset();
    setApp(model.App);
  };

  const handleCancelForm = () => {
    app = model.App;
    setApp(app);
    setShowModal(false);
    setShowForm(false);
  };
  return (
    <div className="searchApp">
      <Navbar title={"QUẢN LÝ ỨNG DỤNG"} />
      {/*Form add and update car*/}
      <FormApp show={showForm} handleCancelForm={handleCancelForm} handleCloseForm={handleCloseForm} data={app}
               act={act} />

      {/*Modal*/}
      <ModalApp show={showModal} handleCancelForm={handleCancelForm} handleCloseModal={handleCloseModal}
                data={app} act={act} />

      {/*form search apps*/}
      <form id={"myFormRef"} onSubmit={(e) => onSubmitSearch(e)}>
        <div className="row">
          <div className="col">
            <label htmlFor="code" className="form-label">Mã</label>
            <input type="text" onChange={handleChange} name="code" className="form-control"
                   placeholder="Nhập mã" />
          </div>
          <div className="col">
            <label htmlFor="name" className="form-label">Tên</label>
            <input type="text" onChange={handleChange} name="name" className="form-control"
                   placeholder="Nhập tên" />
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
          <button className="btn btn-primary my-sm-2" style={{ "marginLeft": "5px" }}
                  type="submit">Tìm kiếm
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-between">
        <div className="btn-addApp">
          <a href="!/#" className="btn btn-brand btn-elevate"
             onClick={(e) => reload(e)}>
            <i className="bi bi-arrow-clockwise" />Cập nhật</a>
        </div>
        <div className="btn-addApp">
          {isAuth && isAuth.length && isAuth.includes("app_create") &&
          <a href="/#" className="btn btn-brand btn-elevate"
             onClick={(e) => handleShowForm(e, app, "add")}>
            <i className="bi bi-plus" />Thêm mới</a>}
        </div>
      </div>
      {/*Table show list apps*/}
      <table className="table table-bordered table-hover">
        <thead>
        <tr className="table-primary text-center">
          <th scope="col">#</th>
          <th scope="col">Mã ứng dụng</th>
          <th scope="col">Tên ứng dụng</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Chức năng</th>
        </tr>
        </thead>

        <tbody>

        {apps.length && !loading ?
          (apps.map((app, index) => (
            <tr className="text-center" key={app.code}>
              <th scope="row">{index + 1}</th>
              <td>{app.code}</td>
              <td>{app.name}</td>
              <td>{app.description}</td>
              < td>
                   <span style={app.status === "ACTIVE" ? {
                     "color": "blue", "fontWeight": "bold"
                   } : { "color": "red", "fontWeight": "bold" }}>{app.status}</span>
              </td>
              <td>
                {app.status === "ACTIVE" ?
                  <div className="list-user-action">
                    {isAuth && isAuth.length && isAuth.includes("app_update") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-primary" title="Cập nhật chức năng"
                       onClick={(e) => handleShowForm(e, app, "update")}>
                      <i className="bi bi-pencil-fill" />
                    </a>}
                    {isAuth && isAuth.length && isAuth.includes("app_lock") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-warning" title="Khoá chức năng"
                       onClick={(e) => handleShowModal(e, app, "lock")}>
                      <i className="bi bi-lock" />
                    </a>}
                  </div> :
                  <div className="align-items-center justify-content-center list-user-action">
                    {isAuth && isAuth.length && isAuth.includes("app_unlock") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-warning"
                       title="Mở khoá chức năng"
                       onClick={(e) => handleShowModal(e, app, "unlock")}>
                      <i className="bi bi-unlock" />
                    </a>}
                    {isAuth && isAuth.length && isAuth.includes("app_delete") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-danger" title="Xoá chức năng"
                       onClick={(e) => handleShowModal(e, app, "delete")}>
                      <i className="bi bi-trash" />
                    </a>}
                  </div>}
              </td>
            </tr>
          ))) : ""}
        {apps.length === 0 && !loading ? (<tr className="no-search">
          <td colSpan="6" className="text-center">
            Không có ứng dụng tìm thấy
          </td>
        </tr>) : ""}
        </tbody>
      </table>
      {loading ? (
        <span className="spinner-border spinner-border-sm"
              role="status" aria-hidden="true" />) : ""}
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

export default Apps;