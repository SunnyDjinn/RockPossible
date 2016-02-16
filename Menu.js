/** \file Menu.js : enables to start playing + all options while in game */

/**
 * Initializes all what's needed before starting a game */
function init() {
	/* Globals initialisation */
	set_globals();
	
	/* Retrieving top scores from database */
	retrieves_top_scores();
	
	/* Loading musics */
	load_musics()
	
	/* Drawing menu */
	draw_menu_background();
	
	/* Images loading */
	set_images();
	
	/* A boom is heard when the mainSquare dies */
	set_boom_sound();
	
	/* Buttons creation */
	set_buttons();
}

/**
 * Initializes variables
 * */
function set_globals() {
	/* Canvas */
	Canvas = $("#canvas")[0];
	
	/* Canvas 2D context */
	Ctx = Canvas.getContext("2d");
	
	/* The measures */
	Measures = new Measures();
	
	/* Half of the square width */
	Measures.halfSquareWidth = Math.floor(Canvas.width*Measures.squareWidthCoef / 2);
	
	/* Half of the square height */
	Measures.halfSquareHeight = Math.floor(Canvas.height*Measures.squareHeightCoef / 2);
	
		
	/* Length of a diagonal of a square */
	Measures.halfDiagonalSquare = Math.floor(Math.sqrt(Math.pow(Math.floor(Measures.halfSquareHeight), 2) * 2));
	
	/* Y initial position of the main square */
	Measures.initialPos = Math.floor(Measures.lineHeightCoef * Canvas.height - Measures.halfSquareHeight);
	
	Measures.tolerance = 2;
	
	/* The Game itself */
	Game = new Game(0, 0, "Anonymous");
	
	Game.mode = NORMAL;
	
	/* The main square (the orange one) */
	Game.mobile = new MainSquare(Math.floor(2*Measures.lineWidthCoef * Canvas.width), Measures.initialPos, 0, false, 0);
	
	/* Setting the jump height (useless right now) */
	Game.mobile.setJumpHeight(2);
	
	/* The background (and its gradient) */
	Game.background = new Framework("#003333", "#00CCCC", "white");
}

/**
 * Loads and attaches the images to the page
 * */
function set_images() {
	var top = 210;
	
	for(var i=0;i<SkinsN.length;i++) {
		$("#images").append($("<img id='skin"+i+"N'>"));
		$("#skin"+i+"N").attr("src",SkinsN[i]);
		$("#skin"+i+"N").hide();
		$("#skin"+i+"N").css("left","575px");
		$("#skin"+i+"N").css("top",top+"px");
		top += 40;
		$("#skin"+i+"N").click(function(event){
		
			reset_MainSquare_pos();
			stop_keydown(); /* don't want the players to jump in the menu animation */
			Game.mobile.isDead = false; /* if the Mainsquare died in a level */
		
			CurrentSkin = $(this).attr("src");
		
			$("#cancel").hide();
			$("#play").show();
			$("#skins").show();
			$("#standardSkin").hide();
		
			if(Game.mode == NORMAL) {
				for(var i=0;i<SkinsN.length;i++) {
					$("#skin"+i+"N").hide();
				}
				$("#rock").show();
			}
			else {
				for(var i=0;i<SkinsR.length;i++){
					$("#skin"+i+"R").hide();
				}
				$("#normal").show();
			}
			draw_menu_background();
			
		});
	}
	
	top = 210;
	for(var i=0;i<SkinsR.length;i++) {
		$("#images").append($("<img id='skin"+i+"R'>"));
		$("#skin"+i+"R").attr("src",SkinsR[i]);
		$("#skin"+i+"R").hide();
		$("#skin"+i+"R").css("left","575px");
		$("#skin"+i+"R").css("top",top+"px");
		top += 40;
		$("#skin"+i+"R").click(function(event){
			reset_MainSquare_pos();
			stop_keydown(); /* don't want the players to jump in the menu animation */
			Game.mobile.isDead = false; /* if the Mainsquare died in a level */
		
			CurrentSkin = $(this).attr("src");
		
			$("#cancel").hide();
			$("#play").show();
			$("#skins").show();
			$("#standardSkin").hide();
		
			if(Game.mode == NORMAL) {
				for(var i=0;i<SkinsN.length;i++) {
					$("#skin"+i+"N").hide();
				}
				$("#rock").show();
			}
			else {
				for(var i=0;i<SkinsR.length;i++) {
					$("#skin"+i+"R").hide();
				}
				$("#normal").show();
			}
			draw_menu_background();
		});
	}
}

