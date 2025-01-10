import { RiFacebookCircleFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { MdOutlineCopyright } from "react-icons/md";
const Footer  = ( ) => {
    const onHover  = ( ) => {
        return "  cursor-pointer hover:underline hover:border-white"
    }
    return (
        <div className="h-auto bg-blue-600   overflow-y-hidden" >
            <div className=" flex h-auto  ">
                <div className="w-1/5  ml-10   font-semibold mt-4 text-white ">
                    <p className= { `${ onHover }  mb-2`} > Doczy</p>
                    <p className= { `${ onHover } `}> About</p>
                    <p className= { `${ onHover } `}> Blog </p>
                    <p className= { `${ onHover } `}> Carear </p>
                    <p className= { `${ onHover } `}> Press</p>
                    <p className= { `${ onHover } `}> Contact </p>
                </div>
                <div className="w-1/5 flex flex-col justify-start items-start text-center font-semibold mt-4 text-white m-auto">
                    <p className= { `${ onHover } mb-2 `}> For Patents</p>
                    <p className= { `${ onHover } `}> Search a Doctor</p>
                    <p className= { `${ onHover } `}> Consult Doctor</p>
                    <p className= { `${ onHover } `}> Doczy Drive </p>
                    <p className= { `${ onHover } `}> Health App</p>
                </div>
                <div className="w-1/5 flex flex-col justify-start items-start   font-semibold mt-4 text-white m-auto">
                    <p className= { `${ onHover } mb-2 `}> For Doctors</p>
                    <p className= { `${ onHover } `}> Doczy consult</p>
                    <p className= { `${ onHover } `}> Doczy Health Feed </p>
                    <p className= { `${ onHover } `}> Doczy Profile </p>
                </div>
                <div className="w-1/5 flex flex-col justify-start items-start text-center font-semibold mt-4 text-white m-auto">
                    <p className= { `${ onHover }  mb-2`}> More</p>
                    <p className= { `${ onHover } `}> Help</p>
                    <p className= { `${ onHover } `}> Developer </p>
                    <p className= { `${ onHover } `}> Privacy Policy </p>
                    <p className= { `${ onHover } `}> Terms & Condition </p>
                    <p className= { `${ onHover } `}> Subscriber </p>
                    <p className= { `${ onHover } `}> Doczy Health wiki</p>
                </div>
                <div className="w-1/5 flex flex-col justify-start items-start text-center font-semibold mt-4 text-white m-auto">
                    <p className= { `${ onHover } mb-4`}> Social</p>
                    <p className= { `${ onHover } mb-2`}> <RiFacebookCircleFill  size={ 23 }/></p>
                    <p className= { `${ onHover } mb-2 `}> <RiTwitterXFill  size={ 23 }/> </p>
                    <p className= { `${ onHover } mb-2 `}> <IoLogoLinkedin  size={ 23 }/> </p>
                    <p className= { `${ onHover } mb-2`}> <FaYoutube size={ 23 }/> </p>
                    <p className= { `${ onHover } mb-2`}> <FaSquareGithub  size={ 23 }/> </p>
                </div>
            </div>
            <div className="flex flex-col  justify-center items-center mt-8 mb-10">
                <div className="inline-block">  
                    <span  className=" text-white text-5xl opacity-50">•</span> 
                    <p className=" inline font-bold text-white text-5xl tracking-wide"> doczy</p> 
                    <span className=" ml-3 text-white text-5xl opacity-50 tracking-wide" >•</span>
                </div>
                <div className="text-white text-sm font-semibold mt-5">
                    <p> Copyright <MdOutlineCopyright className="inline"  color="white"/>  2025, Doczy. All rights reserved </p>
                </div>
            </div>    
        </div>
    )
}
export default Footer