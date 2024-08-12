import connectDb from "@/lib/connectDb";
import Certificate from "@/models/GenerateCertificate/certificateModel";


// get all scopes which are shown to certificate manager after approval from quality manager
export async function GET(req: Request, res: Response): Promise<any>{
    try {
        await connectDb()
        let certificate = await Certificate.find();
        if(certificate?.length === 0){
            return Response.json({success: false,msg: "Certificate not Found"},{status: 404})
        }
        return Response.json({success: true, data: certificate},{status: 200});
    } catch (error) {
        return Response.json({ error: error}, { status: 500 });
    }
}
