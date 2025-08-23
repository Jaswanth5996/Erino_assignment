const express = require('express')
const Lead = require('../models/leadSchema')

const fetchLead = async (req,res) => {
    try{const id = await req.params.id
    details = Lead.find({_id:id})

    if (!details) res.status(404).json({error:"User not Found/!"})

    res.status(201).json({lead:details})}
    catch(err){
        console.log("error fetching the data ")
        res.status(404).json({error:"Fetching Failed"})
    }

}

const getLeads = async (req,res) => {
    try{details = await Lead.find()
    if(!details) res.status(404).json({error:"Failed to load data"})

    res.status(201).json({lead:details})}
        catch(err){
        console.log("error fetching the data ")
        res.status(404).json({error:"Fetching Failed"})
    }
}

const deleteLead = async (req,res) => {
    try {const id = req.params.id
    const user = await Lead.findByIdAndDelete(id)
    if(!user) res.status(404).json({error:"Lead not Found!"})
    
    res.status(201).json({message:"Lead deleted succesfully",lead:user})}

    catch(err){
        console.log("error fetching lead details")
        res.status(404).json({error:"Can't Fetch Details"})
    }

}


module.exports = {getLeads,fetchLead,deleteLead}
