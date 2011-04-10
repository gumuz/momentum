(function() {
  var Box2dTestGamestate, Cell, FULL_CIRCLE, GameState, MenuGameState, MomentumGame, Vector, VectorTestGamestate, b2Body, b2BodyDef, b2CircleShape, b2DebugDraw, b2FixtureDef, b2Vec2, b2World;
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
  MenuGameState = (function() {
    function MenuGameState() {
      MenuGameState.__super__.constructor.apply(this, arguments);
    }
    __extends(MenuGameState, GameState);
    MenuGameState.prototype.init = function() {
      return this.menu_items = ["play", "about"];
    };
    MenuGameState.prototype.update = function() {};
    MenuGameState.prototype.draw = function() {
      var i, _ref;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.save();
      this.ctx.font = "20pt Arial";
      this.ctx.fillStyle = "black";
      this.ctx.translate(this.width / 4, 100);
      for (i = 0, _ref = this.menu_items.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.ctx.fillText(this.menu_items[i], 10, i * 50);
      }
      return this.ctx.restore();
    };
    return MenuGameState;
  })();
  FULL_CIRCLE = Math.PI * 2;
  Vector = (function() {
    function Vector(x, y) {
      this.x = x;
      this.y = y;
    }
    Vector.prototype.length = function() {
      var length;
      length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
      if (length === NaN) {
        return 0;
      } else {
        return length;
      }
    };
    Vector.prototype.normalized = function() {
      var length, nx, ny;
      length = this.length();
      if (length === 0) {
        return new Vector(0, 0);
      }
      nx = this.x / length;
      ny = this.y / length;
      return new Vector(nx, ny);
    };
    Vector.prototype.inverted = function() {
      return new Vector(-this.x, -this.y);
    };
    return Vector;
  })();
  Cell = (function() {
    function Cell(x, y, mass) {
      this.x = x;
      this.y = y;
      this.mass = mass;
      this.vector = new Vector(0, 0);
    }
    Cell.prototype.update = function() {
      this.x += this.vector.x * 0.1;
      return this.y += this.vector.y * 0.1;
    };
    Cell.prototype.move = function(vector) {
      this.vector.x += vector.x * .1;
      return this.vector.y += vector.y * .1;
    };
    return Cell;
  })();
  VectorTestGamestate = (function() {
    function VectorTestGamestate() {
      VectorTestGamestate.__super__.constructor.apply(this, arguments);
    }
    __extends(VectorTestGamestate, GameState);
    VectorTestGamestate.prototype.init = function() {
      this.cell = new Cell(100, 100, 2500);
      return this.others = [new Cell(10, 10, 1500), new Cell(10, 200, 1500), new Cell(300, 100, 1500)];
    };
    VectorTestGamestate.prototype.update = function() {
      var mousex, mousey, _ref;
      if (this.ismousedown) {
        _ref = this.mousepos, mousex = _ref[0], mousey = _ref[1];
        this.cell.move((new Vector(this.cell.x - mousex, this.cell.y - mousey)).normalized());
      }
      return this.cell.update();
    };
    VectorTestGamestate.prototype.draw = function() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.save();
      this.ctx.translate(this.cell.x, this.cell.y);
      this.ctx.beginPath();
      this.ctx.fillStyle = "blue";
      this.ctx.arc(0, 0, Math.sqrt(this.cell.mass / Math.PI), 0, FULL_CIRCLE, true);
      this.ctx.closePath();
      this.ctx.fill();
      return this.ctx.restore();
    };
    return VectorTestGamestate;
  })();
  FULL_CIRCLE = Math.PI * 2;
  b2World = Box2D.Dynamics.b2World;
  b2Vec2 = Box2D.Common.Math.b2Vec2;
  b2BodyDef = Box2D.Dynamics.b2BodyDef;
  b2Body = Box2D.Dynamics.b2Body;
  b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
  b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
  b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
  Box2dTestGamestate = (function() {
    function Box2dTestGamestate() {
      Box2dTestGamestate.__super__.constructor.apply(this, arguments);
    }
    __extends(Box2dTestGamestate, GameState);
    Box2dTestGamestate.prototype.init = function() {
      var bodyDef, debugDraw, fixDef;
      this.world = new b2World(new b2Vec2(0, 0), false);
      fixDef = new b2FixtureDef;
      fixDef.density = 1.0;
      fixDef.friction = 0.5;
      fixDef.restitution = 0.2;
      bodyDef = new b2BodyDef;
      bodyDef.type = b2Body.b2_dynamicBody;
      fixDef.shape = new b2CircleShape(2);
      bodyDef.position.x = 100;
      bodyDef.position.y = 100;
      this.body = this.world.CreateBody(bodyDef);
      this.fixture = this.body.CreateFixture(fixDef);
      debugDraw = new b2DebugDraw();
      debugDraw.SetSprite(this.ctx);
      debugDraw.SetDrawScale(30.0);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      return this.world.SetDebugDraw(debugDraw);
    };
    Box2dTestGamestate.prototype.update = function() {
      var ballx, bally, mousex, mousey, _ref, _ref2;
      if (this.ismousedown) {
        _ref = this.mousepos, mousex = _ref[0], mousey = _ref[1];
        _ref2 = [this.body.GetPosition().x, this.body.GetPosition().y], ballx = _ref2[0], bally = _ref2[1];
        this.body.ApplyForce(new b2Vec2(ballx - mousex, bally - mousey), this.body.GetPosition());
        console.log(this.body);
      }
      this.world.Step(1 / 60, 10, 10);
      return this.world.ClearForces();
    };
    Box2dTestGamestate.prototype.draw = function() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.save();
      this.ctx.translate(this.body.GetPosition().x, this.body.GetPosition().y);
      this.ctx.beginPath();
      this.ctx.fillStyle = "blue";
      this.ctx.arc(0, 0, 20, 0, FULL_CIRCLE, true);
      this.ctx.closePath();
      this.ctx.fill();
      return this.ctx.restore();
    };
    return Box2dTestGamestate;
  })();
  MomentumGame = (function() {
    function MomentumGame(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas[0].getContext("2d");
      this.width = this.canvas.attr("width");
      this.height = this.canvas.attr("height");
      this.state = new Box2dTestGamestate(this.canvas, this.ctx, this.width, this.height);
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
