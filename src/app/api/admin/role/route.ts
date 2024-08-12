import connectDb from "@/lib/connectDb";
import User from "@/models/userModel";
import { HashPass } from "@/utils/hashedPassword";

export async function POST(req: Request, res: Response){
    await connectDb()
    const { username, email, role, phone, password } = await req.json();

    try {
        let user = await User.findOne({ email });
        if(user){
            return Response.json({success: false,msg: "User already exists"})
        }
        
        let hashedPassword = await HashPass(password);
        let newUser = await User.create({username,email,role, phone,password: hashedPassword});    
        return Response.json({success: true, msg: "User created successfully", newUser});
    } catch (error) {
        return Response.json({success: false, msg: "Something went wrong", error});
    }
}


export async function GET(){
    await connectDb()
    try {
        const res = await User.find({});
        return Response.json({success:true , data: res});
    } catch (error) {
        return Response.json({success: false, msg: "Something went wrong", error});
    }
}