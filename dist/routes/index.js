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
router.post('/user', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.create({
            data: {
                username: req.body.username
            }
        });
        return res.status(200).json({
            message: 'User successfully created!'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong!'
        });
    }
}));
router.get('/todos', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
router.post('/todo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.todo.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                user: {
                    connect: {
                        id: parseInt(req.body.userId)
                    }
                }
            }
        });
        return res.status(200).json({
            message: 'Todo created sucessfully!'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong!'
        });
    }
}));
exports.default = router;
