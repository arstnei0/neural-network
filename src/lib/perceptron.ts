import type { Tuple } from "./utils/types"

// export type Perceptron<Inputs extends number = 2> = {
// 	weights: Tuple<number, Inputs>
// 	bias: number
// }

// export namespace Perceptron {
// 	export const create = <Inputs extends number = 2>(inputs: Inputs): Perceptron<Inputs> => {
// 		return {
// 			weights: Array.from({ length: inputs }, () => 1) as Perceptron<Inputs>["weights"],
// 			bias: 0,
// 		}
// 	}
// }

export class Point {
	x: number
	y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	static random() {
		return new Point(Math.random() * 100, Math.random() * 100)
	}

	draw(canvas: CanvasRenderingContext2D, scale: number = 5, guess: number) {
		canvas.fillStyle = guess === -1 ? "red" : "green"
		canvas.beginPath()
		canvas.arc(this.x * scale, this.y * scale, 5, 0, 2 * Math.PI)
		canvas.fill()
	}
}

export class Perceptron {
	weights = [1, 1]
	learningRate = 0.01
	constructor() {}

	sign(n: number): number {
		return n < 0 ? -1 : 1
	}

	guess(p: Point) {
		const sum = this.weights[0] * p.x + this.weights[1] * p.y
		return this.sign(sum)
	}

	learn(p: Point, guess: number, expected: number) {
		const error = expected - guess
		this.weights[0] += error * p.x * this.learningRate
		this.weights[1] += error * p.y * this.learningRate
		return error
	}

	fn(x: number) {
		return -x * (this.weights[0] / this.weights[1])
	}
}
