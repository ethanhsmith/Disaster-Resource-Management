const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const knex = require('knex')(config)

module.exports = {
  getStock,
  getLocation,
  getLocationStockByLocationId,
  getLastUpdate,
  receiveItems,
  deliverItems,
  getLogsByLocationItemId,
  getItemQty,
  updateLog,
  getLogs
  // deleteStock
}

function getStock (testDb) {
  const connection = testDb || knex
  return connection('stock')
    .select()
}

function getLocation (testDb) {
  const connection = testDb || knex
  return connection('location')
    .select()
}

function getLocationStockByLocationId (locationId, testDb) {
  const connection = testDb || knex
  return connection('location_stock')
    .join('stock', 'location_stock.item_id', 'stock.id')
    .where('location_id', locationId)
    .select('location_stock.id as locationStockId', 'stock.id as stockId', 'location_stock.location_id', 'stock.item', 'location_stock.quantity')
}

function getLastUpdate (locationId, testDb) {
  const connection = testDb || knex
  return connection('location_stock')
    .where('location_stock.location_id', locationId)
    .select('updated_at')
}

// increasing the qty of a stock item

function receiveItems (locationStockId, qty, testDb) {
  const connection = testDb || knex
  return connection('location_stock')
    .where('location_stock.id', locationStockId)
    .increment('quantity', qty)
}

// decreasing the qty of a stock item

function deliverItems (locationStockId, qty, testDb) {
  const connection = testDb || knex
  return connection('location_stock')
    .where('location_stock.id', locationStockId)
    .decrement('quantity', qty)
}

function getLogsByLocationItemId (locationItemId, testDb) {
  const connection = testDb || knex
  return connection('logs')
    .where('logs.location_stock_id', locationItemId)
    .orderBy('logs.updated_at', 'desc')
    .select()
}

function getItemQty (locationStockId, testDb) {
  const connection = testDb || knex
  return connection('location_stock')
    .where('location_stock.id', locationStockId)
    .select('quantity')
}

function updateLog (id, activity, quantity, testDb) {
  const connection = testDb || knex
  return connection('logs')
    .insert({
      location_stock_id: id,
      activity: activity,
      quantity_changed: quantity
    })
}

function getLogs (locationId, testDb) {
  const connection = testDb || knex
  return connection('logs')
    .join('location_stock', 'logs.location_stock_id', 'location_stock.id')
    .join('location', 'location_stock.location_id', 'location.id')
    .where('location_id', locationId)
    .select()
}