import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'


function ApostaItem({ aposta, isAdmin, deleteAposta, handleCheck }) {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart


    return (
        <div className="container mt-4">

            {
                isAdmin && <input type="checkbox" checked={aposta.checked}
                    onChange={() => handleCheck(aposta._id)} />
            }

            {/* <img src={aposta.images.url} className="card-img-top img-cartao" alt="Imagem da Aposta" /> */}

            <table class="table table-bordered table-striped table-white bg-white">
                <thead>
                    <tr>
                        <th scope="col">
                            <h5 style={{ textTransform: 'uppercase' }} titulo={aposta.titulo}>{aposta.titulo}</h5>
                        </th>
                        {/* <th scope="col">Last</th>
                        <th scope="col">Handle</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" className="text-center">
                            <div className="btn-group">

                                {
                                    isAdmin ?
                                        <>
                                            <div className="col-6">
                                                <Link className="btn btn-sm btn-detalhes" to="#!"
                                                    onClick={() => deleteAposta(aposta._id, aposta.images.public_id)}>
                                                    Deletar
                                                </Link>
                                            </div>

                                            <div className="col-6">
                                                <Link className="btn btn-sm btn-detalhes" to={`/editar_aposta/${aposta._id}`}>
                                                    Editar
                                                </Link>
                                            </div>

                                        </>
                                        : <>
                                            <div className="col-6">
                                                <Link className="btn btn-sm btn-detalhes" to="#!" onClick={() => addCart(aposta)}>
                                                <i class="fa fa-plus"></i>{aposta.taxaAposta}
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <Link className="btn btn-sm btn-detalhes" to={`/detalhes/${aposta._id}`}>
                                                    Apostar💸
                                                </Link>
                                            </div>
                                        </>
                                }
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default ApostaItem
