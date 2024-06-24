const mongoose = require("mongoose");

const jobModel = new mongoose.Schema({
    
    students: [{type: mongoose.Schema.Types.ObjectId, ref: "student"}],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    title: String,
    skill: String,
    jobtype: { type: String, emum: ["In ooffice", "Remote"] },
    openings: Number,
    description: String,
    prefernces: String,
    salary: Number,
    perks: String,
    assesments: String,

}, { timestamps: true })



const Job = mongoose.model("job", jobModel);

module.exports = Job;
