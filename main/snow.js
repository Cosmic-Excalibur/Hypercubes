function snow(){
	c.fillStyle = "rgba(255, 255, 255, 0.8)";
	c.beginPath();
	for(var i = 0; i < mp; i++)
	{
		var p = particles[i];
		c.moveTo(p.x-W/2, p.y-H/2);
		c.arc(p.x-W/2, p.y-H/2, p.r, 0, Math.PI*2, true);
	}
	c.fill();
	update();
}
var rate = 0.7; //velocity adjustment
var mp = 50; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*3+1, //radius
			d: Math.random()*mp //density
		})
	}
var rate_ = 1, rate__ = rate, rate___ = 10, updown = 0;
function ra(k){
	if(rate*k>-rate__*k){rate-=k/rate___;window.requestAnimationFrame(function(){ra(k);});}else{rate=-rate__;rate_=1;rate__=rate;updown=1-updown;}
}
var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += (Math.cos(angle+p.d) + 1 + p.r/2)*rate;
			p.x += (Math.sin(angle) * 2)*rate;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || (p.y > H+5 && !updown) || (p.y < -5 && updown))
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: updown?H+10:-10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: updown?W+5:-5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: updown?-5:W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}