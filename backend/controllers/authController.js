const User = require('../models/User');
const jwt = require("jsonwebtoken");



//generate JWT token

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h",});
};

//register user
exports.registerUser = async(req,res)=>{
    
    const {fullName, email, password, profileImageUrl} = req.body;

    //validation: ncheck if all fields are provided
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        //Register new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,

        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch(err){
        res
        .status(500)
        .json({message:"err registering user.",error: err.message});
    
    }
};

//login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({
            message: "error logging in user.",
            error: err.message,
        });
    }
};


//Get user info 
exports.getUserInfo = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        if (!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
        console.log(req.user);

        
    }catch(err){
        res
        .status(500)
        .json({message:"err registering user.",error: err.message});
    }
};
