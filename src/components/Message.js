import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContextProvider';
import userApi from '../api/users'
import UserDetailModal from './UserDetailModal';

export default function Message(props) {

    const { user } = useContext(UserContext)

    const [showModal, setShowModal] = useState(false)

    const [userInfo, setUserInfo] = useState({
        id: '',
        username: '',
        avatar: '',
        gender: '',
        roles: ''
    })

    const handleClick = () => {
        console.log(userInfo.avatar)
        userApi.get(`/${props.sender}`)
            .then(res => {
                setUserInfo(res.data)
                setShowModal(true)
            })
    }

    return (
        <div>
            <div className={`flex gap-3 mt-2 z-10  ${props.sender === user.username ? 'justify-end' : ''}`} >
                <div
                    className={`bg-gray-200 rounded-lg p-2 relative cursor-pointer ${props.sender === user.username ? 'order-last' : ''}`}
                    onClick={handleClick}
                >
                    {props.sender}  
                </div>
                <div className='bg-green-500 rounded-lg p-2'>{props.data}</div>
            </div>
            {
                showModal && <UserDetailModal closeModal={() => setShowModal(false)} userInfo={userInfo}/>
            }
        </div>
    )
}