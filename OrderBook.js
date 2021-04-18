const EventEmitter = require('events')


module.exports = class OrderBook extends EventEmitter {

  constructor() {
    super()
    this.orders = {sell: [], buy: []}
  }

  fill(message) {
    if (message.changes === undefined) return

    message.changes.forEach((change) => {
      const price = parseFloat(change[1])
      this.insert({price, size: change[2]}, change[0])
    })
  }

  insert(order, action) {
    const orders = this.orders[action]

    const noOrders = orders.length === 0
    const bestOrder = orders[orders.length - 1]

    if (noOrders || order.price < bestOrder.price) {
      orders.push(order)
    } else {
      for (let index = 0; index < orders.length; index += 1) {
        const price = orders[index].price
        if (order.price > price) {
          orders.splice(index, 0, order)
          break
        }
        if (order.price === price) {
          orders.splice(index, 1, order)
          break
        }
      }
    }

    if (orders.length > 10) orders.shift()

    this.emit('orders', orders, action)
  }

}