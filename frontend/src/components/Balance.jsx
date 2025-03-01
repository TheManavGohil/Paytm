

export const Balance = ( { value } ) =>{

    const currentBalance = value !== null && value !== undefined ? Number(value.toFixed(2)) : 0.00;
    return <div className="flex px-4 mt-2">
        <div className="font-bold text-lg">
            Your Balance :
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {currentBalance}
        </div>
    </div>
}