import { useSelector } from "react-redux"
const Home = ( ) => {
    const {userInfo }  = useSelector( state => state.auth );
    
    return (
        <div>
            <h2> Home Page </h2>
        
        </div>
    )
}
export default Home