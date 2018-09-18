// Return an "o" object with each key being a "c" character, which value is the total count of the "c" character in the s string
const count = (s = '') =>
	[...s].reduce((o, c) => (o[c] ? (o[c] += 1) : (o[c] = 1), o), {})
