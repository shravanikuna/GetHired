// const {default:mongoose} = require("mongoose");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const StudentModel = new mongoose.Schema({
firstname: {
    type: String,
    required:[true,"We need your name"],
    minLength:[4, "Name Should be atleast 4 Characters"],
},
lastname: {
    type: String,
    unique:true,
    required:[true,"lastname is required as well"],
},
avatar:{
    type: Object,
    default:{
        fileId:'',
        url:"https://images.unsplash.com/photo-1693850286866-58b493236931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
    }
},
contact: {
    type:Number,
    unique:true,
    required:[true,"Contact is required"],
    maxLength:[10, "Contact Should be 10 Digits"],
},
city: {
    type: String,
    unique:true,
    required:[true,"City is required"],
},
gender: {
    type: String,
enum: ["Male", "Female", "Others"]
},
email:{
    type: String,
    unique:true,
    required:[true,"Eamil is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password:{
    type:String,
    select: false,
    maxLength:[10, "Password Should Not Exceed more then 10 Characters"],
    minLength:[6, "Password Should have atleast 6 Characters"],

},
resetPasswordToken:{
    type: Number,
    default: 0
},
resume:{
    education:[],
    jobs:[],
    internships:[],
    responsibilities:[],
    course:[],
    projects:[],
    skills:[],
    accomplishments:[],
    
    }, 
    internships:[
        {type: mongoose.Schema.Types.ObjectId, ref: "intership"}
    ],
    jobs:[
        {type: mongoose.Schema.Types.ObjectId, ref: "job"}
    ]

}, { timestamps: true})

StudentModel.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
})
// the above method will run's simultaneously with the Schema updation, this leads to password updation too-> Modify the password to prevent the updation[if modified = change]
// Check the password /login
StudentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
StudentModel.methods.getjwttoken = function(){
return  jwt.sign({id: this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
});
};

const Student = mongoose.model("student", StudentModel);

module.exports = Student;
 