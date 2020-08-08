import { AddressInfo, Server } from 'net'
import { Handler } from './handler'
import { generate_response, ResponseCode } from './response'

export const start_mail_server = (port: number = 2525): void => {
  const server = new Server()

  server.listen(process.env.PORT ?? port, async () => {
    const { address, port } = server.address() as AddressInfo
    process.stdout.write(`Mail server is running at ${address}${port}\n`)
  })

  server.on('connection', (socket) => {
    const greeting = generate_response(
      ResponseCode.READY,
      `ts-quick-smtp ${new Date().toISOString()}`,
    )

    Handler.log(greeting)
    socket.write(greeting)

    socket.on('data', (buffer) => {
      Handler.log(buffer, true)
      const response = Buffer.from(Handler.respond_to_directive(buffer))
      Handler.log(response)
      socket.write(Buffer.from(response))
    })
  })
}
