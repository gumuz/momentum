(function() {
  var Body, Circle, GameState, MomentumGame, Vector2, World, WorldGameState;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  GameState = (function() {
    function GameState(canvas, ctx, width, height) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.ismousedown = false;
      this.init();
    }
    GameState.prototype.init = function() {
      return console.error("init method not implemented");
    };
    GameState.prototype.mousedown = function(mousedown) {
      return this.ismousedown = mousedown;
    };
    GameState.prototype.mousemove = function(x, y) {
      return this.mousepos = [x, y];
    };
    GameState.prototype.update = function() {
      return console.error("update method not implemented");
    };
    GameState.prototype.draw = function() {
      return console.error("draw method not implemented");
    };
    return GameState;
  })();
  Vector2 = (function() {
    function Vector2(a, b) {
      this.a = a;
      this.b = b;
    }
    Vector2.prototype.add = function(v) {
      return new Vector2(this.a + v.a, this.b + v.b);
    };
    Vector2.prototype.dot = function(v) {
      return this.a * v.a + this.b * v.b;
    };
    Vector2.prototype.inv = function() {
      return new Vector2(-this.a, -this.b);
    };
    return Vector2;
  })();
  World = (function() {
    function World() {
      this.walls = [[1, 0, 1], [0, -1, 1], [-1, 0, 1], [0, 1, 1]];
      this.bodies = [new Circle(new Vector2(.2, .1), new Vector2(.01, .01), .01)];
    }
    World.prototype.step = function() {
      var N, V, body, body_a, body_b, distance, wall, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _ref5, _results;
      _ref = this.bodies;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        body = _ref[_i];
        _ref2 = this.walls;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          wall = _ref2[_j];
          V = body.velocity;
          N = new Vector2(wall[0], wall[1]);
          distance = body.position.dot(N) + wall[2];
          if (distance < body.radius) {
            V.a = V.a - 2 * wall[0] * V.dot(N);
            V.b = V.b - 2 * wall[1] * V.dot(N);
          }
        }
      }
      _ref3 = this.bodies;
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        body_a = _ref3[_k];
        _ref4 = this.bodies;
        for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
          body_b = _ref4[_l];
          1 + 1;
        }
      }
      _ref5 = this.bodies;
      _results = [];
      for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
        body = _ref5[_m];
        _results.push(body.position = body.position.add(body.velocity));
      }
      return _results;
    };
    return World;
  })();
  Body = (function() {
    function Body(position, velocity, mass) {
      this.position = position;
      this.velocity = velocity;
      this.mass = mass;
    }
    return Body;
  })();
  Circle = (function() {
    __extends(Circle, Body);
    function Circle(position, velocity, mass) {
      this.position = position;
      this.velocity = velocity;
      this.mass = mass;
      this.radius = Math.sqrt(Math.PI * this.mass);
    }
    return Circle;
  })();
  WorldGameState = (function() {
    function WorldGameState() {
      WorldGameState.__super__.constructor.apply(this, arguments);
    }
    __extends(WorldGameState, GameState);
    WorldGameState.prototype.init = function() {
      this.world = new World();
      return this.scale = Math.min(this.height, this.width);
    };
    WorldGameState.prototype.update = function() {
      return this.world.step();
    };
    WorldGameState.prototype.draw = function() {
      var body, r, x, y, _i, _len, _ref, _results;
      this.ctx.clearRect(0, 0, this.width, this.height);
      _ref = this.world.bodies;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        body = _ref[_i];
        x = (1 + body.position.a) * (this.scale / 2);
        y = (1 + body.position.b) * (this.scale / 2);
        r = body.radius * (this.scale / 2);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        _results.push(this.ctx.fill());
      }
      return _results;
    };
    return WorldGameState;
  })();
  MomentumGame = (function() {
    function MomentumGame(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas[0].getContext("2d");
      this.width = this.canvas.attr("width");
      this.height = this.canvas.attr("height");
      this.state = new WorldGameState(this.canvas, this.ctx, this.width, this.height);
      canvas.mouseup(__bind(function() {
        return this.state.mousedown(false);
      }, this));
      canvas.mousedown(__bind(function() {
        return this.state.mousedown(true);
      }, this));
      canvas.mousemove(__bind(function(e) {
        return this.state.mousemove(e.offsetX, e.offsetY);
      }, this));
    }
    MomentumGame.prototype.run = function() {
      window.webkitRequestAnimationFrame(__bind(function() {
        return this.run();
      }, this), this.canvas[0]);
      this.state.update();
      return this.state.draw();
    };
    return MomentumGame;
  })();
  window.MomentumGame = MomentumGame;
}).call(this);
