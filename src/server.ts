import { AddressInfo, Server } from 'net'
import { Handler } from './handler'
import { generateResponse, ResponseCode } from './response'

export const startServer = (port: number = 2525): void => {
  const server = new Server()

  server.listen(process.env.PORT ?? port, async () => {
    const { address, port } = server.address() as AddressInfo
    process.stdout.write(`Mail server is running at ${address}${port}\n`)
  })

  server.on('connection', (socket) => {
    const greeting = generateResponse(
      ResponseCode.READY,
      `ts-quick-smtp ${new Date().toISOString()}`,
    )

    Handler.log(greeting)
    socket.write(greeting)

    socket.on('data', (buffer) => {
      Handler.log(buffer, true)
      const response = Buffer.from(Handler.respond(buffer))
      Handler.log(response)
      socket.write(Buffer.from(response))
    })
  })
}

export default startServer
