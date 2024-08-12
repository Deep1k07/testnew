import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import AWS from 'aws-sdk';
import connectDb from '@/lib/connectDb';
import Certificate from '@/models/GenerateCertificate/certificateModel';
import ConvertAPI from 'convertapi';
import axios from 'axios';
import Scope from '@/models/scopeManager/scopeModel';

const convertapi = new ConvertAPI('H4cMgLne4dUgXULG');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


export async function POST(req: Request, res: Response) {
  try {
    await connectDb();
    const data = await req.json();

    const certificate = await Certificate.findOne({$or: [{certificate_number:data?.certificate_number},{email: data?.email}]})
    if(certificate) return Response.json({success: false , msg: "Certificate already generated"})
    const cert = await Certificate.create({ ...data });

    const formatDate = (date: Date) => {
      return date ? new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '';
    };

    const templateData = {
      'COMPANY NAME': data.name,
      'ADDRESS': data.address,
      'SCOPE': data.scope,
      'REGISTRATION': formatDate(new Date()), // today's date
      'RECERTIFICATION': formatDate(new Date()),
      'CERTIFICATE NUMBER': data?.certificate_number,
      'ISSUE': formatDate(data?.initial_issue),
      'SUR1': formatDate(data?.first_surveillance),
      'SUR2': formatDate(data?.second_surveillance),
      'ISSUE NO': data?.issue_no || 'N/A',
      'VALIDITY': formatDate(data?.valid_until),
      'REVISION': data?.revision_no ? `${data?.revision_no}/${formatDate(data?.revision_date)}` : 'N/A',
      'IAF': data.iaf_code,
    };

    // Replace spaces with underscores and convert to lowercase
    const companyName = data?.name?.replace(/\s+/g, '_').toLowerCase(); 


    // Construct the template path using the extracted standard
    let content;
    let zip;

    const updatedStandard = data.standard.split(':')[0];  // e.g., 'ISO 9001' from 'ISO 9001:2015'
    if (data.cb_name === "TSCPL" && data.ab_name === "IAS") {
      const templateKey = `templates/TSCPL-IAS/${updatedStandard}.docx`;

      // Fetch the template DOCX from S3
      const templateParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME || '',
        Key: templateKey,
      };

      const templateDataFromS3 = await s3.getObject(templateParams).promise();
      content = templateDataFromS3.Body?.toString('binary') || '';
      zip = new PizZip(content);
    }else if(data.cb_name === "TCPL" && data.ab_name === "UAF"){
      const templateKey = `templates/TCPL-UAF/${updatedStandard}.docx`;

      // Fetch the template DOCX from S3
      const templateParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME || '',
        Key: templateKey,
      };

      const templateDataFromS3 = await s3.getObject(templateParams).promise();
      content = templateDataFromS3.Body?.toString('binary') || '';
      zip = new PizZip(content);
    }else if(data.cb_name === "GAPL" && data.ab_name === "UAF"){
      const templateKey = `templates/GAPL-UAF/${updatedStandard}.docx`;

      // Fetch the template DOCX from S3
      const templateParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME || '',
        Key: templateKey,
      };

      const templateDataFromS3 = await s3.getObject(templateParams).promise();
      content = templateDataFromS3.Body?.toString('binary') || '';
      zip = new PizZip(content);
    } else {
      await Certificate.findByIdAndDelete(cert._id);
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
      await Certificate.findByIdAndDelete(cert._id);
      return Response.json({ msg: 'Error generating DOCX file' });
    }
    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    // Generate a unique filename using a timestamp
    const resultKey = `results/docx_certificateNo=${data?.certificate_number}/_companyName=${companyName}.docx`;

    // Set up S3 upload parameters
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: resultKey, // File name you want to save as in S3
      Body: buf,
      ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // MIME type for DOCX
    };

    // Return a promise to handle the async upload and response
    const uploadPromise = new Promise((resolve, reject) => {
      s3.upload(uploadParams, async (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.log(`Error uploading file: ${err}`);
          await Certificate.findByIdAndDelete(cert._id);
          reject({ msg: 'Error uploading file to S3' });
        } else {
          console.log(`File uploaded successfully. ${data.Location}`);

          // Update the certificate document with the S3 URL
          await Certificate.findByIdAndUpdate(cert._id, { s3DocUrl: data.Location }, { new: true });

          resolve({ success: true, msg: 'Certificate DOCX generated successfully', s3DocUrl: data.Location });
        }
      });
    });
    const result: any = await uploadPromise;

    const convertResult: any = await convertapi.convert('pdf', {
      File: result.s3DocUrl
    }, 'docx');

    const fileUrl = convertResult?.response?.Files[0]?.Url;

    if (!fileUrl) {
      throw new Error('No file URL returned from ConvertAPI');
    }

    // Stream the PDF from ConvertAPI directly to S3
    const pdfStream = (await axios.get(fileUrl, { responseType: 'stream' })).data;
    const pdfKey = `results_pdf/pdf_certificateNo=${data?.certificate_number}_companyName=${companyName}.pdf`;

    // Upload the generated PDF to S3
    const pdfUploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: pdfKey,
      Body: pdfStream,
      ContentType: 'application/pdf',
    };


    const pdfUploadPromise = new Promise((resolve, reject) => {
      s3.upload(pdfUploadParams, async (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.log(`Error uploading PDF file: ${err}`);
          await Certificate.findByIdAndDelete(cert._id);
          reject({ msg: 'Error uploading PDF file to S3' });
        } else {
          console.log(`PDF file uploaded successfully. ${data.Location}`);

          // Update the certificate document with the PDF URL
          await Certificate.findByIdAndUpdate(cert._id, { s3PdfUrl: data.Location }, { new: true });
          await Scope.findOneAndUpdate(
            {$or: [{name:cert.name},{email:cert.email}]},
            {
              $set:{
                isCertificateGenerate: true
              }
            }
          )
          resolve({ success: true, msg: 'Certificate PDF generated successfully', s3PdfUrl: data.Location });
        }
      });
    });

    const pdfResult = await pdfUploadPromise;

    return Response.json({pdfResult });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error' , ere: error });
  }
}
