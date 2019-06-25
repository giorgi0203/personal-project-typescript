import { error } from "./error";

export interface log {
    index: number;
    meta: {
        title: string;
        description: string;
    };
    storeBefore: {};
    storeAfter: {};
    error: error
}
export interface errorLog {
    index: number;
    meta: {
        title: string
        description: string
    };
    error: error
}
