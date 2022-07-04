import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import api from '../../api/brands'
import Lipstick from "../../components/Lipstick"


export default function BrandDetail() {

    const { brandId } = useParams()
    const [lipsticks, setLipsticks] = useState()
    const [brand, setBrand] = useState()

    useEffect(() => {
        api.get(brandId + "/lipsticks")
            .then(res => setLipsticks(res.data))
    }, [brandId])

    const ByColorcntDesc = (lipstickOne, lipstickTwo) => {
        return lipstickTwo.colors.length - lipstickOne.colors.length
    }


    return (
        <div className="sm:flex sm:flex-row sm:flex-wrap items-stretch ">
            {
                lipsticks && lipsticks.sort(ByColorcntDesc).map(lipstick => (
                    <div className="sm:w-1/3 p-8">
                        <Lipstick lipstick={lipstick} key={lipstick.id} />
                    </div>
                ))
            }


        </div>
    )
}