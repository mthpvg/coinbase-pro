const Socket = require('./Socket')
const OrderBook = require('./OrderBook')
const coinbase = require('./coinbase')
const display = require('./display')()


let shutdown = false
const instrument = process.argv[2] || 'BTC-USD'

const request = coinbase.getRequest(instrument)
const feed = coinbase.WEBSOCKET_FEED
const socket = new Socket(request, feed)

const orderBook = new OrderBook()

socket.on('message', (message) => {
  orderBook.fill(message)
})

orderBook.on('orders', (orders, action) => {
  display.setOrders(orders, action)
})

socket.on('error', (error) => {
  display.setError(error)
})


// SHUTDOWN
socket.on('event', (event) => {
  if (shutdown === true && event === 'close') exit()
})

process.on('SIGINT', () => {
  display.setMessage('\nTerminating...')
  socket.close()
  shutdown = true
  setTimeout(() => exit(true), 2 * 1000)
})

function exit(forced = false) {
  display.setMessage(`Exiting ${forced === true ? 'forced' : ''}`)
  process.exit()
}
