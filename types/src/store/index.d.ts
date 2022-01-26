import { Request } from '../request';
export interface BlogItem {
    author: string;
    content: string;
    id: number;
    createTime: number;
}
export interface State {
    user: {
        name: string;
    };
    blogList: BlogItem[];
}
/**
 * 提供一个工厂函数创建 store
 */
export declare const createStore: (request: Request) => import("vuex").Store<State>;
