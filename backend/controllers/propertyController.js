import Property from "../models/propertyModel.js";
import User from "../models/userModel.js";

export async function registerproperty(req,res){
    try {
        const{title, location,price,landlord_id}=req.body;
        const findProperty= await Property.findOne({where:{title}})
        if(findProperty) return res.status(400).json({message:"Property already exists"});

        const landlord= await User.findOne({where:{user_id: landlord_id}})
        if(!landlord) return res.status(400).json({message:"User not found"});
        if(landlord.role!== "landlord") return res.status(404).json({message:"user not found"})
        const property= await Property.create({title, location,price,landlord_id})
        res.status(201).json({message:"Property registered successfully",property})
       
    } catch (error) {
        console.error("Error Occured when registering property",error)
        res.status(500).json({error:error.message})
    }
}

export async function getAllProperties(req,res){
    try {
        const properties=await Property.findAll();
        res.status(200).json(properties);
    } catch (error) {
        console.error("error occured when getting all properties",error)
        res.status(500).json({error:error.message})
    }
}

export async function getPropertyById(req,res){
    try {
        const {id}=req.params;
        const property=await Property.findByPk(id);
        if(!property) return res.status(404).json({message:"Invalid property"});
        res.status(200).json(property);
    } catch (error) {
        console.error("error occured when getting property by id",error)
        res.status(500).json({error:error.message})
    }
}

export async function updateProperty(req,res){
    try {
        const {id}=req.params;
        const {title,location,price,landlord_id}=req.body;
        const property=await Property.findByPk(id);
        if(!property) return res.status(404).json({message:"Invalid property"});

        await property.update({title,location,price,landlord_id});
        res.status(200).json({message:"Property updated successfully",property});
    } catch (error) {
        console.error("error occured when updating property",error)
        res.status(500).json({error:error.message})
    }
}

export async function deleteProperty(req,res){
    try {
        const {id}=req.params;
        const property=await Property.findByPk(id);
        if(!property) return res.status(404).json({message:"Invalid property"});

        await property.destroy();
        res.status(200).json({message:"Property deleted successfully"});
    } catch (error) {
        console.error("error occured when deleting property",error)
        res.status(500).json({error:error.message})
    }
}