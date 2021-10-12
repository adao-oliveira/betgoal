import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useParams } from 'react-router-dom'

const initialState = {
    titulo: '',
    taxaAposta: '',
    _id: ''
}

function PublicarAposta() {
    const state = useContext(GlobalState)
    const [aposta, setAposta] = useState(initialState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const param = useParams()

    const [apostar] = state.apostaAPI.apostar
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.apostaAPI.callback

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            apostar.forEach(aposta => {
                if (aposta._id === param.id) {
                    setAposta(aposta)
                    setImages(aposta.images)
                }
            })
        } else {
            setOnEdit(false)
            setAposta(initialState)
            setImages(false)
        }
    }, [param.id, apostar])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Você não possui permissão para realizar essa ação")
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size < !10) // 1mb
                return alert("Tamanho da imagem muito grande!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("Formato da imagem incorreto, tente usar PNG ou JPEG")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("Você não possui permissão para realizar essa ação")
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setAposta({ ...aposta, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Você não possui permissão para realizar essa ação")
            if (!images) return alert("No Image Upload")

            if (onEdit) {
                await axios.put(`/api/apostar/${aposta._id}`, { ...aposta, images }, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post('/api/apostar', { ...aposta, images }, {
                    headers: { Authorization: token }
                })
            }
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }


    return (
        <div className="container">
            <div className="col-12 mt-5">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">{onEdit ? 'Atualizar aposta' : 'Nova aposta'}</h3>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Nome dos times participantes:</label>
                        <input className="form-control" type="text" name="titulo" id="titulo" required value={aposta.titulo} onChange={handleChangeInput} />
                    </div>

                    <div className="form-group">
                        <label>Taxa da Aposta:</label>
                        <input className="form-control" type="text" name="taxaApostaCasa" id="taxaApostaCasa" required value={aposta.taxaApostaCasa} onChange={handleChangeInput} placeholder="-- Taxa da Aposta --" />
                    </div>

                    <div className="form-group">
                        <label>Imagem dos Times participantes{onEdit ? '(caso queira manter a mesma foto, não precisa escolher uma nova imagem!)' : null}:</label>
                        <input className="form-control" type="file" name="file" id="file_up" onChange={handleUpload} />
                        {
                            loading ? <div id="file_img"><Loading /></div>

                                : <div id="file_img" style={styleUpload}>
                                    <img src={images ? images.url : ''} alt="" />
                                    <span onClick={handleDestroy}>X</span>
                                </div>
                        }
                    </div>

                    <button className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro" type="submit">{onEdit ? "Atualizar aposta" : "Publicar aposta"}</button>

                </form>
            </div>
        </div>
    )
}

export default PublicarAposta