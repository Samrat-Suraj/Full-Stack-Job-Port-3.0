import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'

const LoginSignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currState, setCurrState] = useState("Login")
    const [profilePic, setProfileImage] = useState(false)
    const [loading, setLading] = useState(false)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
    })

    const onChangeProfilePicHander = (e) => {
        setProfileImage(e.target.files[0])
    }
    const onClickProfilePicNUll = (e) => {
        setProfileImage("")
    }

    const onChangeHander = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const SubmitFromHander = async (e) => {
        e.preventDefault()
        console.log(input)
        const form = new FormData()
        form.append("fullname", input.fullname)
        form.append("email", input.email)
        form.append("password", input.password)
        form.append("phoneNumber", input.phoneNumber)
        form.append("role", input.role)
        if (profilePic) {
            form.append("profilePic", profilePic)
        }

        try {
            setLading(true)
            if (currState === "SignUp") {
                const res = await axios.post("https://full-stack-job-port-3-0.onrender.com/api/user/register", form, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                })
                if (res.data.success) {
                    navigate("/")
                    dispatch(setUser(res.data.user))
                    toast.success(res.data.message)
                }
            }else{
                const res = await axios.post("http://localhost:5000/api/user/login", input, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                if (res.data.success) {
                    navigate("/")
                    dispatch(setUser(res.data.user))
                    toast.success(res.data.message)
                }
            }
        } catch (error) {
            toast.success(error.response.data.message)
        } finally {
            setLading(false)
        }
    }
    const { user } = useSelector(store => store.auth)
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])

    return (
        <div className='h-screen w-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center'>
            <motion.div
                className='border bg-white dark:bg-gray-800 pt-8 pb-8 pr-8 pl-8 rounded-2xl shadow-lg dark:shadow-xl'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className='text-center text-3xl font-semibold text-gray-900 dark:text-white'>{currState} Form</h1>

                <div className='flex w-[26vw] min-w-[250px] mt-5 justify-between border font-semibold p-2 rounded-lg dark:border-gray-700'>
                    <motion.div
                        onClick={() => setCurrState("Login")}
                        className={`w-full ${currState === "Login" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white"} cursor-pointer text-center rounded-lg p-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Login
                    </motion.div>
                    <motion.div
                        onClick={() => setCurrState("SignUp")}
                        className={`w-full ${currState === "SignUp" ? "bg-blue-700 text-white" : "text-gray-900 dark:text-white"} cursor-pointer text-center rounded-lg p-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        SignUp
                    </motion.div>
                </div>

                <form onSubmit={SubmitFromHander} className='flex flex-col gap-4 mt-4'>
                    <motion.div
                        className='flex flex-col gap-4'
                        key={currState}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                    >
                        {currState === "Login" ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <Input value={input.email} onChange={onChangeHander} className="focus-visible:ring-transparent dark:bg-gray-700 dark:text-white" type="email" name="email" placeholder="Email" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <Input value={input.password} onChange={onChangeHander} className="focus-visible:ring-transparent dark:bg-gray-700 dark:text-white" type="password" name="password" placeholder="Password" />
                                </motion.div>
                                <div className='flex gap-2'>
                                    <input onChange={onChangeHander} type="radio" value="admin" name='role' className='cursor-pointer' id='admin' />
                                    <label className="text-[13px] text-gray-900 dark:text-white" htmlFor="admin">Admin</label>
                                    <input onChange={onChangeHander} type="radio" value="student" name='role' className='cursor-pointer' id='student' />
                                    <label className="text-[13px] text-gray-900 dark:text-white" htmlFor="student">Student</label>
                                </div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <Input value={input.fullname} onChange={onChangeHander} className="focus-visible:ring-transparent dark:bg-gray-700 dark:text-white" type="text" name="fullname" placeholder="Fullname" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <Input value={input.phoneNumber} onChange={onChangeHander} className="focus-visible:ring-transparent dark:bg-gray-700 dark:text-white" type="number" name="phoneNumber" placeholder="Phone Number" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <Input value={input.email} onChange={onChangeHander} className="focus-visible:ring-transparent dark:bg-gray-700 dark:text-white" type="email" name="email" placeholder="Email" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <Input value={input.password} onChange={onChangeHander} className="focus-visible:ring-transparent dark:bg-gray-700 dark:text-white" type="password" name="password" placeholder="Password" />
                                </motion.div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-2'>
                                        <input onChange={onChangeHander} type="radio" name='role' value="admin" className='cursor-pointer' id='admin' />
                                        <label className="text-[13px] text-gray-900 dark:text-white" htmlFor="admin">Admin</label>
                                        <input onChange={onChangeHander} type="radio" name='role' value="student" className='cursor-pointer' id='student' />
                                        <label className="text-[13px] text-gray-900 dark:text-white" htmlFor="student">Student</label>
                                    </div>
                                    <div>
                                        {profilePic ? (
                                            <div className='flex items-center gap-2'>
                                                <p className='text-[10px] font-bold cursor-pointer text-red-500' onClick={onClickProfilePicNUll}>Remove</p>
                                                <img className='h-6 w-6 ' src={URL.createObjectURL(profilePic)} alt="Profile" />
                                            </div>
                                        ) : (
                                            <div>
                                                <label htmlFor='upload' className='text-[12px] font-semibold bg-blue-600 p-2 rounded-lg text-white cursor-pointer'>Update Picture</label>
                                                <input id='upload' onChange={onChangeProfilePicHander} type="file" accept='image/*' hidden />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>

                    <Button className="text-[15px] p-4 bg-blue-600 text-white dark:bg-blue-700">
                        {
                            loading ? <Loader2 className='h-5 w-5 animate-spin ' /> : <></>
                        }
                        {currState}</Button>
                </form>

                {/* Toggle Link Animation */}
                <motion.p
                    className='text-center mt-6 text-[13px] text-gray-900 dark:text-white'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    {currState === "Login"
                        ? <>Not A Member? <span onClick={() => setCurrState("SignUp")} className='text-blue-500 font-semibold cursor-pointer'>SignUp Now</span></>
                        : <>Have A Member? <span onClick={() => setCurrState("Login")} className='text-blue-500 font-semibold cursor-pointer'>Login Now</span></>
                    }
                </motion.p>
            </motion.div>
        </div>
    )
}

export default LoginSignUp
