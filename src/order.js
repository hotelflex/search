function order(_order, builder) {
  if (_order) {
    const [ prop, direction ] = _order.trim().split(' ')
    builder.orderBy(prop, direction)
  }
}

module.exports = order
