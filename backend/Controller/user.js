import User from "../Model/user.js";
import Internship from "../Model/internship.js";
import bcrypt from "bcrypt";

let homePage = async (req, res) => {
  try {
    let data = await Internship.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

let login = async (req, res) => {
  console.log("login")
  try {
    let data = req.body;

    let {password } = data ;

    let user = await User.findOne( { email: data.email });

    if(user == null ) {  return res.send({msg : "User not exist " , res : false })};
    
    let userPassword = password;
    let hashedPassword = user.password;
    

    let result = await bcrypt.compare(userPassword, hashedPassword);
    console.log(result)
    if(result == true ){
      return res.send({msg : "Authentication Sucess" , res : true });
    }else{
      return res.send({msg : "Email/Password is wrong " , res : false });
    }
    
  } catch (err) {
    console.log(err)
    res.send({msg : "" , res : false });
  }


};

let signup = async (req, res) => {
  console.log("signup")
  try {
    let userData = req.body;
    let {  password } = userData;

    console.log(userData)

    let salt = await bcrypt.genSalt(10); // Generating the salt
    let hashPassword = await bcrypt.hash(password, salt); // generating the hashed password
    userData.password = hashPassword;

    let user = new User(userData); // This is only to create the USER
    let data = await user.save(); // THis is to save in DB
    res.send({msg : data , res : true });

  } catch (err) {
    console.log(err);
    res.send({msg : "User exist " , res : false });
  }
};

let internshipApply = async (req, res) => {
  try {
    let id = req.params.id;
    res.send("Not DoNE yet ", id);
  } catch (err) {
    res.send(err);
  }
};

export { homePage, login, signup, internshipApply };
