const express = require('express') 
const{fetchLead,updateLead,deleteLead,getLeads,createLead} = require('../controllers/Leadcontroller')
const protect = require('../userMiddleware')

const router = express.Router()

// router.get('/:id',protect,fetchLead)
// router.put('/:id',protect,updateLead)
// router.delete('/:id',protect,deleteLead)
// router.get('/',protect,getLeads)
// router.post('/',protectcreateLead)

module.exports = router;