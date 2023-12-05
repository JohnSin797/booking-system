'use client'

import Image from "next/image"

export default function ProductCard ({ product }) {

    return (
                <Image 
                    src={`data:image/jpg;image/jpeg;image/png;base64, ${product?.image}`}
                    alt="product"
                    layout="fill"
                />
    )
}