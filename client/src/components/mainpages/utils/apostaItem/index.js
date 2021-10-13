import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'


function ApostaItem({ aposta, isAdmin, deleteAposta, handleCheck }) {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart
    const [cart, setCart] = state.userAPI.cart


    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.taxaAposta * item.quantity)  
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])


    return (
        <div className="container mt-4">
            <div class="table-responsive">

                {
                    isAdmin && <input type="checkbox" checked={aposta.checked}
                        onChange={() => handleCheck(aposta._id)} />
                }

                {/* <img src={aposta.images.url} className="card-img-top img-cartao" alt="Imagem da Aposta" /> */}

                <table class="table table-bordered table-striped table-white bg-white">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">
                                <h5 style={{ textTransform: 'uppercase' }} titulo={aposta.titulo}>{aposta.titulo}</h5>
                            </th>
                            {/* <th scope="col">
                                <tr>
                                    <i class="fa fa-calendar ml-1 bg-blak date-home"></i>
                                </tr>
                                <tr>
                                    <i class="far fa-clock ml-1 bg-blak date-home"></i>
                                </tr>
                            </th> */}
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
                                                <div className="col-6 mr-2">
                                                    <Link className="btn btn-sm btn-detalhesAposta" to="#!" onClick={() => addCart(aposta)}>
                                                        <spam className="inline mr-2" style={{width:'160px'}}>Adicionar</spam>R${aposta.taxaAposta}
                                                    </Link>
                                                </div>
                                                {/* <div className="col-6">
                                                <Link className="btn btn-sm btn-detalhes" to={`/detalhes/${aposta._id}`}>
                                                    Apostar💸
                                                </Link>
                                            </div> */}
                                            </>
                                    }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ApostaItem
