import { useState, useEffect } from 'react';
import { BlockPicker } from 'react-color';
import { useNavigate } from "react-router-dom";
import Modal from './Modal';
import searchApi from '../api/search'
import colorApi from '../api/colors'
import { TailSpin } from 'react-loader-spinner'

export default function ColorPicker(props) {

    const colors = ["#d39387", "#b48081", "#c76864", "#ec827a", "#E57373",
        "#F44336", "#E65100", "#D32F2F", "#B71C1C", "#A7170b", "#a32525", "#950f1a", "#690d0e",
        "#d41c5a", "#C2185B", "#721e4b", "#ab6241", "#A84539", "#88423c",]

    const [color, setColor] = useState({
        "hex": "cccccc"
    })
    const [queryResults, setQueryResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    function handleChange(color) {
        setColor(color)
    }

    function handleRidirect(result) {
        colorApi.get(`${result.id}/lipstick`)
            .then(res =>
                navigate(`/wiki/lipstick/${res.data.id}?color=${result.id}`))
    }

    useEffect(() => {
        if (color.hex !== "cccccc") {
            setIsLoading(true)
            setQueryResults([])
            searchApi.post('/color', {
                "hexColor": color.hex
            })
                .then(res => setQueryResults(res.data))
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        }
    }, [color])

    return (
        <Modal closeModal={props.closeModal}>
            <div className='flex justify-center'>
                <BlockPicker colors={colors} triangle={"hide"} color={color} onChange={handleChange} width={1000} />
            </div>
            {isLoading && <div className='m-10'>
                <TailSpin
                    height="50"
                    width="50"
                    color='#ef4444'
                    ariaLabel='loading'
                />
            </div>
            }
            <div className='mt-3 p-1'>
                {Object.entries(queryResults).map(([key, value]) => (
                    <div>
                        <div className='font-bold'>{key}</div>
                        {
                            value.map(val => (
                                <div className='flex items-center p-1 rounded-lg hover:bg-gray-200 gap-1 cursor-pointer' onClick={() => handleRidirect(val)}>
                                    <div className='h-4 w-4 rounded-full shrink-0' style={{ "backgroundColor": val.hexColor }}></div>
                                    <div >{val.name}</div>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </Modal>
    )
}