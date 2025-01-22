import { useSelector } from "react-redux"
const Home = ( ) => {
    const {userInfo }  = useSelector( state => state.auth );
    console.log( userInfo )
    return (
        <div>
            <h2> Home Page </h2>
        </div>
    )
}
export default Home