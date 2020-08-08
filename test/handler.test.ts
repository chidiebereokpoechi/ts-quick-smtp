import { Handler, HELLO_RESPONSE, OK_RESPONSE, SEND_MESSAGE_CONTENT_RESPONSE } from '../src'

describe('handler', () => {
  it('should respond to a HELO | EHLO command correctly', () => {
    const command_1 = Buffer.from('HELO [localhost]')
    const command_2 = Buffer.from('EHLO [localhost]')

    expect(Handler.respond_to_directive(command_1)).toBe(HELLO_RESPONSE)
    expect(Handler.respond_to_directive(command_2)).toBe(HELLO_RESPONSE)
  })

  it('should respond to a MAIL FROM command correctly', () => {
    const sender = 'person@mail.com'
    const command = Buffer.from(`MAIL FROM: ${sender}`)

    expect(Handler.respond_to_directive(command)).toBe(OK_RESPONSE)
    expect(Handler.mail.from).toBe(sender)
  })

  it('should respond to RCPT TO commands correctly', () => {
    const num_of_recipients = 5
    const recipients = [...new Array(num_of_recipients)].map((_, i) => `person_${i + 1}@mail.com`)

    recipients.map((recipient) => {
      const command = Buffer.from(`RCPT TO: ${recipient}`)
      expect(Handler.respond_to_directive(command)).toBe(OK_RESPONSE)
      expect(Handler.mail.recipients).toContain(recipient)
    })
  })

  it('should respond to a DATA command correctly', () => {
    const command = Buffer.from('DATA')
    expect(Handler.respond_to_directive(command)).toBe(SEND_MESSAGE_CONTENT_RESPONSE)
  })

  it('should save the data supplied correctly', () => {
    const command = Buffer.from(`
      Some Text
      Some More Text,
      The Most Text.
      .
    `)

    expect(Handler.respond_to_directive(command)).toBe(OK_RESPONSE)
    expect(command.toString()).toContain(Handler.mail.raw_content)
  })
})
