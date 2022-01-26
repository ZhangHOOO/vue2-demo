import Vue from 'vue';
import { State } from './store';
/**
 * 这里只是演示了如何简单的封装 Vue，
 * 方便你可以灵活的使用 vuex 的状态以及 request，
 * 在实际的业务中你可以在不同的业务模块再去继承它
 */
export declare class BaseVue extends Vue {
    /**
     * 获取 store 状态
     */
    get state(): State;
    /**
     * 获取请求对象
     */
    get request(): import("./request").Request;
    /**
     * 登录用户
     */
    signin(name: string): void;
    /**
     * 退出登录
     */
    signout(): void;
    /**
     * 获取微博列表数据
     */
    getBlogList(): Promise<void>;
    /**
     * 发表微博
     */
    postBlog(content: string): Promise<boolean>;
    /**
     * 获取当前用户登录信息
     */
    getCurrentUser(): Promise<void>;
}
