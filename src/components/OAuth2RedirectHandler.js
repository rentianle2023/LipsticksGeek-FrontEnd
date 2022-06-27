
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'
import api from '../api/oauth2'
import { UserContext } from "../context/UserContextProvider";
import { useContext, useEffect, useMemo } from 'react';


export default function OAuth2RedirectHandler(props) {
    const { fetchUserAndFavorite } = useContext(UserContext)
    const navigate = useNavigate()
    const redirectPage = localStorage.getItem("oauthRedirectPage")

    const [searchParams, setSearchParams] = useSearchParams()
    const code = searchParams.get('code')
    const { provider } = useParams()

    const login = () => {
        console.log("start login")
        api.get(`/${provider}/${code}`)
            .then(res => localStorage.setItem("token", res.headers["authorization"]))
            .then(() => fetchUserAndFavorite())
            .then(() => {
                console.log(redirectPage)
                navigate(redirectPage)
            })
            .catch(() => {
                navigate(redirectPage)
                window.alert("Github连接出错，登录失败")
            })
    }

    useEffect(() => {
        login()
    }, [])

    return (
        <div className='flex flex-col justify-center items-center fixed left-0 top-0 w-full h-full bg-white z-40'>
            <Audio
                height="50"
                width="50"
                color='#ef4444'
                ariaLabel='loading'
            />
            <div className='text-red-500'>正在向Github发送请求，请稍后</div>
        </div>
    )
}