/**
 * Creates, appends and adds event listeners to all buttons needed 
 * */
function set_buttons() {
	
	/* All the buttons needed */
	var actions = $("#actions");
	var levels = $("#levels");
	var playButton = $("<button id='play'> Play </button>");
	var pauseButton = $("<button id='pause'> Pause </button>");
	var saveButton = $("<button id='save'> Save </button>");
	var loadButton = $("<button id='load'> Load </button>");
	var menuButton = $("<button id='menu'> Menu </button>");
	var rockButton = $("<button id='rock'> Rock </button>");
	var normalButton = $("<button id='normal'> Normal </button>");
	var skinsButton = $("<button id='skins'> Skins </button>");
	var standardSkinButton = $("<button id='standardSkin'> standard </button>");
	var cancelButton = $("<button id='cancel'> Cancel </button>");
	var restartButton = $("<button id='restart'> Restart </button>");
	var level1Button = $("<button id='level1'> Level 1 </button>");
	var level2Button = $("<button id='level2'> Level 2 </button>");
	
	/* Appending them all */
	actions.append(playButton);
	actions.append(pauseButton);
	actions.append(saveButton);
	actions.append(loadButton);
	actions.append(menuButton);
	actions.append(rockButton);
	actions.append(normalButton);
	actions.append(skinsButton);
	actions.append(standardSkinButton);
	actions.append(cancelButton);
	actions.append(restartButton);
	levels.append(level1Button);
	levels.append(level2Button);
	
	/* can't be seen yet */
	pauseButton.hide();
	saveButton.hide();
	menuButton.hide();
	normalButton.hide();
	restartButton.hide();
	cancelButton.hide();
	standardSkinButton.hide();
	level1Button.hide();
	level2Button.hide();
	
	/* Function launched when the play button is clicked on */
	playButton.click(function(event){
		playButton.hide();
		loadButton.hide();
		$("#formulary").hide();
		$("#enter").hide();
		$("#score").hide();
		menuButton.show();
		level1Button.show();
		level2Button.show();
		skinsButton.hide();
		rockButton.hide();
		normalButton.hide();
		$(".deleteSav").hide();
	});
	
	/* Function launched when the pause button is clicked on */
	pauseButton.click(function(event) {
		Game.pause();
		if(Game.isPlaying == false)
			pauseButton.text("Play");
		else
			pauseButton.text("Pause");
	});
	
	/* Function launched when the save button is clicked on */
	saveButton.click(function(event) {
		/* simulating a click on the pause button */
		if(Game.isPlaying == true)
			$("#pause").trigger("click"); 
		
		ask_user_name();
	});
	
	/* function launched when the load button is clicked on */
	loadButton.click(function(event) {
		ask_load_name();
	});
	
	/* function launched when the menu button is clicked on */
	menuButton.click(function(event){
	
		window.cancelAnimationFrame(Game.id); /* need to stop the animation cuz it will start twice otherwise */
		reset_MainSquare_pos();
		stop_keydown(); /* don't want the players to jump in the menu animation */
		Game.mobile.isDead = false; /* if the Mainsquare died in a level */
		Game.score = 0;
		Game.levelArrayCursor = 0;
		$("#score").hide();
		$("#youWon").remove(); /* remove win message */
		
		/* stopping music if any is playing */
		if($("#"+Musics[Game.level].id).length != 0)
			$("#"+Musics[Game.level].id).trigger("pause");
		
		/* updating display */
		$("h1[id='large']").show();
		saveButton.hide();
		menuButton.hide();
		restartButton.hide();
		level1Button.hide();
		level2Button.hide();
		playButton.show();
		pauseButton.hide();
		loadButton.show();
		skinsButton.show();
		$(".deleteSav").hide();
		
		if(Game.mode == NORMAL)
			rockButton.show();
		else
			normalButton.show();
			
		skinsButton.show();
		
		draw_menu_background();
	});
	
	/* function launched when the RockPossible button is clicked on */
	rockButton.click(function(event){
	
		Game.mode = ROCK;
		CurrentSkin = SkinsR[0];
		Game.background = new Framework("#000000", "#ff0000", "white");
		rockButton.hide();
		normalButton.show();
		$("#large").text("Rockpossible Game");
	});
	
	/* function launched when the normal button is clicked on */
	normalButton.click(function(event){
	
		Game.mode = NORMAL;
		CurrentSkin = "original";
		Game.background = new Framework("#003333", "#00CCCC", "white");
		normalButton.hide();
		rockButton.show();
		$("#large").text("Rockpossible Game");
	});
	
	/* function launched when the skins button is clicked on */
	skinsButton.click(function(event){
	
		window.cancelAnimationFrame(Game.id);
		Ctx.clearRect ( 0 , 0 ,Canvas.width, Canvas.height);
		cancelButton.show();
		playButton.hide();
		loadButton.hide();
		skinsButton.hide();
		
		if(Game.mode == NORMAL) {
			for(var i=0;i<SkinsN.length;i++) {
				$("#skin"+i+"N").show();
			}
			Game.background = new Framework("#003333", "#00CCCC", "white");
			Game.background.draw();
			rockButton.hide();
			standardSkinButton.show();
		}
		else {
			for(var i=0;i<SkinsR.length;i++) {
				$("#skin"+i+"R").show();
			}
			Game.background = new Framework("#000000", "#ff0000", "white");
			Game.background.draw();
			normalButton.hide();
		}
	});	
	
	standardSkinButton.click(function(event){
	
		reset_MainSquare_pos();
		stop_keydown(); 
		Game.mobile.isDead = false; 
		
		CurrentSkin = "original";
		
		cancelButton.hide();
		playButton.show();
		loadButton.show();
		skinsButton.show();
		standardSkinButton.hide();
		
		if(Game.mode == NORMAL) {
			for(var i=0;i<SkinsN.length;i++) {
				$("#skin"+i+"N").hide();
			}
			rockButton.show();
		}
		else {
			for(var i=0;i<SkinsR.length;i++) {
				$("#skin"+i+"R").hide();
			}
			normalButton.show();
		}
		draw_menu_background();
	});
	
	/* function launched when the cancel button is clicked on */
	cancelButton.click(function(event){
	
		reset_MainSquare_pos();
		stop_keydown(); /* don't want the players to jump in the menu animation */
		Game.mobile.isDead = false; /* if the Mainsquare died in a level */
		
		cancelButton.hide();
		playButton.show();
		loadButton.show();
		skinsButton.show();
		$(".deleteSav").hide();
		$(".loading").hide();
		$("#enter").hide();
		standardSkinButton.hide();
		
		if(Game.mode == NORMAL) {
			for(var i=0;i<SkinsN.length;i++) {
				$("#skin"+i+"N").hide();
			}
			rockButton.show();
		}
		else {
			for(var i=0;i<SkinsR.length;i++) {
				$("#skin"+i+"R").hide();
			}
			normalButton.show();
		}
		draw_menu_background();
	});	
	
	/* function launched when the restart button is clicked on */
	restartButton.click(function(event){
	
		window.cancelAnimationFrame(Game.id); 
		reset_MainSquare_pos();
		Game.mobile.isDead = false; 
		Game.levelArrayCursor = 0;
		$("#youWon").remove();
		if($("#"+Musics[Game.level].id).length != 0)
			$("#"+Musics[Game.level].id).trigger("pause");
		Game.score = 0;
		play(Game.level, 0);
		init_keydown();
		
	});
	
	/* function launched when the levels button are clicked on */	
	level1Button.click(function(event){
		window.cancelAnimationFrame(Game.id);
		reset_MainSquare_pos();
		$("h1[id='large']").hide();
		level1Button.hide();
		level2Button.hide();
		rockButton.hide();
		normalButton.hide();
		skinsButton.hide();
		saveButton.show();
		pauseButton.show();
		restartButton.show();
		
		if($("#"+Musics[Game.level].id).length != 0)
			$("#"+Musics[Game.level].id).trigger("pause");
		
		play(1, 0);
	});
	
	level2Button.click(function(event){
		window.cancelAnimationFrame(Game.id);
		reset_MainSquare_pos();
		$("h1[id='large']").hide();
		level1Button.hide();
		level2Button.hide();
		rockButton.hide();
		normalButton.hide();
		skinsButton.hide();
		saveButton.show();
		pauseButton.show();
		restartButton.show();
		
		if($("#"+Musics[Game.level].id).length != 0)
			$("#"+Musics[0].id).trigger("pause");
		
		play(2, 0);
	});
}


