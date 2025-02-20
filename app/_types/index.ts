export interface Params {
    id: string;
}

export interface State {
    message: string | null;
    errors: Record<string, string>;
}