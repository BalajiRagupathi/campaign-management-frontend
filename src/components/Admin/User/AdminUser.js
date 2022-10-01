import "./AdminUser.css";

import UserTable from "./UserTable/UserTable";
import NoUserCreated from "./NoUserCreated/NoUserCreated";
import { useEffect, useState } from "react";
import { deleteUserRequest, getAllUsers, updateUserDetailRequest } from "../../../services/AuthHttpRequest";

import Notification from "../../../services/NotificationService";

/** 
*@return Role Assign Component
*/
const AdminUser = () => {

    const [userList, setUserList] = useState([])
    const [userStatistics, setUserStatistics] = useState({"verified": 0, "not_verified": 0, "total_users": 0})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(
        () => {
            getUser()
        },[]
    )
    const getUser = () => {
        setIsLoading(true)
        getAllUsers().then(
            (data) => {
                setUserList(data)
                let enabled = 0;
                data.forEach(
                    (data,index) => {
                        if(data.enabled === true) {
                            enabled += 1;
                        }
                    }
                )
                const totalUsers = data.length
                setUserStatistics({"verified": enabled, "not_verified": totalUsers - enabled, "total_users": totalUsers})
                setIsLoading(false)
            }
        )
    }

    const updateUserDetail = (user) => {
        userList.forEach(
            (data,index) => {
                if(data.id === user.id) {
                    userList[index] = user
                }
            }
        )
    }

    const updateUser = async (e) => {
        setIsLoading(true)
        const res = await updateUserDetailRequest(userList)
        setIsLoading(false)
        Notification.show(res)
    }

    const deleteUser = async (id) => {
        const confirmation = window.confirm("Are you Sure ?")
        if (confirmation) {
            setIsLoading(true)
            const res = await deleteUserRequest(id)
            setUserList(userList.filter( (user) => user.id !== id) )
            setIsLoading(false)
            Notification.show(res);            
        }
        
    }

    return (
        <section className=" text-center" style={{marginTop:'7rem'}}>
            <section className="container-lg my-5">
                <div className="d-flex flex-column flex-sm-row text-center justify-content-between align-items-center gap-3 ">
                    <div className="role-assign-card border rounded-3 box-shadow">
                        <div className="p-1">
                            <p>Verified Users</p>
                            <h5>{userStatistics["verified"]}</h5>
                        </div>
                        <div className=" w-2 h-2 p-4 bg-success text-white rounded-circle d-flex justify-content-center align-items-center">
                            <i className='bx bxs-user-check fs-7 '></i>
                        </div>
                    </div>
                    <div className="role-assign-card border rounded box-shadow">
                        <div className="p-1">
                            <p>Not Verified Users</p>
                            <h5>{userStatistics["not_verified"]}</h5>
                        </div>
                        <div className=" w-2 h-2 p-4 bg-danger text-white rounded-circle d-flex justify-content-center align-items-center">
                        <i className='bx bxs-user-minus fs-7' ></i>
                        </div>
                    </div>
                    <div className="role-assign-card border rounded box-shadow">
                        <div className="p-1">
                            <p>Total Users</p>
                            <h5>{userStatistics["total_users"]}</h5>
                        </div>
                        <div className=" w-2 h-2 p-4 bg-5 text-white rounded-circle d-flex justify-content-center align-items-center">
                            <i className='bx bx-group fs-7'></i>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{overflowX: "auto"}}>
                <table className="table container-lg shadow-lg rounded-5 my-5 overflow_scroll" >
                    <thead className="bg-5 text-white">
                        <tr>
                            <th scope="col"><i className='bx bxs-user fs-6 ' ></i> User Status</th>
                            <th scope="col">User Name</th>
                            <th scope="col"> Email </th>
                            <th scope="col"><i className='bx bxs-edit fs-6 '></i> Offer</th>
                            <th scope="col"><i className='bx bxs-rocket fs-6 '></i> Schedule</th>
                            <th scope="col"><i className='bx bxs-user-x fs-6' ></i> Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map( (data,index) => <UserTable data={data} index={index} key={data.id} updateUserDetail={updateUserDetail} deleteUser={deleteUser}/> )
                        }
                    </tbody>
                </table>
            </div>
            {
                userList.length === 0 && isLoading ? (<i className='bx bx-loader-circle bx-spin fs-8 color5' ></i>): userList.length === 0 ? (<NoUserCreated />) : ""
            }
            <div className="d-flex gap-3 justify-content-center my-5">
                <button className="btn bg-5 text-white" onClick={(e) => updateUser(e)} disabled={isLoading}>
                    {
                        isLoading ? (<i className='bx bx-loader-circle bx-spin' ></i>) : "Update"
                    }
                </button>
            </div>
        </section>
    )
};

export default AdminUser;