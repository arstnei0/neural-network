type BuildTupleHelper<
	Element,
	Length extends number,
	Rest extends Element[]
> = Rest["length"] extends Length
	? [...Rest]
	: BuildTupleHelper<Element, Length, [Element, ...Rest]>

export type Tuple<Element, Length extends number> = number extends Length
	? Element[]
	: BuildTupleHelper<Element, Length, []>
