const dataFile = `
##################################
Location: DEU
##################################
Ammonia: 023 particles
Nitrogen Oxide: 019 particles
Carbon Monoxide: 127 particles
##################################
##################################
Location: USA
##################################
Ammonia: 200 particles
Nitrogen Oxide: 120 particles
Carbon Monoxide: 120 particles
##################################
##################################
Location: AUS
##################################
Ammonia: 122 particles
Nitrogen Oxide: 132 particles
Carbon Monoxide: 099 particles
##################################
`.trim()

// Utils
const pipe = (...fns) => init => fns.reduce((acc, f) => f(acc), init)
const replaceAll = (splitter, joiner = '') => x =>
  x.split(splitter).join(joiner)
const isLast = (i, a) => i === a.length - 1
const splitNewLine = x => x.split('\n')

// Transform an array of fields string (key/value separated by a comma) into an array of objects
const fieldsToObj = fieldsArr =>
  fieldsArr.reduce((acc, field) => {
    if (field) {
      const [key, value] = field.split(':').map(s => s.trim())
      acc[key] = value
    }
    return acc
  }, {})

// Cut the data in grouped sections
const splitBySeparator = data => {
  const SEPARATOR = '##################################'
  return data
    .split((SEPARATOR + '\n').repeat(2))
    .map(
      (s, i, a) =>
        isLast(i, a)
          ? replaceAll('\n' + SEPARATOR)(replaceAll(SEPARATOR + '\n')(s))
          : replaceAll(SEPARATOR + '\n')(s)
    )
}

const parseData = () => {
  const objectified = splitBySeparator(dataFile).map(
    pipe(
      splitNewLine,
      fieldsToObj
    )
  )
  console.log(objectified)
}

parseData()
