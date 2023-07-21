import { getLS } from "./localStorageEncryp";

const checkLogin = () => {
    let flag = false
    const loginUser = getLS()
    console.log("##checking login")
    if (!loginUser) {
        // alert("logout")
        flag = false
    } else {
        flag = true
    }
    return flag
}

export default checkLogin
