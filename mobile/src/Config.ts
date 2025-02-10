export type Env = 'development' | 'production';

export const getEnv = (): Env =>
{
    return import.meta.env.MODE as Env;
}

export const uploadConfig = {
    // 并发限制
    maxConcurrency: 5,
}