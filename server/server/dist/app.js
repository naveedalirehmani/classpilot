"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// import Api1 from "./routes/v1/global.router";
const global_router_1 = __importDefault(require("./routes/v1/global.router"));
const cors_config_1 = require("./config/cors.config");
const deserializeUsers_1 = __importDefault(require("./middleware/deserializeUsers"));
const swagger_config_1 = require("./config/swagger.config");
const global_1 = require("./types/global");
const errorrHandler_1 = __importDefault(require("./middleware/errorrHandler"));
const IS_DEVELOPMENT = process.env.NODE_ENV === global_1.environment.DEVELOPMENT;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("combined"));
app.use(deserializeUsers_1.default);
app.use((0, cors_1.default)(cors_config_1.corsOptions));
if (IS_DEVELOPMENT) {
    const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_config_1.swaggerOptions);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
}
// api versioning.
// app.use("/v1", Api1);
app.use("/v1", global_router_1.default);
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
// global error handling.
app.use(errorrHandler_1.default);
exports.default = app;
