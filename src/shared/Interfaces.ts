declare global {
    interface Window {
        CIRCLE_BUILD_NUM: string;
        NODE_ENV: string;
        SHARED_CONFIG: SharedConfigInterface
    }
}

export interface SharedConfigInterface {
    serverUrl: string,
    serverPort: number
}
