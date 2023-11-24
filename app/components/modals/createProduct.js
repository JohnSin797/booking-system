'use client'

import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"
import { useState } from "react"
import axios from "@/app/lib/axios"
import Swal from "sweetalert2"
import { csrf } from "@/app/hooks/csrf"

export default function CreateProduct ({ status, setStatus }) {

    const [productForm, setProductForm] = useState({
        name: '',
        product_type: '',
        image: '',
        price: 0,
        quantity: 0,
        status: 'active',
        description: ''
    })
    const [imagePreview, setImagePreview] = useState('')

    const handleImage = e => {
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64String = e.target.result.split(',')[1];
                
                setProductForm({
                    ...productForm,
                    image: base64String
                })
            };

            reader.readAsDataURL(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleForm = e => {
        const {name, value} = e.target
        setProductForm({
            ...productForm,
            [name]: value
        })
    }

    const cancel = () => {
        setProductForm({
            name: '',
            product_type: '',
            image: '',
            price: 0,
            quantity: 0,
            status: 'active',
            description: ''
        })
        setStatus(false)
    }

    const submitForm = async () => {
        try {
            await csrf()
            await axios.post('/api/product/store', {
                name: productForm.name,
                product_type: productForm.product_type,
                price: productForm.price,
                quantity: productForm.quantity,
                status: productForm.status,
                description: productForm.description,
                image: productForm.image
            })
            .then(res=>{
                setProductForm({
                    name: '',
                    product_type: '',
                    image: '',
                    price: 0,
                    quantity: 0,
                    status: 'active',
                    description: ''
                })
                setImagePreview('')
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${status ? 'fixed w-full h-full top-0 right-0 bg-slate-900/90 flex justify-center items-center z-50' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-6 w-full md:w-2/3 relative">
                <button
                    onClick={()=>setStatus(false)}
                    className="absolute right-3 top-3 hover:text-red-600"
                >
                    <AiOutlineClose className="w-5 h-5" />
                </button>
                <p className="text-xl font-bold">Add new Product</p>
                <div className="w-full space-y-2 mt-10">
                    <div className="flex gap-2">
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="name" className="text-xs font-bold w-full block">Name</label>
                            <input 
                                type="text"
                                id="name"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="name"
                                onChange={handleForm}
                                value={productForm.name}
                            />
                        </div>
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="price" className="text-xs font-bold w-full block">Price</label>
                            <input 
                                type="number"
                                id="price"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="price"
                                onChange={handleForm}
                                value={productForm.price}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="status" className="text-xs font-bold w-full block">Status</label>
                            <select
                                id="status"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="status"
                                onChange={handleForm}
                                value={productForm.status}
                            >
                                <option value={'active'}>ACTIVE</option>
                                <option value={'inactive'}>INACTIVE</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="quantity" className="text-xs font-bold w-full block">Quantity</label>
                            <input 
                                type="number"
                                id="quantity"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="quantity"
                                onChange={handleForm}
                                value={productForm.quantity}
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
                                    onChange={handleForm}
                                    value={productForm.product_type}
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
                                    onChange={handleForm}
                                    value={productForm.description}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <p className="text-xs font-bold">Image</p>
                            <label htmlFor="image" className="relative block w-full h-[200px] max-h-[200px] focus-within:text-indigo-400">
                                <Image 
                                    src={imagePreview}
                                    alt="product-image"
                                    layout="fill"
                                    className="z-10"
                                />
                                <p className="absolute top-20 left-40">click to upload</p>
                            </label>
                            <input 
                                type="file"
                                id="image"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleImage}
                                className="w-full outline-none text-sm hidden"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={submitForm}
                            className="w-full md:w-1/4 bg-cyan-400 hover:bg-cyan-500 text-white p-2 rounded-lg"
                        >
                            create
                        </button>
                        <button
                            onClick={cancel}
                            className="w-full md:w-1/4 bg-rose-400 hover:bg-rose-500 text-white p-2 rounded-lg"
                        >
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}