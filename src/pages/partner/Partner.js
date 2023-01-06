import "./partner.css";
import React, { useEffect, useState } from "react";
import FormPartner from "../../components/form/FormPartner";
import ModalPartner from "../../components/modal/ModalPartner";
import * as model from "../../components/model/ModelPartner";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { checkPermission } from "../../redux/checkPermission";
//import Actions
import { getALlPartners } from "../../redux/actions/partnerAction";
import { getAuth as getIsAuth } from "../../redux/actions/authAction";

function Partner() {
  const dispatch = useDispatch();
  const { loading, error, partners, totalElements, totalPages } = useSelector((state) => (state.getPartners));
  const { isAuth } = useSelector((state) => state.getAuth);
  let [partner, setPartner] = useState(model.Partner);
  const statusList = ["ACTIVE", "LOCKED"];
  const [active, setActive] = useState(1);
  const number = [];
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [act, setAct] = useState("");
  const [isPermission, setIsPermission] = useState();

  useEffect(() => {
    checkPermission().then(res => {
      setIsPermission(res);
    });
    getAllParners();
  }, [setIsPermission, dispatch]);

  // set number page
  for (let i = 1; i <= totalPages; i++) {
    number.push(i);
  }
  const getAllParners = () => {
    partner.status = "";
    setPartner(partner);
    dispatch(getALlPartners(partner));
    dispatch(getIsAuth);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    partner = model.Partner;
    setPartner(partner);
    getAllParners();
  };

  const handleCancelFrom = () => {
    setShowForm(false);
    setShowModal(false);
    partner = model.Partner;
    setPartner(partner);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    partner = model.Partner;
    setPartner(partner);
    getAllParners();
  };

  const handleShowForm = (e, partner, isAct) => {
    e.preventDefault();
    setAct(isAct);
    setPartner(partner);
    setShowForm(true);
  };

  const paginate = (e, i) => {
    e.preventDefault();
    partner.pageNumber = i - 1;
    setActive(i);
    getAllParners();
  };

  const handleShowModal = (e, partner, isAct) => {
    e.preventDefault();
    setAct(isAct);
    setPartner(partner);
    setShowModal(true);
  };

  const reload = (e) => {
    e.preventDefault();
    getAllParners();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner(partner => ({
      ...partner,
      [name]: value ? value : ""
    }));
  };

  function onSubmitSearch(e) {
    e.preventDefault();
    paginate(e, 1);
  }

  const handleCancel = () => {
    document.getElementById("myFormRef").reset();
    setPartner(model.Partner);
  };

  return (
    <div className="searchPartner">
      <Navbar title={"QUẢN LÝ ĐỐI TÁC"} />
      {/*Form add and update car*/}
      <FormPartner show={showForm} handleCancelFrom={handleCancelFrom} handleCloseForm={handleCloseForm}
                   data={partner} act={act} />

      {/*Modal*/}
      <ModalPartner show={showModal} handleCloseModal={handleCloseModal} data={partner} act={act} />

      {/*form search partners*/}
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
        <div className="btn-addpartner">
          <a href="!/#" className="btn btn-brand btn-elevate"
             onClick={(e) => reload(e)}>
            <i className="bi bi-arrow-clockwise" />Cập nhật</a>
        </div>

        {isAuth && isAuth.length && isAuth.includes("partner_create") &&
        <div className="btn-addpartner">
          <a href="/#" className="btn btn-brand btn-elevate"
             onClick={(e) => handleShowForm(e, partner, "add")}>
            <i className="bi bi-plus" />Thêm mới</a>
        </div>}

      </div>
      {/*Table show list partners*/}
      <table className="table table-bordered table-hover">
        <thead>
        <tr className="table-primary text-center">
          <th scope="col">#</th>
          <th scope="col">Mã đối tác</th>
          <th scope="col">Tên đối tác</th>
          <th scope="col">Số lượng quyền quản lý</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Chức năng</th>
        </tr>
        </thead>

        <tbody>
        {partners.length && !loading ?
          (partners.map((partner, index) => (
            <tr className="text-center" key={partner.code}>
              <th scope="row">{index + 1}</th>
              <td>{partner.code}</td>
              <td>{partner.name}</td>
              <td>{partner.sizeRole}</td>
              <td>{partner.description}</td>
              < td>
              <span style={partner.status === "ACTIVE" ? {
                "color": "blue", "fontWeight": "bold"
              } : { "color": "red", "fontWeight": "bold" }}>{partner.status}</span>
              </td>
              <td>
                {partner.status === "ACTIVE" ?
                  <div className="list-user-action">
                    {isAuth && isAuth.length && isAuth.includes("partner_update") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-primary" title="Cập nhật đối tác"
                       onClick={(e) => handleShowForm(e, partner, "update")}>
                      <i className="bi bi-pencil-fill" />
                    </a>}
                    {isAuth && isAuth.length && isAuth.includes("partner_lock") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-warning" title="Khoá đối tác"
                       onClick={(e) => handleShowModal(e, partner, "lock")}>
                      <i className="bi bi-lock" />
                    </a>}
                  </div> :
                  <div className="align-items-center justify-content-center list-user-action">
                    {isAuth && isAuth.length && isAuth.includes("partner_unlock") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-warning"
                       title="Mở khoá đối tác"
                       onClick={(e) => handleShowModal(e, partner, "unlock")}>
                      <i className="bi bi-unlock" />
                    </a>}
                    {isAuth && isAuth.length && isAuth.includes("partner_delete") &&
                    <a href="/#" className="mb-1 mr-1 text-bg-danger" title="Xoá đối tác"
                       onClick={(e) => handleShowModal(e, partner, "delete")}>
                      <i className="bi bi-trash" />
                    </a>}
                  </div>}
              </td>
            </tr>
          ))) : ""}
        {partners.length === 0 && !loading ? (<tr className="no-search">
          <td colSpan="8" className="text-center">
            Không có đối tác tìm thấy
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

export default Partner;