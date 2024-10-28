import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface userDetails{
    userId:string
}

const router=Router();
const prisma=new PrismaClient();

const getTodos:(req:any,res:any,next:any)=>any=async (req:Request<{},{},{},userDetails>,res:Response,next)=>{
    const userId=parseInt(req.query.userId);
    try{
        const todos=await prisma.todo.findMany({
            where:{
                userId:userId
            },
            select:{
                id:true,
                title:true,
                description:true
            }
        });

        return res.status(200).json({
            todos:todos
        });
    } catch(err){
        console.log(err);
        
        return res.status(500).json({
            message:'Something went wrong!'
        });
    }
}

router.get('/todos',getTodos);

export default router;