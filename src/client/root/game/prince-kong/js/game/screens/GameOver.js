GameOver = function()
{
    GameOver.superclass.constructor.apply(this,arguments);

    // Setup the scene
    this.backgroundColor = "de3310";

    // Game over message
    this.addChild(new TGE.Text().setup( {
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.14),
        text:"GAME OVER",
        font:"bold 80px forte",
        color:"#0D0C0C",
    }));

    // Score
    this.scoreMessage = this.addChild(new TGE.Text().setup( {
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.25),
        font:"bold 36px forte",
        color:"#0D0C0C"
    }));


    // Try again button
    this.addChild(new TGE.Button().setup
    ({
        x:this.percentageOfWidth(0.25),
        y:this.percentageOfHeight(0.5),
        image:"button_retry",
        enabled: true,
        numStates: 3,
        pressFunction: this.playAgain.bind(this)

    }));
    /*this.addChild(new TGE.Button().setup( {
        text:"Try Again",
        x:this.percentageOfWidth(0.25),
        y:this.percentageOfHeight(0.50),
        pressFunction:this.playAgain.bind(this)
    }));*/

    // Main menu button
    this.addChild(new TGE.Button().setup
    ({
        x:this.percentageOfWidth(0.75),
        y:this.percentageOfHeight(0.5),
        image:"button_quit",
        enabled: true,
        numStates: 3,
        pressFunction: this.gotoMainMenu.bind(this)

    }));
    /*this.addChild(new TGE.Button().setup( {
        text:"Main Menu",
        x:this.percentageOfWidth(0.75),
        y:this.percentageOfHeight(0.5),
        width:250,
        pressFunction:this.gotoMainMenu.bind(this)
    }));*/

};

GameOver.prototype =
{
    // The setup function is defined in the TGE.DisplayObject base class - we can override it here if our window
    // has custom information we need to pass in. In this case we'll pass in the score and highscore so we can
    // customize the game over screen.
    setup: function(params)
    {
        GameScreen.superclass.setup.call(this,params);

        var score = params.score;

        this.scoreMessage.text = "You scored: " + score;
        

        return this;
    },

    playAgain: function()
    {
        this.transitionToWindow({windowClass:GameScreen,fadeTime:0.2});
    },

    gotoMainMenu: function()
    {
        this.transitionToWindow({windowClass:MainMenu,fadeTime:0.2});
    }
};
extend(GameOver,TGE.Window);