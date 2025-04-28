"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const client_ses_1 = require("@aws-sdk/client-ses");
const otpModel = __importStar(require("../model/v1/otp.model"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs")); // Ensure ejs is imported
const aws_service_1 = require("./aws.service");
const errors_1 = require("../utils/errors");
class OtpService {
    static getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static sendOtpHandler(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = this.getRandomArbitrary(100000, 999999);
                yield otpModel.expireExistingOtps(userId);
                yield otpModel.createOtp(otp, userId);
                const params = {
                    Destination: {
                        ToAddresses: [email],
                    },
                    Message: {
                        Body: {
                            Html: { Data: this.getOtpEmailTemplate(otp) },
                        },
                        Subject: { Data: "Your OTP Code" },
                    },
                    Source: "noreply@teareceipts.com",
                };
                const command = new client_ses_1.SendEmailCommand(params);
                yield aws_service_1.sesClient.send(command);
                console.log("OTP sent successfully.");
            }
            catch (error) {
                throw new errors_1.AwsServiceError(error.message);
            }
        });
    }
    static verifyOtpHandler(userId, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield otpModel.findValidOtp(userId, otp);
                if (otpRecord) {
                    yield otpModel.expireOtpById(otpRecord.id);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new errors_1.DatabaseError(error.message);
            }
        });
    }
    static verifyOtpByEmailHandler(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield otpModel.findValidOtpByEmail(email, otp);
                if (otpRecord) {
                    yield otpModel.expireOtpById(otpRecord.id);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new errors_1.DatabaseError(error.message);
            }
        });
    }
    static getOtpEmailTemplate(otp) {
        try {
            const templatePath = path_1.default.join(__dirname, "..", "templates", "otp.html");
            let template = fs_1.default.readFileSync(templatePath, "utf8");
            template = template.replace("${otp}", otp.toString());
            return template;
        }
        catch (error) {
            throw new errors_1.GeneralError(error.message);
        }
    }
    static getWelcomeEmailTemplate(type, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templatePath = path_1.default.join(__dirname, "..", "templates", "welcomeAccountTemplate.html");
                const template = fs_1.default.readFileSync(templatePath, 'utf8');
                const html = ejs_1.default.render(template, { type, username, password });
                return html;
            }
            catch (error) {
                throw new errors_1.GeneralError(error.message);
            }
        });
    }
    static sendWelcomeEmailHandler(type, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailHtml = yield this.getWelcomeEmailTemplate(type, username, password);
                const params = {
                    Destination: {
                        ToAddresses: [username],
                    },
                    Message: {
                        Body: {
                            Html: { Data: emailHtml },
                        },
                        Subject: { Data: `Welcome to Tea Receipts!` },
                    },
                    Source: "noreply@teareceipts.com",
                };
                const command = new client_ses_1.SendEmailCommand(params);
                yield aws_service_1.sesClient.send(command);
            }
            catch (error) {
                throw new errors_1.AwsServiceError(error.message);
            }
        });
    }
}
exports.default = OtpService;
