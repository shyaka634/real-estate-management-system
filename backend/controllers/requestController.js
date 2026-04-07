import Request from "../models/rental_requestModel.js";
import User from '../models/userModel.js'

export async function registerRequest(req,res){
    try {
        const {tenant_id,property_id,status}=req.body;
        const findRequest= await Request.findOne({where:{tenant_id, property_id}})
        if(findRequest) return res.status(400).json({message:"Rent Already exists"});
        const tenant= await User.findOne({where:{user_id:tenant_id}})
        if(!tenant) return res.status(400).json({messsage:"Tenant Doesn't exist"});
        if(tenant.role!=="tenant") return res.status(404).json("Tenant not found");
        const request= await Request.create({tenant_id,property_id,status})
        res.status(201).json({message:"Rent registered successfully",request})
    } catch (error) {
        console.error("error Occured when registering rent",error)
        res.status(500).json({error:error.message})
    }
}

export async function getAllRequests(req,res){
    try {
        const getAll= await Request.findAll();
        res.status(200).json(getAll)
    } catch (error) {
        console.error("error occured when geting all requests",error)
        res.status(500).json({error:error.message})
    }
}

export async function getRequestById(req,res){
    try {
        const{request_id}= req.params;
        const request=await Request.findByPk(request_id);
        if(!request) return res.status(404).json({message:"Invalid request"})
        res.status(200).json(request)
    } catch (error) {
          res.status(500).json({ message: "Error fetching property" });
    }
}

export async function updateRequest(req,res){
    try {
        const {request_id}=req.params;
        const {tenant_id,property_id,status}=req.body;
        const request=await Request.findByPk(request_id);
        if(!request) return res.status(404).json({message:"Invalid request"});

        await request.update({tenant_id,property_id,status});
        res.status(200).json({message:"Request updated successfully",request});
    } catch (error) {
        console.error("error occured when updating request",error)
        res.status(500).json({error:error.message})
    }
}

export async function deleteRequest(req,res){
    try {
        const {request_id}=req.params;
        const request=await Request.findByPk(request_id);
        if(!request) return res.status(404).json({message:"Invalid request"});

        await request.destroy();
        res.status(200).json({message:"Request deleted successfully"});
    } catch (error) {
        console.error("error occured when deleting request",error)
        res.status(500).json({error:error.message})
    }
}