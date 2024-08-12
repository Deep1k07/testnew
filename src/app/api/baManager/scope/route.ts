import connectDb from "@/lib/connectDb";
import Scope from "@/models/scopeManager/scopeModel";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextApiRequest, res: Response): Promise<any>{
    await connectDb()
    try {
        const token = await getToken({ req })

        let scope = await Scope.find({$and: [{ ba_manager: token?.username},{isScopeApproved : false},{isScopeModified: {$gt: 0}}]});
        if(scope.length === 0){
            return Response.json({success: false,msg: "Scope not present"})
        }
        return Response.json({success: true, data:scope},{status: 200});
    } catch (error) {
        return Response.json({ error: error}, { status: 500 });
    }
}