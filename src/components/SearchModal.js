import { useEffect, useState } from 'react'
import lipstickApi from '../api/searchLipsticks'
import colorApi from '../api/searchColors'
import Modal from './Modal'

export default function SearchModal(props) {

    const [content, setContent] = useState('')
    const [lipsticks, setLipsticks] = useState([])
    const [colors, setColors] = useState([])

    function handleChange(event) {
        const newContent = event.target.value
        setContent(newContent)
    }

    useEffect(() => {

        lipstickApi.post('/search', {
            "fields": ['name'],
            "term": content
        })
            .then(res => setLipsticks(res.data))

        colorApi.post('/search', {
            "fields": ['name'],
            "term": content
        })
            .then(res => setColors(res.data))
    }, [content])

    return (
        <div>
            <input type="text" placeholder="输入..." className="w-full p-2 border border-gray-200 rounded-lg" value={content} onChange={handleChange} />
            {
                lipsticks.length > 0 &&
                <div className='mt-3 p-3'>
                    <h1>口红查询结果</h1>
                    {lipsticks.map(lipstick => (
                        <div className='p-1 m-1 text-sm hover:bg-red-500 hover:text-white rounded-lg'>{lipstick.name}</div>
                    ))}
                </div>
            }

            {
                colors.length > 0 &&
                <div className='mt-3 p-3'>
                    <h1>色号查询结果</h1>
                    {colors.map(lipstick => (
                        <div className='p-1 m-1 text-sm hover:bg-red-500 hover:text-white rounded-lg'>{lipstick.name}</div>
                    ))}
                </div>
            }
        </div>
    )
}