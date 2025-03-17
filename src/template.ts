import p5 from 'p5';

export const sketch = (p: p5) => {
	p.setup = () => {
		p.createCanvas(window.innerWidth, window.innerHeight);
	};

	p.draw = () => {
		p.background(220);
		p.ellipse(50, 50, 80, 80);
	};
};

new p5(sketch, document.body);
