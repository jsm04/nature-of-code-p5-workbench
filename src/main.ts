import './style.css';
import { P5Sketch, SketchFn } from './P5Sketch';

const drawFn: SketchFn = (p) => {
	p.ellipse(0, 0, 80, 80);
};

const app = document.getElementById('app');
new P5Sketch(drawFn, app);
