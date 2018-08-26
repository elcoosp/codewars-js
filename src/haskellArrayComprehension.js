// Utils
const match = (...predFns) => defaultFn => x => {
  for (const [p, f] of predFns) if (p(x)) return f(x)
  return defaultFn(x)
}
const always = x => () => x
const pipe = (...fns) => x => fns.reduce((acc, f) => f(acc), x)
const prop = p => x => x[p]
const propEmpty = prop => x => !x[prop] || !x[prop].trim().length
const onKeyLength = f => prop => x => f(x[prop].length)
const lte = n => x => x <= n
const arrFrom = x => [x]
const G = 'generator'
const parseNums = x => x.split(',').map(y => +y.trim())
const parseNumsFromProp = p =>
  pipe(
    prop(p),
    parseNums
  )
const id = x => x
const ArrayComprehension = match(
  [propEmpty(G), always([])],
  [pipe(parseNumsFromProp(G)), id]
)(always('default'))

console.log(ArrayComprehension({ generator: '1,' }))
