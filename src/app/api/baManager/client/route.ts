import connectDb from "@/lib/connectDb";
import Client from "@/models/baManager/clientModal";

export async function POST(req: Request, res: Response): Promise<any>{
    await connectDb()
    try {
        const data = await req.json();

        let client = await Client.findOne({ email: data?.email});
        if(client){
            return Response.json({success: false,msg: "Client already exists"})
        }
        let newClient = await Client.create(data);    
        return Response.json({success: true, msg: "Client created successfully", newClient},{status: 200});
    } catch (error) {
        return Response.json({ error: error}, { status: 500 });
    }
}

export async function GET(): Promise<any>{
    await connectDb()
    try {
        let client = await Client.find({isChecked: false});

        return Response.json({success: true, clients: client})
    } catch (error) {
        return Response.json({ error: error}, { status: 500 })
    }
}