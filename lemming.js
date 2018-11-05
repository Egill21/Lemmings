// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function lemming(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.img0;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
};

lemming.prototype = new Entity();

lemming.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

lemming.prototype.KEY_THRUST = 'W'.charCodeAt(0);
lemming.prototype.KEY_RETRO  = 'S'.charCodeAt(0);
lemming.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
lemming.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

lemming.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
lemming.prototype.cx = 200;
lemming.prototype.cy = 200;
lemming.prototype.velX = 1;
lemming.prototype.isGoingRight = true;
lemming.prototype.numSubSteps = 1;

lemming.prototype.currentIMG = 0;
lemming.prototype.time = 0;
    
lemming.prototype.update = function (du) {
    
    // Change current image at certain interval    
    if (this.time % 10 === 0) {
        if (this.currentIMG < 3) {
            this.currentIMG++;
        } else {
            this.currentIMG = 0;
        }
    }
    this.time++;
    // Unregister and check for death
    spatialManager.unregister(this);

    // Check if entity is dead
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    // Move lemming to the right or left
    if (this.isGoingRight) {
        this.moveRight(du);
    } else {
        this.moveLeft(du);
    }

    // TODO: Reverse velocity if lemming is at canvas edge


    // Warp if isColliding, otherwise Register
    if (this.isColliding()) {
        //this.warp();
    } else {
        spatialManager.register(this);
    }

};
// Move lemming to the right
lemming.prototype.moveRight = function (du) {
    this.cx += this.velX * du;
};

// Move lemming to the left
lemming.prototype.moveLeft = function (du) {
    this.cx -= this.velX * du;
};

var NOMINAL_GRAVITY = 0.12;

lemming.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

var NOMINAL_THRUST = +0.2;
var NOMINAL_RETRO  = -0.1;

lemming.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

lemming.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
};