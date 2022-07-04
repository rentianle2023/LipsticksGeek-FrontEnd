import ChatRoom from "../components/ChatRoom"
import CommentsBoard from "../components/CommentsBoard"

export default function Community() {
    return (
        <div className=" mx-5 py-5">
            <ChatRoom />
            <div className="h-0.5 bg-gray-200 my-10"></div>
            <CommentsBoard />
        </div>
    )
}