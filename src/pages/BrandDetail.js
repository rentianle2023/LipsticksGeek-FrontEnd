import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import api from '../api/brands'
import Lipstick from "../components/Lipstick"


export default function BrandDetail() {

    const brandId = useParams().brandId
    const [lipsticks, setLipsticks] = useState()

    useEffect(() => {
        api.get(brandId + "/lipsticks")
            .then(res => setLipsticks(res.data))
    }, [brandId])


    return (
        <div>
            {
                lipsticks && lipsticks.map(lipstick => (
                    <Lipstick lipstick={lipstick} key={lipstick.id}/>
                ))
            }
        </div>
    )
}