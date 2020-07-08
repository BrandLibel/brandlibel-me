EmpireState = function()
{
    // Make sure to call the constructor for the TGE.Game superclass
    EmpireState.superclass.constructor.call(this);

     // These are assets we need for the game
    this.assetManager.addAssets("required",[
        {id:'kong_sprite',   url:'images/PrinceKong.png'},
        {id:'wall_sprite',   url:'images/EmpireStateWalls.png'},
        {id:'title_text',  url:'images/TitleText.png'},
        {id:'pigeon_sprite', url:'images/Pigeon.png'},
        {id:'poo_sprite', url:'images/PigeonPoo.png'},
        {id:'Helicopter',   url:'images/Helicopter.png'},
        {id:'wall_ac',   url:'images/Window_AC.png'},
        {id:'menu_background', url:'images/MainMenu_Background.png'},
        {id:'button_play', url:'images/Button_Play.png'},
        {id:'button_retry', url:'images/Button_Retry.png'},
        {id:'button_quit', url:'images/Button_Quit.png'},
        {id:'wall_pizza',   url:'images/Window_Pizza.png'}
      ]);

    // Start the game off with the main menu screen
    TGE.FirstGameWindow = MainMenu;
}

EmpireState.prototype =
{

}

extend(EmpireState,TGE.Game);

