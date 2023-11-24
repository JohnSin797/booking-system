'use client'

import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Edit ({ params }) {

    const [packageDetails, setPackageDetails] = useState({

    })
    const [filteredProducts, setFilteredProducts] = useState([])
    const [packageForm, setPackageForm] = useState({
        name: '',
        product_type: '',
        quantity: '',
        total_price: 0,
        product_id: [],
        status: 'active',
        image: '',
        description: ''
    })
    const [types, setTypes] = useState([])
    const [packageImage, setPackageImage] = useState('')
    const [productList, setProductList] = useState([])

    const handleForm = e => {
        const {name, value} = e.target
        setPackageDetails({
            ...packageDetails,
            [name]: value
        })
    }

    const handleProductType = e => {
        let result = []
        products.forEach(element=>{
            if(element.product_type == e.target.value) {
                result.push(element)
            }
        })
        setProductList(result)
        setPackageForm({
            ...packageForm,
            product_id: [],
            product_type: e.target.value
        })
        setFilteredProducts([])
    }

    const handlePackageImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64String = e.target.result.split(',')[1];
                
            setPackageDetails({
                ...packageForm,
                image: base64String
            })
        }

        reader.readAsDataURL(file)
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.post('/api/package/show', {id: params.slug})
                .then(res=>{
                    setPackageDetails(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const submitUpdateForm = async () => {

    }

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <p className="text-3xl font-bold">Edit Package</p>
                <section className="mt-8 border border-slate-900 rounded-lg p-6">
                    <div className="w-full flex gap-2 mt-10">
                        <div className="w-full md:w-1/2 space-y-2">
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="name" className="text-xs font-bold w-full block">Name</label>
                                <input 
                                    type="text"
                                    id="name"
                                    className="w-full outline-none text-gray-800 text-sm"
                                    name="name"
                                    onChange={handleForm}
                                    value={packageDetails.name}
                                />
                            </div>
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="price" className="text-xs font-bold w-full block">Product Type</label>
                                <select 
                                    type="number"
                                    id="product_type"
                                    className="w-full outline-none text-gray-800 text-sm"
                                    name="price"
                                    onChange={handleProductType}
                                    value={packageDetails.product_type}
                                >
                                    <option>select product type</option>
                                    {
                                        types.map((item,id)=>{
                                            return (
                                                <option key={id} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="quantity" className="text-xs font-bold w-full block">Quantity</label>
                                <input 
                                    type="number"
                                    id="quantity"
                                    className="w-full outline-none text-gray-800 text-sm"
                                    name="quantity"
                                    onChange={handleForm}
                                    value={packageDetails.quantity}
                                />
                            </div>
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="price" className="text-xs font-bold w-full block">Price</label>
                                <input 
                                    type="number"
                                    id="price"
                                    className="w-full outline-none text-gray-800 text-sm"
                                    name="total_price"
                                    onChange={handleForm}
                                    value={Number(packageDetails.total_price).toFixed(2)}
                                />
                            </div>
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="status" className="text-xs font-bold w-full block">Status</label>
                                <select 
                                    id="status"
                                    className="w-full outline-none text-gray-800 text-sm"
                                    name="status"
                                    onChange={handleForm}
                                    value={packageDetails.status}
                                >
                                    <option value={'active'}>ACTIVE</option>
                                    <option value={'inactive'}>INACTIVE</option>
                                </select>
                            </div>
                            <div className="w-full rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                <label htmlFor="description" className="text-xs font-bold w-full block">Description</label>
                                <textarea 
                                    type="text"
                                    id="description"
                                    rows={6}
                                    className="w-full outline-none text-gray-800 text-sm resize-none"
                                    name="description"
                                    onChange={handleForm}
                                    value={packageDetails.description}
                                />
                            </div>
                            <button 
                                className="w-full rounded-lg text-white p-2 bg-teal-400 hover:bg-teal-500"
                                onClick={submitUpdateForm}
                            >
                                create
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 space-y-2">
                            <div className="w-full h-40 border border-gray-400 p-2 rounded-lg">
                                <label htmlFor="package-img" className="text-xs font-bold w-full h-full cursor-pointer">
                                    Image
                                    <div className="w-full flex justify-center items-center">
                                        <div className="border md:w-3/5 md:h-28 relative">
                                            <Image 
                                                src={`data:image/jpeg;image/jpg;image/png;base64, ${packageDetails?.image}`}
                                                alt="package_img"
                                                layout="fill"
                                            />
                                        </div>
                                    </div>
                                </label>
                                <input 
                                    id="package-img"
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    className="hidden"
                                    onChange={handlePackageImage}
                                />
                            </div>
                            <div className="w-full space-y-2 border border-gray-400 p-2 rounded-lg">
                                <p className="text-xs font-bold">Products</p>
                                <div className="w-full h-40 overflow-y-scroll flex flex-wrap gap-5 p-3">
                                    {
                                        filteredProducts.map((item,id)=>{
                                            return (
                                                <div key={id} className="relative w-20 h-20 rounded-lg">
                                                    <ProductCard product={item} />
                                                    <button
                                                        onClick={()=>removeProduct(id)}
                                                        className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-500 text-white rounded-full p-1 text-sm"
                                                    >
                                                        <AiOutlineClose />
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="w-full h-32 overflow-y-scroll flex flex-wrap gap-2">
                                    <ul className="w-full">
                                        {
                                            productList.map((item,id)=>{
                                                return (
                                                    <li key={id} className="p-2 flex justify-between items-center border-b border-slate-900">
                                                        <span>{item.name}</span>
                                                        <button
                                                            onClick={()=>addProduct(id)}
                                                            className="p-1 rounded-lg bg-teal-400 text-white w-1/5"
                                                        >
                                                            add
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}