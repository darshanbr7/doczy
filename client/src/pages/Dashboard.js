import { useSelector } from "react-redux"
const Dashboard = ( ) => {
    const { userInfo } = useSelector(  state => state.user)
    return (
        <div>
            <p> <b>{ JSON.stringify( userInfo ) }</b></p>
            <h2> Dashboard Page </h2>
        </div>
    )
}
export default Dashboard