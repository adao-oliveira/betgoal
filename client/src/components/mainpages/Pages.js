import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './home'
import DetalhesAposta from './detalhesAposta/index'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import publicarAposta from './publicarAposta/index'
import editarAposta from './editarAposta/index'
import Aposta from './home/aposta'
import sendAposta from './sendAposta'
import Cart from './cart/Cart'


import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/detalhes/:id" exact component={DetalhesAposta} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/publicarAposta" exact component={isAdmin ? publicarAposta : NotFound} />
            <Route path="/editar_aposta/:id" exact component={isAdmin ? publicarAposta : NotFound} />
            <Route path="/editarAposta" exact component={isAdmin ? editarAposta : NotFound} />
            <Route path="/aposta" exact component={Aposta} />
            <Route path="/sendAposta" exact component={sendAposta} />

            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
