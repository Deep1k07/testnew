import connectDb from "@/lib/connectDb";
import BA from "@/models/baManager/baModal";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";


export async function POST(req: Request, res: Response) {
    await connectDb()
    try {
        let {name ,email, country,currency,gst,certificate_language,other_certificate_language,cb,ba_manager} = await req.json();
        console.log(name)
        let ba = await BA.findOne({name: name});
        if(ba){
            return Response.json({success: false, message: "BA already exists"});
        }
        
        let newBA = await BA.create({name ,email, country,currency,gst,certificate_language,other_certificate_language,cb,ba_manager});
        return Response.json({success: true, message: "BA created successfully", newBA});
        
    } catch (error) {
        return Response.json({error},{status: 500});
    }
}

export async function GET(req: Request) {
    await connectDb()
    try {
        // const {id} = await req.json()
        // console.log("id====",id)
        let bAs = await BA.find();
        return Response.json({success: true, data: bAs});
    } catch (error) {
        return Response.json({error},{status: 500});
    }
}