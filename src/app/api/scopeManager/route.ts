import connectDb from "@/lib/connectDb";
import Client from "@/models/baManager/clientModal";
import Draft from "@/models/scopeManager/draftModel";
import Scope from "@/models/scopeManager/scopeModel";
import AWS from "aws-sdk";
import axios from "axios";
import ConvertAPI from "convertapi";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";


const convertapi = new ConvertAPI('H4cMgLne4dUgXULG');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(req: Request, res: Response): Promise<any>{
    try {
        await connectDb()
        const data = await req.json();
        let scope = await Scope.findOne({ email: data?.email});
        if(scope){
            return Response.json({pdfResult: {success: false,msg: "Scope already exists"}})
        }

        const modifiedData = {
            ...data,
            isScopeModified: data?.isScopeModified ? Number(data?.isScopeModified): 0,
            isScopeApproved: Boolean(data?.isScopeApproved)
        };
        if(data?.isScopeApproved === false){
            console.log("this is if")
            await Scope.create({...modifiedData})
            return Response.json({success: false, msg:" Scope Rejected"})
        }
        else{
            console.log("this is else part")
            const scope = await Scope.create({...modifiedData})
            const draft = await Draft.create({...modifiedData})
            const templateData = {
                'Company Name': data.name,
                'Address': data.address,
                'Scope': data.scope,
                'IAF': data.iaf_code,
            };
        
            // Replace spaces with underscores and convert to lowercase
            const companyName = data?.name?.replace(/\s+/g, '_').toLowerCase(); 

            // Construct the template path using the extracted standard
            let content;
            let zip;
        
            const updatedStandard = data?.standard.split(':')[0];  // e.g., 'ISO 9001' from 'ISO 9001:2015'
            
            console.log("templateData===>>>>",templateData)
            if (data.cb_name === "TSCPL" && data.ab_name === "IAS") {
                const templateKey = `draft-templates/TSCPL-IAS/${updatedStandard}.docx`;
            
                // Fetch the template DOCX from S3
                const templateParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
                    Key: templateKey,
                };
            
                const templateDataFromS3 = await s3.getObject(templateParams).promise();
                content = templateDataFromS3.Body?.toString('binary') || '';
                zip = new PizZip(content);
            }else if(data.cb_name === "TCPL" && data.ab_name === "UAF"){
                console.log("thiis is +++>>>>TCPL,,,UAF")
                if(updatedStandard === 'ISO 50001' || updatedStandard === 'ISO 20000' || updatedStandard === 'ISO 21001' || updatedStandard === 'ISO 37001' || updatedStandard === 'ISO 41001'){
                    delete templateData?.IAF
                }
                const templateKey = `draft-templates/TCPL-UAF/${updatedStandard}.docx`;
            
                // Fetch the template DOCX from S3
                const templateParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
                    Key: templateKey,
                };
            
                const templateDataFromS3 = await s3.getObject(templateParams).promise();
                content = templateDataFromS3.Body?.toString('binary') || '';
                zip = new PizZip(content);
            }else if(data.cb_name === "GAPL" && data.ab_name === "UAF"){
                const templateKey = `draft-templates/GAPL-UAF/${updatedStandard}.docx`;
            
                // Fetch the template DOCX from S3
                const templateParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
                    Key: templateKey,
                };
            
                const templateDataFromS3 = await s3.getObject(templateParams).promise();
                content = templateDataFromS3.Body?.toString('binary') || '';
                zip = new PizZip(content);
            } else {
                await Scope.findByIdAndDelete(scope._id);
                return Response.json({ msg: 'No template found for the given CB, AB names, or standard' });
            }
        
            const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            });
        
        
            // Set the template variables
            doc.setData(templateData);
        
            try {
                doc.render();
            } catch (error: any) {
                const e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                };
                console.log(JSON.stringify({ error: e }));
                await Scope.findByIdAndDelete(scope._id);
                await Draft.findByIdAndDelete(draft._id);
                return Response.json({ msg: 'Error generating DOCX file' });
            }
            const buf = doc.getZip().generate({ type: 'nodebuffer' });
        
            // Generate a unique filename using a timestamp
            const resultKey = `results_draftDocx/docx-companyName=${companyName}.docx`;
        
            // Set up S3 upload parameters
            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME || '',
                Key: resultKey, // File name you want to save as in S3
                Body: buf,
                ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // MIME type for DOCX
            };
        
            // Return a promise to handle the async upload and response
            // TODO: this is uploading docx file in s3 
            const uploadPromise = new Promise((resolve, reject) => {
            s3.upload(uploadParams, async (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                if (err) {
                    console.log(`Error uploading file: ${err}`);
                    await Scope.findByIdAndDelete(scope._id);
                    await Draft.findByIdAndDelete(draft._id);
                    reject({ msg: 'Error uploading file to S3' });
                } else {
                    console.log(`File uploaded successfully. ${data.Location}`);
            
                    // Update the certificate document with the S3 URL
                    await Draft.findByIdAndUpdate(draft._id, { s3DraftDocxUrl: data.Location }, { new: true });
            
                    resolve({ success: true, msg: 'Draft DOCX generated successfully', s3DraftDocxUrl: data.Location });
                }
            });
            });
            const result: any = await uploadPromise;
        
            const convertResult: any = await convertapi.convert('pdf', {
                File: result.s3DraftDocxUrl
            }, 'docx');
        
            const fileUrl = convertResult?.response?.Files[0]?.Url;
        
            if (!fileUrl) {
                throw new Error('No file URL returned from ConvertAPI');
            }
        
            // Stream the PDF from ConvertAPI directly to S3
            const pdfStream = (await axios.get(fileUrl, { responseType: 'stream' })).data;
            const pdfKey = `results_draftPdf/pdf-companyName=${companyName}.pdf`;
        
            // Upload the generated PDF to S3
            const pdfUploadParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME || '',
                Key: pdfKey,
                Body: pdfStream,
                ContentType: 'application/pdf',
            };
        
            //   TODO: this is for pdf upload on s3 
            const pdfUploadPromise = new Promise((resolve, reject) => {
            s3.upload(pdfUploadParams, async (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                if (err) {
                    console.log(`Error uploading PDF file: ${err}`);
                    await Scope.findByIdAndDelete(scope._id);
                    await Draft.findByIdAndDelete(draft._id);
                    reject({ msg: 'Error uploading PDF file to S3' });
                } else {
                    console.log(`PDF file uploaded successfully. ${data.Location}`);
            
                    // Update the certificate document with the PDF URL
                    await Draft.findByIdAndUpdate(draft._id, { s3DraftPdfxUrl: data.Location }, { new: true });
                    await Client.findOneAndUpdate(
                        {email: scope?.email},
                        {$set:{isScopeVerified: true}},
                        { new: true}
                    )
                    resolve({ success: true, msg: 'Certificate PDF generated successfully', s3DraftPdfxUrl: data.Location });
                }
            });
            });
        
            const pdfResult = await pdfUploadPromise;
        
            return Response.json({pdfResult },{status: 200});
        }
    } catch (error) {
        return Response.json({ error: error}, { status: 500 });
    }
}

export async function GET(): Promise<any>{
    try {
        await connectDb()
        let scopeList = await Scope.find({$and:[{isScopeApproved: false},{isScopeModified: 0}]});
        if(scopeList.length === 0) return Response.json({success: false,msg: "Scope not exists"})
        return Response.json({success: true, data:scopeList},{status: 200});
    } catch (error) {
        return Response.json({ error: error}, { status: 500 });
    }
}