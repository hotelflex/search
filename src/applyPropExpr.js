const _ = require('lodash')

const arrayize = function(objOrArr) {
  if (_.isArray(objOrArr)) return objOrArr
  else return _.toPairs(objOrArr).map(item => ({ [item[0]]: item[1] }))
}

const operators = {
  $eq: (prop, operand, builder) => builder.where(prop, operand),
  $like: (prop, operand, builder) => builder.where(prop, 'like', operand),
  $lt: (prop, operand, builder) => builder.where(prop, '<', operand),
  $gt: (prop, operand, builder) => builder.where(prop, '>', operand),
  $lte: (prop, operand, builder) => builder.where(prop, '<=', operand),
  $gte: (prop, operand, builder) => builder.where(prop, '>=', operand),
  $or: (prop, items, builder) =>
    builder.where(subQB => iterator(prop, { $or: items }, subQB, true)),
  $and: (prop, items, builder) =>
    builder.where(subQB => iterator(prop, { $and: items }, subQB, false)),
}

function iterator(prop, expr, builder, isOr) {
  builder[isOr ? 'orWhere' : 'where'](subQB => {
    if (typeof expr !== 'object') {
      const opHandler = operators['$eq']
      opHandler(prop, expr, subQB)
    }

    for (let lhs in expr) {
      const rhs = expr[lhs]

      if (lhs === '$or' || lhs === '$and') {
        subQB.where(innerBuilder => {
          for (let subExpr of arrayize(rhs)) {
            iterator(prop, subExpr, innerBuilder, lhs === '$or')
          }
        })
      } else {
        const opHandler = operators[lhs]
        opHandler(prop, rhs, subQB)
      }
    }
  })
}

function applyPropExpr(prop, expr, builder) {
  if (typeof expr !== 'object') return operators.$eq(prop, expr, builder)

  for (let lhs in expr) {
    const opHandler = operators[lhs]
    const rhs = expr[lhs]

    if (!opHandler) continue

    opHandler(prop, rhs, builder)
  }
}

module.exports = applyPropExpr
