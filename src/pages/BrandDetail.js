import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import api from '../api/brands'
import Lipstick from "../components/Lipstick"


export default function BrandDetail() {

    const brandId = useParams().brandId
    const [lipsticks, setLipsticks] = useState()

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await api.get('/lipsticks/' + brandId)
                setLipsticks(response.data)
            } catch (err) {
                //Not in the 200 response range
            }
        }
        fetchBrands()
    }, [])


    return (
        <div>
            {
                lipsticks && lipsticks.map(lipstick => (
                    <Lipstick lipstick={lipstick} />
                ))
            }
        </div>
    )
}