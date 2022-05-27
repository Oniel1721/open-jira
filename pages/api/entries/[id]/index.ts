import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { db } from '../../../../database'
import { IEntry, Entry } from '../../../../models'

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry


const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>)=>{
    const { id } = req.query
    await db.connect()
    const entry = await Entry.findById(id)
    if(!entry){
        return res.status(404).json({message: 'No hay entrada con ese ID: '+id})
    }
    return res.status(200).json(entry)
}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>)=>{
    
    const { id } = req.query
    
    await db.connect()
    const entryToUpdate = await Entry.findById(id)
    
    if(!entryToUpdate){
        return res.status(404).json({message: 'No hay entrada con ese ID: '+id})
    }
    
    const { 
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;
    
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true})

        await db.disconnect()
        return res.status(200).json(updatedEntry!)
    }
    catch(error:any){
        await db.disconnect();
        console.log(error.errors)
        return res.status(400).json({message: status + error.errors.status.message})
    }   
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':
            return getEntry(req , res)
        case 'PUT':
            return updateEntry(req , res)
        case 'DELETE':
            return updateEntry(req , res)
        default:
            return res.status(400).json({ message: 'Metodo no existe' })
    }
}