import axios from "axios"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"


export const SendMoney = () =>{

    const[searchParams] = useSearchParams()
    const navigate = useNavigate()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount, setAmount] = useState(0)
    const [balance, setBalance] = useState(0)

    return <div className="flex justify-center h-screen bg-gray-800 relative">
        <button
           className="absolute top-4 left-4 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md font-semibold"
           onClick={() => navigate('/dashboard')}
        >
            ← Back  
        </button>
        <div className="h-full flex flex-col justify-center">
                <div className="h-min max-w-md w-96 bg-white border rounded-lg shadow-lg p-4 space-y-8">
                    <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex item-center space-x-4">
                        <div className="rounded-full h-10 w-10 bg-green-500 flex item-center justify-center">
                            <span className="text-2xl text-white ">
                                {name[0].toUpperCase()}
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount (in Rs)</label>
                            <input 
                            type="number" 
                            min="1"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) =>{
                                const value = e.target.value;
                                if (value === "" || (!isNaN(value) && parseInt(value) > 0)) {
                                    setAmount(value); 
                                }                            
                            }}
                            className="border rounded-md h-10 w-full text-sm bg-background px-3"></input>
                        </div>
                    </div>
                    <div className="space-y-4 mt-2">
                    <button onClick={async () => {
                        try {
                            const token = localStorage.getItem("token");

                            console.log("Sending Request: ", { id, amount, token });

                            const response = await axios.post("http://localhost:5000/api/v1/account/transfer", {
                                to: id,
                                amount: parseInt(amount)
                            }, {
                                headers: {
                                    Authorization: "Bearer " + token
                                }
                            });

                            alert("Transfer successful!");

                            const response1= await axios.get("http://localhost:5000/api/v1/account/balance", {
                                headers: {
                                    Authorization: "Bearer " + token
                                }
                            });
                    
                            setBalance(response1.data.balance)
                        } catch (err) {
                            console.error("Transfer Failed:", err); // Logs error details
                            alert(err.response?.data?.message || "Transfer failed. Please try again.");
                        }
                    }}
                        className="bg-green-500 border rounded-md transition-colors w-full h-10 text-sm text-white text-md font-medium ring-offset-background flex justify-center py-2">
                        Initiate Transfer</button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
}