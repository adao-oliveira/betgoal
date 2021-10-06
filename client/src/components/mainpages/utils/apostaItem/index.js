import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'


function ApostaItem({ aposta, isAdmin, deleteAposta, handleCheck }) {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart


    return (
        <div className="container mt-4">
            {/* <div className="col-md-4 col-sm-12"> */}

                {
                    isAdmin && <input type="checkbox" checked={aposta.checked}
                        onChange={() => handleCheck(aposta._id)} />
                }

                {/* <img src={aposta.images.url} className="card-img-top img-cartao" alt="Imagem da Aposta" /> */}

                {/* <div className="card" style={{ backgroundColor: "#1b8231", marginBottom: '20px' }}>

                    <div className="card-body">
                        <h5 style={{ textTransform: 'uppercase' }} titulo={aposta.titulo}>{aposta.titulo}</h5>
                        <p className="card-text text-justify">
                            {aposta.descricao}
                        </p>

                    </div>

                    <div className="row rodape-card d-flex align-items-center text-center" style={{ margin: '10px auto' }}>

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
                                            Adicionar
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
                </div>

            </div> */}

            <table className="table table-bordered table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">
                            <h5 style={{ textTransform: 'uppercase' }} titulo={aposta.titulo}>{aposta.titulo}</h5>
                        </th>
                        <th scope="col">
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
                                                    Adicionar
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

                        </th>
                    </tr>
                </thead>
            </table>

        </div>
    )
}

export default ApostaItem
