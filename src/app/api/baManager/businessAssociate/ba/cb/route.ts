import BA from '@/models/baManager/baModal';
 
export async function POST(req: Request) {
  try {
      const data = await req.json()
    if(data?.standardCode){
        let {cbname,abname,standardCode} = data
        const baDocuments = await BA.find(
            { 'cb.name': cbname, 'cb.ab.name': abname, 'cb.ab.standards.code': standardCode },
            { 'cb.$': 1 } // Use the positional operator to project the matched CB
          );
      
          // Extract the matched standard details from the documents
          const standardDetails = baDocuments.flatMap((doc) =>
            doc.cb.flatMap((cb:any) =>
              cb.ab.flatMap((ab:any) =>
                ab.standards.filter((standard:any) => standard.code === standardCode)
              )
            )
          );
          if (standardDetails.length === 0) {
            return Response.json({ success: false, msg: "Standard not found" });
          }
      
          return Response.json({ success: true, data: standardDetails[0] });
    }else{
        let {cbname,abname} = data;
        console.log("cbname , abname",cbname , abname)
        const baDocuments = await BA.find(
          { 'cb.name': cbname, 'cb.ab.name': abname },
          { 'cb.$': 1 } // This ensures only the matched CB object is projected
        );
    
        // Extract the matched AB details from the documents
        const abDetails = baDocuments.flatMap((doc: any) =>
          doc.cb.flatMap((cb: any) =>
            cb.ab.filter((ab: any) => ab.name === abname)
          )
        );
      
        let ab = abDetails.length > 0 ? abDetails : null;
        if(!ab) return Response.json({success: false , msg: "AB not found"})
      
        return Response.json({success: true , data: ab[0]})
    }
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }
}