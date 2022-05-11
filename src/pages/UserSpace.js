
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContextProvider"
import colorApi from "../api/colors"
import { useNavigate } from "react-router-dom";

export default function UserSpace() {

    const { username } = useParams()
    const { user, favorite, removeFavorite } = useContext(UserContext)
    const navigate = useNavigate()

    function checkDetails(colorId) {
        console.log(colorId)
        colorApi.get(`${colorId}/lipstick`)
            .then(res =>
                navigate(`/lipstick/${res.data.id}?color=${colorId}`))
    }

    const favoriteElement = favorite.map(favorite => {
        const { hexColor, name, createTime, id } = favorite
        const style = {
            "backgroundColor": hexColor
        }
        return (
            <div className="flex items-center border-b border-gray-300 p-1.5 gap-3">
                <div style={style} className='shrink-0 basis-40 h-10'></div>
                <div className="shrink-0 basis-40">{name}</div>
                <div className="shrink-0 basis-40">{createTime}</div>
                <div className="shrink-0 basis-20 button underline text-center" >
                    <h3 onClick={() => checkDetails(id)}>查看详情</h3>
                </div>
                <div className="shrink-0 basis-20 button underline text-center" >
                    <h3 onClick={() => removeFavorite(favorite)}>删除</h3>
                </div>
            </div>
        )
    })

    return (
        <div className="text-xs">
            {user && user.username === username ? <div className="flex flex-col justify-center items-center bg-gray-200 p-3 sm:flex-row sm:items-start">
                <div className="card sm:w-1/5 sm:self-start sm:flex-col sm:gap-5">
                    <div className="flex flex-col">
                        <img src={user.avatar} className='w-24 rounded-lg' />
                        <div className="text-2xl">{user.username}</div>
                    </div>
                    <div className="flex flex-col">
                        <div>用户编号: {user.id}</div>
                        <button className="button bg-gray-200">编辑个人信息</button>
                    </div>
                </div>
                <div className="w-full sm:w-2/3 sm:mx-5">
                    <div className="card flex-col">
                        <div className="flex justify-around w-full">
                            <div className="">最佳推荐</div>
                            <button className="button bg-gray-300">重新匹配</button>
                        </div>
                        <div className="flex gap-3">
                            无
                        </div>
                    </div>
                    <div className="card flex-col">
                        <div>收藏色号</div>
                        <div className="overflow-x-auto w-full">
                            <div className="flex mt-3 border-b border-gray-300 gap-3 items-end p-1">
                                <div className='shrink-0 basis-40'>颜色</div>
                                <div className="shrink-0 basis-40">名称</div>
                                <div className="shrink-0 basis-20">收藏时间</div>
                            </div>
                            {favoriteElement}
                        </div>
                    </div>
                </div>
            </div> :
                <div>你无权访问别人的空间</div>}
        </div>
    )
}