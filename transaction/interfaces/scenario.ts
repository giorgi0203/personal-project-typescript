export interface scenario {
    index: number;
    silent?: boolean,
    meta: {
        title: string;
        description: string;
    };
    call: (store: object) => void;
    restore?: () => void;
}
