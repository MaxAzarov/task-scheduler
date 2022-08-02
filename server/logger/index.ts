import winston from "winston";

interface ILoggerService {
  info: (message: string, obj?: object) => void;
  error: (message: string, obj?: object) => void;
  debug: (message: string, obj?: object) => void;
}

class LoggerService implements ILoggerService {
  logger: winston.Logger;
  route: string;

  constructor(route: string) {
    this.route = route;
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`
        })
      ],
      format: winston.format.printf((info) => {
        let message = `${new Date(
          Date.now()
        ).toUTCString()} | ${info.level.toUpperCase()} | ${route}.log | ${
          info.message
        } |`;
        message = info.obj
          ? message + `data:${JSON.stringify(info.obj)} | `
          : message;

        return message;
      })
    });
    this.logger = logger;
  }

  info(message: string, obj?: object) {
    this.logger.log("info", message, {
      obj
    });
  }

  debug(message: string, obj?: object) {
    this.logger.log("debug", message, {
      obj
    });
  }

  error(message: string, obj?: object) {
    this.logger.log("error", message, {
      obj
    });
  }
}

const log = new LoggerService("app");

export default log;
