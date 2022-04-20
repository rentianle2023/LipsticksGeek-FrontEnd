import {
    Link, useLocation
} from "react-router-dom";
import { MenuIcon } from '@heroicons/react/outline'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Modal from "../components/Modal";


export default function Header() {
    const [showMenu, setShowMenu] = useState(false)
    const [shoModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const location = useLocation()
    const { login, user } = useContext(UserContext)

    function toggleMenu() {
        setShowMenu(prevState => !prevState)
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                //将name更新为value，如果是checkbox，就更新为checked的boolean值
                [name]: value
            }
        })
    }

    const pages = [
        { path: '/', name: '首页' },
        { path: '/recommendation', name: '推荐' },
        { path: '/encyclopedia', name: '百科' },
        { path: '/community', name: '社区' }
    ]

    const pageElement = pages.map(page => (
        <Link to={page.path} className={location.pathname === page.path ? 'focus-button' : 'button'} onClick={() => setShowMenu(false)}>{page.name}</Link>
    ))

    return (
        <div className=" bg-gray-700 fixed top-0 w-full z-50">

            <nav className="flex items-center justify-between py-2 px-5  shadow-md shadow-gray-800 text-indigo-100 text-sm ">

                <h1 className="font-bold">
                    <Link to="/">
                        <svg className="h-10 w-10 fill-white inline-block" t="1649234406400" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3874"><path d="M443.6 560.9H208.5V120.1c0-31.8 30.3-54.9 61-46.5l29.6 8.1c85.3 23.4 144.5 101 144.5 189.4v289.8z" fill="#FF4F5C" p-id="3875"></path><path d="M388 952.1H264c-46.7 0-84.5-37.8-84.5-84.5V448.2h293v419.4c0.1 46.7-37.8 84.5-84.5 84.5zM759.9 448.2H636c-46.7 0-84.5 37.8-84.5 84.5v419.4h293V532.7c0-46.7-37.9-84.5-84.6-84.5z" p-id="3876"></path></svg>
                        <span>LipstickGeeks</span>
                    </Link>
                </h1>

                <div className="hidden sm:flex sm:gap-1 sm:mx-4 sm:ml-auto">
                    {pageElement}

                    {login ?
                        <div>{user.username}</div> :
                        <div className="button" onClick={() => setShowModal(true)}>登录/注册</div>
                    }
                    <a href="https://www.w3schools.com" className="border-b-2 border-b-red-500">Github</a>
                </div>

                <MenuIcon className="h-5 w-10 sm:hidden" onClick={toggleMenu} />
            </nav>
            {
                showMenu && <div className="flex flex-col gap-2 p-2 text-indigo-100 text-sm">
                    {pageElement}
                    {login ?
                        <div>{user.username}</div> :
                        <div className="button" onClick={() => setShowModal(true)}>登录/注册</div>
                    }
                    <a href="https://www.w3schools.com" >Github</a>
                </div>
            }

            {
                shoModal &&
                <Modal closeModal={() => setShowModal(false)} width={"18em"} height={"50%"}>

                    <div className="w-full h-full p-1 flex flex-col gap-3 justify-center ">
                        <div>
                            <svg className="h-10 w-10 fill-black inline-block" t="1649234406400" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3874"><path d="M443.6 560.9H208.5V120.1c0-31.8 30.3-54.9 61-46.5l29.6 8.1c85.3 23.4 144.5 101 144.5 189.4v289.8z" fill="#FF4F5C" p-id="3875"></path><path d="M388 952.1H264c-46.7 0-84.5-37.8-84.5-84.5V448.2h293v419.4c0.1 46.7-37.8 84.5-84.5 84.5zM759.9 448.2H636c-46.7 0-84.5 37.8-84.5 84.5v419.4h293V532.7c0-46.7-37.9-84.5-84.6-84.5z" p-id="3876"></path></svg>
                            <span className="font-bold text-shadow-md">LipstickGeeks</span>
                        </div>
                        <input
                            name="username"
                            placeholder="输入用户名"
                            value={formData.username}
                            onChange={handleChange}
                            className='input mt-2' />

                        <input
                            name="password"
                            placeholder="输入密码"
                            value={formData.password}
                            onChange={handleChange}
                            className='input mt' />

                        <button className="bg-black text-white mt-5 p-1 rounded-lg">登录/注册</button>
                    </div>
                </Modal>
            }

        </div>
    )
}