/**
 * Sets the game over sound
 * */
function set_boom_sound() {
	var audio = $("<audio>Your browser does not support audio files</audio>");
	var source = $("<source src='"+Sounds[0].src+"' type='audio/mpeg'>");
	
	audio.append(source);
	$("#music").append(audio);
	audio.attr("id",Sounds[0].id);
	
	audio = document.getElementById(Sounds[0].id);
	
	audio.addEventListener("ended", function(){
		if(Game.level != 0)
			$("#restart").trigger("click"); 
	});
}

/**
 * Loads the menu level
 * */ 
function draw_menu_background() {
	Game.level = 0;
	
	load_lvlMenu();
	
	drawing_menu_loop();
}

/**
 * Loads all songs
 * */
function load_musics() {
	var i=0;
	
	var audio = $("<audio loop>Your browser does not support audio files</audio>");
	var source = $("<source src='"+Musics[i].src+"' type='audio/mpeg'>");
	audio.append(source);
	$("#music").append(audio);
		
	audio.attr("id",Musics[i].id);
		
	for(i = 1; i<Musics.length;i++)
	{
		var audio = $("<audio>You browser does not support audio files</audio>");
		var source = $("<source src='"+Musics[i].src+"' type='audio/mpeg'>");
		audio.append(source);
		$("#music").append(audio);
		
		audio.attr("id",Musics[i].id);
	}
}

