
FULL_CIRCLE = Math.PI*2

# box2 defs
b2World = Box2D.Dynamics.b2World

b2Vec2 = Box2D.Common.Math.b2Vec2

b2BodyDef = Box2D.Dynamics.b2BodyDef

b2Body = Box2D.Dynamics.b2Body

b2CircleShape = Box2D.Collision.Shapes.b2CircleShape

b2FixtureDef = Box2D.Dynamics.b2FixtureDef

b2DebugDraw = Box2D.Dynamics.b2DebugDraw


class Box2dTestGamestate extends GameState
    init: ->
        @world = new b2World(
            new b2Vec2(0, 0),
            false
        )

        fixDef = new b2FixtureDef
        fixDef.density = 1.0
        fixDef.friction = 0.5
        fixDef.restitution = 0.2
        bodyDef = new b2BodyDef

        bodyDef.type = b2Body.b2_dynamicBody
        fixDef.shape = new b2CircleShape(
            2
        )
        bodyDef.position.x = 100
        bodyDef.position.y = 100
        @body = @world.CreateBody(bodyDef)
        @fixture = @body.CreateFixture(fixDef)
        debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(@ctx);
        debugDraw.SetDrawScale(30.0)
        debugDraw.SetFillAlpha(0.3)
        debugDraw.SetLineThickness(1.0)
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit)
        @world.SetDebugDraw(debugDraw);


    

    update: ->
        if @ismousedown
            [mousex, mousey] = @mousepos
            [ballx, bally] = [@body.GetPosition().x, @body.GetPosition().y]
            @body.ApplyForce(
                new b2Vec2(ballx-mousex, bally-mousey),
                @body.GetPosition()
            )
        
            console.log(@body)
        @world.Step(1 / 60, 10, 10);
        @world.ClearForces()

    draw: ->
        #@world.DrawDebugData();
        @ctx.clearRect(0, 0, @width, @height)
        @ctx.save()
        
        @ctx.translate(@body.GetPosition().x, @body.GetPosition().y)

        @ctx.beginPath();
        @ctx.fillStyle = "blue"
        @ctx.arc(0, 0, 20, 0, FULL_CIRCLE, true);
        @ctx.closePath();
        @ctx.fill();

        @ctx.restore()
        
