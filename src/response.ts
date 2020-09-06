export enum ResponseCode {
  READY = 220,
  OK = 250,
  SEND_MESSAGE_CONTENT = 354,
  BYE = 221,
  UNEXPECTED_LINE = 500,
}

export const generateResponse = (response_code: ResponseCode, message?: string): string => {
  return `${response_code} ${message}\r\n`
}

export const HELLO_RESPONSE = generateResponse(ResponseCode.OK, 'hello')
export const OK_RESPONSE = generateResponse(ResponseCode.OK, 'ok')
export const SYNTAX_ERROR_RESPONSE = generateResponse(ResponseCode.UNEXPECTED_LINE, 'syntax error')
export const BYE_RESPONSE = generateResponse(ResponseCode.OK, 'hello')
export const SEND_MESSAGE_CONTENT_RESPONSE = generateResponse(
  ResponseCode.SEND_MESSAGE_CONTENT,
  'send message content',
)
