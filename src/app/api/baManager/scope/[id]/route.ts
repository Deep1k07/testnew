import Scope from '@/models/scopeManager/scopeModel';
 
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    let scope = await Scope.findById({_id: id});
    if(!scope) return Response.json({success: false , msg: "Scope not found"})
  
    return Response.json({success: true , data: scope})
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }

}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await req.json()
    if(data?.isApproved === 'true'){
      let scope = await Scope.findByIdAndUpdate(id,{isScopeApproved: true,isScopeModified: 0},{new: true} );
      if(!scope) return Response.json({success: false , msg: "Scope not found"})
    
      return Response.json({success: true ,msg:"Scope Approved Successfully", data: scope})
    }else{
      let scope = await Scope.findByIdAndUpdate(id,{...data, isScopeApproved: false, isScopeModified: 0},{new: true} );
      if(!scope) return Response.json({success: false , msg: "Scope not found"})
    
      return Response.json({success: true ,msg:"Scope Rejected Successfully", data: scope})
    }
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }

}

