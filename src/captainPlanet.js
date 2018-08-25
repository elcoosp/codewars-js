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
Ammonia: 1023 particles
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
// Transform an array of fields string (key/value separated by a comma) into an array of objects
const fieldsToObj = (
  fieldKeyPredicate,
  fieldValueMapper,
  splitter = ':'
) => fieldsArr =>
  fieldsArr.reduce((acc, field) => {
    if (field) {
      const [key, value] = field.split(splitter).map(s => s.trim())
      if (fieldKeyPredicate(key)) acc[key] = fieldValueMapper(value)
    }
    return acc
  }, {})

const PARTICLES = ['Ammonia', 'Nitrogen Oxide', 'Carbon Monoxide']

// Cut the data in sections
const splitBySeparator = (
  data,
  separator = '##################################'
) =>
  data
    .split((separator + '\n').repeat(2))
    .map(
      (s, i, a) =>
        isLast(i, a)
          ? replaceAll('\n' + separator)(replaceAll(separator + '\n')(s))
          : replaceAll(separator + '\n')(s)
    )

// Keys which are allowed in the objectified data
const isAllowedKey = k => ['Location', ...PARTICLES].includes(k)

const sanitizeParticles = x => (x.includes('particles') ? parseInt(x, 10) : x)

const toHighSentence = (substance, location) =>
  `${substance} levels in ${location} are too high`

const getMeasures = locationsDataArr => particleName =>
  locationsDataArr.map(location => location[particleName])

const keepHighest = measures =>
  measures.map(x => (x === Math.max(...measures) ? x : undefined))

const highestMeasuresToLocations = locationsDataArr => highestMeasures =>
  highestMeasures.reduce(
    (acc, measure, i) =>
      measure ? (acc.push(locationsDataArr[i].Location), acc) : acc,
    []
  )

const particleSentence = (acc, picLocations, i) =>
  (acc += toHighSentence(PARTICLES[i], picLocations.join(', ')) + '. ')

const toSentence = locationsDataArr =>
  PARTICLES.map(
    pipe(
      getMeasures(locationsDataArr),
      keepHighest,
      highestMeasuresToLocations(locationsDataArr)
    )
  )
    .reduce(particleSentence, '')
    .trim()

const parseData = () =>
  toSentence(
    splitBySeparator(dataFile).map(
      pipe(
        splitNewLine,
        fieldsToObj(isAllowedKey, sanitizeParticles)
      )
    )
  )
