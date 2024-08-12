import connectDb from "@/lib/connectDb";
import Scope from "@/models/scopeManager/scopeModel";


// get all scopes which are shown to certificate manager after approval from quality manager
export async function GET(req: Request, res: Response): Promise<any>{
    await connectDb()
    try {
        let scopes = await Scope.find({isqualityApproved: true});
        if(scopes?.length === 0){
            return Response.json({success: false,msg: "Scope not present"})
        }
        return Response.json({success: true, data: scopes},{status: 200});
    } catch (error) {
        return Response.json({ error: error}, { status: 500 });
    }
}
