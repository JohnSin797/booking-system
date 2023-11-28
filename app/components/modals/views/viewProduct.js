'use client'

import Image from "next/image"
import { AiOutlineClose } from "react-icons/ai"

export default function ViewProduct ({ status, setStatus, details })
{

    return (
        <section 
            className={`${status ? 
                'fixed w-full h-full top-0 left-0 z-50 bg-slate-900/90 flex justify-center items-center' 
                : 
                'hidden'}`}
        >
            <div className="w-full md:w-3/5 bg-white rounded-lg p-6 space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">View Product</p>
                    <button
                        onClick={()=>setStatus(false)}
                        className="hover:text-red-600"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex gap-2">
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="name" className="text-xs font-bold w-full block">Name</label>
                            <input 
                                type="text"
                                id="name"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="name"
                                value={details.name}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="price" className="text-xs font-bold w-full block">Price</label>
                            <input 
                                type="number"
                                id="price"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="price"
                                value={details.price}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="status" className="text-xs font-bold w-full block">Status</label>
                            <input 
                                className="w-full outline-none text-gray-800 text-sm"
                                value={details.status}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="quantity" className="text-xs font-bold w-full block">Quantity</label>
                            <input 
                                type="number"
                                id="quantity"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="quantity"
                                value={details.quantity}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-full md:w-1/2 space-y-3">
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="product_type" className="text-xs font-bold w-full block">Product Type</label>
                                <input 
                                    type="text"
                                    id="product_type"
                                    className="w-full outline-none text-gray-800 text-sm"
                                    name="product_type"
                                    value={details.product_type}
                                    readOnly
                                />
                            </div>
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="description" className="text-xs font-bold w-full block">Description</label>
                                <textarea 
                                    type="text"
                                    id="description"
                                    rows={7}
                                    className="w-full outline-none resize-none text-gray-800 text-sm"
                                    name="description"
                                    value={details.description}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <p className="text-xs font-bold">Image</p>
                            <label htmlFor="image" className="relative block w-full h-[200px] max-h-[200px] focus-within:text-indigo-400">
                                <Image 
                                    src={`data:image/jpg;image/jpeg;image/png;base64, ${details?.image}`}
                                    alt="product-image"
                                    layout="fill"
                                    className="z-10"
                                />
                                <p className="absolute top-20 left-40">click to upload</p>
                            </label>
                        </div>
                    </div>
            </div>
        </section>
    )
}