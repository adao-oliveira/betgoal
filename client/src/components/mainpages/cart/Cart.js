import React, { useRef, useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.taxaAposta * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const removeApostar = id => {
        if (window.confirm("Você quer deletar esta aposta?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('PIX COPIADO!');
    };


    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Sem apostas</h2>

    return (
        <div className="row mx-auto mt-32" style={{ paddingTop: '50px' }}>
            <div className="col-md-8 text-dark table-responsive my-3">
                <table className="table my-3">
                    <tbody>
                        {
                            cart.map(aposta => (
                                <div className="detail cart row mx-auto" key={aposta._id}>

                                    <div className="col-md-8 text-dark table-responsive my-3">
                                        <h2 className="text-uppercase" style={{ color: '#111', textAlign:'center' }}>{aposta.titulo}</h2>
                                    </div>

                                    <div className="col-md-4 my-3 text-center">
                                        <div className="box-detail">
                                            <div className="amount">
                                                <button className="text-uppercase" onClick={() => removeApostar(aposta._id)}>Remover</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="col-md-4 my-3 text-center text-uppercase text-dark">
                <h3>Total: <span className="text-danger mb-2">R${total}</span></h3>
                <form>
                    <div className="text-center">
                        <h2 className="mt-8" style={{ fontSize: '40px', color: '#111' }}>Pagamento</h2>

                        {/* <!-- Botão para acionar modal --> */}
                        <button type="button" class="btn" data-toggle="modal" data-target="#modalExemplo">
                            <a className="btn my-2 form-control mb-2" style={{backgroundColor:'crimson'}}>PIX</a>
                        </button>

                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">PIX COPIA E COLA</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="well">
                                            <div>

                                                <div>
                                                    <form>
                                                        <textarea className="js-copytextarea" ref={textAreaRef} style={{ width: '100%', height: '30px', textAlign: 'center', fontSize: '17px', resize: 'none' }} value="AQUIVAIOPIXDOKLY"></textarea>
                                                    </form>
                                                    {
                                                        document.queryCommandSupported('copy') &&
                                                        <div>
                                                            <button className="js-textareacopybtn" onClick={copyToClipboard} style={{ backgroundColor: 'red', borderRadius: '5px', outline: 'none', width: '100px', height: '30px', color: '#fff' }}>Copiar PIX</button>
                                                            {copySuccess}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <p className="mt-4 text-danger">Atenção: ANTES DE PREENCHER O FORMULÁRIO ABAIXO FAÇA O PIX COM O VALOR TOTAL DA SUA APOSTA PARA QUE SEJA VALIDADO.</p>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="container alert alert-danger" role="alert">
                            <p className="mt-4 text-danger">Atenção: PREENCHA O FORMULÁRIO ABAIXO E FAÇA O PIX COM O VALOR TOTAL DA SUA APOSTA PARA QUE SEJA VALIDADO.</p>
                        </div>

                        <button type="button" className="btn mb-4" style={{ borderRadius: '5px', height: '40px', color: '#fff', backgroundColor:'crimson' }}>
                            <Link to="/sendAposta">PREENCHER FORMULÁRIO</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default Cart
