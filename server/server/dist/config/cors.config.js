"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: [process.env.CLIENT_SERVER, process.env.CLIENT_SERVER_2],
    credentials: true,
    optionsSuccessStatus: 200,
};
