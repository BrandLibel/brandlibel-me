MainMenu = function(width,height)
{
    MainMenu.superclass.constructor.apply(this,arguments);
    this.backgroundColor = "#C59535";

    this.addChild(new TGE.Sprite().setup
    ({
        image: "menu_background",
        x: this.percentageOfWidth(0.5),
        y: this.percentageOfHeight(0.5),
        width: this.percentageOfWidth(1),
        height: this.percentageOfHeight(1)

    }));

    //Title
    this.addChild(new TGE.Sprite().setup
    ({
        image:"title_text",
        x:this.percentageOfWidth(0.35),
        y:this.percentageOfHeight(0.30),
        looping:false
    }));
   
    // Play button
    this.addChild(new TGE.Button().setup
    ({
        x:this.percentageOfWidth(0.35),
        y:this.percentageOfHeight(0.6),
        image:"button_play",
        enabled: true,
        numStates: 3,
        pressFunction: this.playGame.bind(this)

    }));
}

MainMenu.prototype =
{
    playGame: function()
    {
        // Opens a new window and closes this one when done
        this.transitionToWindow({windowClass:GameScreen,fadeTime:0.20});
    },

}
extend(MainMenu,TGE.Window);
