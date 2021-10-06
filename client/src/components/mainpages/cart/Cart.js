import React, { useRef, useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
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

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }


    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
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
        <div>
            {
                cart.map(aposta => (
                    <div className="detail cart row mx-auto" key={aposta._id}>

                        <div className="col-md-8 text-dark table-responsive my-3">

                            <div className="delete"
                                onClick={() => removeApostar(aposta._id)}>
                                X
                            </div>
                            <img className="img-fluid w-100" src={aposta.images.url} alt="" />
                        </div>

                        <div className="col-md-4 my-3 text-center text-uppercase">
                            <div className="box-detail">
                                <h2>{aposta.titulo}</h2>

                                <h3>$ {aposta.taxaAposta * aposta.quantity}</h3>
                                <p>{aposta.descricao}</p>

                                <div className="amount">
                                    <button onClick={() => decrement(aposta._id)}> - </button>
                                    <span>{aposta.quantity}</span>
                                    <button onClick={() => increment(aposta._id)}> + </button>
                                </div>
                            </div>

                            <div>
                                <h3>Total da Aposta: $ {total}</h3>
                            </div>

                        </div>
                    </div>
                ))
            }

            <form>
                <div className="text-center">
                    <h3 className="mt-8" style={{ fontSize: '40px' }}>Pagamento</h3>

                    {/* <!-- Botão para acionar modal --> */}
                    <button type="button" class="btn" data-toggle="modal" data-target="#modalExemplo">
                        <a className="btn btn-danger my-2 form-control mb-2">PIX</a>
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

                    <button type="button" className="btn btn-danger mb-4" style={{ borderRadius: '5px', outline: 'none', height: '40px', color: '#fff' }}>
                        <Link to="/sendAposta"><a>PREENCHER FORMULÁRIO</a></Link>
                    </button>
                </div>
            </form>

        </div>

    )
}

export default Cart
