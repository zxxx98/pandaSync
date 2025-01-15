import { getEnv } from "../Config";

type LogFilter =
    {
        level?: LogLevel;
        startDate?: Date;
        endDate?: Date;
        search?: string;
    }

type LogLevel = 'info' | 'error' | 'warn';

type LogEntry = {
    timestamp: string;
    level: LogLevel;
    message: string;
    meta?: any;
}


class Logger
{
    private static instance: Logger;
    private logQueue: LogEntry[] = [];

    private _debug: boolean = false;
    private constructor()
    {
        //如果是开发环境，则开启调试模式
        this._debug = getEnv() === 'development';
        // 定期将日志写入存储
        setInterval(() => this.persistLogs(), 5000);
    }

    static getInstance()
    {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    info(message: string, meta?: any)
    {
        this.log('info', message, meta);
    }

    error(message: string, error?: Error)
    {
        this.log('error', message, error);
    }

    warn(message: string, meta?: any)
    {
        this.log('warn', message, meta);
    }

    private log(level: LogLevel, message: string, meta?: any)
    {
        const logEntry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            meta,
        };
        this.logQueue.push(logEntry);
        if (this._debug) {
            console[level](message, meta); // 同时输出到控制台
        }
    }

    private persistLogs()
    {
        if (this.logQueue.length > 0) {
            const currentLogs = localStorage.getItem('app_logs');
            const logs = currentLogs ? JSON.parse(currentLogs) : [];

            logs.push(...this.logQueue);

            // 只保留最近的1000条日志
            const recentLogs = logs.slice(-1000);

            localStorage.setItem('app_logs', JSON.stringify(recentLogs));
            this.logQueue = [];
        }
    }

    // 获取所有日志
    getLogs(): LogEntry[]
    {
        const logs = localStorage.getItem('app_logs');
        return logs ? JSON.parse(logs) : [];
    }

    // 清除日志
    clearLogs()
    {
        localStorage.removeItem('app_logs');
        this.logQueue = [];
    }

    // 导出日志
    exportLogs()
    {
        const logs = this.getLogs();
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `app-logs-${new Date().toISOString()}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }

    // 过滤日志
    filterLogs(filter: LogFilter)
    {
        const logs = this.getLogs();

        return logs.filter(log =>
        {
            if (filter.level && log.level !== filter.level) return false;

            if (filter.startDate && new Date(log.timestamp) < filter.startDate) return false;

            if (filter.endDate && new Date(log.timestamp) > filter.endDate) return false;

            if (filter.search) {
                const searchLower = filter.search.toLowerCase();
                return log.message.toLowerCase().includes(searchLower) ||
                    JSON.stringify(log.meta).toLowerCase().includes(searchLower);
            }

            return true;
        });
    }

    // 格式化日志
    formatLog(log: any)
    {
        const date = new Date(log.timestamp).toLocaleString();
        const level = log.level.toUpperCase().padEnd(5);
        const meta = log.meta ? JSON.stringify(log.meta) : '';

        return `[${date}] ${level} ${log.message} ${meta}`;
    }
}

export const logger = Logger.getInstance(); 