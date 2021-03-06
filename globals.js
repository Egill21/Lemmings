// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_canvas2 = document.getElementById("myCanvas2");

var g_ctx = g_canvas.getContext("2d");
var g_ctx2 = g_canvas2.getContext("2d");

var g_gameSong;
var g_menuSong;

//To get the information on wich powerups are available in each level 
//before we start the level 

var g_levelINFO = [[4, 4, 4, 4, 4, 2], //lvl 1
                   [4, 4, 4, 4, 4, 0], //lvl 2
                   [2, 4, 4, 4, 4, 2], //ext..
                   [2, 4, 4, 4, 4, 1],
                   [1, 5, 0, 3, 3, 1],
                   [6, 6, 6, 3, 3, 0],
                   [2, 3, 6, 3, 3, 3],
                   [0, 4, 6, 0, 0, 0],
                   [4, 5, 1, 1, 1, 0],
                   [3, 4, 4, 2, 2, 1]];


// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;
