const express = require('express') 
const{fetchLead,updateLead,deleteLead,getLeads,createLead} = require('../controllers/Leadcontroller')

const router = express.Router()

router.get('/:id', fetchLead)
router.put('/:id',updateLead)
router.delete('/:id',deleteLead)
router.get('/',getLeads)
router.post('/',createLead)

module.exports = router;