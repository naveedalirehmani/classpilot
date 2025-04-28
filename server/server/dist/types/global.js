"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUser = exports.PERMISSIONS = exports.environment = void 0;
var environment;
(function (environment) {
    environment["PRODUCTION"] = "production";
    environment["DEVELOPMENT"] = "development";
})(environment || (exports.environment = environment = {}));
var PERMISSIONS;
(function (PERMISSIONS) {
    PERMISSIONS["CREATE_POST"] = "create_post";
    PERMISSIONS["EDIT_POST"] = "edit_post";
    PERMISSIONS["DELETE_POST"] = "delete_post";
    PERMISSIONS["VIEW_POST"] = "view_post";
    PERMISSIONS["CREATE_COMMENT"] = "create_comment";
    PERMISSIONS["VIEW_COMMENT"] = "view_comment";
    PERMISSIONS["ANALYTICS"] = "analytics";
    PERMISSIONS["REPORT"] = "report";
    PERMISSIONS["ACCOUNT"] = "account";
    PERMISSIONS["CONTENT"] = "content";
})(PERMISSIONS || (exports.PERMISSIONS = PERMISSIONS = {}));
exports.mockUser = {
    id: 1,
    email: "admin@example.com",
    role: "SUPER_ADMIN",
};
