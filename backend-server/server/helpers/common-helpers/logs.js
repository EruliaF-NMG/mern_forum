import winston from 'winston';
import { dateObjectToString } from './time-unit-converter';

const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: `logs/${dateObjectToString(new Date(), 'yyyy_mm_dd')}_LOG.log`,
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `LOG`,
    }),
    winston.format.timestamp({
      format: 'MM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf(
      (info) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}:: ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

// eslint-disable-next-line import/prefer-default-export
export { logger };
