import bcrypt from "bcryptjs";

export const HashPass = async(password: string)=>{
    return await bcrypt.hash(password ,10);
}

export const isPassMatch = async( password: string,userPassword:string)=>{
    return await bcrypt.compare(password,userPassword)
}