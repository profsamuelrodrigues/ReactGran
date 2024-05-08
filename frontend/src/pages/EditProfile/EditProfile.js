import "./EditProfile.css"
import  {uploads} from "../../utils/config"

//Hooks
import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

//Redux
import {profile, resetMessage, updateProfile} from "../../slices/userSlice"

//comonents
import Message from "../../components/Message"

function EditProfile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const dispatch = useDispatch()
    const {user, message, error, loading} = useSelector((state)=>state.user)

    //Carrega dados do usuário
    useEffect(()=>{
        dispatch(profile())
    }, [dispatch])
   
   
    useEffect(()=>{
       if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])
    
    
    //Preenche dados do usuário
    const handleSubmit = async (e)=>{
        e.preventDefault()
       
        //pegar dados do usuário dos states
        const userData = {
            name
        }
       
        if (profileImage) {
            userData.profileImage = profileImage

        }

        if (bio) {
            userData.bio = bio
        }

        if (password) {
            userData.password = password
        }
      
        //construir foorm data
        const formData = new FormData()
        Object.keys(userData).forEach((key) => formData.append(key, userData[key]))
        
        await dispatch(updateProfile(formData));
       


        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000);
    }

    const handleFile = (e)=>{
        //preview da imagem
        const image = e.target.files[0]
        setPreviewImage(image)

        //atualiza estado da imagem
        setProfileImage(image)
    }

    return (
        <div id="edit-profile">
            <h2>Edite seu dados</h2>
            <p className="subtitle">Adicione um aimagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                    <img 
                        className="profile-image"
                        src={
                            previewImage
                            ? URL.createObjectURL(previewImage) 
                            :`${uploads}/users/${user.profileImage}`
                        } 
                        alt={user.name}
                    />
                )
            }
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome"  onChange={(e)=>setName(e.target.value)} value={name || ""} />
                <input type="email" placeholder="Email" disabled onChange={(e)=>setEmail(e.target.value)} value={email || ""} />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder="Descrição do perfil" onChange={(e)=>setBio(e.target.value)} value={bio || ""} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" placeholder="Digite sua nova senha." onChange={(e)=>setPassword(e.target.value)} value={password || ""} />
                </label>
                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default EditProfile