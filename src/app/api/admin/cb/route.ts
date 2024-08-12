import connectDb from "@/lib/connectDb";
import Cb from "@/models/admin/cbModal";
import RateCard from "@/models/baManager/rateCardModal";

export async function POST(req: Request, res: Response){
    try {
        await connectDb()
       // Extract data from the request body
       let { cb, ab } = await req.json();
       console.log("cb,ab",cb,ab)

       // Check if a document already exists based on cb or ab.name
       const existingCb = await Cb.findOne({ cb });

       if (!existingCb) {
        // Create a new CB document if it doesn't exist
        const newCb = new Cb({ cb, ab });
        const createdCb = await newCb.save();
        return Response.json({ success: true, message: "Cb Created successfully", createdCb });
      } else {
        // Update existing CB document by adding new standards and countries
        existingCb.ab = ab;
        await existingCb.save();
        return Response.json({ success: true, message: "Cb updated successfully", existingCb });
      }
        
    } catch (error) {
        return Response.json({error},{status: 500});
    }
}

export async function GET(req: Request, res: Response){
    await connectDb()
    try {
        let CbList = await Cb.find({});
        return Response.json({success: true, CbList});
    } catch (error) {
        return Response.json({error},{status: 500});
    }
}