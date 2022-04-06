import React from "react"
import data from "./data"

export default function Encyclopedia() {

    const [brands, setBrands] = React.useState(data)

    const brandsElement = brands.map(brand =>
        (
            <div className="bg-gray-500 rounded-lg w-4/5 mx-auto text-center m-5 p-4" key={brand.id}>
                <div className="uppercase">
                    {brand.name} - <a href={brand.websiteUrl}>进入官网</a>
                </div>
                <div>
                    <img src={brand.logoImage} className='h-20 mx-auto'/>
                </div>
            </div>

        )   
    )

    return (
        <div>
            {brandsElement}
        </div>
    )
}