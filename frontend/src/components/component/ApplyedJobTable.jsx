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
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'


const ApplyedJobTable = () => {
    const {userAppliedJobs} = useSelector(store => store.applicaation)
    return (
        <div className='mb-20' >
            <h1 className='font-bold text-xl mb-8'>Applyed Jobs</h1>
            <Table>
                <TableCaption>A list of your recent Job Applyed</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        userAppliedJobs?.map((item) => {
                            return (
                                <TableRow key={item?._id} className="text-[10px] lg:text-[14px] md:font-medium" >
                                    <TableCell className="font-medium">{item?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{item?.job?.title}</TableCell>
                                    <TableCell>{item?.job?.company?.name}</TableCell>
                                    <TableCell className={`text-right`}> <Badge className={` text-white font-bold ${item?.status === "accepted" ? "bg-green-500" :  item.status === "pending" ? "bg-yellow-500" : item.status === "rejected" ? "bg-red-700" : "" }`} >{item?.status?.toUpperCase()}</Badge> </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default ApplyedJobTable