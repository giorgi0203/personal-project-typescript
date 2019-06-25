import { IStore } from ".";
export interface IScenario {
  index: number;
  silent?: boolean;
  meta: {
    title: string;
    description: string;
  };
  call: (store: IStore) => void;
  restore?: () => void;
}
