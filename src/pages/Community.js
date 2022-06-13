import ChatRoom from "../components/ChatRoom"
import CommentsBoard from "../components/CommentsBoard"

export default function Community() {
    return (
        <div className=" mx-5 py-5">
            <ChatRoom />
            <CommentsBoard />
        </div>
    )
}