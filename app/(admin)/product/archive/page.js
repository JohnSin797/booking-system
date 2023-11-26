'use client'

import DateFrame from "@/app/components/dateFrame"
import ImagePreview from "@/app/components/imagePreview"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsTrashFill } from "react-icons/bs"
import { TbFidgetSpinner } from "react-icons/tb"
import { FaTrashRestoreAlt } from "react-icons/fa";
import Swal from "sweetalert2"

export default function Archive ()
{
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState([])

    const getData = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.get('/api/product/archive')
            .then(res=>{
                setProduct(res.data.data)
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

    const confirmDelete = id => {
        Swal.fire({
            title: 'Delete Product',
            icon: 'warning',
            text: 'Deleting from the archive means permanent delete. Are you sure you want to delete Product?',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                destroyProduct(id)
            }
        })
    }

    const destroyProduct = async (id) => {
        try {
            await csrf()
            await axios.post('/api/product/destroy', {id: id})
            .then(res=>{
                getData()
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

    const confirmRestore = id => {
        Swal.fire({
            title: 'Restore Product',
            icon: 'question',
            text: 'Are you sure you want to restore Product?',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                restoreProduct(id)
            }
        })
    }

    const restoreProduct = async (id) => {
        try {
            await csrf()
            await axios.post('/api/product/restore', {id: id})
            .then(res=>{
                getData()
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
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <section className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Product Archive</p>
                    <Link
                        href={'/product'}
                        className="block p-1 w-1/5 text-white text-center bg-gray-400 hover:bg-gray-400/80"
                    >
                        back
                    </Link>
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
                                <thead className="w-full sticky top-0">
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Date Deleted</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((prod,idx)=>{
                                            return (
                                                <tr key={idx} className="border-b border-slate-900">
                                                    <td className="p-2">{prod?.name}</td>
                                                    <td className="p-2">
                                                        <ImagePreview source={prod?.image} />
                                                    </td>
                                                    <td className="p-2">{prod?.price}</td>
                                                    <td className="p-2">{prod?.quantity}</td>
                                                    <td className="p-2">{prod?.status}</td>
                                                    <td className="p-2">{prod?.description}</td>
                                                    <td className="p-2"><DateFrame dateStr={prod.deleted_at} /></td>
                                                    <td className="p-2 text-white space-x-2">
                                                        <button
                                                            onClick={()=>confirmRestore(prod.id)}
                                                            className="bg-teal-400 hover:bg-teal-500 p-2 rounded-lg"
                                                        >
                                                            <FaTrashRestoreAlt className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={()=>confirmDelete(prod.id)}
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