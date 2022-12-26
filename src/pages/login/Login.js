import './login.css'
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {FacebookOutlined, GitHub, Google} from "@mui/icons-material";
import * as LoginService from "../../services/LoginService";
import {NotificationContainer, NotificationManager} from "react-notifications";
import * as rules from '../../components/validation/ValidatorLogin'
import Validator from "../../utils/Validator";
import {Button} from "react-bootstrap";

function Login() {
    document.body.id = 'login';
    const negative = useNavigate();
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const validator = new Validator(rules);
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            negative("/");
        }
    }, [negative]);

    const handleLogin = props => {
        const user = {username, password};
        props.preventDefault();
        if (Object.keys(validator.validate(user)).length !== 0) {
            setErrors(validator.validate(user))

        } else {
            setIsLoading(true);
            try {
                LoginService.login({username, password}).then(response => {
                    localStorage.setItem("accessToken", response.data.data.accessToken)
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                    setErrors({});
                    NotificationManager.success("Đăng nhập thành công");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }, errors => {
                    setIsLoading(false);
                    NotificationManager.error(errors.response.data.message);
                });
            } catch (error) {
                alert('Mật khẩu không đúng');
                setTimeout(() => {
                }, 5000);
            }
        }
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    const OtherMethods = () => (
        <div id="alternativeLogin">
            <label>Or sign in with:</label>
            <div id="iconGroup">
                <FacebookIcon/>
                <GitHubIcon/>
                <GoogleIcon/>

            </div>
        </div>
    );

    const FacebookIcon = () => (
        <a href="#" id="facebookIcon"><FacebookOutlined/></a>
    );
    const GitHubIcon = () => (
        <a href="#" id="githubIcon"><GitHub/></a>
    );
    const GoogleIcon = () => (
        <a href="#" id="googleIcon"><Google/></a>
    );
    return (
        <div id="loginform">
            <FormHeader title="Hệ thống phân quyền"/>
            <div className="row-login">
                <label>Username</label>
                <input id="username" placeholder="Nhập username" type="text"
                       onChange={(e) => setUsername(e.target.value)} value={username} tabIndex={1}/>
                <div className="validation" style={{"color": "red"}}>{errors.username}</div>

                <label>Password</label>
                <input id="username" placeholder="Nhập password" type="password"
                       onChange={(e) => setPassword(e.target.value)} value={password} tabIndex={2}/>
                <div className="validation" style={{"color": "red"}}>{errors.password}</div>

                <div className="justify-content-between">
                    <small><a href="/">Quên mật khẩu?</a></small>
                    <small><a style={{"marginLeft": "70px"}} href="/register">Đăng ký ngay</a></small>
                </div>
            </div>

            <div id="button" className="row-login">
                <button disabled={isLoading} onClick={handleLogin}>
                    {isLoading ? <span className="spinner-border spinner-border-sm" role="status"
                                       aria-hidden="true"/> : ""} Đăng nhập
                </button>
            </div>
            <OtherMethods/>
            <NotificationContainer/>
        </div>
    )
}

export default Login