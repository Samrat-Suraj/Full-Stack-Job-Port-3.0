import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Pen } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const AdminCompaniesTable = () => {
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company)
    const {searchCompanyQuery} = useSelector(store => store.company)
    const [filterData , setFilterData] = useState(companies)

    useEffect(()=>{
        const search = companies.filter((company)=>{
            if(!searchCompanyQuery){
                return true
            }else{
                return company?.name?.toLowerCase().includes(searchCompanyQuery.toLowerCase())
            }
        })
        setFilterData(search)
    },[searchCompanyQuery , companies])

    return (
        <div className="mt-9 p-2 overflow-x-auto shadow-lg rounded-lg border bg-white dark:bg-gray-800">
            <Table className="min-w-full">
                <TableCaption className="font-semibold text-[10px] text-gray-700 mt-7 dark:text-gray-300">
                    A list of your recent companies.
                </TableCaption>
                <TableHeader className="text-[10px] lg:text-[13px] md:text-[12px]" >
                    <TableRow>
                        <TableHead className="w-[15%] sm:w-[10%] text-gray-600 dark:text-gray-300">
                            Logo
                        </TableHead>
                        <TableHead className="text-gray-600 dark:text-gray-300">
                            Name
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
                        filterData?.map((company) => {
                            return (
                                <TableRow key={company._id} className="text-[10px] lg:text-[14px] md:text-[12px] hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                                    <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage className="h-7 w-7" src={company?.logo} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="text-gray-800 dark:text-gray-200">
                                        {company?.name}
                                    </TableCell>
                                    <TableCell className="text-gray-500 dark:text-gray-400">
                                        {company?.createdAt?.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit py-2 bg-white shadow-md rounded-lg dark:bg-gray-700 dark:shadow-lg">
                                                <div onClick={() => navigate(`/admin/companies/${company._id}/update`)} className="flex gap-2 w-fit items-center cursor-pointer text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 p-2 rounded-md">
                                                    <Pen width={15} height={15} />
                                                    <p >Edit</p>
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

export default AdminCompaniesTable
