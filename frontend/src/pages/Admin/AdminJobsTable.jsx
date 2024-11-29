import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye, MoreHorizontal, Pen } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminJobsTable = () => {
    const navigate = useNavigate()
    const {adminJobs , searchJobQuery} = useSelector(store => store.job)
    const [filterSearch , SetFilterSearch] = useState(adminJobs)

    useEffect(()=>{
        const search = adminJobs.filter((job)=>{
            if(!searchJobQuery){
                return true
            }else{
                return job?.title?.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                job?.createdAt?.split("T")[0]?.toLowerCase().includes(searchJobQuery.toLowerCase()) 
            }
        })
        SetFilterSearch(search)
    },[searchJobQuery , adminJobs])

    return (
        <div className="mt-9 p-2 overflow-x-auto shadow-lg rounded-lg border bg-white dark:bg-gray-800">
            <Table className="min-w-full">
                <TableCaption className="font-semibold text-[10px] text-gray-700 mt-7 dark:text-gray-300">
                    A list of your recent companies
                </TableCaption>
                <TableHeader>
                    <TableRow className="text-[7px] lg:text-[13px] md:text-[12px]" >
                        <TableHead className="w-[15%] text-gray-600 dark:text-gray-300">
                            Company
                        </TableHead>
                        <TableHead className="text-gray-600 dark:text-gray-300">
                            Role
                        </TableHead>
                        <TableHead className="text-gray-600 dark:text-gray-300">
                            Date
                        </TableHead>
                        <TableHead className="text-right text-gray-600 dark:text-gray-300">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterSearch?.map((job, index) => {
                            return (
                                <TableRow
                                    key={job._id}
                                    className="text-[7px] lg:text-[14px] md:text-[13px] hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
                                >
                                    <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                        {job?.company?.name}
                                    </TableCell>
                                    <TableCell className="text-gray-700 dark:text-gray-300">
                                        {job?.title}
                                    </TableCell>
                                    <TableCell className="text-gray-500 dark:text-gray-400">
                                        {job?.createdAt?.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                                <MoreHorizontal size={18} />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-36 py-2 bg-white shadow-md rounded-lg dark:bg-gray-700 dark:shadow-lg">
                                                <div className='flex flex-col gap-1'>
                                                    <div className="flex gap-2 w-fit items-center cursor-pointer text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 p-2 rounded-md">
                                                        <Eye width={15} height={15} />
                                                        <p onClick={()=> navigate(`/admin/jobs/${job._id}/applicant`)} >View Applicant</p>
                                                    </div>
                                                    {/* <div className="flex gap-2 w-fit items-center cursor-pointer text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 p-2 rounded-md">
                                                        <Pen width={15} height={15} />
                                                        <p onClick={()=>navigate(`/admin/jobs/${job._id}/edit`)} >Edit</p>
                                                    </div> */}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
