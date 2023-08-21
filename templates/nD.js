const T = Math.PI*2;

var F = [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];
var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var rv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var vt = 0.01;
var w = 80;
var wdelta = 5;
var wmin = 1;
var wmax = 500;
var opacity = 0.08;
var do_you_like_snow_question_mark = 'yes!';

const canvas = document.getElementById('screen');
const c = canvas.getContext('2d');

var running = 1;
var theta = t = 0;
var W,H;


window.onresize = ()=>{
	W =  canvas.width = document.body.clientWidth;
	H = canvas.height = document.body.clientHeight;
	c.translate(canvas.width/2, canvas.height/2);
}

window.onresize();

const grd = c.createLinearGradient(0, -H/2, 0, H);
grd.addColorStop(0, "rgb(0,0,0)");
grd.addColorStop(1, "rgb(100,100,100");

class Vertex {
	constructor(...x){
		this.pos = [];
		x.forEach((y)=>{
			this.pos.push(y);
		});
		this.n = x.length;
		this.loc = [];
	}
	rotate(r){
		r.slice(0,this.n).toReversed().forEach((s, k_)=>{
			let i,j;
			let k = this.n - k_ - 1;
			switch(k){
				case 0:
					i = 1, j = 2;
					break;
				case 1:
					i = 0, j = 2;
					break;
				case 2:
					i = 0, j = 1;
					break;
				default:
					i = 1, j = k;
			}
			let p = this.pos[i];
			this.pos[i] = p*Math.cos(s) - this.pos[j]*Math.sin(s);
			this.pos[j] = p*Math.sin(s) + this.pos[j]*Math.cos(s);
		});
	}
	project(){
		this.pos[this.n-1] += F[this.n-3];
		for(let i=this.n-1; i>=3; i--){
			for(let j=0; j<i; j++){
				this.pos[j] *= F[i-2]/this.pos[i];
			}
			this.pos[i-1] += F[i-3];
		}
		this.loc = [this.pos[0]*F[0]/this.pos[2], this.pos[1]*F[0]/this.pos[2]];
	}
}

class Face {
	constructor(color, ...v){
		this.v = v;
		this.color = color || "rgba(255,255,255,0.1)";
	}
	render(){
		c.beginPath();
		c.strokeStyle = "rgba(255,255,255,1)";
		c.moveTo(this.v[0].loc[0], this.v[0].loc[1]);
		c.lineWidth = 1;
		for(let i=1; i<this.v.length; i++) c.lineTo(this.v[i].loc[0], this.v[i].loc[1]);
		c.closePath();
		c.fillStyle = this.color;
		c.fill()
		c.stroke();
	}
}

window.onmousemove=function(e){
	if(e.ctrlKey) return;
	
	let v = 400;
	
	if(e.shiftKey){
		r[2] += e.movementX/v + e.movementY/v;
		r[2] %= T;
	}else{
		r[0] += e.movementY/v;
		r[0] %= T;
		r[1] += e.movementX/v;
		r[1] %= T;
	}
	
	if(e.altKey) {
		running = 0;
		return;
	}
	
	running = 1;
}

window.onwheel=function(e){
	if(e.deltaY<0){
		w = Math.min(w + wdelta, wmax);
	}else if(e.deltaY>0){
		w = Math.max(w - wdelta, wmin);
	}
}

window.onkeydown=function(e){
	if(e.keyCode==82){
		recording = !recording;
		if(recording){
			recorder.start();
		} else {
			recorder.stop();
		}
	}else if(e.keyCode==83){
		recorder.snap();
	}else if(do_you_like_snow_question_mark=='yes!'&&e.keyCode==32&&rate__){
		rate_=0;if(rate>-rate__){ra(1);}else{ra(-1);}
	}
}

function f(t){
	if(0<=t&&t<T/8){return t**4/(T/8)**3;}
	else if(T/8<=t&&t<T/4){return T/4 - (t-T/4)**4/(T/8)**3;}
	else if(T/4<=t&&t<=T*3/8){return T/4 + (t-T/4)**4/(T/8)**3;}
	else if(T*3/8<=t&&t<=T/2){return T/2 - (t-T/2)**4/(T/8)**3;}
	else if(t>T/2){return f(T-t);}
	else {return t;}
}

function bg(){
	c.fillStyle = grd;
	c.fillRect(-W/2, -H/2, W, H);
}


function snow(){
	
}

function auto(){
	if((x=t)>0&&x<vt*2) recorder.start();
	if((x=T-t)<vt*2&&x>0) recorder.stop();
}

function draw(){
	requestAnimationFrame(draw);
	
	bg();
	
	if(running){
		rv.forEach((s,i)=>{
			r[i] += s;
			r[i] %= T;
		});
		
		t += vt;
		t %= T;
		theta = f(t);
	}
	
	do_you_like_snow_question_mark=='yes!'?snow():0;
	
	let v1 = [], v2 = [], v3 = [], v4 = [], v5 = [], v6 = [], v7 = [], v8 = [], v9 = [], v10 = [], v11 = [], v12 = [], v13 = [], v14 = [], v15 = [], v16 = [], v17 = [], v18 = [], v19 = [], v20 = [], v21 = [], v22 = [], v23 = [], v24 = [];
	let faces = [];
	
	let color_a =  'rgba(255,   0,   0,         0.1)',
		color1  =  'rgba(255,   0,   0, '+opacity+')',
		color2  =  'rgba(  0, 255,   0, '+opacity+')',
		color3  =  'rgba(  0,   0, 255, '+opacity+')',
		color4  =  'rgba(255, 255,   0, '+opacity+')',
		color5  =  'rgba(255,   0, 255, '+opacity+')',
		color6  =  'rgba(  0, 255, 255, '+opacity+')',
		color7  =  'rgba(255, 255, 255, '+opacity+')',
		color8  =  'rgba(  0,   0,   0, '+opacity+')',
		color9  =  'rgba(  0,   0, 128, '+opacity+')',
		color10 =  'rgba(  0, 128,   0, '+opacity+')',
		color11 =  'rgba(  0, 128, 128, '+opacity+')',
		color12 =  'rgba(128,   0,   0, '+opacity+')';
		color13 =  'rgba(128,   0, 128, '+opacity+')',
		color14 =  'rgba(128, 128,   0, '+opacity+')',
		color15 =  'rgba(128, 128, 128, '+opacity+')',
		color16 =  'rgba(  0,   0,  64, '+opacity+')',
		color17 =  'rgba(  0,  64,   0, '+opacity+')',
		color18 =  'rgba(  0,  64,  64, '+opacity+')',
		color19 =  'rgba( 64,   0,   0, '+opacity+')',
		color20 =  'rgba( 64,   0,  64, '+opacity+')',
		color21 =  'rgba( 64,  64,   0, '+opacity+')',
		color22 =  'rgba( 64,  64,  64, '+opacity+')',
		color23 =  'rgba(255,   0, 128, '+opacity+')',
		color24 =  'rgba(255, 128,   0, '+opacity+')';
	
	__NGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA__
	
	
	for(let i=0; i<faces.length; i++) faces[i].render();
}

draw();