import { AppType } from "./interfaces/index";
export declare const initialize: (appName: string) => void;
export declare const askInitialize: () => Promise<any>;
export declare const clone: (appName: string, project: string) => void;
export declare const install: () => void;
export declare const bootstrap: (appName: string, projectType: AppType) => void;
