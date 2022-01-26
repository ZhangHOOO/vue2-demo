"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = exports.Request = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * 封装一层 axios
 */
class Request {
    constructor(renderContext) {
        /**
         * 将当前渲染请求带过来的请求头，转发给 api 调用的请求
         */
        const headersArr = [
            'http-host',
            'remote-host',
            'user-agent',
            'referer',
            'cookie',
            'x-forwarded-for',
            'authorization',
            'if-none-match',
            'accept-language',
            'lang',
            'origin'
        ];
        const headers = {};
        /**
         * 在服务器端是，将渲染上下文传递进来
         */
        if (renderContext === null || renderContext === void 0 ? void 0 : renderContext.req) {
            headersArr.forEach((k) => {
                var _a;
                const v = (_a = renderContext === null || renderContext === void 0 ? void 0 : renderContext.req) === null || _a === void 0 ? void 0 : _a.headers[k];
                if (v) {
                    headers[k] = v;
                }
            });
        }
        this.axios = axios_1.default.create({
            headers: headers,
            // 在服务器端请求的时候，需要设置请求的基本地址
            baseURL: 'http://localhost:3000',
            timeout: 5000,
            validateStatus: () => true
        });
        this.axios.interceptors.request.use(async (config) => {
            console.log(`${config.method} ${config.url}`);
            return config;
        });
    }
    /**
     * 获取数据
     */
    get(url, config = {}) {
        return this.axios
            .get(url, config)
            .then(this.success)
            .catch(this.error);
    }
    /**
     * 提交数据
     */
    post(url, data = {}, config = {}) {
        return this.axios
            .post(url, data, config)
            .then(this.success)
            .catch(this.error);
    }
    /**
     * 更新数据
     */
    put(url, data = {}, config = {}) {
        return this.axios
            .put(url, data, config)
            .then(this.success)
            .catch(this.error);
    }
    /**
     * 删除数据
     */
    delete(url, config = {}) {
        return this.axios
            .delete(url, config)
            .then(this.success)
            .catch(this.error);
    }
    /**
     * 处理请求成功
     */
    success(res) {
        return res.data;
    }
    /**
     * 处理请求失败
     */
    async error(err) {
        console.log('request error', err === null || err === void 0 ? void 0 : err.message);
        return {
            success: false,
            message: '请求失败',
            data: null
        };
    }
}
exports.Request = Request;
/**
 * 创建一个请求对象
 */
exports.createRequest = (renderContext) => {
    return new Request(renderContext);
};
