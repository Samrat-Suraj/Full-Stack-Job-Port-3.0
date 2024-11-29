import { setGlobeSearchJobQuery, setSearchJobQuery } from '@/redux/jobSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const filterData = [
  {
    jobType: "Location",
    arry: ["Delhi", "Mumbai", "Pune", "Bengaluru"]
  },
  {
    jobType: "Industry",
    arry: ["Frontend Developer", "Backend Developer", "Data Science", "Full Stack Developer", "Java Developer"]
  },
  {
    jobType: "salary",
    arry: ["0 - 10 LPA", "10 - 20 LPA", "20 - 30 LPA"]
  }
]

const SideBarFilter = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState("")

  const changeHander = (e) => {
    setInput(e.target.value)
  }
  
  useEffect(()=>{
    dispatch(setSearchJobQuery(input))
  },[input])


  return (
    <div className='h-fit border w-[30%] p-2' >
      {
        filterData.map((item, idx) => {
          return (
            <div className='flex flex-col gap-2' key={idx} >
              <h1 className='text-xl font-bold' >{item.jobType}</h1>
              {
                item.arry.map((items, index) => {
                  return (
                    <div className='flex gap-2' key={index} >
                      <input onChange={changeHander} type="radio" name='filter' value={items} id={items} className=" cursor-pointer " />
                      <label htmlFor={items} className="cursor-pointer text-[11px] font-semibold text-gray-500 lg:text-[16px]" >{items}</label>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default SideBarFilter