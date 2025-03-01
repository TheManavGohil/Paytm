import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"


export const Dashboard = () =>{

    const [balance, setBalance] = useState(null)

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                const response = await axios.get("http://localhost:5000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                setBalance(response.data.balance); // Update state with fetched balance
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []); // Fetch balance only on component mount
    
    return <div>
        <Appbar />
        <div className="flex flex-col">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}