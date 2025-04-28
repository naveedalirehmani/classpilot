"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultModel = exports.Models = void 0;
var Models;
(function (Models) {
    Models["GPT_3_5_TURBO"] = "gpt-3.5-turbo";
    Models["GPT_4"] = "gpt-4";
    Models["GPT_41"] = "gpt-4.1";
    Models["GPT_4_32K"] = "gpt-4-32k";
    Models["GPT_4O_MINI"] = "gpt-4o-mini";
    Models["DALL_E"] = "dall-e";
    Models["WHISPER"] = "whisper";
})(Models || (exports.Models = Models = {}));
exports.defaultModel = Models.GPT_4O_MINI;
