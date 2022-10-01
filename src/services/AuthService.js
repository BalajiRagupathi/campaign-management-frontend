import history from "../utils/history";
import Http from "./Variables";

/**
 * 
 * @param {*} requestData 
 * @returns Signup Response
 */
const signup = async (requestData) => {

    const response = await fetch(`${Http}/user/signup`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    })

    const responseData = await response.json();
    const responseStatus = response.status 
    if(responseStatus >= 200 && responseStatus <= 226){
        history.push("/login")
        return responseData
    }

    return {
        status: false,
        message: `${responseData.message ? responseData.message: "Email already exist"} `
    }
}

/**
 * 
 * @param {*} requestData 
 * @returns User Details
 */
const login = async (requestData) => {
    const response = await fetch(`${Http}/user/authenticate`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    })
    const responseData = await response.json();
    const responseStatus = response.status 

    if(responseStatus >= 200 && responseStatus <= 226 && responseData ){
        localStorage.setItem('currentUserEmail', responseData.email);
        localStorage.setItem('currentUserToken', responseData.token);
        localStorage.setItem('currentUserRole', responseData.role)
        localStorage.setItem('currentUserDetails', JSON.stringify(responseData))
        history.push("/")
        return {
            status: true,
            message: `Welcome ${responseData.name}`
        }
    }
        
    return {
            status: false,
            message: `${responseData.message ? responseData.message: "Invalid Password"}`
        }
}

/**
 * Logout User
 */
const logout = () => {
    localStorage.clear();
    history.push("/login")
}

/**
 * Check if user exist
 * @returns Boolean
 */
const currentUser = () => {
    const user = localStorage.getItem("currentUserEmail")
    if (user) {
        return true
    } else {
     return false   
    }
}

/**
 * 
 * @returns LoggedIn User Role
 */
const getCurrentUserRole = () => {
    const user = localStorage.getItem("currentUserRole")
    if (user) {
        return user
    } else {
     return false   
    }
}

/**
 * 
 * @returns LoggedIn User Details
 */
const getCurrentUserDetails = () => {
    const user = localStorage.getItem("currentUserDetails")
    if (user) {
        return JSON.parse(user)
    } else {
        return false   
    }
}

/**
 * 
 * @returns LoggedIn User JWT Token
 */
const getCurrentUserToken = () => {
    const token = localStorage.getItem("currentUserToken")
    if (token) {
        return token
    } else {
        return false   
    }
}

const authService = {
    login,
    logout,
    signup,
    currentUser,
    getCurrentUserRole,
    getCurrentUserDetails,
    getCurrentUserToken
};

export default authService;