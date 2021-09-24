import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ApostaItem from '../utils/apostaItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import LoadMore from './LoadMore'


function Apostar() {
    const state = useContext(GlobalState)
    const [apostar, setApostar] = state.apostaAPI.apostar
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.apostaAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) => {
        apostar.forEach(aposta => {
            if (aposta._id === id) aposta.checked = !aposta.checked
        })
        setApostar([...apostar])
    }

    const deleteAposta = async (id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })
            const deleteAposta = axios.delete(`/api/apostar/${id}`, {
                headers: { Authorization: token }
            })

            await destroyImg
            await deleteAposta
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () => {
        apostar.forEach(aposta => {
            aposta.checked = !isCheck
        })
        setApostar([...apostar])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        apostar.forEach(aposta => {
            if (aposta.checked) deleteAposta(aposta._id, aposta.images.public_id)
        })
    }

    if (loading) return <div><Loading /></div>
    return (
        <>
            <div className="container-fluid">

                {
                    isAdmin &&
                    <div className="delete-all">
                        <span>Selecionar tudo</span>
                        <input type="checkbox" checked={isCheck} onChange={checkAll} />
                        <button onClick={deleteAll}>Deletar tudo</button>
                    </div>
                }
                <div className="row">

                    <h2 className="mx-auto" style={{ color: '#111', marginTop: '20px' }}>Apostas da Semana</h2>

                    <div className="img-banner">
                        {
                            apostar.map(aposta => {
                                return <ApostaItem key={aposta._id} aposta={aposta}
                                    isAdmin={isAdmin} deleteAposta={deleteAposta} handleCheck={handleCheck} />
                            })
                        }
                    </div>
                </div>

                <LoadMore />
                {apostar.length === 0 && <Loading />}
            </div>

        </>
    )
}

export default Apostar