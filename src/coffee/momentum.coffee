

class MomentumGame
    constructor: (@canvas) ->
        # init attributes
        @ctx = @canvas[0].getContext("2d")
        @width = @canvas.attr("width")
        @height = @canvas.attr("height")

        @state = new Box2dTestGamestate(@canvas, @ctx, @width, @height)

        # init event handling
        canvas.mouseup(=>
            @state.mousedown(false)
        )
        canvas.mousedown(=>
            @state.mousedown(true)
        )
        canvas.mousemove((e) =>
            @state.mousemove(e.offsetX, e.offsetY)
        )

    run: ->
        window.webkitRequestAnimationFrame(=>
            @run()
        , @canvas[0]
        )
        
        @state.update()
        @state.draw()

        #setTimeout(=>
        #    @run()
        #, 40)



window.MomentumGame = MomentumGame
