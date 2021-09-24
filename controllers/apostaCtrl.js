const Aposta = require('../models/apostaModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const apostaCtrl = {
    getApostar: async(req, res) =>{
        try {
            const features = new APIfeatures(Aposta.find(), req.query)
            .filtering().sorting().paginating()

            const apostar = await features.query

            res.json({
                status: 'success',
                result: apostar.length,
                apostar: apostar
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    publicarAposta: async(req, res) =>{
        try {
            const {titulo, descricao, taxaAposta, images} = req.body;
            if(!images) return res.status(400).json({msg: "Sem upload de imagem"})

            const aposta = await Aposta.findOne({titulo})
            if(aposta)
                return res.status(400).json({msg: "Esta aposta já foi publicada"})

            const newAposta = new Aposta({
               titulo: titulo.toLowerCase(), descricao, taxaAposta, images
            })

            await newAposta.save()
            res.json({msg: "Aposta publicada"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAposta: async(req, res) =>{
        try {
            await Aposta.findByIdAndDelete(req.params.id)
            res.json({msg: "Aposta deletada"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateAposta: async(req, res) =>{
        try {
            const {titulo, descricao, taxaAposta, images} = req.body;
            if(!images) return res.status(400).json({msg: "Sem upload de imagem"})

            await Aposta.findOneAndUpdate({_id: req.params.id}, {
                titulo: titulo.toLowerCase(), descricao, taxaAposta, images
            })

            res.json({msg: "Aposta atualizada"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = apostaCtrl