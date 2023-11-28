'use client'

import Image from "next/image"
import { useState } from "react"
import ViewProduct from "../modals/views/viewProduct"

export default function Product ({ details })
{
    const [openProduct, setOpenProduct] = useState(false)

    return (
        <div className="w-full md:w-[23%] bg-slate-900 h-80 border-slate-900 border">
            <ViewProduct status={openProduct} setStatus={setOpenProduct} details={details} />
            <div className='w-full h-60 relative hover:ring-4 cursor-pointer ring-indigo-400' onClick={()=>setOpenProduct(true)}>
                <Image 
                    src={`data:image/jpg;image/jpeg;image/png;base64, ${details?.image}`}
                    alt="product-img"
                    layout="fill"
                />
            </div>
            <div className="w-full text-white p-3">
                <p className="font-bold">{details.name}</p>
                <p>
                    {
                        Number(details.price).toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        })
                    }
                </p>
            </div>
        </div>
    )
}