/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids".


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/

var entityManager = {

// "PRIVATE" DATA

_blocks   : [],
_lemmings : [],
_entities : [],
_doors    : [],
mouseX    : 0,
mouseY    : 0,
jumpsLeft : 0,
rightLeft : 0,
leftLeft  : 0,
blocksLeft: 0,
isChosen  : false,
grid      : Object,
// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._doors,this._lemmings,this._entities];
},

generateLemming : function(descr) {
    this._lemmings.push(new lemming(descr));
},

generateFire :  function(descr) {
    this._entities.push(new Fire(descr)); 
},

generateWater :  function(descr) {
    this._entities.push(new Water(descr)); 
},

generateDoor  : function(descr) {
    this._doors.push(new Door(descr));
},

generateGun : function(descr){
    this._entities.push(new Gun(descr));
},

generateJump   : function(descr){
    this._entities.push(new Jump(descr));
},

generateSmallJump   : function(descr){
    this._entities.push(new SmallJump(descr));
},

generateLeftJump : function(descr) {
    this._entities.push(new SideJump(descr));
},

generateRightJump : function(descr) {
    this._entities.push(new RightJump(descr));
},

changeMouse : function(x,y){
    this.mouseX = x;
    this.mouseY = y;
},

changeChoice : function(type){
    this.choice = type;
    this.grid.changeChoice(type);
    if(type !== 0){
        this.isChosen = true;
    } else {
        this.isChosen = false;
    }
},

clearCatagories: function() {
    this._doors = [];
    this._entities = [];
},

init: function(level) {
    console.log("init");
    this.clearCatagories();
    this.generateGrid();

    if (level === 1) {
        this.grid.level1();
    } else if (level === 2) {
        this.grid.level2();
    } else if (level === 3) {
        this.grid.level3();
    }
    
},

generateGrid: function(){
    this.grid = new Grid();
    this.grid.createGrid();
},



render: function(ctx) {

    this.grid.render(ctx);

    for (var i = 0; i < this._lemmings.length; i++) {
        this._lemmings[i].render(ctx);
    }
    for (var i = 0; i < this._doors.length; i++) {
        this._doors[i].render(ctx);
    }
    for (var i = 0; i < this._entities.length; i++) {
        this._entities[i].render(ctx);
    }

/*     for (var c = 0; c < this._categories.length; ++c) {
        var aCategory = this._categories[c];
        for (var i = 0; i < aCategory.length; ++i) {
            aCategory[i].render(ctx);
        }
    } */

    if(this.isChosen){
        ctx.globalAlpha = 0.65;
        try{
        var i = this.grid.findCurrentBlock(this.mouseX,this.mouseY);
        if(this.choice === 1 && this.blocksLeft !== 0){
            ctx.drawImage(this.grid.blockIMG,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
        } else if(this.choice === 2 && this.jumpsLeft !== 0){
            ctx.drawImage(g_images.jump1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
        } else if(this.choice === 3 && this.leftLeft !== 0){
            ctx.drawImage(g_images.side1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
        } else if(this.choice === 4&& this.rightLeft !== 0){
            ctx.drawImage(g_images.right1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
        } else if(this.choice === 5){
            ctx.drawImage(g_images.gun,this.grid.position[i.y][i.x].cx-11,this.grid.position[i.y][i.x].cy-11,25,25);
        } else if(this.choice === 6){
            ctx.drawImage(g_images.smalljump1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
        }
    } catch(undefined){
            
    }
        ctx.globalAlpha = 1;
    }
    
},

updateStats : function(){
    var level = document.getElementById("level");
    level.innerHTML = "Level: 1";
    var blocks = document.getElementById("blocks");
    blocks.innerHTML = "Blocks: " + this.blocksLeft;
    var jumps = document.getElementById("jumps");
    jumps.innerHTML = "Jumps: " + this.jumpsLeft;
    var right = document.getElementById("right");
    right.innerHTML = "Right Jumps: " + this.rightLeft;
    var left = document.getElementById("left");
    left.innerHTML ="Left Jumps: " + this.leftLeft;
},

update: function(du) {
    this.updateStats();
    this.grid.update();

    var i = 0;
    while (i < this._doors.length) {
        var status = this._doors[i].update(du);
        if (status === this.KILL_ME_NOW) {
            this._doors.splice(i,1);
        } else {
            ++i;
        }
    }
    i = 0;
    while (i < this._lemmings.length) {
        var status = this._lemmings[i].update(du);
        if (status === this.KILL_ME_NOW) {
            this._lemmings.splice(i,1);
        } else {
            ++i;
        }
    }
    i = 0;
    while (i < this._entities.length) {
        var status = this._entities[i].update(du);
        if (status === this.KILL_ME_NOW) {
            this._entities.splice(i,1);
        } else {
            ++i;
        }
    }

/*     for (var c = 0; c < this._categories.length; ++c) {
        var aCategory = this._categories[c];
        var i = 0;
        while (i < aCategory.length) {
            var status = aCategory[i].update(du);
            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    } */
}
}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();