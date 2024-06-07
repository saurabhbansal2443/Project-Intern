
import User from "../Model/user.js";
import Internship from "../Model/internship.js";


let homePage = async (req, res) => {
  try {
    let data = await Internship.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

let login = async (req, res) => {
  try {
    let data = req.body;

    let user = await User.findOne(
      { email: data.email },
      { password: data.password }
    );

    if (user) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.send(err);
  }
};

let signup = async (req, res) => {
  try {
    let userData = req.body;
    let user = new User(userData); // This is only to create the USER
    let data = await user.save(); // THis is to save in DB
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};


let internshipApply = async (req, res) => {
  try{
    let id = req.params.id;
    res.send("Not DoNE yet " , id )
  }catch(err){
    res.send(err);
  }
}

export { homePage, login, signup , internshipApply };
