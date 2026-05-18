import {User} from "../models/user_model";
import { ApiError } from "../utils/ApiErrors";
import jwt from 'jsonwebtoken';


export const  registeruser = async (async (req,res)=>{
try {
    
    const [name , user , email,role  ] = req.body || {}


    if(
        [name , user , email ,role ].some((feilds) => feilds.trim()=="")
    ){
        throw new ApiError(401,"All feilds are required " , {
            
        });
        
    }

    // const existinguser = await User.findOne({
    //     $or:[{email},{name}]
    // })
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedpassword,
      role: normalizedrole,
      avatarUrl: avatarUrl || null,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
      },
    });
} catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
}

})


export const login = async(req,res)=>{

  try {
    const {email, password } = req.body;

  if(!email || !password ){
    return res.status(400).json({success:false, message:"Something is missing ! , all feilds are required . "});
  }

  const existinguser = await User.findOne({email});

  if(!existinguser)return res.status(400).json({success:false, message:"user doestm't exist, Invalid Email  . "});

  const ispasscorr = await bcrypt.compare(password, existinguser.password ); 

  if(!ispasscorr)return res.status(400).json({success:false, message:"Incorrect password"});

const token = jwt.sign(
  {userId : existinguser._id  },
  process.env.JWT_SECRET,
  {expiresIn: "1h"}
)


  return res.status(200)
  .cookies(
    "token",token,{
      maxAge:60*60*1000,
      httpOnly:true,
      sameSite:"lax",
      secure:false
    }
  ).json({
    messgae:`Welcome back ${existinguser.name}!`,
    sucess:true,
    user:{
      name:existinguser.name,
      email:existinguser.email
    }
  })
  
  } catch (error) {
    console.log("login error ",error);
    return res.status(500).json({
      sucess:false , 
      message:"Internal Server Error While Logging In "
    })
  }
  
}

