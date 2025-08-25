const express = require('express')
const Lead = require('../models/leadSchema')

const fetchLead = async (req,res) => {
    try{const id = req.params.id
    const details =await Lead.findById(id)

    if (!details) res.status(404).json({error:"User not Found/!"})

    res.status(200).json({lead:details})}
    catch(err){
        console.log("error fetching the data ")
        res.status(500).json({error:"Fetching Failed"})
    }

}

const createLead = async (req, res) => {
  try {
    const data = {...req.body,last_activity_at: new Date(),};

    const newLead = await Lead.create(data);
    res.status(201).json({ message: "Lead created successfully", lead: newLead });
  } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({ error: "Failed to create lead" });
  }
};


const getLeads = async (req, res) => {
  try {
    let { page = 1, limit = 20 } = req.query;
    page = parseInt(page);
    limit = Math.min(parseInt(limit), 100);
    const skip = (page - 1) * limit;
    const total = await Lead.countDocuments();
    const leads = await Lead.find().skip(skip).limit(limit);

    if (leads.length === 0) return res.status(404).json({ error: "No leads found" });
    res.status(200).json({total, page,limit,leads });
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ error: "Fetching failed" });
  }
};


const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(id, updates, {new: true,runValidators: true,});
    if (!updatedLead) {return res.status(404).json({ error: "Lead not found!" });}
    res.status(200).json({ message: "Lead updated successfully", lead: updatedLead });
  } catch (err) {
    console.error("Error updating lead:", err);
    res.status(500).json({ error: "Failed to update lead" });
  }
};


const deleteLead = async (req,res) => {
    try {const id = req.params.id
    const user = await Lead.findByIdAndDelete(id)
    if(!user) res.status(404).json({error:"Lead not Found!"})
    
    res.status(200).json({message:"Lead deleted succesfully",lead:user})}

    catch(err){
        console.log("error fetching lead details")
        res.status(500).json({error:"Can't Fetch Details"})
    }

}



module.exports = {getLeads,fetchLead,deleteLead,createLead,updateLead}
