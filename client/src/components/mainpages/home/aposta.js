import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ApostaItem from '../utils/apostaItem'
import Loading from '../utils/loading/Loading'
import LoadMore from './LoadMore'


function Home() {
    const state = useContext(GlobalState)
    const [apostar] = state.apostaAPI.apostar
    const [loading] = useState(false)


    if (loading) return <div><Loading /></div>
    return (
        <>
            <div className="container-fluid">

                <div className="row">

                    <h2 className="mx-auto" style={{ color: '#111', marginTop: '20px' }}>Apostas da Semana</h2>

                    <div className="img-banner">
                        {
                            apostar.map(aposta => {
                                return <ApostaItem key={aposta._id} aposta={aposta} />
                            })
                        }
                    </div>
                </div>

                <LoadMore /> {apostar.length === 0 && <Loading />}
            </div>

        </>
    )
}

export default Home
