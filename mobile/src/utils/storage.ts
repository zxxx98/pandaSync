export class Storage
{
    static save(key: string, value: any)
    {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('存储数据失败:', error);
        }
    }

    static get(key: string)
    {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('读取数据失败:', error);
            return null;
        }
    }

    static remove(key: string)
    {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('删除数据失败:', error);
        }
    }

    static clear()
    {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('清除数据失败:', error);
        }
    }
} 