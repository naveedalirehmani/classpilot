"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesClient = void 0;
// import { S3Client } from "@aws-sdk/client-s3";
const client_ses_1 = require("@aws-sdk/client-ses");
const REGION = process.env.AWS_REGION || "";
// // Initialize AWS S3
// export const s3 = new S3Client({
//   region: REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });
// TODO: Need to change region for this.
exports.sesClient = new client_ses_1.SESClient({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
