import { IErrorLog, ILog } from "../interfaces";

export const Log = <T extends new(...args: any[]) => {}>(constructor: T) => {
    return class extends constructor {
        public logs: Array<ILog | IErrorLog> = new Array();
    };
};
