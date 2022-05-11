import { useContext, useMemo } from 'react'
import { UserContext } from './UserContextProvider';
import api from '../api/users'

export default function WithAxios(props){
    const { setShowLoginModal } = useContext(UserContext);
    useMemo(() => {
        api.interceptors.response.use(response => response, error => {
            if(error.response.status === 403) {
                setShowLoginModal(true)
            }
            return Promise.reject(error)
        });
    }, [setShowLoginModal])

    return props.children
}