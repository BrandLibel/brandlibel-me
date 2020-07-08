// Constants for tile types
var NORMAL = 0;
var DANGER = 1;
var PIZZA = 2;

var INITIAL_ROWS = 9;

var OBSTACLES = new Array();
for(var obs = 0; obs < 4; obs++)
{
	// Obstacle group
	OBSTACLES[obs] = new Array();
	// Initiate Rows
	for(var i = 0; i < 4; i++)
	{
		OBSTACLES[i] = new Array(4);
	}
}

// Hard code obstacles
var ROW = [NORMAL, NORMAL, NORMAL, NORMAL]; //Clean

//Pizzas
var ROWP0 = [PIZZA, NORMAL, NORMAL, NORMAL];
var ROWP1 = [NORMAL, PIZZA, NORMAL, NORMAL];
var ROWP2 = [NORMAL, NORMAL, PIZZA, NORMAL];
var ROWP3 = [NORMAL, NORMAL, NORMAL, PIZZA];

//Dangers
var ROWD0 = [DANGER, NORMAL, NORMAL, NORMAL];
var ROWD1 = [NORMAL, DANGER, NORMAL, NORMAL];
var ROWD2 = [NORMAL, NORMAL, DANGER, NORMAL];
var ROWD3 = [NORMAL, NORMAL, NORMAL, DANGER];
var ROWD4 = [NORMAL, DANGER, DANGER, NORMAL];
var ROWD5 = [NORMAL, NORMAL, DANGER, DANGER];
var ROWD6 = [DANGER, NORMAL, NORMAL, DANGER];
var ROWD7 = [DANGER, DANGER, NORMAL, NORMAL];

//Pizza dangers
var ROWPD0 = [DANGER, PIZZA, NORMAL, NORMAL];
var ROWPD1 = [NORMAL, DANGER, NORMAL, PIZZA];
var ROWPD2 = [NORMAL, PIZZA, DANGER, PIZZA];
var ROWPD3 = [NORMAL, PIZZA, NORMAL, DANGER];
var ROWPD4 = [PIZZA, DANGER, DANGER, NORMAL];
var ROWPD5 = [NORMAL, NORMAL, DANGER, DANGER];
var ROWPD6 = [DANGER, PIZZA, NORMAL, DANGER];
var ROWPD7 = [DANGER, DANGER, PIZZA, NORMAL];

//Random obstacles...no real order
//They are foolproof though
OBSTACLES[0] = [ROWPD0, ROWD0, ROWD1, ROW];
OBSTACLES[1] = [ROWPD0, ROWD5, ROWPD3, ROWP2]; 
OBSTACLES[2] = [ROWPD0, ROWD0, ROWD2, ROWP3]; 
OBSTACLES[3] = [ROWPD0, ROWPD0, ROWD6, ROW]; 
OBSTACLES[4] = [ROWPD0, ROWPD6, ROWD1, ROW]; 
OBSTACLES[5] = [ROWPD0, ROWD0, ROWD2, ROWP2]; 
OBSTACLES[6] = [ROWPD0, ROWD0, ROWD2, ROWP1]; 
OBSTACLES[7] = [ROWPD0, ROWD0, ROWD2, ROW]; 


GameScreen = function(width,height)
{
    GameScreen.superclass.constructor.apply(this,arguments);
	this.BG = "#6D643E";
	this.backgroundColor = this.BG;
	this.empireWalls = new Array();
	this.dangers = new Array();
	this.leftButton;
	this.rightButton;
	this.kong;
	this.menuWindow;
	this.scoreDisplay;
	this.debugDisplay;
	this.debugMsg = "";
	
	this.backgroundLayer = this.addChild(new TGE.DisplayObjectContainer().setup({}));
	this.characterLayer = this.addChild(new TGE.DisplayObjectContainer().setup({}));
	this.pigeonLayer = this.addChild(new TGE.DisplayObjectContainer().setup({}));
	this.heliLayer = this.addChild(new TGE.DisplayObjectContainer().setup({}));
	this.buttonLayer = this.addChild(new TGE.DisplayObjectContainer().setup({}));
	this.menuLayer = this.addChild(new TGE.DisplayObjectContainer().setup({}));
	
	this.timeMove = 0;
	this.difficulty = 1;
	this.location = 1;
	this.moving = false;
	this.score = 0;
	this.heliTime = 0;
	this.lives = 1;
	this.flying = false;
	this.heli;
	this.timeToUpdate = 0;
	this.initializeGame();
	this.addButtons();
	this.addMenuBar();
}

