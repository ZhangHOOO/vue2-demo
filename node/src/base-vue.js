"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseVue = void 0;
const vue_1 = __importDefault(require("vue"));
/**
 * 这里只是演示了如何简单的封装 Vue，
 * 方便你可以灵活的使用 vuex 的状态以及 request，
 * 在实际的业务中你可以在不同的业务模块再去继承它
 */
class BaseVue extends vue_1.default {
    /**
     * 获取 store 状态
     */
    get state() {
        return this.$store.state;
    }
    /**
     * 获取请求对象
     */
    get request() {
        return this.$root.$options.request;
    }
    /**
     * 登录用户
     */
    signin(name) {
        this.$store.commit('signin', name);
    }
    /**
     * 退出登录
     */
    signout() {
        this.$store.commit('signin', '');
    }
    /**
     * 获取微博列表数据
     */
    async getBlogList() {
        const res = await this.request.get('/api/blog/list');
        if (res.success) {
            this.$store.commit('getBlogList', res.data.list);
        }
    }
    /**
     * 发表微博
     */
    async postBlog(content) {
        const res = await this.request.post('/api/blog', {
            author: this.state.user.name,
            content
        });
        if (res.success) {
            this.getBlogList(); // 发表成功后，重新获取微博数据
            return true;
        }
        alert('发表失败');
        return false;
    }
    /**
     * 获取当前用户登录信息
     */
    async getCurrentUser() {
        const res = await this.request.get('/api/current-user');
        if (res.success) {
            return this.signin(res.data.name);
        }
    }
}
exports.BaseVue = BaseVue;
