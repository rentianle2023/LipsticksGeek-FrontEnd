import { useEffect, useState } from 'react'
import api from '../api/searchLipsticks'

export default function SearchModal(props) {

    const [queryContent, setQueryContent] = useState()
    const [lipstickQueryResult, setLipQueryResult] = useState([])

    function handleChange(event) {
        const newContent = event.target.value
        setQueryContent(newContent)
    }

    useEffect(() => {
        console.log(lipstickQueryResult)
        api.post('/search', {
            "fields": ['name'],
            "term": queryContent
        })
            .then(res => setLipQueryResult(res.data))
    }, [queryContent])

    return (
        <div className="fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-40 flex justify-center items-center disabled" onClick={props.onOverlayClick}>
            <div className="w-3/5 bg-white rounded-lg p-3 border-2 shadow-xl h-80 flex flex-col  overflow-scroll" onClick={props.onModalClick}>
                <input type="text" placeholder="输入..." className="w-full p-2 border border-gray-200 rounded-lg" value={queryContent} onChange={handleChange} />
                {/* <div className="mt-5">最近查询</div>
                <div className="bg-gray-100 w-full h-0.5"></div>
                <div className="mt-5">查询1</div>
                <div className="mt-5">查询2</div>
                <div className="mt-5">查询3</div> */}

                <div className='mt-3 p-3'>
                    <h1>口红查询结果</h1>
                    {
                        lipstickQueryResult.length ?
                            lipstickQueryResult.map(lipstick => (
                                <div className='p-1 m-1 text-sm hover:bg-red-500 hover:text-white rounded-lg'>{lipstick.name}</div>
                            ))
                            : <h1>无</h1>
                    }
                </div>

            </div>
        </div>
    )
}