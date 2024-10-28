"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.query.userId);
    try {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                title: true,
                description: true
            }
        });
        return res.status(200).json({
            todos: todos
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong!'
        });
    }
});
router.get('/todos', getTodos);
