import { useEffect, useState } from 'react'
import { BookmarkIcon } from '@heroicons/react/outline'
import Modal from './Modal'
import searchApi from '../api/search'

import { TailSpin } from 'react-loader-spinner'

export default function SearchModal(props) {
    const [content, setContent] = useState("")
    const [queryResults, setQueryResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(event) {
        const newContent = event.target.value
        setContent(newContent)
    }

    useEffect(() => {
        if (content !== "") {
            setIsLoading(true)
            setQueryResults([])
            searchApi.post('/all', {
                "fields": ['name'],
                "term": content
            })
                .then(res => setQueryResults(res.data))
                .then(() => setIsLoading(false))
        }
    }, [content])


    return (
        <Modal closeModal={props.closeModal}>
            <input type="text" placeholder="输入..." className="input" value={content} onChange={handleChange} />
            {isLoading && <div className='m-10'>
                <TailSpin
                    height="50"
                    width="50"
                    color='#ef4444'
                    ariaLabel='loading'
                />
            </div>
            }
            {
                queryResults &&
                <div className='mt-3 p-1'>
                    {Object.entries(queryResults).map(([brandName, results]) => (
                        <div>
                            <div className='font-bold'>{brandName}</div>
                            {
                                results.map(result => (
                                    <div className='flex items-center p-1 rounded-lg hover:bg-gray-200 gap-1 cursor-pointer' onClick={() => props.handleClick(result)}>
                                        {result.isColor ? <div className='h-4 w-4 rounded-full shrink-0' style={{ "backgroundColor": result.hexColor }}></div> : <BookmarkIcon className='w-4 h-4 shrink-0' />}
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

