import { Link } from "react-router-dom"
const Navbar = ( ) => {
    return (
        <nav className=" bg-green-200 p-3 shadow-sm ">
             <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                <div className="space-x-4 ml-8">
                    <span className="text-blue-700 font-extrabold text-2xl flex items-center tracking-wide ">
                        <span className="text-3xl opacity-60 m-0">•</span>
                        <span className="mx-1"><Link to = "/"> doczy  </Link></span>
                        <span className="text-3xl opacity-60 m-0">•</span>
                    </span>
                </div>
                <div className = " space-x-6 text-white">
                    { localStorage.getItem( "token") ?   <p  className="ml-4 text-bold" onClick={ () =>{}}>  Logout </p> : <p  className="ml-4 text-bold"> <Link to = "/login"> Login </Link></p> }
                 </div>
            </div>
        </nav>
    )
}
export default Navbar