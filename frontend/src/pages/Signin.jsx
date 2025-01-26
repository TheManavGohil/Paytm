import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BottonWarning } from "../components/BottonWarning" 
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"


export const Signin = () =>{

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    
    return <>
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center h-max p-2 px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} placeholder={"gohilmanav2005@gmail.com"} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <InputBox label={"Password"} placeholder={"123456"} onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <div className="pt-4">
                    <Button label=  {"Sign in"} 
                        onClick={ async()=>{
                            try{
                                const response = await axios.post("http://localhost:5000/api/v1/user/signin",{
                                    username,
                                    password
                                },{
                                    headers:{
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                })
                                
                                navigate("/dashboard")
                            }catch(err){
                                alert("Invalid credentials!")
                            }
                    }} 
                    />
                </div>
                <BottonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={'/signup'}/>
            </div>
        </div>
    </div>
    </>
}