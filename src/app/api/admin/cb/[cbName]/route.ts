import connectDb from "@/lib/connectDb";
import Cb, { CbDocument } from "@/models/admin/cbModal";

export async function GET(
    req: Request,
    { params }: { params: { cbName: string } }
  ) {
    await connectDb()
    const { cbName } = params;
    try {
      let _Cb = await Cb.findOne({cb: cbName});
      if(!_Cb) return Response.json({success: false , msg: "Cb not found"})
    
      return Response.json({success: true , data: _Cb})
    } catch (error) {
      return Response.json({ error: error}, { status: 500 })
    }
  
  }

  export async function PUT(
    req: Request,
    { params }: { params: { cbName: string } }
  ) {
    await connectDb();
    const { cbName } = params;
  
    try {
      const data = await req.json();
      console.log("data===??", data);
  
      if (data?.standard) {
        let { ab, standard } = data;
  
        const cbData = await Cb.findOne({ cb: cbName }) as CbDocument;
  
        if (!cbData) {
          return Response.json({ msg: 'Cb not found' })
        }
  
        const abData = cbData.ab.find((item) => item.name === ab);
  
        if (!abData) {
          return Response.json({ msg: 'AB not found' })
        }
  
        const standardIndex = abData.standards.findIndex(std => std.code === standard.code);
        console.log("standardIndex==", standardIndex);
        let standardToBeUpdated = { name: standard.name, code: standard.updated };
  
        if (standardIndex !== -1) {
          abData.standards[standardIndex] = {
            ...abData.standards[standardIndex],
            ...standardToBeUpdated
          };
          await cbData.save();
          return  Response.json({ success: true, msg: 'Standard updated successfully', data: cbData });
        } else {
          return Response.json({ success: false, msg: "Standard not found" })
        }
  
      } else if (data?.country) {
        let { ab, country } = data;
  
        const cbData = await Cb.findOne({ cb: cbName }) as CbDocument;
  
        if (!cbData) {
          return Response.json({ msg: 'Cb not found' })
        }
  
        const abData = cbData.ab.find((item) => item.name === ab);
  
        if (!abData) {
          return Response.json({ msg: 'AB not found' })
        }
  
        const countryIndex = abData.countrys.findIndex(cntry => cntry.code === country.code);
        let countryToBeUpdated = { name: country.name, code: country.updated };
  
        if (countryIndex !== -1) {
          abData.countrys[countryIndex] = {
            ...abData.countrys[countryIndex],
            ...countryToBeUpdated
          };
          await cbData.save();
          return  Response.json({ success: true, msg: 'Country updated successfully', data: cbData })
        } else {
          return  Response.json({ success: false, msg: "Country not found" })
        }
      }
    } catch (error) {
      return Response.json({ error: error })
    }
  }

  export async function DELETE(req: Request , { params }: { params: { cbName: string } }){
    connectDb()
    const {cbName} = params
    try {
      const data = await req.json();

      if(data?.standard){

        let {ab , standard} = data;

        const cbData = await Cb.findOne({ cb: cbName }) as CbDocument;
  
        if (!cbData) {
          return Response.json({ msg: 'Cb not found' })
        }
  
        const abData = cbData.ab.find((item) => item.name === ab);
  
        if (!abData) {
          return Response.json({ msg: 'AB not found' })
        }

        const standardIndex = abData.standards.findIndex((std: any) => std.code === standard.code || std.name === standard.name);
    
        if (standardIndex !== -1) {
          abData.standards.splice(standardIndex, 1);
          await cbData.save();
          return Response.json({ success: true, msg: 'Standard deleted successfully', data: cbData });
        } else {
          return Response.json({ error: 'Standard not found' });
        }
      }else if(data?.country){
        let {ab , country} = data;

        const cbData = await Cb.findOne({ cb: cbName });
    
        if (!cbData) {
          return Response.json({ msg: 'Cb not found' })
        }
  
        const abData = cbData.ab.find((item: any) => item.name === ab);
  
        if (!abData) {
          return Response.json({ msg: 'AB not found' })
        }
    
        const countryIndex = abData.countrys.findIndex((std: any) => std.code === country.code || std.name === country.name);
    
        if (countryIndex !== -1) {
          abData.countrys.splice(countryIndex, 1);
          await cbData.save();
          return Response.json({ success: true, msg: 'Country deleted successfully', data: cbData });
        } else {
          return Response.json({ error: 'Country not found' });
        }
      }
    } catch (error) {
      return Response.json({ error: error })
    }
  } 
  export async function POST(req: Request , { params }: { params: { cbName: string } }){
    connectDb()
    const {cbName} = params
    try {
      const data = await req.json();

      if(data?.standard){
        let {ab , standard} = data;

        const cbData = await Cb.findOne({ cb: cbName }) as CbDocument;
  
        if (!cbData) {
          return Response.json({ msg: 'Cb not found' })
        }
  
        const abData = cbData.ab.find((item) => item.name === ab);
  
        if (!abData) {
          return Response.json({ msg: 'AB not found' })
        }
        const isStandardPresent = abData?.standards?.some(
          (std: {name: string , code: string}) => std.code === standard.code
        );
  
        if (isStandardPresent) {
          return Response.json({ message: 'Standard already present' }, { status: 200 });
        }
  
        // If the standard is not present, add it
        abData.standards.push(standard);
        await cbData.save();

        return Response.json({success: true , msg: "Standard added successfully"})
      }else if(data?.country){
        let {ab , country} = data;

        const cbData = await Cb.findOne({ cb: cbName }) as CbDocument;
  
        if (!cbData) {
          return Response.json({ msg: 'Cb not found' })
        }
  
        const abData = cbData.ab.find((item) => item.name === ab);
  
        if (!abData) {
          return Response.json({ msg: 'AB not found' })
        }
  
        const iscountryPresent = abData?.countrys?.some(
          (std: {name: string , code: string}) => std.code === country.code
        );
  
        if (iscountryPresent) {
          return Response.json({ message: 'Country already present' }, { status: 200 });
        }
  
        // If the country is not present, add it
        abData.countrys.push(country);
        await cbData.save();

        return Response.json({success: true , msg: "Country added successfully"})
      }

    } catch (error) {
      return Response.json({ error: error })
    }
  } 


