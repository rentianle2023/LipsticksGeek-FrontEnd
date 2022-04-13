import { useEffect, useState } from "react"
import api from '../api/brands'
import Brand from "../components/Brand"
import SearchModal from "../components/SearchModal"
import { SearchIcon } from "@heroicons/react/outline"

export default function Encyclopedia() {

    const [brands, setBrands] = useState()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        api.get()
            .then(res => setBrands(res.data))
    }, [])

    function onOverlayClick(e) {
        setShowModal(false)
        e.stopPropagation()
    }

    function onModalClick(e){
        e.stopPropagation()
    }

    return (
        <div>
            {
                showModal && <SearchModal onModalClick={(e) => onModalClick(e)} onOverlayClick={(e) => onOverlayClick(e)}/>
            }
            <div className="flex w-3/5 mx-auto mt-8 p-2 text-gray-400 border-2 shadow-md rounded-lg" onClick={() => setShowModal(true)}>
                <SearchIcon className="w-5 h-5" />
                <span>快速查找</span>
            </div>
            {brands && brands.map(brand =>
                (<Brand brand={brand} key={brand.id}/>)
            )
            }
        </div>
    )
}