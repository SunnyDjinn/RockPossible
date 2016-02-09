/** \file LvlMenu.js Contains the main menu level, and its loading function */
var Level0 = ([
		{x:0, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:1, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:2, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:3, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:4, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:5, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:6, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:7, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:8, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:9, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:9, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:10, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:11, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:12, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:13, y:-3, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:13, y:-1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:13, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:14, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:15, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:16, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:17, y:-5, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:17, y:-3, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:17, y:-1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:17, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:18, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:19, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:19, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:20, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:20, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:21, y:-7, translation:6, type:TRIANGLE, alpha:0, mounted:false},
		{x:21, y:-5, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:21, y:-3, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:21, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:21, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:22, y:-7, translation:6, type:TRIANGLE, alpha:0, mounted:false},
		{x:22, y:-5, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:22, y:-3, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:22, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:22, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:-3, translation:6, type:TRIANGLE, alpha:0, mounted:false},
		{x:23, y:-1, translation:6, type:SQUARE, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
		{x:23, y:+1, translation:6, type:EMPTY, alpha:0, mounted:false},
	]);
	
function load_lvlMenu()
{ 	
	/* clearing previous level */
	Game.moduleArray = [];
	
	$("#"+Musics[Game.level].id).prop("currentTime",0);
	$("#"+Musics[Game.level].id).trigger("play");
		
	
	var i;
	/* Inserting 20 empty blocks in the menu, then loading it through the usual method */
	for(i=0; i<20; i++) {
		Game.moduleArray[i] = new Module(i * 2 * Measures.halfSquareWidth, Measures.lineHeightCoef * Canvas.height + 1 * Measures.halfSquareHeight, Level1[0].translation, EMPTY, 1, true);
	}
	
	Game.levelArrayCursor = 0;
}

