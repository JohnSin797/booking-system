'use client'

import ImagePreview from "../../imagePreview"
import { AiOutlineClose } from "react-icons/ai"
import ProductCard from "../../cards/productCard"
import Image from "next/image"

export default function ViewPackage ({ status, setStatus, details }) {
    console.log(details)
    return (
        <section
            className={`${status ? 'fixed w-full h-full top-0 right-0 bg-slate-900/90 flex justify-center items-center z-50' : 'hidden'}`}
        >
            <div className="bg-white rounded-lg p-6 w-full md:w-2/3 relative">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">View Package</p>
                    <button
                        onClick={()=>setStatus(false)}
                        className="hover:text-red-600"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                </div>
                <div className="w-full flex gap-2 mt-10">
                    <div className="w-full md:w-1/2 space-y-2">
                        <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="name" className="text-xs font-bold w-full block">Name</label>
                            <input 
                                type="text"
                                id="name"
                                className="w-full outline-none text-gray-800 text-sm"
                                value={details.name}
                                readOnly
                            />
                        </div>
                        <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="price" className="text-xs font-bold w-full block">Product Type</label>
                            <input 
                                type="text"
                                id="name"
                                className="w-full outline-none text-gray-800 text-sm"
                                value={details.product_type}
                                readOnly
                            />
                        </div>
                        <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="quantity" className="text-xs font-bold w-full block">Quantity</label>
                            <input 
                                type="number"
                                id="quantity"
                                className="w-full outline-none text-gray-800 text-sm"
                                value={details.quantity}
                                readOnly
                            />
                        </div>
                        <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="price" className="text-xs font-bold w-full block">Price</label>
                            <input 
                                type="number"
                                id="price"
                                className="w-full outline-none text-gray-800 text-sm"
                                value={details.total_price}
                                readOnly
                            />
                        </div>
                        <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="status" className="text-xs font-bold w-full block">Status</label>
                            <input 
                                type="text"
                                id="name"
                                className="w-full outline-none text-gray-800 text-sm"
                                value={details.status}
                                readOnly
                            />
                        </div>
                        <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="description" className="text-xs font-bold w-full block">Description</label>
                            <textarea 
                                type="text"
                                id="description"
                                rows={8}
                                className="w-full outline-none text-gray-800 text-sm resize-none"
                                value={details.description}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-2">
                        <div className="w-full h-40 border border-gray-400 p-2 rounded-lg">
                            <label className="text-xs font-bold w-full h-full">
                                Image
                                <div className="w-full flex justify-center items-center">
                                    <div className="border md:w-3/5 md:h-28 relative">
                                        <Image 
                                            src={`data:image/jpg;image/jpeg;image/png;base64, ${details.image}`}
                                            alt="image"
                                            layout="fill"
                                        />
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className="w-full space-y-2 border border-gray-400 p-2 rounded-lg">
                            <p className="text-xs font-bold">Products</p>
                            <div className="w-full h-72 overflow-y-scroll flex flex-wrap gap-5 p-3">
                                {
                                    details?.package_item?.map((item,idx)=>{
                                        return (
                                            <div className="w-20">
                                                <div key={idx} className="relative w-20 h-20 rounded-lg">
                                                    <Image 
                                                        src={`data:image/jpg;image/jpeg;image/png;base64, ${item?.product?.image}`}
                                                        alt="product-img"
                                                        layout="fill"
                                                    />
                                                    {/* <ProductCard product={item?.product} /> */}
                                                </div>
                                                <p className="text-xs font-bold">{item?.product?.name} asd asd ajgjgjd asd</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}