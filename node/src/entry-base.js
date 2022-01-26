"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = exports.createRouter = exports.createStore = exports.App = void 0;
const vue_1 = __importDefault(require("vue"));
const vue_meta_1 = __importDefault(require("vue-meta"));
const app_vue_1 = __importDefault(require("./app.vue"));
exports.App = app_vue_1.default;
const store_1 = require("./store");
Object.defineProperty(exports, "createStore", { enumerable: true, get: function () { return store_1.createStore; } });
const router_1 = require("./router");
Object.defineProperty(exports, "createRouter", { enumerable: true, get: function () { return router_1.createRouter; } });
const request_1 = require("./request");
Object.defineProperty(exports, "createRequest", { enumerable: true, get: function () { return request_1.createRequest; } });
vue_1.default.use(vue_meta_1.default);
