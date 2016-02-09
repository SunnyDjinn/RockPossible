/** \file Storage.js file, contains functions related to storage */


/**
 * Asks for a loading
 * */
function ask_load_name() {
	create_formulary();
	init_load();
	
	/* Hiding other elements of the formulary */
	$("#inputName").hide();
	$("#nameLabel").hide();
	$("#load").hide();
	$("#skins").hide();
	$("#rock").hide();
	
	/* Showing wanted elements */
	$(".deleteSav").show();
	var form = $("#formulary");
	form.show();
	form.addClass('loading');
	form.removeClass('saving');
	
	
	var list = $("#nameList");
	list.show();

	$("#listLabel").show();
	
	var enter = $("#enter");
	enter.show();
	
	enter.click(function(event) {
		if(list.val() == "")
			return;
		$("#save").show();
		$("#skins").show();
		$("#normal").show();
		$("#rock").hide();
		$("#formulary").hide();
		$("#play").hide();
		$(".deleteSav").hide();
		enter.hide();
		load_game(list.val());
	});
}

/**
 * Actually loads a game
 * */
function load_game(name) {
	
	var champ = /(.*)\s\((\d)\)/g;
	var key = champ.exec(name);
	name = key[1] + "_" + key[2];
	
	var savedLevel = JSON.parse(localStorage["Impossible_"+name]);
	Game.level = savedLevel.level;
	Game.levelArrayCursor = savedLevel.cursor;
	Game.scoreCounter = savedLevel.scoreCounter;
	Game.score = savedLevel.score;
	$("#"+Musics[Game.level].id)[0].currentTime = savedLevel.musicTime;
	$("#"+Musics[Game.level].id)[0].play();
	Game.mobile.x = savedLevel.mobile_x;
	Game.mobile.y = savedLevel.mobile_y;
	Game.mobile.position = savedLevel.mobile_position;
	Game.mobile.onJump = savedLevel.mobile_onJump;
	Game.mobile.justLanded = savedLevel.mobile_justLanded;
	Game.mobile.onContact = savedLevel.mobile_onContact;
	Game.mobile.isDead = savedLevel.mobile_isDead;
	Game.mobile.currentLine = savedLevel.mobile_currentLine;
	Game.mobile.angle = savedLevel.mobile_angle;
	
		
	window.cancelAnimationFrame(Game.id);
	
	$("#large").hide();
	$("#level1").hide();
	$("#level2").hide();
	$("#skins").hide();
	$("#normal").hide();
	$("#rock").hide();
	$("#save").show();
	$("#pause").show();
	$("#restart").show();
	$("#menu").show();
	$("#"+Musics[0].id)[0].pause();
	play(Game.level, Game.levelArrayCursor);
}

/** 
 * Initializes loading list
 * */
function init_load() {
	
	/* Emptying the list */
	var list = $("#storage_list");
	list.empty();
	
	var key;
	var mod_key;
	var champ;
	var option;
	
	/* Updating the list */
	for(key in localStorage) {
		/* If the key is one of the game previously stored */
		if(key.substring(0, 11).search("Impossible_") != -1) {
			/* Finding the substring to dsplay n a proper format */
			mod_key = key.substring(11, key.length);
			champ = /(.*)_(\d)/g;
			mod_key = champ.exec(mod_key);
			mod_key = mod_key[1] + " ("+ mod_key[2] +")";
			/* Creating and appending an option in the datalist */
			option = $('<option>');
			option.attr('value', mod_key);
			list.append(option);
		}
	}
}

/**
 * Creates a formulary for saving a game
 * */
