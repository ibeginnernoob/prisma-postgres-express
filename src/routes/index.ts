import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const router=Router();
const prisma=new PrismaClient();

router.post('/user',async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try{
        await prisma.user.create({
            data:{
                username:req.body.username
            }
        });

        return res.status(200).json({
            message:'User successfully created!'
        });
    } catch(err){
        console.log(err);
        
        return res.status(500).json({
            message:'Something went wrong!'
        });
    }
});

interface getTodoDetails{
    userId:string
}

router.get('/todos',async (req:Request<{},{},{},getTodoDetails>,res:Response,next:NextFunction):Promise<any>=>{
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
});

router.post('/todo',async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try{
        await prisma.todo.create({
            data:{
                title:req.body.title,
                description:req.body.description,
                user:{
                    connect:{
                        id:parseInt(req.body.userId)
                    }
                }
            }
        });

        return res.status(200).json({
            message:'Todo created sucessfully!'
        });
    } catch(err){
        console.log(err);

        return res.status(500).json({
            message:'Something went wrong!'
        });
    }
});

export default router;