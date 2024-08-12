import Scope from '@/models/scopeManager/scopeModel';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    let scope = await Scope.findById(id);
    if(!scope) return Response.json({success: false , msg: "Scope not found"})
  
    return Response.json({success: true , data: scope})
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }

}