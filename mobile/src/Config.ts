export const config: { webdav: { [key in Env]: { baseUrl: string } } } = {
    webdav: {
        // 开发环境
        development: {
            baseUrl: '/webdav'  // 使用 Vite 代理
        },
        // 生产环境
        production: {
            baseUrl: 'http://192.168.100.1:8888/nas'  // 实际的生产环境地址
        }
    }
}

export type Env = 'development' | 'production';

export const getEnv = (): Env =>
{
    return import.meta.env.MODE as Env;
}

export const getWebDavBaseUrl = () =>
{
    const env = getEnv(); // 'development' 或 'production'
    return config.webdav[env].baseUrl;
}