"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genesis_compiler_1 = require("@fmfe/genesis-compiler");
const genesis_1 = require("./genesis");
const start = () => {
    /**
     * 创建一个编译实例
     */
    const build = new genesis_compiler_1.Build(genesis_1.ssr);
    /**
     * 开始执行编译程序，构建生产环境应用包
     */
    return build.start();
};
start();
