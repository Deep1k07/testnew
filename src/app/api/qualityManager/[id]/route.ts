import Scope from '@/models/scopeManager/scopeModel';
import React from 'react'

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    try {
      let data = await req.json()
      if(data?.isReject === true){
        let scope = await Scope.findByIdAndUpdate(id,{isqualityReject: true},{new: true})
        if(!scope) return Response.json({success: false , msg: "Scope not found"})
        return Response.json({success: true ,msg:'Reject Successfully', data: scope})
      }else{
        let scope = await Scope.findByIdAndUpdate(id,{...data, isqualityApproved: true},{new: true})
        if(!scope) return Response.json({success: false , msg: "Scope not found"})
        return Response.json({success: true ,msg:'Approved Successfully', data: scope})
      }
    } catch (error) {
      return Response.json({ error: error}, { status: 500 })
    }
  
  }
