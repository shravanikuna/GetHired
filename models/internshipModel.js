const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema({

    students: [{type: mongoose.Schema.Types.ObjectId, ref: "student"}],
    employee: {type: mongoose.Schema.Types.ObjectId, ref: "employee"}
    ,profile: String,
    skill: String,
    internshiptype: { type: String, emum: ["In ooffice", "Remote"] },
    openings: Number,
    startdate: String,
    enddate: String,
    duration: String,
    responsibility: String,
    stipend: {
        status:{
             type: String, emum: ["Fixed", "Negotiable", "Performace based", "Unpaid"] 
        },
        amount: Number,
    },
    perks:String,
    assesments: String,

}, { timestamps: true })



const Internship = mongoose.model("internship", internshipModel);

module.exports = Internship;
