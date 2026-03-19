import winston from 'winston';
const { combine, timestamp, colorize, printf, json } = winston.format;
const devFormat = printf(({ level, message, timestamp: ts, ...meta }) => {
    const extras = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${ts} [${level}]: ${message}${extras}`;
});
export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        // Console transport
        new winston.transports.Console({
            format: process.env.NODE_ENV === 'production'
                ? combine(timestamp(), json())
                : combine(colorize(), timestamp({ format: 'HH:mm:ss' }), devFormat),
        }),
        // File transports (production)
        ...(process.env.NODE_ENV === 'production'
            ? [
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                    format: combine(timestamp(), json()),
                }),
                new winston.transports.File({
                    filename: 'logs/combined.log',
                    format: combine(timestamp(), json()),
                }),
            ]
            : []),
    ],
});
//# sourceMappingURL=logger.js.map