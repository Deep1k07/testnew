import BA from '@/models/baManager/baModal';
 
export async function GET(
  req: Request,
  { params }: { params: { cbname: string } }
) {
  const { cbname } = params;
  try {
    console.log("cbname",cbname)
    const baDocuments = await BA.find(
        { 'cb.name': cbname },
        { 'cb.$': 1 } // Use the positional operator to project the matched CB
      );
      // Extract the matched CB details from the documents
    const cbDetails = baDocuments.flatMap(doc => doc.cb);
    let cb = cbDetails.length > 0 ? cbDetails : null;
    if(!cb) return Response.json({success: false , msg: "CB not found"})
  
    return Response.json({success: true , data: cb[0]})
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }
}