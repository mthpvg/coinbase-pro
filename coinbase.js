const WEBSOCKET_FEED = 'ws-feed.pro.coinbase.com'

module.exports = {
  WEBSOCKET_FEED,
  getRequest
}

function getRequest(instrument) {
  const requestObject = {
    type: 'subscribe',
    product_ids: [instrument],
    channels: ['level2']
  }
  return JSON.stringify(requestObject)
}