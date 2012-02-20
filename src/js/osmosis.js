(function() {
  var OsmosisGame, Player, degrees_to_radians, distance, in_rect;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  degrees_to_radians = function(degrees) {
    return degrees * (Math.PI / 180);
  };
  distance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };
  in_rect = function(x1, y1, x2, y2, width, height) {
    return ((x2 + width) > x1 && x1 > x2) && ((y2 + height) > y1 && y1 > y2);
  };
  Player = (function() {
    function Player(x, y, hv, vv, mass) {
      this.x = x;
      this.y = y;
      this.hv = hv;
      this.vv = vv;
      this.mass = mass;
    }
    Player.prototype.update = function() {
      this.x += this.hv;
      this.y += this.vv;
      if (this.hv > 1) {
        this.hv -= .01;
      }
      if (this.hv < -1) {
        this.hv += .01;
      }
      if (this.vv > 1) {
        this.vv -= .01;
      }
      if (this.vv < -1) {
        return this.vv += .01;
      }
    };
    return Player;
  })();
  OsmosisGame = (function() {
    function OsmosisGame(ctx, width, height) {
      var i;
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.cells = [];
      this.cells.push(new Player(250, 250, 2, 2, 30));
      for (i = 0; i <= 5; i++) {
        this.cells.push(new Player(Math.random() * this.width, Math.random() * this.height, Math.random() * 2, Math.random() * 2, Math.random() * 50));
      }
      this.is_mousedown = false;
      this.mousex = 0;
      this.mousey = 0;
    }
    OsmosisGame.prototype.mouseover = function(x, y) {
      this.mousex = x;
      return this.mousey = y;
    };
    OsmosisGame.prototype.mousedown = function() {
      return this.is_mousedown = true;
    };
    OsmosisGame.prototype.mouseup = function() {
      return this.is_mousedown = false;
    };
    OsmosisGame.prototype.run = function() {
      this.update();
      this.draw();
      return setTimeout(__bind(function() {
        return this.run();
      }, this), 40);
    };
    OsmosisGame.prototype.update = function() {
      var angle, cell, enemy, _i, _j, _len, _len2, _ref, _ref2, _results;
      if (this.is_mousedown && this.cells[0].mass > 5) {
        this.cells[0].mass -= .1;
        angle = (Math.abs(Math.atan2(this.mousey - this.cells[0].y, this.mousex - this.cells[0].x)) * (180 / Math.PI)) % 90;
        if (this.mousex > this.cells[0].x) {
          if (this.mousey > this.cells[0].y) {
            this.cells[0].hv -= (.1 / 90) * (90 - angle);
            this.cells[0].vv -= (.1 / 90) * angle;
          } else {
            this.cells[0].hv -= (.1 / 90) * (90 - angle);
            this.cells[0].vv += (.1 / 90) * angle;
          }
        } else {
          if (this.mousey > this.cells[0].y) {
            this.cells[0].hv += (.1 / 90) * angle;
            this.cells[0].vv -= (.1 / 90) * (90 - angle);
          } else {
            this.cells[0].hv += (.1 / 90) * angle;
            this.cells[0].vv += (.1 / 90) * (90 - angle);
          }
        }
      }
      _ref = this.cells;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        if ((cell.y - cell.mass) < 0 || (cell.y + cell.mass) > this.height) {
          cell.vv *= -1;
        }
        if ((cell.x - cell.mass) < 0 || (cell.x + cell.mass) > this.width) {
          cell.hv *= -1;
        }
        _ref2 = this.cells;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          enemy = _ref2[_j];
          if (cell !== enemy) {
            if (cell.mass <= 0 || enemy.mass <= 0) {
              continue;
            }
            if (distance(cell.x, cell.y, enemy.x, enemy.y) < (cell.mass + enemy.mass)) {
              if (cell.mass > enemy.mass) {
                cell.mass++;
                enemy.mass--;
              } else {
                cell.mass--;
                enemy.mass++;
              }
            }
          }
        }
        _results.push(cell.update());
      }
      return _results;
    };
    OsmosisGame.prototype.draw = function() {
      var cell, _i, _len, _ref, _results;
      this.ctx.clearRect(0, 0, this.width, this.height);
      if (this.is_mousedown) {
        this.ctx.moveTo(this.mousex, this.mousey);
        this.ctx.lineTo(this.cells[0].x, this.cells[0].y);
        this.ctx.stroke();
      }
      _ref = this.cells;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        if (cell.mass <= 0) {
          continue;
        }
        if (cell === this.cells[0]) {
          this.ctx.fillStyle = "#0000FF";
        } else {
          if (this.cells[0].mass > cell.mass) {
            this.ctx.fillStyle = "#00FF00";
          } else {
            this.ctx.fillStyle = "#FF0000";
          }
        }
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(cell.x, cell.y, cell.mass, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        _results.push(this.ctx.restore());
      }
      return _results;
    };
    return OsmosisGame;
  })();
  window.OsmosisGame = OsmosisGame;
}).call(this);
