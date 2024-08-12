import BA from '@/models/baManager/baModal';
// import { decode } from 'next-auth/jwt';
export async function GET(
  req: Request,
  { params }: { params: { baname: string } }
) {
  const { baname } = params;
  try {
    console.log("baname",baname)
    let ba = await BA.findOne({name: baname});
    console.log("ba===",ba)
    if(!ba || ba.length === 0) return Response.json({success: false , msg: "BA not found"})
  
    return Response.json({success: true , data: ba})
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }
}


export async function POST(
  req: Request,
  { params }: { params: { baname: string } }
){
  // const data = decode
  const { baname } = params;
  try {
    const body = await req.json()

    if(body?.standardCode){
      
    }else{
      let {cbname} = body;
      let ba = await BA.findOne({
        name: baname,
        'cb': {
          $elemMatch: {
            name: cbname
          }
        }
      });
      
      if (!ba) {
        return Response.json({ success: false, msg: "BA not found" }, { status: 404 });
      }
      
      // Extract the relevant `ab` from the matching `cb`
      const cb = ba.cb.find((cb:any) => cb.name === cbname);
      const ab = cb?.ab || [];
  
      return Response.json({success: true, data: ab})

    }
  } catch (error) {
    return Response.json({ error: error}, { status: 500 })
  }
}