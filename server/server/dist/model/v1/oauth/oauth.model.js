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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateUser = findOrCreateUser;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
const client_1 = require("@prisma/client");
function findOrCreateUser(email, provider, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield prisma_config_1.default.users.findFirst({
                where: { email, provider },
                include: {
                    restrictions: {
                        select: {
                            restrictionType: true,
                        },
                    },
                },
            });
            if (!user) {
                user = yield prisma_config_1.default.users.create({
                    data: {
                        name: name || "",
                        email,
                        password: "OAUTH_NO_PASSWORD",
                        isSuspended: false,
                        role: client_1.Roles.USER,
                        provider: provider,
                        restrictions: {
                            create: [],
                        },
                    },
                    include: {
                        restrictions: {
                            select: {
                                restrictionType: true,
                            },
                        },
                    },
                });
            }
            return user;
        }
        catch (error) {
            console.error("Error in findOrCreateUser:", error);
            throw error;
        }
    });
}
