# utility functions
degrees_to_radians = (degrees) ->
    # convert degrees to radians
    degrees * (Math.PI/180)

distance = (x1, y1, x2, y2) ->
    # calculate euclidean distance between 2 points
    Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2))

in_rect = (x1,y1, x2, y2, width, height) ->
    # calculate if point(x1,y1) is in rect(x2, y2, width, height)
    (x2+width) > x1 > x2 and (y2+height) > y1 > y2

class Player
    constructor: (@x, @y, @hv, @vv, @mass) ->
        
    update: ->
        @x += @hv
        @y += @vv
        
        if @hv > 1
            @hv -= .01
        if @hv < -1
            @hv += .01
        if @vv > 1
            @vv -= .01
        if @vv < -1
            @vv += .01
        
class OsmosisGame
    constructor: (@ctx, @width, @height) ->
        @cells = [] 
        @cells.push((new Player(250, 250, 2, 2, 30)))
        
        for i in [0..5]
            @cells.push((new Player(
                Math.random() * @width,
                Math.random() * @height,
                Math.random() * 2,
                Math.random() * 2,
                Math.random() * 50
            )))
        
        @is_mousedown = false
        @mousex = 0
        @mousey = 0
        
    
    mouseover: (x, y) ->
        @mousex = x
        @mousey = y
    mousedown: ->
        @is_mousedown = true
        
    mouseup: ->
        @is_mousedown = false

    run: ->
        @update()
        @draw()

        setTimeout(=>
            @run()
        , 40)

    update: ->
        if @is_mousedown and @cells[0].mass > 5
            @cells[0].mass -= .1
            
            angle = (Math.abs(Math.atan2(@mousey-@cells[0].y, @mousex-@cells[0].x))* (180/Math.PI)) % 90
            
            if @mousex > @cells[0].x
                if @mousey > @cells[0].y
                    @cells[0].hv -= (.1/90) * (90-angle)
                    @cells[0].vv -= (.1/90) * angle
                else
                    @cells[0].hv -= (.1/90) * (90-angle)
                    @cells[0].vv += (.1/90) * angle
            else
                if @mousey > @cells[0].y
                    @cells[0].hv += (.1/90) * angle
                    @cells[0].vv -= (.1/90) * (90-angle)
                else
                    @cells[0].hv += (.1/90) * angle
                    @cells[0].vv += (.1/90) * (90-angle)
        
        for cell in @cells
            # wall detection
            if (cell.y-cell.mass) < 0 or (cell.y+cell.mass) > @height
                cell.vv *= -1
            if (cell.x-cell.mass) < 0 or (cell.x+cell.mass) > @width
                cell.hv *= -1
                
            # collission detection
            for enemy in @cells
                if cell isnt enemy
                    if cell.mass <= 0 or enemy.mass <= 0
                        continue
                    if distance(cell.x, cell.y, enemy.x, enemy.y) < (cell.mass+enemy.mass)
                        if cell.mass > enemy.mass
                            cell.mass++
                            enemy.mass--
                        else
                            cell.mass--
                            enemy.mass++
                            
            
            cell.update()
        
    draw: ->
        @ctx.clearRect(0, 0, @width, @height)
        
        if @is_mousedown
            @ctx.moveTo(@mousex, @mousey)
            @ctx.lineTo(@cells[0].x, @cells[0].y)
            @ctx.stroke()
            
        for cell in @cells
            if cell.mass <= 0
                continue
            if cell is @cells[0]
                @ctx.fillStyle = "#0000FF"
            else
                if @cells[0].mass > cell.mass
                    @ctx.fillStyle = "#00FF00"
                else
                    @ctx.fillStyle = "#FF0000"
        
            @ctx.save()
            @ctx.beginPath();
            @ctx.arc(cell.x, cell.y, cell.mass, 0, Math.PI*2, true);
            @ctx.closePath();
            @ctx.fill();
            @ctx.restore()


# export objects
window.OsmosisGame = OsmosisGame
