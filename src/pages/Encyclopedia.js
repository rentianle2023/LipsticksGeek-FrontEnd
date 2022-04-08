import { useEffect, useState } from "react"
import api from '../api/brands'
import Brand from "../components/Brand"
import { SearchIcon } from "@heroicons/react/outline"
import ModalWindow from "../components/ModalWindow"

export default function Encyclopedia() {

    const [brands, setBrands] = useState()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await api.get('/brands')
                setBrands(response.data)
            } catch (err) {
                //Not in the 200 response range
            }
        }
        fetchBrands()
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
                showModal &&
                <div className="fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-40 flex justify-center items-center disabled" onClick={onOverlayClick}>
                    <div className="w-3/5 bg-white rounded-lg p-3 border-2 shadow-xl h-80 flex flex-col" onClick={onModalClick}>
                        <input type="text" placeholder="输入..." className="w-full p-2 border border-gray-200 rounded-lg"></input>
                        <div className="mt-5">最近查询</div>
                        <div className="bg-gray-100 w-full h-0.5"></div>
                        <div className="mt-5">查询1</div>
                        <div className="mt-5">查询2</div>
                        <div className="mt-5">查询3</div>
                    </div>
                </div>
            }
            <div className="flex w-3/5 mx-auto mt-8 p-2 text-gray-400 border-2 shadow-md rounded-lg" onClick={() => setShowModal(true)}>
                <SearchIcon className="w-5 h-5" />
                <span>快速查找</span>
            </div>
            {brands && brands.map(brand =>
                (<Brand brand={brand} />)
            )
            }
        </div>
    )
}