import {useState, useEffect} from 'react'
import axios from 'axios'


function ApostaAPI() {
    const [apostar, setApostar] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getApostar = async () => {
            const res = await axios.get(`/api/apostar?limit=${page*9}&${sort}&titulo[regex]=${search}`)
            setApostar(res.data.apostar)
            setResult(res.data.result)
        }
        getApostar()
    },[callback, sort, search, page])
    
    return {
        apostar: [apostar, setApostar],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ApostaAPI