function create_formulary() {
		
	/* If it doesn't exist */
	if($("#formulary").length == 0) {
		var form = $("<form id='formulary' onsubmit='return false;'></form");
		$('#actions').append(form);

		var label = $("<label id='nameLabel' for='inputName'>Enter your saving name : </label>");
		form.append(label);
			
		var input = $("<input id='inputName' name='inputName' type='text' placeholder='Saving name...' required>");
		form.append(input);
		
		var listLabel = $("<label id='listLabel' for='nameList'>Chose the game you want to load in the following list : </label>");
		form.append(listLabel);
		
		var list = $("<input id='nameList' list='storage_list' type='text' placeholder='Chose a game here...'>");
		form.append(list);
		
		var storageList = $("<datalist id='storage_list'></datalist>");
		list.append(storageList);
	
	}
	
		/* If it does not exist */
	if($("#enter").length == 0) {
		var enter = $("<button id='enter'>Enter</button>");
		$('#actions').append(enter);
	}
	
		/* If it does not exist */
	if($("#deleteSaving").length == 0) {
		var deleteSaving = $("<button id='deleteSaving' class='deleteSav'>Delete this Saving</button>");
		$('#actions').append(deleteSaving);
		
		deleteSaving.click(function(event) {
			if($("#nameList").val() == "")
				return;
			var key = $("#nameList").val();
			var champ = /(.*)\s\((\d)\)/g;
			var modKey = champ.exec(key);
			if(modKey == null)
				return;
			key = "Impossible_"+modKey[1]+"_"+modKey[2];
			if(key.substring(0, 11).search("Impossible_") != -1 && key.search("Hall_Of_Fame") == -1)
				localStorage.removeItem(key);
			$("#nameList").val('');	
			init_load();
		});
	}
	
		/* If it does not exist */
	if($("#deleteAllSavings").length == 0) {
		var deleteAllSavings = $("<button id='deleteAllSavings' class='deleteSav'>Delete all Savings</button>");
		$('#actions').append(deleteAllSavings);
		
		deleteAllSavings.click(function(event) {
			if(confirm("Warning : you're about to delete all of the saved games. Do you you to continue ?") == true) {
				var key;
				for(key in localStorage) {
					if(key.substring(0, 11).search("Impossible_") != -1 && key.search("Hall_Of_Fame") == -1)
						localStorage.removeItem(key);
				}
			$("#nameList").val('');	
			init_load();
			}
		});
	}
}

/** 
 * Asks for the name of the saving
 * */
function ask_user_name() {
	
	stop_keydown();
	create_formulary();
	
	/* Hiding other elements of the formulary */
	$("#nameList").hide();
	$("#listLabel").hide();
	$(".deleteSav").hide();
	$(".deleteAllSav").hide();
	$("#menu").hide();
	$("#restart").hide();
	$("#pause").hide();
	$("#save").hide();
	
	/* Showing wanted elements */
	$("#inputName").show();
	$("#nameLabel").show();
	
	
	var form = $("#formulary");
	form.show();
	form.addClass('saving');
	form.removeClass('loading');
	
	var input = $("#inputName");
	
	var enter = $("#enter");
	enter.show();
	
	enter.click(function(event) {
		if(input.val() == "")
			return;
		if(Game.isPlaying == true)
			$("#pause").trigger("click");
		save_game(input.val());
		init_load();
		input.val('');
		form.hide();
		enter.hide();
		init_keydown();
		$("#menu").show();
		$("#restart").show();
		$("#pause").show();
		$("#save").show();
	});
}

/**
 * Saves a game in the local storage
 * */
function save_game(name) {
	var i = 0;
	while(localStorage["Impossible_"+name+"_"+i] != undefined)
		i++;
	
	var music = $("#"+Musics[Game.level].id)[0].currentTime;

	var savedLevel = {
		level : Game.level, 
		cursor : Game.levelArrayCursor, 
		score : Game.score,
		scoreCounter : Game.scoreCounter,
		musicTime : music,
		mobile_x : Game.mobile.x, 
		mobile_y : Game.mobile.y, 
		mobile_position : Game.mobile.position, 
		mobile_onJump : Game.mobile.onJump,
		mobile_justLanded : Game.mobile.justLanded,
		mobile_onContact : Game.mobile.onContact,
		mobile_isDead : Game.mobile.isDead,
		mobile_currentLine : Game.mobile.currentLine,
		mobile_angle : Game.mobile.angle,
	};
		
	localStorage["Impossible_" + name + "_" + i] = JSON.stringify(savedLevel);
}

/**
 * Sets the top score array
 * */
