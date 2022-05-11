import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/lipsticks"
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import { UserContext } from "../context/UserContextProvider";

export default function LipstickDetail() {

    const [lipstick, setLipstick] = useState({
        'name': '',
        'price': '',
        'imageUrl': '',
        'colors': []
    })
    const [currentColor, setCurrentColor] = useState({
        "name": "",
    })
    const [searchParam, setSearchParam] = useSearchParams()
    const lipstickId = useParams().lipstickId
    const colorId = searchParam.get('color')

    useEffect(() => {

        api.get("/" + lipstickId)
            .then(res => {
                setLipstick(res.data)
                setCurrentColor(colorId ? res.data.colors.find(color => color.id.toString() === colorId) : res.data.colors[0])
            })
    }, [lipstickId])

    const { favorite, addFavorite, removeFavorite } = useContext(UserContext)

    function changeCurrentColor(newColor) {
        setCurrentColor(newColor)
    }

    return (
        <div className="p-5 flex flex-col justify-center items-center sm:flex-row sm:gap-5">
            <div className="border-2 border-gray-900 rounded-lg text-sm text-center p-4 w-80 " >
                <img src={lipstick.imageUrl} className='w-full' alt="lipstick" />
                <div>{lipstick.name} - {lipstick.price}</div>
                {currentColor && <div className="mt-4">当前色号 ： {currentColor.name}</div>}
                <div className="flex justify-center mt-3 gap-2">
                    {favorite.some(fav => fav.id === currentColor.id) ?
                        <StarIconSolid className="w-7 h-7 fill-yellow-400" onClick={() => removeFavorite(currentColor)} /> :
                        <StarIconOutline className="w-7 h-7" onClick={() => addFavorite(currentColor)} />}
                </div>
            </div>
            <div className="w-80 flex overflow-y-auto mt-3 flex-wrap">
                {
                    lipstick.colors.map(color => {
                        const style = {
                            "backgroundColor": color.hexColor,
                            "border": color.name === currentColor.name ? "0.3em solid black" : ""
                        }
                        return (
                            <div className="w-1/4 h-8 p-1">
                                <div className='w-full h-full cursor-pointer' style={style} onClick={() => changeCurrentColor(color)}></div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}