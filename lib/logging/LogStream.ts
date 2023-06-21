import { Logger } from 'winston'

export class LogStream {
  constructor(private message: string, private log: Logger) {}
  write(text: string) {
    this.log.info(this.message, JSON.parse(text))
  }
}
