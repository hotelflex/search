function limit(limit, offset, builder) {
  if (limit) builder.limit(limit)
  if (offset) builder.offset(offset)
}

module.exports = limit
