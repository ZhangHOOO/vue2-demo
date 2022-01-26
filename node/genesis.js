"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = exports.ssr = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const genesis_core_1 = require("@fmfe/genesis-core");
const mock_1 = require("./mock/mock");
/**
 * 创建一个应用程序
 */
exports.app = express_1.default();
/**
 * 创建一个 SSR 实例
 */
exports.ssr = new genesis_core_1.SSR({
    build: {
        template: path_1.default.resolve(__dirname, './index.html'),
        transpile: [path_1.default.resolve('./node_modules/@fmfe/genesis-app')]
    }
});
/**
 * 拿到渲染器后，启动应用程序
 */
exports.startApp = (renderer) => {
    /**
     * 初始化 mock 相关的 api
     */
    mock_1.initMock(exports.app);
    /**
     * 使用默认渲染中间件进行渲染，你也可以调用更加底层的 renderer.renderJson 和 renderer.renderHtml 来实现渲染
     */
    exports.app.use(renderer.renderMiddleware);
    /**
     * 监听端口
     */
    exports.app.listen(3000, () => console.log(`http://localhost:3000`));
};
