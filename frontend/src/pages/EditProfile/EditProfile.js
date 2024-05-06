import "./EditProfile.css"
import {uploads} from "../../utils/config"

//Hooks
import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

//Redux
import {profile, resetMessage} from "../../slices/userSlice"

//comonents
import {Link} from 'react-router-dom'
import Message from "../../components/Message"

function EditProfile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileumage, setProfileumage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const dispatch = useDispatch()
    const {user, message, error, loading} = useSelector((state)=>state.user)

    //Carrega dados do usuário
    useEffect(()=>{
        dispatch(profile())
    }, [dispatch])

    //Preenche dados do usuário
    useEffect(()=>{
       if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])

    const handleSubmit = (e)=>{
        e.preventDefault()
    
    }

    return (
        <div id="edit-profile">
            <h2>Edite seu dados</h2>
            <p className="subtitle">Adicione um aimagem de perfil e conte mais sobre você...</p>
            {/* Preview da imagem*/}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome"  onChange={(e)=>setName(e.target.value)} value={name || ""} />
                <input type="email" placeholder="Email" disabled onChange={(e)=>setEmail(e.target.value)} value={email || ""} />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input type="file" />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder="Descrição do perfil" onChange={(e)=>setBio(e.target.value)} value={bio || ""} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" placeholder="Digite sua nova senha." onChange={(e)=>setPassword(e.target.value)} value={password || ""} />
                </label>
                <input type="submit" value="Atualizar" />
            </form>
        </div>
    )
}

export default EditProfile