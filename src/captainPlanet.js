const dataFile = `
##################################
Location: DEU
##################################
Ammonia: 1023 particles
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
const allIndexesOf = x => arr =>
  arr.reduce((acc, v, i) => (v === x && acc.push(i), acc), [])

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
// Transform an array of fields string (key/value separated by a comma) into an array of objects
const fieldsToObj = (fieldKeyPredicate, fieldValueMapper) => fieldsArr =>
  fieldsArr.reduce((acc, field) => {
    if (field) {
      const [key, value] = field.split(':').map(s => s.trim())
      if (fieldKeyPredicate(key)) acc[key] = fieldValueMapper(value)
    }
    return acc
  }, {})

// Keys which are allowed in the objectified data
const isAllowedKey = k =>
  ['Location', 'Ammonia', 'Nitrogen Oxide', 'Carbon Monoxide'].includes(k)

// Parse Int if particle field
const sanitizeParticles = x => (x.includes('particles') ? parseInt(x, 10) : x)

const toHighSentence = (substance, location) =>
  `${substance} levels in ${location} are too high`

const maxProp = (
  o,
  max = Math.max(...Object.values(o)),
  [[key, value]] = Object.entries(o).filter(([k, value]) => value === max)
) => key

const toSentence = data => {
  const toHighParticlesLocationIndexes = data
    .map(({ Location, ...particleLevels }) => maxProp(particleLevels))
    .map((particle, _, a) => ({ [particle]: allIndexesOf(particle)(a) }))

  return toHighParticlesLocationIndexes
    .reduce((acc, locationData) => {
      const [[substance, locationIndexes]] = Object.entries(locationData)

      const sentence = toHighSentence(
        substance,
        locationIndexes
          .map(i => data[i].Location)
          .join(', ')
          .trim()
      )
      !acc.includes(sentence) && acc.push(sentence)
      return acc
    }, [])
    .join('. ')
    .trim()
}
const parseData = () => {
  const locationsDataArr = splitBySeparator(dataFile).map(
    pipe(
      splitNewLine,
      fieldsToObj(isAllowedKey, sanitizeParticles)
    )
  )

  return toSentence(locationsDataArr)
}
console.log(parseData())
