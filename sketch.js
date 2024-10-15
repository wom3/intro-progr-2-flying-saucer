//Topic 1.1 
//Object orientation revisted
//part six: private variables

var flyingSaucer;
var cowManager;


function FlyingSaucer(x,y)
{
    //public
    this.x = x;
    this.y = y;
    this.beamOn = false;
    
    //private
    var fs_width = random(150,250);
    var fs_height = random(75,125);
    var window_width = random(0.65,0.85);
    var window_height = random(0.75,1);
    var base_height = random(0.25,0.5);
    var num_lights = floor(random(5,25));
    var light_inc = floor(random(5,10));
    var brightnesses = [];
    
    
    ///////////public methods/////////////
    
    this.hover = function()
    {
        this.x += random(-1,1);
        this.y += random(-1,1); 
        
        if(!this.beamOn && random() > 0.995)
        {
            this.beamOn = true;
        }
        else if(this.beamOn && random() > 0.999)
        {
            this.beamOn = false;
        }
    }

    
    this.draw = function()
    {
        if(this.beamOn)
        {
            this.beam();
        }
        
        
        //draw the window
        fill(175,238,238);
        arc(
            this.x,
            this.y,
            fs_width * window_width,
            fs_height * window_height,
            PI,TWO_PI);

        //draw the body
        fill(150);
        arc(
            this.x,
            this.y,
            fs_width,
            fs_height/2,
            PI,TWO_PI);

        //draw the base
        fill(50);
        arc(
            this.x,
            this.y,
            fs_width,
            fs_height * base_height,
            0,PI);

        //draw the lights
        var incr = (fs_width/(num_lights -1)); 

        for(var i = 0; i < num_lights; i++)
        {

            var x = this.x - fs_width/2 + i * incr;
            fill(brightnesses[i]);
            ellipse(
                x,
                this.y,
                5,
                5
            )
            brightnesses[i] += light_inc;
            if(brightnesses[i] > 255)
            {
                brightnesses[i] = 100;
            }
        }
    }   

    this.beam = function()
    {
        if(random() > 0.25)
        {
            fill(255,255,100,150);
            beginShape();
            vertex(this.x - 25,this.y + fs_height * base_height * 0.5);
            vertex(this.x + 25,this.y + fs_height * base_height * 0.5);
            vertex(this.x + 70,height - 100);
            vertex(this.x - 70,height - 100);
            endShape();
        }
    }

    //////// setup code /////////
    
    for(var i = 0; i < num_lights; i++)
    {
        brightnesses.push((i * light_inc * 2)%255);
    }

}


function Cow(x,y)
{
    //public
    this.x = x;
    this.y = y;
    this.direction = random(1,2);
    
    //private
    var step = 0;

    if(random() > 0.5)
    {
        this.direction *= -1;    
    }
    
    
    this.draw = function()
    {
        
        push();
        translate(this.x, this.y);
        if(this.direction > 0)
        {
            scale(-1,1);
        }
        
        fill(255,250,240)
        rect(0,-10,10,5);
        
        //legs
        if(step > 5)
        {
            rect(0,-5,2,5);
            rect(8,-5,2,5);
        }
        else
        {
            rect(2,-5,2,5);
            rect(6,-5,2,5);
        }
        
        //head
        rect(-4,-12,4,4);
        
        //markings
        fill(0);
        rect(4,-9,3,3);
        rect(6,-10,2,2);

        pop();
    
    }
    
    this.walk = function()
    {
        this.x += this.direction;
        step = (step + 1)%10;
    }

}


function CowManager()
{
    this.cows = [];
    this.minCows = 10;
    
    this.update = function()
    {
        if(this.cows.length < this.minCows)
        {
            this.cows.push(new Cow(-199, height - 100));
        }
        
        for(var i = 0; i < this.cows.length; i++)
        {
            this.cows[i].walk();
            
            if(this.cows[i].x > width + 200)
            {
                this.cows[i].x = -200;
            }
            else if(this.cows[i].x < -200)
            {
                this.cows[i].x = width + 200;
            }
        }
    }
    
    this.draw = function()
    {
        for(var i = 0; i < this.cows.length; i++)
        {
            this.cows[i].draw();
        }
    }
}

function setup()
{
    createCanvas(1200,600);
    noStroke();
    
    flyingSaucer = new FlyingSaucer(width/2,100);
    cowManager = new CowManager();

}

function draw()
{
    background(50,0,80);
    
    //draw the ground
    fill(0,50,0);
    rect(0,height - 100, width, 100);
    
    cowManager.update();
    cowManager.draw();
    
    flyingSaucer.hover();
    flyingSaucer.draw();
    

}

