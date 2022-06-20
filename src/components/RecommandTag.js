import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import tagApi from '../api/tags'
import colorApi from '../api/colors'

export default function RecommandTag(props) {

    const { name, title } = props

    const [colors, setColors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        tagApi.get(`/${title}/colors`)
            .then(res => setColors(res.data))
    },[])

    const handleRidirect = (colorId) => {
        colorApi.get(`${colorId}/lipstick`)
            .then(res =>
                navigate(`/lipstick/${res.data.id}?color=${colorId}`))

    }

    return (
        <div className='mt-5'>
            <div className=' font-semibold'>{name} - {title}</div>
            <div className='flex gap-10 overflow-x-auto border-2 border-gray-200 rounded-lg pt-5 pb-2 px-5'>
                {colors.map(color => {
                    const { id, name, hexColor } = color
                    const style = {
                        backgroundColor: hexColor
                    }

                    return <div className='w-32 shrink-0 cursor-pointer' onClick={() => handleRidirect(id)}>

                        <div className='w-20 h-20 rounded-full' style={style}></div>
                        <div>{name}</div>
                    </div>
                })}
            </div>
        </div>
    )
}