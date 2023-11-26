'use client'

import ImagePreview from "@/app/components/imagePreview";
import Loader from "@/app/components/loader";
import CreatePackage from "@/app/components/modals/createPackage";
import ViewPackage from "@/app/components/modals/views/viewPackage";
import AdminNav from "@/app/components/navigation/adminNav";
import AdminTopNav from "@/app/components/navigation/adminTopNav";
import { csrf } from "@/app/hooks/csrf";
import axios from "@/app/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb"
import Swal from "sweetalert2";

export default function Packages () {

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [viewDetails, setViewDetails] = useState({})
    const [packages, setPackages] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.get('/api/package/index')
            .then(res=>{
                setPackages(res.data.data)
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

    const openView = id => {
        setViewDetails(packages[id])
        setIsViewOpen(true)
    }

    const confirmDelete = id => {
        Swal.fire({
            title: 'Delete',
            icon: 'warning',
            text: 'Are you sure you want to delete Package?',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                deletePackage(id)
            }
        })
    }

    const deletePackage = async (id) => {
        try {
            await csrf()
            await axios.post('/api/package/delete', {id: id})
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
            <main className="absolute w-full md:w-4/5 top-24 right-0 p-6">
                {/* <CreatePackage status={isOpenModal} setStatus={setIsOpenModal} load={getData} /> */}
                <ViewPackage status={isViewOpen} setStatus={setIsViewOpen} details={viewDetails} />
                <section className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Packages</p>
                    <div className="flex justify-end items-center gap-2 w-full">
                        <Link
                            href={'/packages/archive'}
                            className="block bg-rose-400 hover:bg-rose-400/80 text-center text-white p-1 w-full md:w-1/5"
                        >
                            archive
                        </Link>
                        <Link
                            className="block text-center p-1 w-full md:w-1/5 text-white bg-teal-400 hover:bg-teal-400/80"
                            href={'/packages/create'}
                        >
                            Add new
                        </Link>
                    </div>
                </section>
                <section className="w-full rounded-lg shadow-md border border-slate-900 p-6 mt-10">
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
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="relative">
                                    {
                                        packages.map((item,id)=>{
                                            return (
                                                <tr key={id} className="border-b border-slate-900">
                                                    <td className="p-2">{item?.name}</td>
                                                    <td className="p-2">{item?.total_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className="p-2">{item?.quantity}</td>
                                                    <td className="p-2">{item?.status}</td>
                                                    <td className="p-2">{item?.description}</td>
                                                    <td className="p-2"><ImagePreview source={item?.image} /></td>
                                                    <td className="text-white space-y-2 p-2">
                                                        <button
                                                            onClick={()=>openView(id)}
                                                            className="w-full p-2 bg-teal-400 hover:bg-teal-500 rounded-lg"
                                                        >
                                                            view
                                                        </button>
                                                        <Link
                                                            href={'/packages/edit/'+item.id}
                                                            className="block text-center w-full p-2 bg-cyan-400 hover:bg-cyan-500 rounded-lg"
                                                        >
                                                            edit
                                                        </Link>
                                                        <button
                                                            onClick={()=>confirmDelete(item.id)}
                                                            className="w-full p-2 bg-rose-600 hover:bg-rose-700 rounded-lg"
                                                        >
                                                            delete
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