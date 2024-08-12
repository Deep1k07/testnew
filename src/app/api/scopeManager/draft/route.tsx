import connectDb from "@/lib/connectDb";
import Draft from "@/models/scopeManager/draftModel";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextApiRequest){
    try {
        await connectDb()
        const token = await getToken({req});
        console.log("token>>>>>>>>>>",token)

        let draft = await Draft.find({$or: [{ba_manager: token?.username}, {isScopeApproved: true}]})
        if(draft?.length === 0) return Response.json({msg: 'Draft not found'},{status: 404});

        return Response.json({success: true, data: draft}, {status: 200});

    } catch (error) {
        return Response.json({ error})
    }
}