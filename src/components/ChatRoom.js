import { useEffect, useState, useContext } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { UserContext } from '../context/UserContextProvider';
import Message from './Message';

var stompClient = null
export default function ChatRoom(props) {

    const { user, setShowLoginModal } = useContext(UserContext)
    const [publicMessages, setPublicMessages] = useState([])
    const [privateMessages, setPrivateMessages] = useState(new Map())
    const [formData, setFormData] = useState({
        data: "",
        sender: "",
        receiver: "",
        status: ""
    })

    useEffect(() => {
        if (user) {
            connect()
        }
    }, [user])

    const connect = () => {
        const Sock = new SockJS("http://192.168.101.19:8080/ws")
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + user.username + '/private', onPrivateMessage);

        setFormData({ ...formData, "sender": user.username });
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            sender: user.username,
            status: "JOIN"
        };
        stompClient.send("/chat/message", {}, JSON.stringify(chatMessage));
    }

    const onError = (err) => {
        console.log(err)
    }

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body)

        setPublicMessages(prevMessages => {
            return [...prevMessages, message]
        })
    }

    const onPrivateMessage = (payload) => {
        const message = JSON.parse(payload.body)
        console.log("private " + message)
    }

    const sendMessage = () => {

        if (!user) return

        stompClient.send("/chat/message", {}, JSON.stringify({
            ...formData,
            status: "MESSAGE"
        }))
        setFormData(prevFormData => ({
            ...prevFormData,
            data: ""
        }))
    }

    const changeFormData = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <div className='flex w-full h-full'>
            <div className='flex flex-col flex-nowrap w-1/5 p-4 gap-2 text-white '>
                <div className='bg-purple-700 shadow-lg p-1'>公共频道</div>
            </div>
            <div className='w-4/5 h-full p-5 '>
                <div className='h-80 overflow-y-auto ring-black ring-1 p-3 flex flex-col'>
                    {!user &&
                        <div className='self-center justify-self-center text-purple-700 font-bold '>
                            请先<span className='underline cursor-pointer' onClick={() => setShowLoginModal(true)}>登录/注册</span>
                        </div>}
                    {
                        publicMessages.map(message => {
                            if (message.status == "MESSAGE") {
                                return <Message data={message.data} sender={message.sender} />
                            } else if (message.status == "JOIN") {
                                return <div className='text-xs bg-gray-200 rounded-lg mt-2 p-0.5'>{message.sender}加入公共频道</div>
                            } 
                        })
                    }
                </div>
                <div className='h-1/5 w-full flex gap-2 mt-3 justify-between' >
                    <input
                        className={`w-4/5 ring-black ring-1 ${user ? '' : 'cursor-not-allowed'}`}
                        placeholder='输入'
                        name="data"
                        onChange={changeFormData}
                        value={formData.data}
                        onKeyDown={event => { if (event.key === 'Enter') sendMessage() }}
                        disabled={user ? false : true}
                    />
                    <button className='w-1/5 button bg-green-300' onClick={sendMessage}>发送</button>
                </div>
            </div>
        </div>
    )
}