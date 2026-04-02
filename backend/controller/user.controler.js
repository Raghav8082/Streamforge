import { User } from "../models/user_model";
import { ApiError } from "../utils/ApiErrors";



const registeruser = async((req,res)=>{

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


})

