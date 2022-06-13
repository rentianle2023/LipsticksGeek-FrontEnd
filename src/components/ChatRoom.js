import { useEffect, useState, useContext, useRef } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { UserContext } from '../context/UserContextProvider';
import Message from './Message';

var stompClient = null
export default function ChatRoom(props) {

    const { user, setShowLoginModal } = useContext(UserContext)
    const [publicChats, setPublicChats] = useState([])
    const [privateChats, setPrivateChats] = useState(new Map())
    const [currentChat, setCurrentChat] = useState("CHATROOM")
    const [formData, setFormData] = useState({
        data: "",
        sender: "",
        receiver: "",
        status: ""
    })
    console.log(privateChats)

    useEffect(() => {
        if (user) {
            connect()
        }
    }, [user])

    const connect = () => {
        const Sock = new SockJS(`${process.env.REACT_APP_URL}/ws`)
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + user.username + '/private', onPrivateMessageReceived);

        setFormData({ ...formData, "sender": user.username });
        userJoin();
    }

    const addPrivateChat = (username) => {
        if (!privateChats.has(username)) {
            console.log("add")
            privateChats.set(username, [])
            setPrivateChats(new Map(privateChats))
        }
        setCurrentChat(username)
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

        setPublicChats(prevMessages => {
            return [...prevMessages, message]
        })
    }

    const onPrivateMessageReceived = (payload) => {

        const message = JSON.parse(payload.body)
        console.log(message)
        if (!privateChats.has(message.sender)) {
            var list = []
            list.push(message)
            privateChats.set(message.sender, list)
            setPrivateChats(new Map(privateChats))
        } else {
            privateChats.get(message.sender).push(message)
            setPrivateChats(new Map(privateChats))
        }
    }

    const sendMessage = () => {
        if (currentChat === "CHATROOM") {
            //公共频道
            stompClient.send("/chat/message", {}, JSON.stringify({
                ...formData,
                status: "MESSAGE"
            }))
        } else {
            //私人频道
            stompClient.send("/chat/private-message", {}, JSON.stringify({
                ...formData,
                receiver: currentChat,
                status: "MESSAGE"
            }))
            privateChats.get(currentChat).push({ ...formData, status: "MESSAGE" })
            setPrivateChats(new Map(privateChats))
        }
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

    const scrollToBottom = useRef();

    useEffect(() => {
        scrollToBottom.current.scrollTop = scrollToBottom.current.scrollHeight
    },[privateChats,publicChats])

    return (
        <div className='flex w-full h-full'>
            <div className='flex flex-col flex-nowrap w-1/5 p-2 gap-2 text-white '>
                <div className={`shadow-lg p-0.5 rounded-lg ${currentChat === "CHATROOM" ? 'bg-purple-400' : 'bg-purple-700 '}`} onClick={() => setCurrentChat("CHATROOM")}>公共频道</div>
                {Array.from(privateChats.keys()).map((name) => (
                    <div className={`shadow-lg p-0.5 rounded-lg ${currentChat === name ? 'bg-purple-400' : 'bg-purple-700 '}`} onClick={() => setCurrentChat(name)}>
                        {name}
                    </div>
                ))}
            </div>
            <div className='w-4/5 h-full p-5 '>
                <div className='h-80 overflow-y-scroll ring-black ring-1 p-3 flex flex-col' ref={scrollToBottom}>
                    {!user &&
                        <div className='self-center justify-self-center text-purple-700 font-bold '>
                            请先<span className='underline cursor-pointer' onClick={() => setShowLoginModal(true)}>登录/注册</span>
                        </div>}
                    {
                        currentChat === "CHATROOM" && publicChats.map(message => {
                            if (message.status == "MESSAGE") {
                                return <Message data={message.data} sender={message.sender} addPrivateChat={addPrivateChat} />
                            } else if (message.status == "JOIN") {
                                return <div className='text-xs bg-gray-200 rounded-lg mt-2 p-0.5'>{message.sender}加入公共频道</div>
                            }
                        })
                    }
                    {
                        currentChat !== "CHATROOM" && privateChats.get(currentChat).map(message => {
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