GameScreen.prototype =
{
	addButtons: function()
	{
		this.leftButton = new TGE.Button().setup( {
			width:this.percentageOfWidth(0.5),
			height:this.percentageOfHeight(1),
			x:this.percentageOfWidth(0.25),
			y:this.percentageOfHeight(0.5),
			alpha:0,
			pressFunction:this.moveLeft.bind(this),
			verticalPressOffset:0
		});
		
		this.rightButton = new TGE.Button().setup( {
			width:this.percentageOfWidth(0.5),
			height:this.percentageOfHeight(1),
			x:this.percentageOfWidth(0.75),
			y:this.percentageOfHeight(0.5),
			alpha:0,
			pressFunction:this.moveRight.bind(this),
			verticalPressOffset:0
		});
		this.buttonLayer.addChild(this.leftButton);
		this.buttonLayer.addChild(this.rightButton);
	},
	
	moveLeft: function()
	{
		this.moveSide(0,"left");
	},
	
	moveRight: function()
	{
		this.moveSide(0,"right");
	},
	
	
	addMenuBar: function()
	{
		var menuWindow = new TGE.Window(this.width, this.percentageOfHeight(0.2));
		menuWindow.x = 0; 
		menuWindow.y = 0; 
		menuWindow.backgroundColor = this.BG;
		
		// Die
		menuWindow.addChild(new TGE.Button().setup( {
			text:"Die",
			x:menuWindow.percentageOfWidth(0.25),
			y:menuWindow.percentageOfHeight(0.25),
			pressFunction:this.endGame.bind(this),
			backgroundColor:"#444",
			textColor:"#fff",
			verticalPressOffset:0
		}));
		
		this.scoreDisplay = new TGE.Text().setup( {
			text:"Score: " + this.score,
			x:menuWindow.percentageOfWidth(0.75),
			y:menuWindow.percentageOfHeight(0.75),
			font:"40pt arial",
			textColor:"#fff",
		});
		this.debugDisplay = new TGE.Text().setup( {
			text:this.debugMsg,
			x:menuWindow.percentageOfWidth(0.25),
			y:menuWindow.percentageOfHeight(0.75),
			font:"20pt arial",
			textColor:"#fff",
		});
		
		menuWindow.addChild(this.scoreDisplay);
		menuWindow.addChild(this.debugDisplay);
		this.menuLayer.addChild(menuWindow);
		this.menuWindow = menuWindow;
	},
	
   	initializeGame: function()
   	{
		//this.backgroundColor = "#C59535";
		
    	var kong = new TGE.SpriteSheetAnimation().setup(
   		{
   			image:"kong_sprite",
   			rows:5,
   			columns:5,
   			totalFrames:20,
   			fps:40,
			width:this.percentageOfWidth(0.25),
			height:this.percentageOfHeight(0.2),
			x:this.percentageOfWidth(0.15),
			y:this.percentageOfHeight(0.9),
			looping:false
   		});
		this.heli = new TGE.SpriteSheetAnimation().setup(
   		{
   			image:"Helicopter",
			rows:2,
			columns:2,
			totalFrames:4,
			fps:60,
			width:this.percentageOfWidth(.5),
			height:this.percentageOfHeight(.2),
			x:-this.width/2,
			y:this.percentageOfHeight(Math.random()/4.5),
			looping:true
   		});
		
		this.kong = kong;
		// this.initializeDangers();
		// this.initializeEmpireWalls();
		this.initializeWalls();
		this.characterLayer.addChild(kong);
		this.heliLayer.addChild(this.heli);
		
		kong.addEventListener("update",this.updateKong.bind(this));
		this.addEventListener("update",this.updateBackground.bind(this));
		kong.addEventListener('keydown', this.moveSide.bind(this));
		
   	},

	updateKong: function(event)
	{
		var kong = event.currentTarget;
		this.timeMove += event.elapsedTime*100;
		if(this.timeMove >= 300/this.difficulty)
		{
			this.score+=1;
			kong.gotoAndPlay(1);
			this.timeMove = 0;
			this.moving = true;
		}
		this.scoreDisplay.text = "Score: " + this.score;
		if(this.dangers[0][this.location-1] === DANGER)
		{
			this.lives--;
			if(this.lives === 0)
			{
				this.endGame();
			}
		}
		if(this.dangers[0][this.location-1] === PIZZA)
		{
			this.gotPizza(this.location-1);
		}
		
		this.heliTime += event.elapsedTime*100;
		if(this.heliTime >= 500)
		{
			this.flying = true;
			this.heli.play();
			heliTime = 0;
		}
		this.scoreDisplay.text = "Score: " + this.score;
	},
	
	
	
	updateBackground: function(event)
	{
		if(this.moving===true)
		{
			for(var i = 0; i < this.empireWalls.length; i++)
			{
				for(var j = 0; j < this.empireWalls[i].length; j++)
				{
					this.empireWalls[i][j].y += 350*event.elapsedTime;
				}
			}
			if(this.flying === true)
				this.heli.y += 350*event.elapsedTime;
			
			if(this.empireWalls[1][0].y >= this.percentageOfHeight(.8) + this.empireWalls[1][0].height/2)
			{
				this.moving = false;
				this.removeRow();
				this.timeToUpdate++;
				if(this.timeToUpdate === 3)
				{
					this.timeToUpdate = 0;
					this.addNewRows();
				}
			}
		}
		if(this.flying === true)
		{
			this.heli.x += event.elapsedTime*300;
			if(this.heli.x > 1.5*this.width)
			{
				this.heli.x = -2*this.width;
				this.flying = false
				this.heliTime = 0;
				this.heli.stop();
			}
		}
		
	},
	
	
	moveSide: function(event, click)
	{
		if(!this.moving)
		{
			var kong = this.kong;
			if(event.keyCode == 37 || click === "left")
			{
				if(this.location ==1){}
				else if(this.location==2)
				{
					this.location=1;
					kong.x = this.percentageOfWidth(.15);
				}
				else if(this.location==3)
				{
					this.location=2;
					kong.x = this.percentageOfWidth(.40);
				}
				else
				{
					this.location=3;
					kong.x = this.percentageOfWidth(.65);
				}
			}
			if(event.keyCode == 39 || click === "right")
			{
				if(this.location ==1)
				{
					this.location = 2;
					kong.x = this.percentageOfWidth(.40);
				}
				else if(this.location==2)
				{
					this.location=3;
					kong.x = this.percentageOfWidth(.65);
				}
				else if(this.location==3)
				{
					this.location=4;
					kong.x = this.percentageOfWidth(.90);
				}
			}
			
		}
	},
	
	initializeWalls: function()
	{
		this.dangers[0] = new Array();
		this.empireWalls[0] = new Array();
		//Initialize first rows to be all normal
		for(var i = 0; i < 4; i++)
		{
			this.dangers[0][i] = NORMAL;
			this.empireWalls[0][i] = this.cell(0, i);
		}
		this.addNewRows();
		this.addNewRows();
	},
	
	// initializeDangers: function()
	// {
		
		
	// },
	
	// initializeEmpireWalls: function()
	// {
		// for(var i = 0; i < INITIAL_ROWS; i++)
		// {
			// this.empireWalls[i] = new Array();
			// for(var j = 0; j < 4; j++)
			// {
				// this.empireWalls[i][j] = this.cell(i, j);
			// }
		// }
	// },
	
	placeCell: function(c, i, j)
	{
		c.x = this.percentageOfWidth(0.25*(j)) + c.width/2;
		c.y = this.percentageOfHeight(0.2*(4-i)) + c.height/2;
		this.backgroundLayer.addChild(c);
	},
	
	cell: function(i, j)
	{
		this.backgroundColor = this.BG;
		var c;
		//Choose the type of cell to make
		switch (this.dangers[i][j])
		{
			case NORMAL:
				c = this.createNormalCell();
				break;
			case DANGER:
				c = this.createDangerCell();
				break;
			case PIZZA:
				c = this.createPizzaCell();
				break;
			default:
				break;
		}
		// Place cell in correct location
		this.placeCell(c, i, j);
		return c;
	},

		
	createNormalCell: function()
	{
		var c = new TGE.SpriteSheetAnimation().setup(
		{
			image:"wall_sprite",
			rows:2,
			columns:2,
			totalFrames:4,
			fps:0,
			width:this.percentageOfWidth(0.25),
			height:this.percentageOfHeight(0.2)
		});
		var tile;
		if(Math.random() < 0.85)
		{
			tile = 0;
		} else
		{
			tile = Math.floor(Math.random() * 4);
		}
		c.gotoAndStop(tile);
		return c;
	},
	
	createDangerCell: function()
	{
		var c = new TGE.SpriteSheetAnimation().setup(
		{
			image:"wall_ac",
			rows:1,
			columns:12,
			totalFrames:12,
			fps:24,
			width:this.percentageOfWidth(0.25),
			height:this.percentageOfHeight(0.2)
		});
		c.play();
		return c;
	},
	
	createPizzaCell: function()
	{
		var c = new TGE.SpriteSheetAnimation().setup(
		{
			image:"wall_pizza",
			rows:1,
			columns:9,
			totalFrames:9,
			fps:10,
			width:this.percentageOfWidth(0.25),
			height:this.percentageOfHeight(0.2)
		});
		c.play();
		return c;
	},
	
	// createCell: function(i, j)
	// {
		
	// },
	
	addNewRows: function()
	{
		var randObs = Math.floor(Math.random() * 8);
		var sz = this.dangers.length;
		for(var i = 0; i < 4; i++)
		{
			this.dangers[i+sz] = new Array();
			this.dangers[i+sz] = OBSTACLES[randObs][i];
			this.empireWalls[i+sz] = new Array();
			for(var j = 0; j < 4; j++)
			{
				this.empireWalls[i+sz][j] = this.cell(i+sz, j);
			}
		}
	},
	
	removeRow: function()
	{
		this.backgroundColor = this.BG;
		for(var i = 0; i < this.empireWalls.length-1; i++)
		{
			this.empireWalls[i] = this.empireWalls[i+1];
			this.dangers[i] = this.dangers[i+1];
		}
		this.empireWalls.length -= 1;
		this.dangers.length -= 1;
	},
	
	
	gotPizza: function()
	{
	  this.score+=1;
	  var c = this.empireWalls[0][this.location-1];
	  c.setImage("wall_sprite", 2, 2);
	   c.width = this.percentageOfWidth(0.25),
	   c.height = this.percentageOfHeight(0.2)
	  c.gotoAndStop(0);	  
	  this.dangers[0][this.location-1] = NORMAL;
	  this.debugDisplay.text = "Pizza at " + (this.location-1);
	},
	
	endGame: function()
    {
        // if(this.gameOver)
        // {
            // return;
        // }

        // Save the highscore and earned coins to the TGS server
        // var newHighscore = TGE.Game.GetInstance().gotNewScore(this.score);
        // TGE.Game.GetInstance().saveState();

        // Make sure we don't call this function again
        this.gameOver = true;

        // We need to pass some additional parameters into the GameOver window setup
        this.transitionToWindow({
            windowClass:GameOver,
            fadeTime:0.2,
            score:this.score,
            // newHighscore:newHighscore
        });
    }
}
extend(GameScreen,TGE.Window);
