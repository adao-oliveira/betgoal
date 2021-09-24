import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function DetalhesAposta() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [apostar] = state.apostaAPI.apostar
    const [detalhesAposta, setDetalhesAposta] = useState([])

    useEffect(() => {
        if (params.id) {

            apostar.forEach(aposta => {
                if (aposta._id === params.id) setDetalhesAposta(aposta)
            })
        }
    }, [params.id, apostar])

    if (detalhesAposta.length === 0) return null;

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <img src={detalhesAposta.images.url} className="img-banner" alt="Banner" />
                    <h3 className="mx-auto mt-5 titulo" style={{ textTransform: 'uppercase' }}><strong>{detalhesAposta.titulo}</strong></h3>
                </div>

                <div className="container">
                    <table className="row mt-5 d-flex justify-content-around">
                        <tr>
                            <td>
                                <img src="https://cdn-icons-png.flaticon.com/512/126/126157.png" style={{ height: '100px', marginRight:'30px' }} />
                            </td>

                            <td>
                                <h5><strong>Taxa</strong></h5>
                                <span className="mt-3">{detalhesAposta.taxaAposta}</span>
                                <b />
                            </td>
                        </tr>

                    </table>

                    <div className="row box-detalhes mt-5">
                        <div className="col-12 text-center">
                            <h5><strong>Detalhes da Aposta</strong></h5>
                        </div>
                        <div className="col-12 text-center">
                            <p>{detalhesAposta.descricao}</p>
                        </div>


                    </div>
                </div>


            </div>

        </>
    )
}

export default DetalhesAposta