export interface Params {
    id: string;
}

export interface State {
    message: string | null;
    errors: Record<string, string>;
}

export type OkButtonText = "Create" | "Edit"

export type InputName = "content" | "name"