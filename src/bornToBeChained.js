const mapObj = f => o =>
	Object.entries(o).reduce((acc, [key, val]) => ((acc[key] = f(val)), acc), {})

const chain = o => {
	const makeChainable = (toChain, baseValue = void 0) => {
		const chained = mapObj(f => (...args) =>
			makeChainable(o, baseValue ? f(baseValue, ...args) : f(...args))
		)(toChain)

		chained.execute = () => baseValue
		return chained
	}

	return makeChainable(o)
}
