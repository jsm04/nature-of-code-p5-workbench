import p5 from 'p5';

export const sketch = (p: p5) => {
	p.setup = () => {
		p.createCanvas(window.innerWidth, window.innerHeight);
	};

	p.draw = () => {
		p.translate(p.width / 2, p.height / 2);
		p.background(220);
		p.ellipse(50, 50, 80, 80);
	};
};

export default () => new p5(sketch, document.getElementById('app')!);
