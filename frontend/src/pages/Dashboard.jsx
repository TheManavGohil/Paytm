import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"


export const Dashboard = () =>{
    
    return <div>
        <Appbar />
        <div className="flex flex-col">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}