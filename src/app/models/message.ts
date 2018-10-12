export interface Message {
    name: string;
    show: boolean;
    warning: boolean;
}

export interface ErrorMessage {
    status: number;
    message: string;
}