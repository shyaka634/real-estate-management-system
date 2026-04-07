import Rent from '../models/rentModel.js'
import User from '../models/userModel.js'

export async function registerRent(req,res){
    try {
        const {tenant_id,property_id,startDate}=req.body;
        const findRent= await Rent.findOne({where:{tenant_id, property_id}})
        if(findRent) return res.status(400).json({message:"Rent Already exists"});
        const tenant= await User.findOne({where:{user_id:tenant_id}})
        if(!tenant) return res.status(400).json({messsage:"Tenant Doesn't exist"});
        if(tenant.role!=="tenant") return res.status(404).json("Tenant not found");
        const rent= await Rent.create({tenant_id,property_id,startDate})
        res.status(201).json({message:"Rent registered successfully",rent})
    } catch (error) {
        console.error("error Occured when registering rent",error)
        res.status(500).json({error:error.message})
    }
}

export async function getAllRents(req,res){
    try {
        const rents=await Rent.findAll();
        res.status(200).json(rents);
    } catch (error) {
        console.error("error occured when getting all rents",error)
        res.status(500).json({error:error.message})
    }
}

export async function getRentById(req,res){
    try {
        const {id}=req.params;
        const rent=await Rent.findByPk(id);
        if(!rent) return res.status(404).json({message:"Invalid rent"});
        res.status(200).json(rent);
    } catch (error) {
        console.error("error occured when getting rent by id",error)
        res.status(500).json({error:error.message})
    }
}

export async function updateRent(req,res){
    try {
        const {id}=req.params;
        const {tenant_id,property_id,startDate}=req.body;
        const rent=await Rent.findByPk(id);
        if(!rent) return res.status(404).json({message:"Invalid rent"});

        await rent.update({tenant_id,property_id,startDate});
        res.status(200).json({message:"Rent updated successfully",rent});
    } catch (error) {
        console.error("error occured when updating rent",error)
        res.status(500).json({error:error.message})
    }
}

export async function deleteRent(req,res){
    try {
        const {id}=req.params;
        const rent=await Rent.findByPk(id);
        if(!rent) return res.status(404).json({message:"Invalid rent"});

        await rent.destroy();
        res.status(200).json({message:"Rent deleted successfully"});
    } catch (error) {
        console.error("error occured when deleting rent",error)
        res.status(500).json({error:error.message})
    }
}