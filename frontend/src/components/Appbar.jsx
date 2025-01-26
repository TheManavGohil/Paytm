

export const Appbar = () =>{

    const username = localStorage.getItem("username") || "Guest"
    const initial = username[0].toUpperCase()    

    return <div className="h-14 flex justify-between shadow">
        <div className="h-full ml-4 flex flex-col justify-center font-semibold">
            PayTm App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center  mt-1 mr-2">
                <div className="flex justify-center mt-3 font-bold">
                {initial}
                </div>
            </div>
        </div>
    </div>
}