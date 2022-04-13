import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Lipstick(props) {

    const [hover, setHover] = useState(false)

    function toggleHover() {
        setHover(prevState => !prevState)
    }

    return (
        <div className="border-2 border-gray-900 p-4 m-2 relative" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <img src={props.lipstick.imageUrl} className='w-full' alt='lipstick'/>
            <div>{props.lipstick.name} - {props.lipstick.price}</div>
            <div className="flex overflow-x-auto">
                {
                    props.lipstick.colors && props.lipstick.colors.map(color => {
                        const style = {
                            "backgroundColor": color.hexColor
                        }
                        return <div className="w-5 h-5 rounded-full shrink-0" style={style} key={color.id}></div>
                    })
                }
            </div>
            {
                hover &&
                <Link
                    to={`/lipstick/${props.lipstick.id}`}
                >
                    <div className='absolute w-4/5 text-center left-1/2 top-1/2 -translate-x-1/2 bg-gray-800 text-indigo-100 opacity-75'>查看详情</div>
                </Link>
            }
        </div>
    )
}