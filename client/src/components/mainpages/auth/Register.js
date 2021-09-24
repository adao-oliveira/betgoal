import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name: '', sobreNome: '', email: '', senha: '', whatsapp: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { ...user })

            localStorage.setItem('firstLogin', true)


            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="cadastro-content d-flex align-itens-center">
            <form className="form-signin mx-auto" onSubmit={registerSubmit}>
                <h1 className="text-center mb-4" style={{color:'#111'}}>Cadastro</h1>

                <div className="form-row">
                    {/* NOME */}
                    <div className="form-group col-md-6">
                        <input className="form-control" type="text" name="name" required placeholder="Primeiro nome" value={user.name} onChange={onChangeInput} />
                    </div>
                    {/* SOBRENOME */}
                    <div className="form-group col-md-6">
                        <input className="form-control" type="text" name="sobreNome" required placeholder="Sobrenome" value={user.sobreNome} onChange={onChangeInput} />
                    </div>
                </div>
                {/* EMAIL */}
                <div className="form-group">
                    <input className="form-control" type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />
                </div>
                {/* SENHA */}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input className="form-control" type="password" name="senha" required autoComplete="on" placeholder="Senha" value={user.senha} onChange={onChangeInput} />
                    </div>
                    {/* WHATSAPP */}
                    <div className="form-group col-md-6">
                        <input className="form-control" type="number" name="whatsapp" required placeholder="Whatsapp" value={user.whatsapp} onChange={onChangeInput} />
                    </div>
                </div>

                {/* CADASTRAR */}
                <div className="justify-content-center">
                    <button className="btn btn-lg btn-block btn-cadastro" type="submit">Cadastrar</button>
                    <Link to="/login"><h4 className="text-center mt-4 cad-login" style={{color:'#111'}}>Login</h4></Link>
                </div>

            </form>
        </div >
    )
}

export default Register