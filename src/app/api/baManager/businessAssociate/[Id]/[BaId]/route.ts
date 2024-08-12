import BA from '@/models/baManager/baModal';
 
export async function GET(
  req: Request,
  { params }: { params: { BaId: string } }
) {
  const { BaId } = params;
  try {
    let ba = await BA.findById({name: BaId});
    if(!ba || ba.length === 0) return Response.json({success: false , msg: "BA not found"})
  
    return Response.json({success: true , data: ba})
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }
}

