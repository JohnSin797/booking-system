'use client'

import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { useState, useEffect } from "react"
import Image from "next/image"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import ProductCard from "@/app/components/cards/productCard"
import { AiOutlineClose } from "react-icons/ai"
import Swal from "sweetalert2"

export default function Create ()
{

    const [packageForm, setPackageForm] = useState({
        name: '',
        product_type: '',
        quantity: '',
        total_price: 0,
        product_id: [],
        status: 'active',
        image: '',
        description: '',
        capital: 0,
    })
    const [types, setTypes] = useState([])
    const [products, setProducts] = useState([])
    const [productList, setProductList] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [packageImage, setPackageImage] = useState('')

    const handleForm = e => {
        const {name, value} = e.target
        setPackageForm({
            ...packageForm,
            [name]: value
        })
    }

    const handlePackageImage = e => {
        const file = e.target.files[0]
        setPackageImage(URL.createObjectURL(file))
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64String = e.target.result.split(',')[1];
                
            setPackageForm({
                ...packageForm,
                image: base64String
            })
        }

        reader.readAsDataURL(file)
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
            product_type: e.target.value
        })
    }

    const removeProduct = index => {
        let result = [...filteredProducts]
        let list = [...productList]
        let id = []
        const product = result[index]
        result.splice(index, 1)
        list.push(product)
        result.forEach(element=>{
            id.push(element.id)
        })
        setFilteredProducts(result)
        setProductList(list)
        setPackageForm({
            ...packageForm,
            product_id: id
        })
    }

    const addProduct = index => {
        let list = [...productList]
        let filtered = [...filteredProducts]
        let id = []
        const product = list[index]
        list.splice(index, 1)
        filtered.push(product)
        filtered.forEach(element=>{
            id.push(element.id)
        })
        setProductList(list)
        setFilteredProducts(filtered)
        setPackageForm({
            ...packageForm,
            product_id: id
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
    }, [])

    const submitPackageForm = async () => {
        try {
            await csrf()
            await axios.post('/api/package/store', packageForm)
            .then(res=>{
                Swal.fire(res.data.message)
                setPackageForm({
                    name: '',
                    product_type: '',
                    quantity: '',
                    total_price: 0,
                    product_id: [],
                    status: 'active',
                    image: '',
                    description: '',
                    capital: 0,
                })
                setProductList([])
                setFilteredProducts([])
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <section className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Create new Package</p>
                    
                    <button 
                        className="w-full md:w-1/5 text-white p-1 bg-teal-400 hover:bg-teal-500"
                        onClick={submitPackageForm}
                    >
                        create
                    </button>
                </section>
                <section className="w-full border border-slate-900 rounded-lg p-6 mt-6">
                    <div className="flex gap-2 items-center">
                        <div className="w-full md:w-1/3 space-y-2">
                            <p className="text-xs font-bold">Products</p>
                            <div className="w-full h-40 overflow-y-scroll border border-gray-400 p-2 rounded-lg flex flex-wrap gap-2">
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
                        
                        <div className="w-full md:w-1/3 space-y-2">
                            <p className="text-xs font-bold">Products</p>
                            <div className="w-full h-40 border border-gray-400 p-2 rounded-lg overflow-y-scroll flex flex-wrap gap-5 p-3">
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
                        </div>
                        <div className="w-full md:w-1/3 space-y-2">
                            <p className="text-xs font-bold">Image</p>
                            <div className="w-full h-40 border border-gray-400 rounded-lg overflow-hidden flex flex-wrap gap-5 p-3">
                                <label htmlFor="package-img" className="text-xs font-bold w-full h-full">
                                    <div className="w-full flex justify-center items-center">
                                        <div className="w-full h-40 relative">
                                            <Image 
                                                src={packageImage}
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
                        </div>
                    </div>
                </section>
                <section className="w-full border border-slate-900 rounded-lg p-6 mt-2 space-y-2">
                    <div className="flex gap-2 items-center">
                        <div className="w-full md:w-1/3 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="name" className="text-xs font-bold w-full block">Name</label>
                            <input 
                                type="text"
                                id="name"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="name"
                                onChange={handleForm}
                                value={packageForm.name}
                            />
                        </div>
                        <div className="w-full md:w-1/3 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="price" className="text-xs font-bold w-full block">Product Type</label>
                            <select 
                                type="number"
                                id="product_type"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="price"
                                onChange={handleProductType}
                                value={packageForm.product_type}
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
                        <div className="w-full md:w-1/3 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="quantity" className="text-xs font-bold w-full block">Quantity</label>
                            <input 
                                type="number"
                                id="quantity"
                                className="w-full outline-none text-gray-800 text-sm"
                                name="quantity"
                                onChange={handleForm}
                                value={packageForm.quantity}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-full md:w-2/3 space-y-2">
                            <div className="flex gap-2 items-center">
                                <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                        <label htmlFor="price" className="text-xs font-bold w-full block">Price</label>
                                        <input 
                                            type="number"
                                            id="price"
                                            className="w-full outline-none text-gray-800 text-sm"
                                            name="total_price"
                                            onChange={handleForm}
                                            value={packageForm.total_price}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                        <label htmlFor="status" className="text-xs font-bold w-full block">Status</label>
                                        <select 
                                            id="status"
                                            className="w-full outline-none text-gray-800 text-sm"
                                            name="status"
                                            onChange={handleForm}
                                            value={packageForm.status}
                                        >
                                            <option value={'active'}>ACTIVE</option>
                                            <option value={'inactive'}>INACTIVE</option>
                                        </select>
                                    </div>
                            </div>
                            <div className="flex gap-2 items-center w-full">
                                <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                        <label htmlFor="price" className="text-xs font-bold w-full block">Capital</label>
                                        <input 
                                            type="number"
                                            id="capital"
                                            className="w-full outline-none text-gray-800 text-sm"
                                            name="capital"
                                            onChange={handleForm}
                                            value={packageForm.capital}
                                        />
                                    </div>
                                    {/* <div className="w-full md:w-1/2 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                                        <label htmlFor="status" className="text-xs font-bold w-full block">Service</label>
                                        <input 
                                            type="number"
                                            id="service"
                                            className="w-full outline-none text-gray-800 text-sm"
                                            name="service"
                                            onChange={handleForm}
                                            value={Number(packageForm.service).toFixed(2)}
                                        />
                                    </div> */}
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 rounded-lg border border-gray-400 p-1 focus-within:text-indigo-400 focus-within:border-indigo-400">
                            <label htmlFor="description" className="text-xs font-bold w-full block">Description</label>
                            <textarea 
                                type="text"
                                id="description"
                                rows={3}
                                className="w-full outline-none text-gray-800 text-sm resize-none"
                                name="description"
                                onChange={handleForm}
                                value={packageForm.description}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}