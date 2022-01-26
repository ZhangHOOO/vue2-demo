import express from 'express';
export interface BlogItem {
    author: string;
    content: string;
    id: number;
    createTime: number;
}
export declare const initMock: (app: express.Application) => void;
