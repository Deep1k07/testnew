import BA from '@/models/baManager/baModal';
 
export async function GET(
  req: Request,
  { params }: { params: { Id: string } }
) {
  const { Id } = params;
  try {
    let ba = await BA.find({ba_manager: Id});
    if(!ba || ba.length === 0) return Response.json({success: false , msg: "BA not found with this Ba Manager"})
  
    return Response.json({success: true , data: ba})
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }
}


