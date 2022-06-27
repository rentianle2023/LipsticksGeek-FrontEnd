import { useContext, useState,useRef } from 'react'
import { UserContext } from '../context/UserContextProvider';
import userApi from '../api/users'

export default function ChatMessage(props) {

    const { user } = useContext(UserContext)

    const [hover, setHover] = useState(false)
    const [userInfo, setUserInfo] = useState({
        id: '',
        username: '',
        avatar: '',
        gender: '',
        roles: ''
    })

    const handleClick = () => {
        userApi.get(`/${props.sender}`)
            .then(res => {
                setUserInfo(res.data)
            })
    }

    const timerRef = useRef(null);

    const onMouseEnter = () => {
        if(props.sender === user.username) return
        timerRef.current = setTimeout(() => { 
            userApi.get(`/${props.sender}`)
                .then(res => {
                    setUserInfo(res.data)
                })
            setHover(true)
        }, 300);
    }

    const onMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setHover(false)
    }

    const enterUserSpace = () => {

    }

    const addPrivateChat = () => {
        props.addPrivateChat(props.sender)
    }

    return (
        <div>
            <div className={`flex gap-3 mt-2 z-10  ${user && props.sender === user.username ? 'justify-end' : ''}`} >
                <div
                    className={`bg-gray-200 rounded-lg p-2 relative  ${user && props.sender === user.username ? 'order-last' : ''}`}
                    onClick={handleClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <div className='cursor-pointer'>{props.sender}</div>
                    {hover &&
                        <div className='absolute m-1 h-40 w-32 bg-gray-300 z-10 p-1 rounded-lg ring-black ring-2'>
                            <img className='w-10 h-10' src={userInfo.avatar} />
                            <div>id : {userInfo.id}
                                <span className='text-red-500'>{userInfo.roles && userInfo.roles.some(role => role.id === 2) ? "管理员" : ''}</span>
                            </div>
                            <div>{userInfo.username}</div>

                            <div className='button bg-gray-500' onClick={enterUserSpace}>进入空间</div>
                            <div className='button bg-gray-500 mt-2' onClick={addPrivateChat}>私聊</div>
                        </div>
                    }
                </div>
                <div className='bg-red-400 rounded-lg p-2 text-white'>{props.data}</div>
            </div>
        </div>
    )
}