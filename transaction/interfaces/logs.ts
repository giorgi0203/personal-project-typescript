import { IError } from "./error";

export interface ILog {
  index: number;
  meta: {
    title: string;
    description: string;
  };
  storeBefore: {};
  storeAfter: {};
  error: IError;
}
export interface IErrorLog {
  index: number;
  meta: {
    title: string;
    description: string;
  };
  error: IError;
}
