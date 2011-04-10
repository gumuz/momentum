class Vector2
    constructor: (@a, @b) ->
    add: (v) ->
        return new Vector2(@a+v.a, @b+v.b)
    dot: (v) ->
        return @a*v.a + @b*v.b
    inv: ->
        return new Vector2(-@a, -@b)

class World
    constructor: () ->
        @walls = [
            # x/y/distance
            [1,0,1], # right
            [0,-1,1], # bottom
            [-1,0,1], # left
            [0,1,1] # top
        ]

        @bodies = [
            new Circle(
                new Vector2(.2, .1),
                new Vector2(.01, .01),
                .01)
        ]

    step: () ->
        # wall collision detection
        for body in @bodies
            for wall in @walls
                V = body.velocity
                N = new Vector2(wall[0], wall[1])
                distance = body.position.dot(N) + wall[2]


                if distance < body.radius
                    V.a = V.a - 2 * wall[0] * V.dot(N)
                    V.b = V.b - 2 * wall[1] * V.dot(N)

        for body_a in @bodies
            for body_b in @bodies
                1+1



        for body in @bodies
            body.position = body.position.add(body.velocity)



class Body
    constructor:  (@position, @velocity, @mass) ->
    

class Circle extends Body
    constructor:  (@position, @velocity, @mass) ->
        @radius = Math.sqrt(Math.PI*@mass)


class WorldGameState extends GameState
    init: ->
        @world = new World()
        @scale = Math.min(@height, @width)
    update: ->
        @world.step()
    draw: ->
        # clear screen
        @ctx.clearRect(0, 0, @width, @height)

        for body in @world.bodies
            x = (1+body.position.a) * (@scale/2)
            y = (1+body.position.b) * (@scale/2)
            r = (body.radius) * (@scale/2)

            #console.log([x,y])
            @ctx.beginPath()
            @ctx.arc(x, y, r, 0, Math.PI*2, true)
            @ctx.closePath()
            @ctx.fill()
