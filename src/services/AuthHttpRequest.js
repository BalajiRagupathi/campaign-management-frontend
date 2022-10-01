import history from "../utils/history";
import Http from "./Variables";
import authService from "./AuthService"
import axios from "axios";

/**
 * 
 * @param {*} requestData 
 * @returns forgotPasswordRequest
 */
const forgotPasswordRequest = async (requestData) => {

    const response = await fetch(`${Http}/user/forgotpassword/generate/otp`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })

    const responseData = await response.json();
    const responseStatus = response.status

    if (responseStatus >= 200 && responseStatus <= 226) {
        history.push("/reset-password")
        return responseData
    }

    return {
        status: false,
        message: `${responseData.message}`
    }
}

/**
 * 
 * @param {*} requestData 
 * @returns resetPasswordRequest
 */
const resetPasswordRequest = async (requestData) => {

    const response = await fetch(`${Http}/user/forgotpassword/reset`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })

    const responseData = await response.json();
    const responseStatus = response.status
    if (responseStatus >= 200 && responseStatus <= 226) {
        history.push("/login")
        return responseData
    }

    return {
        status: false,
        message: `${responseData.message ? responseData.message: "Unable to reset password"}`
    }
}

/**
 * 
 * @param {*} requestData 
 * @returns Users List
 */
const getAllUsers = async (requestData) => {

    const response = await fetch(`${Http}/user/admin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authService.getCurrentUserToken()
        }
    })

    const responseData = await response.json();
    const responseStatus = response.status
    if (responseStatus >= 200 && responseStatus <= 226) {
        return responseData
    } else if (responseStatus === 401) {
        handleTokenExpired()
        return []
    }
    return []
}

/**
 * 
 * @param {*} requestData 
 * @returns Success | Error
 */
const updateUserDetailRequest = async (requestData) => {

    const response = await fetch(`${Http}/user/admin`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': authService.getCurrentUserToken()
        },
        body: JSON.stringify(requestData),
    })

    const responseData = await response.json();
    const responseStatus = response.status
    if (responseStatus >= 200 && responseStatus <= 226) {
        return {
            status: true,
            message: "Users Detail Updated"
        }
    } else if (responseStatus === 401) {
        return handleTokenExpired()
    }

    return {
        status: false,
        message: `${responseData.error} ${responseData.message}`
    }
}

/**
 * 
 * @param {*} userId 
 * @returns Delete User
 */
const deleteUserRequest = async (userId) => {
    const response = await fetch(`${Http}/user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': authService.getCurrentUserToken()
        }
    })

    const responseData = await response.json();
    const responseStatus = response.status
    if (responseStatus >= 200 && responseStatus <= 226) {
        return {
            status: true,
            message: "User deleted"
        }
    } else if (responseStatus === 401) {
        return handleTokenExpired()
    }

    return {
        status: false,
        message: `${responseData.error} ${responseData.message}`
    }
}

// Get all schedules
const getAllSchedules = async () => {
    const response = await fetch(`${Http}/schedule/`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: authService.getCurrentUserToken(),
        },
    });

    const responseData = await response.json();
    const responseStatus = response.status;
    if (responseStatus == 404) return responseData;
    else if( responseStatus >= 200 && responseStatus <= 226 ) return responseData;
    else if(responseStatus == 401) return handleTokenExpired();
    else return{ status: false, message: `${responseData.error} ${responseData.message}`}
};

const createOffer=async (id,title,data,type)=>{
    
    var dt = new Date();

    var date = dt.toISOString().split(".")[0].replace("T"," ");
    const response = await axios.post(`https://campaign-management-sb-backend.herokuapp.com/rest/api/v1/offer/${id}`,{
        "status": "pending",
        "title": title,
        "created_at": date,
        "data": data,
        "category": type},{
        headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.getCurrentUserToken()
                }
        }).then((res)=>console.log(res));

    // const responseData = await response.json();
    return response
}

const getOffers = async ()=>{
    const response = await axios.get("https://campaign-management-sb-backend.herokuapp.com/rest/api/v1/offer/",{
        headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.getCurrentUserToken()
                }
        });
    return response.data.message?null:response.data;
}
const updateOffer = async (offerId,userId,title,data,type)=>{
    var dt = new Date();

    var date = dt.toISOString().split(".")[0].replace("T"," ");
    const response = await axios.put(`https://campaign-management-sb-backend.herokuapp.com/rest/api/v1/offer/${offerId}`,{
        "status": "pending",
        "title": title,
        "created_at": date,
        "data": data,
        "category": type
    },{
        headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.getCurrentUserToken()
                }
        }).then(res=>{console.log(res)});
    return response;
}

const deleteOffer = async (id)=>{
    const response = await axios.delete(`https://campaign-management-sb-backend.herokuapp.com/rest/api/v1/offer/${id}`,{
        headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.getCurrentUserToken()
                }
        }).then(res=>{console.log(res)});
    return response;
}

const handleTokenExpired = () => {
    const notify = {
        "status": false,
        "message": "Token expired please login again"
    }
    authService.logout()
    return notify
}

export {
    forgotPasswordRequest,
    resetPasswordRequest,
    getAllUsers,
    updateUserDetailRequest,
    deleteUserRequest,
    getAllSchedules,
    createOffer,
    getOffers,
    updateOffer,
    deleteOffer,
};