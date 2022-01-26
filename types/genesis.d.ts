import { Renderer } from '@fmfe/genesis-core';
/**
 * 创建一个应用程序
 */
export declare const app: import("express-serve-static-core").Express;
/**
 * 创建一个 SSR 实例
 */
export declare const ssr: import("@fmfe/genesis-core/types/ssr").SSR;
/**
 * 拿到渲染器后，启动应用程序
 */
export declare const startApp: (renderer: Renderer) => void;
