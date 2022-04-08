import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ThumbUpIcon as ThumbUpIconOutline, ThumbDownIcon as ThumbDownIconOutline, StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbUpIconSolid, ThumbDownIcon as ThumbDownIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/solid";

export default function LipstickDetail() {

    const lipstick = useLocation().state

    const [currentColor, setCurrentColor] = useState(lipstick.colors[0])
    const [thumbUp, setThumbUp] = useState(false)
    const [thumbDown, setThumbDown] = useState(false)
    const [favorite, setFavorite] = useState(false)

    function toggleThumbUp(){
        setThumbUp(prevState => {
            if(prevState == false) {
                localStorage.setItem(currentColor.name, 'up');
                if(thumbDown) setThumbDown(false)
            } else localStorage.removeItem(currentColor.name);
            return !prevState
        })
    }
    function toggleThumbDown(){
        setThumbDown(prevState => {
            if(prevState == false) {
                localStorage.setItem(currentColor.name, 'down');
                if(thumbUp) setThumbUp(false)
            }
            else localStorage.removeItem(currentColor.name);
            return !prevState
        })
    }
    function toggleFavorite(){
        setFavorite(prevState => {
            if(prevState == false) localStorage.setItem(currentColor.id, 'true');
            else localStorage.removeItem(currentColor.id);
            return !prevState
        })
    }

    function changeCurrentColor(newColor){
        localStorage.getItem(newColor.name) === 'up' ? setThumbUp(true) : setThumbUp(false)
        localStorage.getItem(newColor.name) === 'down' ? setThumbDown(true) : setThumbDown(false)
        localStorage.getItem(newColor.id) === 'true' ? setFavorite(true) : setFavorite(false)

        setCurrentColor(newColor)
    }


    return (
        <div className="p-5">
            <div className="border-2 border-gray-900 text-sm text-center p-4" >
                <img src={lipstick.imageUrl} className='w-full gap-3' />
                <div>{lipstick.name} - {lipstick.price}</div>
                <div className="mt-4">当前色号 ： {currentColor.name}</div>
                <div className="flex justify-center mt-3 gap-2">
                    {thumbUp ?
                        <ThumbUpIconSolid className="w-5 h-5" onClick={toggleThumbUp}/> :
                        <ThumbUpIconOutline className="w-5 h-5" onClick={toggleThumbUp}/>}
                    {thumbDown ?
                        <ThumbDownIconSolid className="w-5 h-5" onClick={toggleThumbDown}/> :
                        <ThumbDownIconOutline className="w-5 h-5" onClick={toggleThumbDown}/>}
                    {favorite ?
                        <StarIconSolid className="w-5 h-5 ml-0.5" onClick={toggleFavorite}/> :
                        <StarIconOutline className="w-5 h-5 ml-0.5" onClick={toggleFavorite}/>}
                </div>
            </div>
            <div className="h-40 flex overflow-y-auto mt-3 flex-wrap">
                {
                    lipstick.colors && lipstick.colors.map(color => {
                        const border = color.name === currentColor.name ? "0.3em solid black" : ""
                        const style = {
                            "backgroundColor": color.backgroundColor,
                            "border": border
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