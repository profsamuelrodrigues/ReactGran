import {api, requestConfig} from "../utils/config"

//Registrar um usuário
const profile = async(data, token)=>{
    const config = requestConfig("GET", data, token)

    try {
        const res = await fetch(api + "/users/profile", config).then((res)=>res.json()).catch((err)=>err)

       
        return res
        
    } catch (error) {
        console.log(error)
    }
}
//atualiza detalhes do usuário
const updateProfile = async (data, token)=>{
    const config = requestConfig("PUT", data, token, true) 

    try {
        const res = await fetch(api + "/users/", config).then((res)=>res.json()).catch((err)=>err)
        return res
    } catch (error) {
        console.log(error)
    }
}

//pegar  detalhes do usuário
const getUserDetails = async (id)=>{
    const config = requestConfig("GET") 

    try {
        const res = await fetch(api + "/users/" + id, config).then((res)=>res.json()).catch((err)=>err)
        return res
    } catch (error) {
        console.log(error)
    }
}

const userService = {
    profile,
    updateProfile,
    getUserDetails,
}

export default userService