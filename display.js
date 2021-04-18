module.exports = function display() {

  const orders = {sell: [], buy: []}
  let error = ''
  let message = ''

  function setOrders(newOrders, action) {
    orders[action] = newOrders
    print()
  }

  function setMessage(newMessage) {
    message = newMessage
  }

  function setError(newError) {
    error = newError
  }

  function print() {
    console.clear()
    console.log('Order Book')
    console.log('ask', orders.sell)
    console.log('bid', orders.buy.reverse())
    console.log(message)
    console.error(error)
    console.log('Ctrl-C to terminate')
  }

  return {
    setOrders,
    setMessage,
    setError
  }
}