"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genesis_app_1 = require("@fmfe/genesis-app");
const entry_base_1 = require("./entry-base");
/**
 * 客户端入口，需要导出一个方法，并且返回一个 Promise<Vue>
 */
exports.default = async (clientOptions) => {
    const request = entry_base_1.createRequest();
    const store = entry_base_1.createStore(request);
    const router = entry_base_1.createRouter();
    /**
     * 把服务端下发的状态，还原到 store 中
     */
    store.replaceState(clientOptions.state.vuexState);
    /**
     * 创建客户端应用程序
     */
    return genesis_app_1.createClientApp({
        /**
         * 根组件
         */
        App: entry_base_1.App,
        /**
         * 客户端的选项
         */
        clientOptions,
        /**
         * new Vue({ ...vueOptions })
         */
        vueOptions: {
            /**
             * 注入 store 在服务端预取数据
             */
            store,
            /**
             * 注入路由，根据当前请求进行渲染 createServerApp 会自动执行 router.push(req.url);
             */
            router,
            /**
             * 注入请求，然后在 base-vue.ts 中封装对象
             */
            request
        }
    });
};
