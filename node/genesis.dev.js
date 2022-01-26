"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genesis_compiler_1 = require("@fmfe/genesis-compiler");
const genesis_1 = require("./genesis");
const start = async () => {
    /**
     * 创建一个观察实例
     */
    const watch = new genesis_compiler_1.Watch(genesis_1.ssr);
    /**
     * 启动观察
     */
    await watch.start();
    /**
     * 拿到观察实例上对应的渲染器
     */
    const renderer = watch.renderer;
    /**
     * 静态资源中间件
     */
    genesis_1.app.use(watch.devMiddleware);
    /**
     * 热更新的中间件
     */
    genesis_1.app.use(watch.hotMiddleware);
    /**
     * 拿到渲染器后，启动应用程序
     */
    genesis_1.startApp(renderer);
};
start();
