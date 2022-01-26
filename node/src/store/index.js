"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
vue_1.default.use(vuex_1.default);
/**
 * 提供一个工厂函数创建 store
 */
exports.createStore = (request) => {
    return new vuex_1.default.Store({
        state: {
            /**
             * 用户信息
             */
            user: {
                name: ''
            },
            /**
             * 微博列表
             */
            blogList: []
        },
        mutations: {
            /**
             * 用户登录成功
             */
            signin(state, name) {
                state.user.name = name;
            },
            /**
             * 获取微博列表数据
             */
            getBlogList(state, list) {
                state.blogList = list;
            }
        }
    });
};
