class GameState
    constructor: (@canvas, @ctx, @width, @height) ->
        @ismousedown = false
        
        @init()
    init: ->
        console.error("init method not implemented")
    mousedown: (mousedown) ->
        @ismousedown = mousedown
    mousemove: (x, y) ->
        @mousepos = [x, y]
    update: ->
        console.error("update method not implemented")
    draw: ->
        console.error("draw method not implemented")
