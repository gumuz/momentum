class MenuGameState extends GameState
    init: ->
        @menu_items = [
            "play",
            "about"
        ]
    update: ->
    draw: ->
        # clear screen
        @ctx.clearRect(0, 0, @width, @height)
        
        # draw menu options
        @ctx.save()
        @ctx.font = "20pt Arial";
        @ctx.fillStyle = "black"
        @ctx.translate(@width/4, 100)
        
        for i in [0...@menu_items.length]
            @ctx.fillText(@menu_items[i], 10, i*50)
        
        @ctx.restore()
