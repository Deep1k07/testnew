import Client from '@/models/baManager/clientModal';
 
export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  const { clientId } = params;
  try {
    let client = await Client.findById({_id: clientId});
    if(!client) return Response.json({success: false , msg: "CLient not found"})
  
    return Response.json({success: true , data: client})
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }

}