# Whirlybird  
Whirlybird is browser game inspired by the flash game Helicopter.
- Uses HTML5 Canvas to provide high-performance graphics
- Helicopter animation visually enhances gameplay

![start-menu]

![gameplay]

[start-menu]: ./public/images/start-menu.png
[gameplay]: ./public/images/gameplay.png


## Play Whirlybird
  [Live Link][whirlybird]

## Technical
  Whirlybird was created with HTML5's Canvas API. Instead of representing each item in the game window as an individual DOM element, Canvas (which is represented on the DOM with a single element) is used to 'draw' the objects by coloring individual pictures.

### Gameplay
  Every 20 milliseconds, every object on the Canvas (walls, blocks, the helicopter, and background image) is drawn. Between each drawing, those objects that are intended to move are updated and assigned new positions. This rapid moving/redrawing process makes it appear that the objects are moving fluidly across the screen.

### Walls, blocks and the illusion of motion
  Walls are created by smaller wall slices, which have a width of 5 pixels. Wall slices are created by first dividing the game Canvas element's width (pixels) by 5 to determine how many slices are needed. Then, the appropriate number of slices are drawn both on the top and the bottom of the screen to create each wall. An 'offset' is used to change where the tops of the walls start so they don't appear in a straight line across the screen.

  Blocks, which have a width of 20 pixels appear much less frequently and are evenly spaced; they are designed to appear between the top and bottom walls.

  Throughout gameplay, the left-right (or "X") positions of the walls and blocks are decreased by 5 pixels per frame, moving them from right to left as time progresses. Since the background and helicopter stay in the same position, the wall and block movement makes it appear as if the helicopter is moving from left to right.

  For both walls and blocks, when their X positions decrease to 0, that position is updated to the width of the game Canvas -- this makes them "wrap" around the edge of the screen and regenerate on the right side. The up-down (or "Y") position is based on the Y position of the wall/block to the immediate left of them on the screen.

### Helicopter movement and animation
  The helicopter's X position never changes, but it's Y position decreases every time the screen is drawn to make the helicopter 'drop'.

  Animation for the blades of the helicopter are created by cycling through multiple, slightly different images of the helicopter and drawing a new image (frame) every time. This is similar to how other objects are drawn, except the image itself is actually changed as time passes. A separate Sprite class is used to cycle through the helicopter images and determine which frame should be drawn.

  ![copter]

  [copter]: ./public/images/heli_3.png

### Game control
  To prevent the helicopter from dropping into the bottom wall or blocks, the user must click and hold the mouse, which causes the helicopter to lift. Releasing the mouse causes the helicopter to start dropping again. A fine balance of helicopter lift and descent is required to navigate the walls and blocks.

### Explosion animation
  When a collision is detected between the helicopter and either a wall or a block, 3 separate explosion animations are created around the position of the helicopter. Again, the Sprite class is used here to iterate through specific frames and re-draw the elements on the screen every 20 milliseconds. The explosion has 15 frames, as opposed to the helicopter's 4.

  ![explosion]

  [explosion]: ./public/images/explosion.png

## Enhancements
- [ ] Create custom helicopter/ animation
- [ ] Dynamically reduce spacing between top and bottom walls
- [ ] Improve Start menu
- [ ] Add sound
- [ ] Make the background 'move'

[whirlybird]: http://whirlybird.tylerackerson.com