function set_top_scores() {
	
	/* If it does not exist */
	if($("#scoresArray").length == 0) {
		/* Creating a table in the HTML code */
		var array = $("<table id='scoresArray' frame='box' rules='all' cellspacing='30' cellpadding='5'></table>");
		$("#topScores").append(array);
		
		var reinit = $("<button id='reinitTopScores'>Reset Top Scores</button>");
		$("#topScores").append(reinit);
		
		reinit.click(function(event) {
			Game.topScores = [];
			set_top_scores();
		});
		
		set_player_name();
		set_saving_score_in_database();
	}
	
	var array = $("#scoresArray");
	array.empty();
	
	/* Creating the HTML table for top scores */
	var tr, td;
	var i;
	var object;
	var counter = 0;
	
	tr = $("<tr></tr>");
	array.append(tr);
	td = $("<th>Rank</th>");
	tr.append(td);
	td = $("<th>Name</th>");
	tr.append(td);
	td = $("<th>Level</th>");
	tr.append(td);
	td = $("<th>Score</th>");
	tr.append(td);
	

	/* creating if not existing yet */
	if(!Game.topScores)
		Game.topScores = new Array();
	
	/* Creating a HTML table with Hall of Fame elements */
	for(i = 0; i<Game.topScores.length; i++) {
		tr = $("<tr></tr>");
		array.append(tr);
		td = $("<td>"+(i+1)+"</td>");
		tr.append(td);
		td = $("<td>"+Game.topScores[i].name+"</td>");
		tr.append(td);
		td = $("<td>"+Game.topScores[i].level+"</td>");
		tr.append(td);
		td = $("<td>"+Game.topScores[i].score+"</td>");
		tr.append(td);
	}
	
	return Game.topScores;
}

/**
 * Sets the input for the player's name
 * */
function set_player_name() {
	
	var topScores = $("#topScores");
	
	/* Setting an input zone for players to write their name */
	if($("#playerNameInput").length == 0) {
		var label = $("<label id='playerNameLabel' for='playerName'>Enter your in game name : </label>");
		topScores.append(label);
			
		var input = $("<input id='inputPlayerName' name='playerName' type='text' placeholder='In Game Name...' required>");
		topScores.append(input);
		
		var enter = $("<button id='nameEnter'>Enter</button>");
		topScores.append(enter);
	}
	
	topScores.show();
	var input = $("#inputPlayerName");
	var enter = $("#nameEnter");
	
	enter.click(function(event) {
		if(input.val() == "")
			return;
		Game.playerName = input.val();
	});
}


function set_saving_score_in_database() {
	var topScores = $("#topScores");
		
	/* Setting the formulary to insert data in the database */
	if($("#SaveInDBForm").length == 0) {
					
		var button = $('<button id="SaveInDB">Submit High Scores To Database</button>');
		topScores.append(button);
	}
	
	var submit = $("#SaveInDB");
	submit.click(function(event) {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
			}
		};
		
		request.open("POST", "UpdateHallOfFame.php", true);
		request.setRequestHeader("Content-type", "application/json");
		request.send(JSON.stringify(Game.topScores));
	});
}

/**
 * Manages the top scores
 * */
function manage_hall_of_fame() {	
	var i = 0;
	var placeHere;
	
	/* If the array does not exist */
	if(Game.topScores == undefined) {
		Game.topScores = new Array();
	}
	
	/* If the actual score is greater than one in the top scores array */
	for(i=0; i<Game.topScores.length; i++) {
		if(Game.score > Game.topScores[i].score)
			break;
	}
	placeHere = i;
	
	/* Shifting each object in order to place the current one at the right emplacement */
	for(i=Game.topScores.length-1; i>=placeHere; i--) {
		Game.topScores[i+1] = Game.topScores[i];
	}
	
	/* Adding the new object tot the top scores array */
	var object = {name : Game.playerName, level : Game.level, score : Game.score};
	Game.topScores[placeHere] = object;
	
	/* If the top scores length is greater than the max length of the top scores array, deleting the las one */
	if(Game.topScores.length > Game.topScoresLength)
		Game.topScores.pop();
	
	set_top_scores();
}

/**
 * Retrieves the top scores from the database (only on load)
 * */
function retrieves_top_scores() {
	var request = new XMLHttpRequest();
	
	request.onload = function() {
		Game.topScores = [];
		Game.topScores = JSON.parse(this.responseText);
		set_top_scores();
	};
	
	request.open("get", "RetrieveHallOfFame.php", true);
	request.send();
}


