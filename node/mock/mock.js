"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMock = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const blogList = [
    {
        id: 1,
        author: 'lzxb',
        content: '这是一个基于 Vue 的 SSR demo',
        createTime: Date.now()
    }
];
exports.initMock = (app) => {
    /**
     * 微博列表接口
     */
    app.get('/api/blog/list', (req, res, next) => {
        res.json({
            success: true,
            data: {
                list: blogList
            }
        });
    });
    /**
     * 发表微博
     */
    app.post('/api/blog', body_parser_1.default.json(), (req, res, next) => {
        const { author, content } = req.body;
        if (typeof author !== 'string' || typeof content !== 'string') {
            return res.json({
                success: false,
                message: '参数错误'
            });
        }
        blogList.unshift({
            id: blogList.length + 1,
            author,
            content,
            createTime: Date.now()
        });
        res.json({ success: true });
    });
    /**
     * 用户登录
     */
    app.post('/api/signin', cookie_parser_1.default(), body_parser_1.default.json(), (req, res, next) => {
        const { name } = req.body;
        if (typeof name !== 'string' || !name) {
            return res.json({
                success: false,
                message: '用户登录名错误'
            });
        }
        /**
         * 保存用户的昵称
         */
        res.cookie('name', name, {
            httpOnly: false,
            path: '/'
        });
        res.json({
            success: true,
            data: {
                ok: true
            }
        });
    });
    /**
     * 用户退出
     */
    app.post('/api/signout', cookie_parser_1.default(), (req, res, next) => {
        res.clearCookie('name');
        res.json({
            success: true,
            data: {
                ok: true
            }
        });
    });
    /**
     * 获取用户昵称
     */
    app.get('/api/current-user', cookie_parser_1.default(), (req, res) => {
        const { name } = req.cookies;
        if (!name) {
            return res.json({
                success: false,
                message: '请先登录'
            });
        }
        res.json({
            success: true,
            data: {
                name
            }
        });
    });
};
