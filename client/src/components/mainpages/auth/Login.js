import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [user, setUser] = useState({
        email: '', senha: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })

            localStorage.setItem('firstLogin', true)

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-content d-flex align-itens-center">

            <form className="form-signin mx-auto" onSubmit={loginSubmit}>
                <div className="text-center mb-4">
                    <h1 className="text-center" style={{color:'#111'}}>Login</h1>
                </div>

                <input className="form-control my-2" type="email" name="email" required placeholder="Seu e-mail" value={user.email} onChange={onChangeInput} />
                <input className="form-control my-2" type="password" name="senha" required autoComplete="on" placeholder="Senha" value={user.senha} onChange={onChangeInput} />

                <button className="btn btn-lg btn-block btn-login" type="submit">Acessar</button>

                <div className="opcoes-login mt-5 text-center">
                    <Link to="/" className="mx-2">Recuperar Senha</Link>
                    <span style={{color:'#111'}}>💰</span>
                    <Link to='/register' className="mx-2">Quero cadastrar</Link>
                </div>

            </form>
        </div>
    )
}

export default Login
