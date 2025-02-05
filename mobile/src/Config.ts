export type Env = 'development' | 'production';

export const getEnv = (): Env =>
{
    return import.meta.env.MODE as Env;
}