const where = require('./where')
const limit = require('./limit')
const order = require('./order')

class SearchBuilder {
  constructor(model, opts={}) {
    this.builder = model
      .query()
      .skipUndefined()
    this.parseOpts(opts)
  }

  parseOpts(opts) {
    where(opts.where, this.builder)
    limit(opts.limit, opts.offset, this.builder)
    order(opts.order, this.builder)
  }

  run() {
    return this.builder
  }
}

module.exports = SearchBuilder
