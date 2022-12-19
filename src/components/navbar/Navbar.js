import './navbar.css'
import React from "react";

const Navbar = () => {
    return (
        <div className="b-nav-divider">
            <div className="support">
                <i className="bi bi-telephone"/>
                Hỗ trợ: 0858.03.04.00
            </div>
            <div className="noti-info">
                <i className="bi bi-bell-fill"/>
                <i className="bi bi-calendar3-event-fill"/>
            </div>
        </div>
    )
}

export default Navbar;