/**
 * Tries to anticipate the moves to apply in order to pass the menu level
 *  (working but horrible)
 * */
function drawing_menu_loop() { 
	/* Drawing the background */
	Game.background.draw();
	/* Drawing each module in the Module Array, and making them moving */
	for(var i=Game.moduleArray.length-1; i>=0; i--) {
		Game.moduleArray[i].draw();
	}
	
	/* Drawing the main square only if it is not dead */
	if(!Game.mobile.isDead) {
		Game.mobile.draw();	
		/* searching for a module ahead at a 3 square distance (distance to land on a SQUARE) */
		for(var i=0;i<Game.moduleArray.length-1;i++) {
			/* don't want the MainSquare to jump on the last SQUARE */
			if(Game.moduleArray[i].y <= Measures.lineHeightCoef * Canvas.height - 5*Measures.halfSquareHeight) 
				break;
			
			/* if it's not a SQUARE  */
			if(Game.moduleArray[i].type != SQUARE)
				continue;	
			
			/* if it's a SQUARE we look if he is 3  SQUARE distant ahead  */
			if(((Game.mobile.x + 8*Measures.halfSquareHeight) >= Game.moduleArray[i].x) 
				&& (Game.mobile.x - Measures.halfSquareHeight <= Game.moduleArray[i].x)) {
				if(Game.moduleArray[i].y <= (Measures.initialPos+Game.mobile.currentLine*2*Measures.halfSquareHeight)) {
					/* making MainSquare jump */
					Game.mobile.onJump = true;
					Game.mobile.onContact = false;
					break;
				}
			}
		}
	}
		
	
	/* Calling the function as a loop to make an animation */
	Game.id=window.requestAnimationFrame(drawing_menu_loop);
}

/**
 *  Restores settings at their initialisation values 
 * */
function reset_MainSquare_pos() {								
							
	Game.mobile.x = Math.floor(2*Measures.lineWidthCoef * Canvas.width);
	Game.mobile.y = Measures.initialPos;
	Game.mobile.position=0;
	Game.mobile.angle=false;
	Game.mobile.isDead=0;
	Game.mobile.currentLine=0;
	Game.mobile.onJump=false;
	Game.mobile.justLanded=false;
	Game.mobile.onContact=true;	
}

/**
 * Stops the jumping when key pressed 
 * */
function stop_keydown() {
	$("body").unbind("keydown");
}


