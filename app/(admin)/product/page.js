'use client'

import ImagePreview from "@/app/components/imagePreview"
import CreateProduct from "@/app/components/modals/createProduct"
import ProductEdit from "@/app/components/modals/edit/productEdit"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import Loading from "@/app/loading"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { AiFillEdit } from "react-icons/ai"
import { BsTrashFill } from "react-icons/bs"
import { TbFidgetSpinner } from "react-icons/tb"
import Swal from "sweetalert2"

export default function Product () {

    const [products, setProducts] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [productDetails, setProductDetails] = useState({
        image: ''
    })

    const getData = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.get('/api/product/index')
            .then(res=>{
                console.log(res)
                setProducts(res.data.data)
                setIsLoading(false)
            })
            .catch(err=>{
                console.log(err)
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete Product?',
            icon: 'warning',
            text: 'Deleting Products may affect recorded Packages and Bookings. Are you sure you want to continue?',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                deleteProduct(id)
            }
        })
    }

    const deleteProduct = async (id) => {
        try {
            await csrf()
            await axios.post('/api/product/delete', {id: id})
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const openEditProduct = index => {
        setProductDetails(products[index])
        setIsEditOpen(true)
    }

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-24 right-0 p-6">
                <CreateProduct status={isOpenModal} setStatus={setIsOpenModal} />
                <ProductEdit status={isEditOpen} setStatus={setIsEditOpen} details={productDetails} setDetails={setProductDetails} />
                <section className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Products</p>
                    <button
                        className="p-1 w-1/5 text-white bg-teal-400 hover:bg-teal-400/80"
                        onClick={()=>setIsOpenModal(true)}
                    >
                        Add new
                    </button>
                </section>
                <section className="w-full mt-10 rounded-lg shadow-md p-6 border border-slate-900">
                    <div className="w-full h-96 overflow-y-scroll relative">
                        {
                            isLoading ?
                            <div className="absolute w-full h-full bg-slate-900 text-white flex justify-center items-center">
                                <TbFidgetSpinner className="w-5 h-5 animate-spin" />
                            </div>
                            :
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((item, id)=>{
                                            return (
                                                <tr key={id} className="border-b border-slate-900">
                                                    <td className="p-2">{item?.name}</td>
                                                    <td className="p-2">
                                                        <ImagePreview source={item?.image} />
                                                    </td>
                                                    <td className="p-2">{item?.price}</td>
                                                    <td className="p-2">{item?.quantity}</td>
                                                    <td className="p-2">{item?.status}</td>
                                                    <td className="p-2">{item?.description}</td>
                                                    <td className="p-2 text-white space-x-2">
                                                        <button
                                                            onClick={()=>openEditProduct(id)}
                                                            className="bg-teal-400 hover:bg-teal-500 p-2 rounded-lg"
                                                        >
                                                            <AiFillEdit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={()=>confirmDelete(item.id)}
                                                            className="bg-red-400 hover:bg-red-500 p-2 rounded-lg"
                                                        >
                                                            <BsTrashFill className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </section>
            </main>
        </>
    )
}