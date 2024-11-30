import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useSelector } from 'react-redux'
import useAllApplicant from '@/hooks/useAllApplicant'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const ApplicantsTable = () => {
    const params = useParams()
    const {allApplicant} = useSelector(store => store.applicaation)
    useAllApplicant(params.id)

    const statusHandler = async (status , applicantId) =>{
        try {
            const res = await axios.post(`https://job-port-dryp.onrender.com/api/application/status/${applicantId}/update` , {status} , {withCredentials : true})
            if(res.data.success){
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="mt-10 mb-10">
            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <TableCaption className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
                        A list of your recent applied users.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-sm font-medium text-left text-gray-600 dark:text-gray-300">Full Name</TableHead>
                            <TableHead className="text-sm font-medium text-left text-gray-600 dark:text-gray-300">Email</TableHead>
                            <TableHead className="text-sm font-medium text-left text-gray-600 dark:text-gray-300">Contact</TableHead>
                            <TableHead className="text-sm font-medium text-right text-gray-600 dark:text-gray-300">Resume</TableHead>
                            <TableHead className="text-sm font-medium text-right text-gray-600 dark:text-gray-300">Date</TableHead>
                            <TableHead className="text-sm font-medium text-right text-gray-600 dark:text-gray-300">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allApplicant?.applications?.map((item) => {
                            return (
                                <TableRow key={ item?._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <TableCell className="font-medium text-sm text-gray-700 dark:text-gray-200">{item?.applicant?.fullname}</TableCell>
                                    <TableCell className="text-sm text-gray-700 dark:text-gray-200">{item?.applicant?.email}</TableCell>
                                    <TableCell className="text-sm text-gray-700 dark:text-gray-200"> {item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell className="text-sm text-right text-blue-700 dark:text-gray-200"> <a className='text-blue-400' href={item?.applicant?.profile?.resume}>{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                    <TableCell className="text-sm text-right text-gray-700 dark:text-gray-200">{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="text-sm text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit flex flex-col gap-2 p-3 bg-white border rounded shadow-lg dark:bg-gray-800 dark:border-gray-600">
                                                <p
                                                    onClick={() => statusHandler("accepted", item?._id)}
                                                    className="text-green-600 cursor-pointer font-semibold hover:bg-green-100 px-2 py-1 rounded dark:hover:bg-green-700 dark:text-green-400"
                                                >
                                                    Accepted
                                                </p>
                                                <p
                                                    onClick={() => statusHandler("rejected",  item?._id)}
                                                    className="text-red-600 cursor-pointer font-semibold hover:bg-red-100 px-2 py-1 rounded dark:hover:bg-red-700 dark:text-red-400"
                                                >
                                                    Rejected
                                                </p>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ApplicantsTable
