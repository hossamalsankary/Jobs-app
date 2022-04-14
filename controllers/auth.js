const User = require("../module/auth");
const jwt = require("jsonwebtoken");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors/index");
// here../module/authhold all user Authentication
const userAuth = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
      try {
        let newUser = await User.create({ ...req.body });
        let token = newUser.createJWT();
        console.log(User);
        res.json({ data: newUser, token: token });
      } catch (error) {
        console.log(error);
      }
    }
  },
  //Login Code
  login: async (req, res , next) => {
    //Get User Name
    const { name, password } = req.body;
    User.findOne({ name: name }).then(async (userData) => {
      try {
        if (userData != null) {
          let isPasswordTrue = await userData.compare(password);
          console.log(isPasswordTrue);

          if (isPasswordTrue) {
            let token = jwt.sign(
              {
                data: { name: this.name, email: this.email },
              },
              process.env.SECRET,
              { expiresIn: "30d" }
            );
  
            res.json({ data: userData, token: token });
          } else {
            throw new  UnauthenticatedError("Sorry Password Wrong");
          }
        } else {
         throw new BadRequestError("Opps Some Thing Went Wrong !!");
        }
      } catch (error) {
        next(error);
      }
 
    });
    //res.json({ data: "login" });
  },
};

module.exports = {
  login: userAuth.login,
  register: userAuth.register,
};
