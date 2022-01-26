import { RenderContext } from '@fmfe/genesis-core';
import { AxiosRequestConfig } from 'axios';
export interface RequestResponse {
    success: boolean;
    message: string;
    data: any;
}
/**
 * 封装一层 axios
 */
export declare class Request {
    private axios;
    constructor(renderContext?: RenderContext);
    /**
     * 获取数据
     */
    get(url: string, config?: AxiosRequestConfig): Promise<RequestResponse>;
    /**
     * 提交数据
     */
    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<RequestResponse>;
    /**
     * 更新数据
     */
    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<RequestResponse>;
    /**
     * 删除数据
     */
    delete(url: string, config?: AxiosRequestConfig): Promise<RequestResponse>;
    /**
     * 处理请求成功
     */
    private success;
    /**
     * 处理请求失败
     */
    private error;
}
/**
 * 创建一个请求对象
 */
export declare const createRequest: (renderContext?: RenderContext) => Request;
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        request?: Request;
    }
}
