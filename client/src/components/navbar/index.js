import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <></>
        )
    }

    const loggedRouter = () => {
        return (
            <></>
        )
    }



    return (
        <nav className="navbar navbar-expand-lg">

            <div className="logo">
                <Link to="/">
                    <img src="https://res.cloudinary.com/beatgoal/image/upload/v1632443859/1632443770149_ziteuo.png" alt="logo_iv_online" style={{ height: '100px' }} />
                </Link>
            </div>

            <button class="navbar-toggler first-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent20"
                aria-controls="navbarSupportedContent20" aria-expanded="false" aria-label="Toggle navigation">
                <div class="animated-icon1"><span></span><span></span><span></span></div>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent20">
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <Link className="nav-link" className="nav-link" to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        {
                            isLogged ?
                                <li className="nav-link"><Link to="/aposta">Apostas</Link></li>
                                : ''
                        }
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/editarAposta">

                            {isAdmin ? 'Editar Apostas' : ''}</Link>
                    </li>

                    <li className="nav-item" style={{ marginRight: '-35px' }}>
                        <Link className="nav-link" to="/publicarAposta">

                            {isAdmin ? 'Publicar Aposta' : ''}</Link>
                    </li>

                    <li className="nav-item">

                        {isAdmin && adminRouter()}

                        {
                            isLogged ? loggedRouter() : <li className="nav-link"><Link to="/login">Login 💰 Registrar</Link></li>
                        }
                    </li>

                    <li className="nav-item">
                        {
                            isLogged ?
                                <li className="nav-link"><Link to="/" onClick={logoutUser}>Sair</Link></li>
                                : ''
                        }
                    </li>

                </ul>
            </div>

        </nav >
    )
}

export default Navbar
