//Jump pad

function Jump(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.jump1;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.8;
};

Jump.prototype = new Entity();

Jump.prototype.cx = 180;
Jump.prototype.cy = 200;
Jump.prototype.currentIMG = 0;
Jump.prototype.time = 0;
Jump.prototype._scale = 1;


Jump.prototype.update = function () {
    // Change current image at certain interval    
    if (this.time % 10 === 0) {
        if (this.currentIMG < 3) {
            this.currentIMG++;
        } else {
            this.currentIMG = 0;
        }
    }
    this.time++;
};

Jump.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
};