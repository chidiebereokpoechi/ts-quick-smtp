import { Mail } from './mail'
import {
  BYE_RESPONSE,
  generateResponse,
  HELLO_RESPONSE,
  OK_RESPONSE,
  ResponseCode,
  SEND_MESSAGE_CONTENT_RESPONSE,
  SYNTAX_ERROR_RESPONSE,
} from './response'

export class Handler {
  private static expecting_data: boolean = false
  public static mail: Mail = new Mail()

  public static respond(buffer: Buffer): string {
    const directive = buffer.toString('utf8').trimRight()

    if (this.expecting_data) {
      this.expecting_data = false

      if (directive.endsWith('.') || directive === '') {
        this.mail.raw_content = directive.slice(0, directive.length - 2) // Remove period at the end
        return OK_RESPONSE
      }

      return generateResponse(ResponseCode.UNEXPECTED_LINE, 'unterminated data')
    }

    switch (directive.toUpperCase().slice(0, 4)) {
      case 'HELO':
      case 'EHLO': {
        return HELLO_RESPONSE
      }

      case 'MAIL': {
        if (directive.toUpperCase().slice(4, 10) !== ' FROM:') {
          return SYNTAX_ERROR_RESPONSE
        }

        this.mail.from = directive.slice(10).trim()
        return OK_RESPONSE
      }

      case 'RCPT': {
        if (directive.toUpperCase().slice(4, 8) !== ' TO:') {
          return SYNTAX_ERROR_RESPONSE
        }

        this.mail.recipients.push(directive.slice(8).trim())
        return OK_RESPONSE
      }

      case 'DATA': {
        this.expecting_data = true
        return SEND_MESSAGE_CONTENT_RESPONSE
      }

      case 'QUIT':
        return BYE_RESPONSE

      default:
        return SYNTAX_ERROR_RESPONSE
    }
  }

  public static log(message: string | Buffer, from_client?: boolean): void {
    if (process.env.NODE_ENV === 'development') {
      const arrow = from_client ? '->' : '<-'

      if (Buffer.isBuffer(message)) {
        message = message.toString()
      }

      process.stdout.write(`${arrow} ${message}`)
    }
  }
}
