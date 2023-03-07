import type { Tuple } from "./utils/types"

export type Perceptron<Inputs extends number = 2> = {
	weights: Tuple<number, Inputs>
	bias: number
}

export namespace Perceptron {
	export const create = <Inputs extends number = 2>(inputs: Inputs): Perceptron<Inputs> => {
		return {
			weights: Array.from({ length: inputs }, () => 1) as Perceptron<Inputs>["weights"],
			bias: 0,
		}
	}
}
