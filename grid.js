//Grid
function Grid(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Grid.prototype.halfWidth = 20;
Grid.prototype.halfHeight = 20;
Grid.prototype.blocks = [];
Grid.prototype.hardBlocks = [];


Grid.prototype.createGrid = function(width,height){
    for(var i = this.halfHeight; i < height; i+=this.halfHeight*2){
        for(var j = this.halfWidth; j < width; j+=this.halfWidth*2){
            this.blocks.push([i,j,0]);
        }
    }
};

Grid.prototype.level1 = function(){
    for(var i = 0;i< 10; i++){
        this.blocks[i][2] = 1;
    }    
    for(var i = 140;i< 150; i++){
        this.blocks[i][2] = 1;
    }
    for(var i = 0; i < 140; i +=10){
        this.blocks[i][2] = 1;
    }
    for(var i = 1; i < 31; i+=10){
        this.blocks[i][2] = 1;
    }
    for(var i = 33; i < 63; i+=10){
        this.blocks[i][2]=1;
    }
    for(var i = 64; i < 94; i+=10){
        this.blocks[i][2]=1;
    }
    for(var i = 96; i < 126; i+=10){
        this.blocks[i][2]=1;
    }
    for(var i = 137; i < 157; i+=10){
        this.blocks[i][2] = 1;
    }
    for(var i = 9; i < 150; i+=10){
        this.blocks[i][2] = 1;
    }
    this.makeFire(this.blocks[48][0],this.blocks[48][1],48);
    this.makeFire(this.blocks[108][0],this.blocks[108][1],108);
    this.getHard();
    
};
Grid.prototype.makeFire = function(x,y,index){
    this.blocks[index][2] = 2;
    entityManager.generateFire({
        cx  :   x,
        cy  :   y
    });
};

Grid.prototype.getHard = function() {
    for (var i = 0; i < this.blocks.length; i++) {
        if(this.blocks[i][2] === 1) {
            this.hardBlocks.push(this.blocks[i]);
        }
    }
};

Grid.prototype.render = function(ctx){
    var cob = new Image();
    var back = new Image();
    back.src = "/BackgroundImg/sprite_Background0.png";
    cob.src = "/BackgroundImg/background.png"
    for(var i = 0; i < this.blocks.length; i++){
        var Boi = this.blocks[i];
        if(Boi[2]===1){
            ctx.drawImage(cob,Boi[0]-20,Boi[1]-20,40,40);
        } else if(Boi[2] === 2){
            ctx.drawImage(back,Boi[0]-20,Boi[1]-20,40,40);
        } else {
            ctx.drawImage(back,Boi[0]-20,Boi[1]-20,40,40);
        }
    }
};

Grid.prototype.returnFireIndex = function(){
    var fires = [];
    for(var i = 0; i < this.blocks.length; i++){
        if(this.blocks[i][2] === 2){
            fires.push(i);
        }
    }
    return fires;
}


Grid.prototype.findNearestBlock = function(xPos, yPos){
    for(var i = 0; i < this.blocks.length; i++){
        var Boi = this.blocks[i];
        if(Boi[0] + this.halfWidth >= xPos 
            && Boi[0] - this.halfWidth <= xPos
            && Boi[1] + this.halfHeight >= yPos
            && Boi[1] - this.halfHeight <= yPos){
                return i;
        }
    }
};

/*
0 = y hnit
1 = x hnit

*/
// Returns -1 if lemming is not colliding with block
// Returns 0 if lemming is colliding with top of block
// Returns 1 if lemming is colliding with bottom of block
// Returns 2 if lemming is colliding with left side of block
// Returns 3 if lemming is colliding with right side of block
Grid.prototype.isColliding = function(xPos, yPos, radius, velX, velY) {
    var lemmingTop = yPos - radius,
        lemmingBottom = yPos + radius,
        lemmingLeft = xPos - radius,
        lemmingRight = xPos + radius;
        /*
    for (var i = 0; i < this.hardBlocks.length; i++) {
        var x = this.hardBlocks[i][1];
        var y = this.hardBlocks[i][0];

        var closestPointX, closestPointY;

        var blockTop = y - this.halfHeight;
        var blockBottom = y + this.halfHeight;
        var blockLeft = x - this.halfWidth;
        var blockRight = x + this.halfWidth;

        //Closest point on collision box
        var cX, cY;

        //Find closest x offset
        if( a.x < b.x )
    {
        cX = b.x;
    }
    else if( a.x > b.x + b.w )
    {
        cX = b.x + b.w;
    }
    else
    {
        cX = a.x;
    }

*/
     /*   
        if (velX > 0) {
            if (velY > 0) {
                // leftside
                // top
                if (lemmingRight >= blockLeft && yPos > blockTop && yPos < blockBottom) {
                    // collision on leftside of block
                    return 2;
                }
                if (lemmingBottom >= blockTop && xPos < blockRight && xPos > blockLeft) {
                    // collision on top of block
                    return 0;
                }
            } else if (velY < 0) {
                // leftside
                // bottom
                if (lemmingRight >= blockLeft && yPos > blockTop && yPos < blockBottom) {
                    // collision on leftside of block
                    return 2;
                }
                if (lemmingTop <= blockBottom && xPos < blockRight && xPos > blockLeft) {
                    // collision on bottom of block
                    return 1;
                }
            }
            // leftside
            if (lemmingRight >= blockLeft && yPos >= blockTop && yPos <= blockBottom) {
                // collision on leftside of block
                return 2;
            }
        } else if (velX < 0) {
            if (velY > 0) {
                // rightside
                // top
                if (lemmingLeft < blockRight && yPos < blockTop && yPos > blockBottom) {
                    // collision on rightside of block
                    return 3;
                }
                if (lemmingBottom >= blockTop && xPos < blockRight && xPos > blockLeft) {
                    // collision on top of block
                    return 0;
                }
            } else if (velY < 0) {
                // rightside
                // bottom
                if (lemmingLeft < blockRight && yPos < blockTop && yPos > blockBottom) {
                    // collision on rightside of block
                    return 3;
                }
                if (lemmingTop <= blockBottom && xPos < blockRight && xPos > blockLeft) {
                    // collision on bottom of block
                    return 1;
                }
            }
            // rightside
            if (lemmingLeft < blockRight && yPos < blockTop && yPos > blockBottom) {
                // collision on rightside of block
                return 3;
            }
        } else {
            // top
            // bottom
            if (lemmingBottom >= blockTop && xPos < blockRight && xPos > blockLeft) {
                // collision on top of block
                return 0;
            }
            if (lemmingTop <= blockBottom && xPos < blockRight && xPos > blockLeft) {
                // collistion on bottom of block
                return 1;
            }
        }
    }
       */
    return -1;
    
};

Grid.prototype.findAdBlocks = function(xPos,yPos, radius){
    if (yPos + radius + this.halfHeight > g_canvas.height ||
        yPos - radius - this.halfHeight < 0) {
            return -1;
        }
    var i = this.findNearestBlock(xPos,yPos);


    var blockID = [this.blocks[i][2],      // middle
                   this.blocks[i-1][2],    // top middle
                   this.blocks[i+1][2],      // bottom middle
                   this.blocks[i+10][2],    //right
                   this.blocks[i-10][2]];   //left   
    
    var blockPosY = [this.blocks[i][0],  
                     this.blocks[i-1][0], 
                     this.blocks[i+1][0]];

    var blockPosX = [this.blocks[i][1],  
                     this.blocks[i-1][1], 
                     this.blocks[i+1][1]];

    return {
        blocks : blockID,
        posX: blockPosY,
        posY: blockPosX,
        blockWidth: this.halfWidth
    }
}
