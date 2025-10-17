import * as Vite from 'vite';

interface FoundryvttOptions {
    assets?: AssetsOptions | AssetsOptions[];
    manifestPath?: string;
    variables?: Record<string, string>;
}
interface AssetsOptions {
    assetType?: "template" | "language";
    copyToOutDir?: boolean;
    exclude?: string | string[];
    pattern: string | string[];
    reload?: boolean;
    rename?: (name: string) => string;
    serve?: boolean;
}

declare const foundryvtt: (options?: FoundryvttOptions) => Promise<Vite.PluginOption[]>;

export { foundryvtt };
