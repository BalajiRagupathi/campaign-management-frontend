import { useEffect, useState } from "react";

/** 
*@return Role Assign Table
*/
const UserTable = ({ data, index, updateUserDetail, deleteUser }) => {
    const [userDetail, setUserDetail ] = useState(data)
    
    useEffect(()=> {
        updateUserDetail(userDetail)
    })

    return (
        <tr className={`${userDetail.enabled ? "" : "opacity-5"} fade`}>
            <td scope="row">
                <label className="toggle-control ml-2">
                    <input type="checkbox" checked={userDetail.enabled} 
                    // onChange={(e) => setUserDetail({...userDetail, enabled: !userDetail.enabled})}
                    />
                    <span className="control "></span>
                </label>
            </td>
            <td>{userDetail.name}</td>
            <td>{userDetail.email}</td>
            <td>
                <input type="checkbox" name="" id="" checked={ userDetail.role==="offer" ? true : false } onChange={(e) => setUserDetail({...userDetail, role: "offer"})}/>
            </td>
            <td>
                <input type="checkbox" name="" id="" checked={ userDetail.role==="schedule" ? true : false } onChange={(e) => setUserDetail({...userDetail, role: "schedule"})}/>
            </td>
            <td>
                <div className="" onClick={(e) => deleteUser(userDetail.id)}>
                    <i className='bx bxs-trash text-danger cursor-pointer fs-7' ></i>
                </div>
            </td>
        </tr>
    )
}

export default UserTable;


