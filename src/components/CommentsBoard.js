import { useEffect, useState, useContext } from 'react'
import commentsApi from '../api/comments'
import Comment from './Comment'
import { UserContext } from "../context/UserContextProvider"

export default function CommentsBoard() {

    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState("")
    const [readOnly, setReadOnly] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setReadOnly(false)
            setCommentContent("")
        } else {
            setCommentContent("请登录后再回复/留言")
        }
    }, [user])

    useEffect(() => {
        commentsApi.get("/")
            .then(res => setComments(res.data))
    }, [])

    const addReply = (commentId, reply) => {
        setComments(prevComments => prevComments.map(comment => {
            return comment.id === commentId ? { ...comment, replies: [...comment.replies,reply] } : comment
        }))
    }

    const submitComment = () => {
        commentsApi.post("/", { "content": commentContent })
            .then(res => {
                const newComment = res.data
                newComment.replies = []
                setComments(oldComments => [...oldComments, newComment])
                setCommentContent("")
                window.alert("留言成功！")
            }).catch((e) => {
                window.alert(e.response.data.message)
            })
    }

    const handleChange = (e) => {
        setCommentContent(e.target.value)
    }

    return (
        <div>
            <div className='text-lg font-bold '>留言板</div>
            <textarea
                value={commentContent}
                onChange={handleChange}
                className="border-2 border-black w-full mt-2 rounded-md"
                readOnly={readOnly}
            />
            <div className="button bg-red-400 text-white w-20 text-center" onClick={submitComment}>留言</div>
            {comments.map((comment,index) => {
                return (
                    <Comment comment={comment} addReply={addReply} index={index}/>
                )
            }).reverse()}
        </div>
    )
}