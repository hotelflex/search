const applyPropExpr = require('./applyPropExpr')

function where(filter = {}, builder) {
  Object.keys(filter).forEach((prop) => {
    const expr = filter[prop]
    applyPropExpr(prop, expr, builder)
  })
}

module.exports = where
