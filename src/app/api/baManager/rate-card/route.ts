import connectDb from "@/lib/connectDb";
import RateCard from "@/models/baManager/rateCardModal";

export async function POST(req: Request, res: Response): Promise<any> {
    try {
        await connectDb()
        let  {cb , ab , rateCards}  = await req.json();
        console.log("body===",cb , rateCards)
    
        const updatedRateCard = await RateCard.findOneAndUpdate(
            { $or: [{ cb: cb }, { ab: ab }] }, // Find document by cb or ab
            { $push: { rateCards: { $each: rateCards } } }, // Add new rate cards to the existing array
            { upsert: true, new: true } // Create if not found, return new doc
          );
        return Response.json({success: true, message: "Rate Card Created successfully", RateCard},{status: 200});
        
    } catch (error) {
        return Response.json({error},{status: 500});
    }
}

export async function GET(req: Request, res: Response): Promise<any> {
    try {
        let BaList = await RateCard.find({});
        return Response.json({success: true, BaList});
    } catch (error) {
        return Response.json({error},{status: 500});
    }
}