function order(_order, builder) {
  const [ prop, direction ] = _order.trim().split(' ')
  builder.orderBy(prop, direction)
}

module.exports = order
