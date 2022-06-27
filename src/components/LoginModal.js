import Modal from "./Modal"
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import loginApi from '../api/login'
import userApi from '../api/users'
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as GithubSvg } from '../svg/github.svg'

export default function LoginModal(props) {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    })
    const [errorMessage, setErrorMessage] = useState()
    const [loginMode, setLoginMode] = useState(true)
    const [registerMode, setRegisterMode] = useState(false)
    const [forgotMode, setForgotMode] = useState(false)

    const { fetchUserAndFavorite, setShowLoginModal } = useContext(UserContext)

    const nagivate = useNavigate()
    const { pathname } = useLocation()

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleLogin() {
        const { username, password } = formData
        if (!username || username.length === 0) {
            setErrorMessage("用户名不能位空")
            return
        } else if (!password || password.length === 0) {
            setErrorMessage("密码不能位空")
            return
        }

        loginApi.post("", {
            username: formData.username,
            password: formData.password
        })
            .then(res => localStorage.setItem("token", res.headers["authorization"]))
            .then(() => fetchUserAndFavorite())
            .then(() => navigate(0))
            .catch(e => {
                setErrorMessage("请输入正确的用户名/密码")
            })
    }

    function toForgot() {
        reset()
        setForgotMode(true)
    }

    function toRegister() {
        reset()
        setRegisterMode(true)
    }

    function toLogin() {
        reset()
        setLoginMode(true)
    }

    function reset() {
        setRegisterMode(false)
        setForgotMode(false)
        setLoginMode(false)
        setErrorMessage('')
        setFormData({
            username: '',
            password: '',
            email: ''
        })
    }

    function handleRegister() {
        var pattern = /^[a-zA-Z0-9._-]{4,14}$/g;
        if (!pattern.test(formData.username)) {
            setErrorMessage("用户名是由a～z的英文字母、0～9的数字、点、减号或下划线组成，长度为4～14个字符")
            return
        }

        pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
        if (!pattern.test(formData.email)) {
            setErrorMessage("电子邮件地址不合法")
            return
        }

        setErrorMessage("")
        userApi.post("/register", formData)
            .then(() => alert("注册成功"))
            .then(() => toLogin())
            .catch(e => {
                setErrorMessage(e.response.data.message)
            })
    }

    const oauthLogin = () => {
        localStorage.setItem("oauthRedirectPage",pathname)
        console.log(pathname)
        window.location.assign(
            `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URI}&scope=user`
        );

    }

    return (
        <Modal closeModal={() => setShowLoginModal(false)} width={"18em"} height={"auto"}>
            <div className="text-xs font-light text-gray-700">
                <div>
                    <svg className="h-10 w-10 fill-black inline-block" t="1649234406400" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3874"><path d="M443.6 560.9H208.5V120.1c0-31.8 30.3-54.9 61-46.5l29.6 8.1c85.3 23.4 144.5 101 144.5 189.4v289.8z" fill="#FF4F5C" p-id="3875"></path><path d="M388 952.1H264c-46.7 0-84.5-37.8-84.5-84.5V448.2h293v419.4c0.1 46.7-37.8 84.5-84.5 84.5zM759.9 448.2H636c-46.7 0-84.5 37.8-84.5 84.5v419.4h293V532.7c0-46.7-37.9-84.5-84.6-84.5z" p-id="3876"></path></svg>
                    <span className="font-bold text-shadow-md">LipstickGeeks</span>
                </div>
                <div className="text-red-500 text-xs mt-2">{errorMessage}</div>
                {loginMode && <div className="flex-col-form">
                    <h3 clas>请输入登录信息</h3>
                    <input
                        name="username"
                        placeholder="用户名"
                        value={formData.username}
                        onChange={handleChange}
                        className='input' />

                    <input
                        type="password"
                        name="password"
                        placeholder="密码"
                        value={formData.password}
                        onChange={handleChange}
                        className='input' />

                    <button className="button bg-black text-white" onClick={handleLogin}>登录</button>
                    <div className="flex justify-between">
                        <button onClick={toForgot}>忘记密码</button>
                        <button onClick={toRegister}>注册</button>
                    </div>
                </div>}

                {registerMode && <div className="flex-col-form">
                    <h3>请输入注册信息</h3>
                    <input
                        name="username"
                        placeholder="用户名"
                        value={formData.username}
                        onChange={handleChange}
                        className='input' />

                    <input
                        type="password"
                        name="password"
                        placeholder="密码"
                        value={formData.password}
                        onChange={handleChange}
                        className='input' />

                    <input
                        name="email"
                        placeholder="邮箱地址"
                        value={formData.email}
                        onChange={handleChange}
                        className='input' />
                    <button className="button bg-black text-white" onClick={handleRegister}>注册</button>
                    <div className="flex">
                        <button className='ml-auto' onClick={toLogin}>登录</button>
                    </div>
                </div>
                }

                {
                    forgotMode && <div className="flex-col-form">
                        <h3>请输入绑定邮箱地址</h3>
                        <input
                            name="email"
                            placeholder="邮箱地址"
                            value={formData.email}
                            onChange={handleChange}
                            className='input' />
                        <button className="button bg-black text-white" onClick={handleRegister}>发送验证</button>
                        <div className="flex justify-between">
                            <button onClick={toLogin}>登录</button>
                            <button onClick={toRegister}>注册</button>
                        </div>
                    </div>

                }
            </div>
            <div
                className="bg-gray-200 rounded-lg p-1 cursor-pointer"
                onClick={oauthLogin}>
                <GithubSvg className='w-5 h-5 inline-block' /><span className="text-xs"> github登录</span>
            </div>
        </Modal>
    )
}