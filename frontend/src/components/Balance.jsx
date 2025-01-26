

export const Balance = ( { value } ) =>{

    return <div className="flex px-4 mt-2">
        <div className="font-bold text-lg">
            Your Balance :
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}