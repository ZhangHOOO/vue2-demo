"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genesis_1 = require("./genesis");
/**
 * 生产环境，应用程序我们已经编译好了，所以在这里可以直接创建一个渲染器
 */
const renderer = genesis_1.ssr.createRenderer();
/**
 * 生产环境，静态资源都是基于内容哈希生成的文件名，所以这里设置静态目录的时候，设置强缓存即可
 */
genesis_1.app.use(renderer.staticPublicPath, express_1.default.static(renderer.staticDir, {
    immutable: true,
    maxAge: '31536000000'
}));
/**
 * 启动应用
 */
genesis_1.startApp(renderer);
