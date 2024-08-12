import connectDb from "@/lib/connectDb";
import Scope from "@/models/scopeManager/scopeModel";

export async function GET(req: Request, res: Response): Promise<any>{
    await connectDb()
    try {
        let scope = await Scope.find({ $and: [{ isScopeApproved: true }, { isScopeModified: 0 }] });
        if(scope?.length === 0){
            return Response.json({success: false,msg: "Scope not exists"})
        }
        return Response.json({success: true, data: scope},{status: 200});
    } catch (error) {
        return Response.json({ error: error}, { status: 500 });
    }
}
