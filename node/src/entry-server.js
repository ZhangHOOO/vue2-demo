"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genesis_app_1 = require("@fmfe/genesis-app");
const entry_base_1 = require("./entry-base");
/**
 * 服务端入口，需要导出一个方法，并且返回一个 Promise<Vue>
 */
exports.default = async (renderContext) => {
    const request = entry_base_1.createRequest(renderContext);
    const store = entry_base_1.createStore(request);
    const router = entry_base_1.createRouter();
    /**
     * 创建服务端应用程序
     */
    const app = await genesis_app_1.createServerApp({
        /**
         * 根组件
         */
        App: entry_base_1.App,
        /**
         * SSR 渲染的上下文
         */
        renderContext,
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
    /**
     * 等渲染完成后，将标题传输给 index.html 模板中
     */
    renderContext.beforeRender(() => {
        // 如果你需要设置网站的关键词、描述等等，请查阅相关文档：https://vue-meta.nuxtjs.org/
        const { title, meta, link, style, script, htmlAttrs, headAttrs, bodyAttrs, base, noscript } = app.$meta().inject();
        // 在 index.html 文件中使用 <%- meta.title %>  就可以渲染出标题了，其它的举一反三
        Object.defineProperty(renderContext.data, 'meta', {
            enumerable: false,
            value: {
                title: (title === null || title === void 0 ? void 0 : title.text()) || '',
                meta: (meta === null || meta === void 0 ? void 0 : meta.text()) || '',
                link: (link === null || link === void 0 ? void 0 : link.text()) || '',
                style: (style === null || style === void 0 ? void 0 : style.text()) || '',
                script: (script === null || script === void 0 ? void 0 : script.text()) || '',
                htmlAttrs: (htmlAttrs === null || htmlAttrs === void 0 ? void 0 : htmlAttrs.text()) || '',
                headAttrs: (headAttrs === null || headAttrs === void 0 ? void 0 : headAttrs.text()) || '',
                bodyAttrs: (bodyAttrs === null || bodyAttrs === void 0 ? void 0 : bodyAttrs.text()) || '',
                base: (base === null || base === void 0 ? void 0 : base.text()) || '',
                noscript: (noscript === null || noscript === void 0 ? void 0 : noscript.text()) || ''
            }
        });
        // 将服务端状态，下发给客户端
        renderContext.data.state.vuexState = app.$store.state;
    });
    return app;
};
