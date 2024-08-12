import connectDb from "@/lib/connectDb";
import User from "@/models/userModel";
import bcrypt from "bcryptjs"

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
  ) {
    await connectDb()
    const {userId} =  params;
    try {
        const user = await User.findById(userId);
        if(!user) return Response.json({success: false, msg: "User not found"})
        return Response.json({success: true, data: user})
    } catch (error) {
        return Response.json({success:false , msg: "Something went wrong", error})
    }
  }


  export async function PUT(req: Request,{ params }: { params: { userId: string } }){
    await connectDb()
    const {userId} =  params;
    console.log("userId: " + userId)
    try {
        const data = await req.json();
        console.log("data---->>>",data)
        const user = await User.findById(userId).select('+password');
        console.log("user: " , user)
        if(!user) return Response.json({success:false, msg: "User not found"})

        let isPassMatched = await bcrypt.compare(data?.password, user?.password)
        console.log("isPassMatched",isPassMatched)

        if(!isPassMatched) return Response.json({success:false, msg: "Password is Incorrect"}) 

        let updatedFields = { username: data?.username, phone: data?.phone, role: data?.role };

        let hashedPassword = await bcrypt.hash(data?.newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(userId, {...updatedFields, password: hashedPassword}, { new: true });

        return Response.json({success: true , data: updatedUser })
    } catch (error) {
        return Response.json({success: false, msg: "Something went wrong", error});
    }
  }

  export async function DELETE(
    req: Request,
    { params }: { params: { userId: string } }
  ) {
    await connectDb()
    const {userId} =  params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if(!user) return Response.json({success: false, msg: "User not found"})
        return Response.json({success: true,msg:"User deleted Successfully", data: user})
    } catch (error) {
        return Response.json({success:false , msg: "Something went wrong", error})
    }
  }
