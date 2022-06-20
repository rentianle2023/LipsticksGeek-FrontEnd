import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BookmarkIcon } from '@heroicons/react/outline'
import Modal from './Modal'
import searchApi from '../api/search'

export default function SearchModal(props) {
    const [content, setContent] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const navigate = useNavigate()

    function handleChange(event) {
        const newContent = event.target.value
        setContent(newContent)
    }

    useEffect(() => {
        searchApi.post('/all', {
            "fields": ['name'],
            "term": content
        })
            .then(res => setQueryResults(res.data))
    }, [content])

    return (
        <Modal closeModal={props.closeModal}>
            <input type="text" placeholder="输入..." className="input" value={content} onChange={handleChange} />
            {
                queryResults &&
                <div className='mt-3 p-3'>
                    {Object.entries(queryResults).map(([brandName, results]) => (
                        <div>
                            <div className='font-bold'>{brandName}</div>
                            {
                                results.map(result => (
                                    <div className='flex items-center p-1 rounded-lg hover:bg-gray-200 gap-1 cursor-pointer' onClick={() => props.handleClick(result)}>
                                        {result.isColor ? <div className='h-4 w-4 rounded-full shrink-0' style={{ "backgroundColor": result.hexColor }}></div> : <BookmarkIcon className='w-4 h-4' />}
                                        <div >{result.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                </div>
            }
        </Modal> 
    )
}