
import { useNavigate ,useParams,useSearchParams } from 'react-router-dom';
import api from '../api/oauth2'
import { UserContext } from "../context/UserContextProvider";
import { useContext, useEffect } from 'react';


export default function OAuth2RedirectHandler(props){
    const { fetchUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [searchParam, setSearchParam] = useSearchParams()
    const {provider} = useParams()
    const code = searchParam.get('code')
    console.log(code)
    const login = () => {
        console.log("start login")
        api.get(`/${provider}/${code}`)
        .then(res => localStorage.setItem("token", res.headers["authorization"]))
        .then(() => fetchUser())
        .then(() => navigate(-1))
        .catch(e => {
            
        })
    }

    useEffect(() => {
        login()
    },[])

    return (
        <div>{code}</div>
    )
}