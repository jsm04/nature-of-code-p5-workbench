import p5 from 'p5';

export class P5Sketch {
	// @ts-ignore
	private p: p5 | null = null;
	private drawFn: (p: p5) => void;

	constructor(
		drawFunc: (p: p5) => void,
		parent: HTMLElement | null = document.body
	) {
		this.drawFn = drawFunc;
		this.p = new p5(this.sketch.bind(this), parent!);
	}

	private sketch(p: p5) {
		p.setup = () => {
			p.createCanvas(window.innerWidth, window.innerHeight);
		};

		p.draw = () => {
			p.background(0);
			p.translate(p.width / 2, p.height / 2);
			this.drawFn(p);
		};

		p.windowResized = () => {
			p.resizeCanvas(window.innerWidth, window.innerHeight);
		};
	}
}

export type SketchFn = (p: p5) => void;
