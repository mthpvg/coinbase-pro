const EventEmitter = require('events')
const WebSocket = require('ws')


module.exports = class Socket extends EventEmitter {

  constructor(request, feed) {
    super()
    this.webSocket = new WebSocket(`wss://${feed}`)
    this.onOpen(request)
    this.onError()
    this.onClose()
    this.onMessage()
  }

  onOpen(request) {
    this.webSocket.on('open', () => {
      this.webSocket.send(request)
    })
  }

  onError() {
    this.webSocket.on('error', (error) => {
      this.emit('error', error)
    })
  }

  onClose() {
    this.webSocket.on('close', () => {
      this.emit('event', 'close')
    })
  }

  onMessage() {
    this.webSocket.on('message', (raw) => {
      try {
        const message = JSON.parse(raw)
        this.emit('message', message)
      } catch (error) {
        this.emit('error', error)
      }
    })
  }

  close() {
    this.webSocket.close()
  }

}