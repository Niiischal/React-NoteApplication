const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj={
        name: 'nischal',
        address: 'surunga'
    }
    res.json(obj)
})

module.exports=router