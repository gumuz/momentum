
FULL_CIRCLE = Math.PI*2

class Vector
    constructor: (@x, @y) ->
    length: ->
        length = Math.sqrt(Math.pow(@x, 2)+Math.pow(@y, 2))
        if length is NaN
            return 0
        else
            return length
    normalized: ->
        length = @length()
        if length == 0
            return new Vector(0, 0)
        nx = @x / length
        ny = @y / length
        return new Vector(nx, ny)
    inverted: ->
        return new Vector(-@x, -@y)

class Cell
    constructor: (@x, @y, @mass)->
        @vector = new Vector(0, 0)
    update: ->
        @x += @vector.x * 0.1
        @y += @vector.y * 0.1
        
    move: (vector) ->
            @vector.x += vector.x * .1
            @vector.y += vector.y * .1

class VectorTestGamestate extends GameState
    init: ->
        @cell = new Cell(100, 100, 2500)
        @others = [
            new Cell(10, 10, 1500),
            new Cell(10, 200, 1500),
            new Cell(300, 100, 1500)
            
        ]
    update: ->
        if @ismousedown
            [mousex, mousey] = @mousepos
            @cell.move((new Vector(@cell.x-mousex, @cell.y-mousey)).normalized())
            
        @cell.update()
    draw: ->
        @ctx.clearRect(0, 0, @width, @height)
        
        @ctx.save()
        @ctx.translate(@cell.x, @cell.y)
        
        @ctx.beginPath();
        @ctx.fillStyle = "blue"
        @ctx.arc(0, 0, Math.sqrt(@cell.mass / Math.PI), 0, FULL_CIRCLE, true);
        @ctx.closePath();
        @ctx.fill();
        
        @ctx.restore()
