'use client'

import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { useEffect, useState } from "react"
import axios from "@/app/lib/axios"
import { csrf } from "@/app/hooks/csrf"
import ProductCard from "@/app/components/cards/productCard"
import { AiOutlineClose } from "react-icons/ai"
import Swal from "sweetalert2"
import jwt from "jsonwebtoken"

export default function Customized () {

    const [types, setTypes] = useState([])
    const [products, setProducts] = useState([])
    const [productList, setProductList] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [packageForm, setPackageForm] = useState({
        name: '',
        product_type: '',
        quantity: '',
        total_price: 0,
        product_id: [],
        location: '',
        schedule: '',
        message: '',
        user_id: ''
    })
    const [openBookingModal, setOpenBookingModal] = useState(false)

    const handleForm = e => {
        const {name, value} = e.target
        setPackageForm({
            ...packageForm,
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
            product_type: e.target.value,
            total_price: 0
        })
        setFilteredProducts([])
    }

    function processProduct (data) {
        const seenTypes = {};
        const uniqueTypes = [];

        for (const item of data) {
            const type = item.product_type;
            if (!seenTypes[type]) {
            seenTypes[type] = true;
            uniqueTypes.push(type);
            }
        }
        setTypes(uniqueTypes)
        setProducts(data)
    }

    const removeProduct = index => {
        let result = [...filteredProducts]
        let list = [...productList]
        let id = []
        let price = 0
        const product = result[index]
        result.splice(index, 1)
        list.push(product)
        result.forEach(element=>{
            id.push(element.id)
            price += element.price
        })
        setFilteredProducts(result)
        setProductList(list)
        setPackageForm({
            ...packageForm,
            product_id: id,
            total_price: price
        })
    }

    const addProduct = index => {
        let list = [...productList]
        let filtered = [...filteredProducts]
        let id = []
        let price = 0
        const product = list[index]
        list.splice(index, 1)
        filtered.push(product)
        filtered.forEach(element=>{
            id.push(element.id)
            price += element.price
        })
        setProductList(list)
        setFilteredProducts(filtered)
        setPackageForm({
            ...packageForm,
            product_id: id,
            total_price: price
        })
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.get('/api/product/index')
                .then(res=>{
                    processProduct(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setPackageForm({
                ...packageForm,
                user_id: decoded?.payload?.id
            })
        }
    }, [])

    const submitCustomize = async (e) => {
        try {
            e.preventDefault()
            await csrf()
            await axios.post('/api/booking/customize', packageForm)
            .then(res=>{
                console.log(res)
                const token = localStorage.getItem('user_token')
                const decoded = jwt.decode(token, {complete: true})
                setPackageForm({
                    name: '',
                    product_type: '',
                    quantity: '',
                    total_price: 0,
                    product_id: [],
                    location: '',
                    schedule: '',
                    message: '',
                    user_id: decoded.payload.id
                })
                setProductList([])
                setFilteredProducts([])
                setOpenBookingModal(false)
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <CustomerTop />
            <Side />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <p className="text-3xl font-bold">Customized Package</p>
                <p className="text-sm">Create your own package</p>
                <section className="w-full mt-8 border border-slate-900 rounded-lg shadow-md p-6">
                    <form className="w-full md:flex gap-2" onSubmit={submitCustomize}>
                        <div className={`${openBookingModal ? 'fixed w-full h-full top-0 left-0 bg-slate-900/90 z-50 flex justify-center items-center' : 'hidden'}`}>
                            <div className="w-2/5 rounded-lg bg-white p-6 space-y-2">
                                <div className="w-full border border-gray-400 focus-within:border-indigo-400 focus-within:text-indigo-400 rounded-lg p-1">
                                    <label className="block w-full text-xs font-bold">Location</label>
                                    <input 
                                        type="text"
                                        className="w-full outline-none text-sm text-gray-700"
                                        name="location"
                                        onChange={handleForm}
                                        value={packageForm.location}
                                        required
                                    />
                                </div>
                                <div className="w-full border border-gray-400 focus-within:border-indigo-400 focus-within:text-indigo-400 rounded-lg p-1">
                                    <label className="block w-full text-xs font-bold">Schedule</label>
                                    <input 
                                        type="date"
                                        className="w-full outline-none text-sm text-gray-700"
                                        name="schedule"
                                        onChange={handleForm}
                                        value={packageForm.schedule}
                                        required
                                    />
                                </div>
                                <div className="w-full border border-gray-400 focus-within:border-indigo-400 focus-within:text-indigo-400 rounded-lg p-1">
                                    <label className="block w-full text-xs font-bold">Message</label>
                                    <textarea 
                                        className="w-full outline-none text-sm text-gray-700 resize-none"
                                        name="message"
                                        onChange={handleForm}
                                        value={packageForm.message}
                                    />
                                </div>
                                <div className="flex gap-2 text-white">
                                    <button
                                        type="submit"
                                        className="w-full md:w-1/2 p-2 rounded-lg bg-blue-400 hover:bg-blue-500"
                                    >
                                        BOOK NOW
                                    </button>
                                    <button
                                        type="button"
                                        onClick={()=>setOpenBookingModal(false)}
                                        className="w-full md:w-1/2 p-2 rounded-lg bg-rose-400 hover:bg-rose-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 space-y-2">
                            <div className="w-full border border-gray-400 focus-within:border-indigo-400 focus-within:text-indigo-400 rounded-lg p-1">
                                <label className="block w-full text-xs font-bold">Name</label>
                                <input 
                                    type="text"
                                    className="w-full outline-none text-sm text-gray-700"
                                    name="name"
                                    onChange={handleForm}
                                    value={packageForm.name}
                                    required
                                />
                            </div>
                            <div className="w-full border border-gray-400 focus-within:border-indigo-400 focus-within:text-indigo-400 rounded-lg p-1">
                                <label className="block w-full text-xs font-bold">Product Type</label>
                                <select
                                    className="w-full outline-none text-sm text-gray-700"
                                    name="product_type"
                                    onChange={handleProductType}
                                    value={packageForm.product_type}
                                    required
                                >
                                    <option>select</option>
                                    {
                                        types.map((item,id)=>{
                                            return (
                                                <option key={id} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="w-full border border-gray-400 focus-within:border-indigo-400 focus-within:text-indigo-400 rounded-lg p-1">
                                <label className="block w-full text-xs font-bold">Quantity</label>
                                <input 
                                    type="number"
                                    className="w-full outline-none text-sm text-gray-700"
                                    name="quantity"
                                    onChange={handleForm}
                                    value={packageForm.quantity}
                                    required
                                />
                            </div>
                            <div className="w-full bg-indigo-400 focus-within:ring-2 ring-indigo-600 rounded-lg p-1">
                                <label className="block w-full text-white text-xs font-bold">Price</label>
                                <input 
                                    type="number"
                                    className="w-full outline-none text-sm text-white bg-indigo-400"
                                    value={Number(packageForm.total_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    readOnly
                                />
                            </div>
                            <button 
                                type="button"
                                onClick={()=>setOpenBookingModal(true)}
                                className="w-full rounded-lg p-2 bg-cyan-400 hover:bg-cyan-500 text-white"
                            >
                                BOOK NOW
                            </button>
                        </div>
                        <div className="w-full md:w-1/3 space-y-2">
                            <div className="w-full h-80 overflow-y-scroll">
                                <label className="text-xs font-bold">Product List</label>
                                <ul className="w-full">
                                    {
                                        productList.map((item,id)=>{
                                            return (
                                                <li key={id} className="p-2 flex justify-between items-center border-b border-slate-900">
                                                    <span>{item.name}</span>
                                                    <button
                                                        type="button"
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
                        <div className="w-full md:w-1/3 space-y-2">
                            <div className="w-full h-80 flex flex-wrap gap-8 overflow-y-scroll p-1">
                                <label className="text-xs font-bold">Products</label>
                                {
                                    filteredProducts.map((item,id)=>{
                                        return (
                                            <div key={id} className="relative w-20 h-20 rounded-lg">
                                                <ProductCard product={item} />
                                                <button
                                                    type="button"
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
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}