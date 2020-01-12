# Piggy Project


## Team member with UID: 

Yuxin Wang(905129084), Qingyuan Pan(405101723)


## Description:

Our project is a game that let a pig to jump by using the mouse to control the distance of jump. The user need to press 'b' to start the game. And the user can change the environment in the game by pressing 'u'(spring), 'i'(summer), 'o'(fall) and 'p'(winter). The backgroud environment is a big skybox. Each season has the different background, different condition of the sea, etc. 


![Spring](/readme_image/spring.png)
In spring the sea is calm and clear, and there are water lilies grwon on the surface of the sea. 

![Summer](/readme_image/summer.png)
In summer we created a summer night with breeze causing smooth waves, and reflecting of the sky on the surface of the water. And there are some fireflies flying around the big. 

![Fall](/readme_image/fall.png)
It is usually rainy in fall so there will be raindrops and ripples on our water surface. Notice that each ripple will move up and down on their own undulation speed.

![Winter](/readme_image/winter.png)
In winter the user could see snows dropping on the choppy water.

The way to play the game is that the user need to control the distance of jump, so that the piggy can successfully jump to the next stone. If the distance to jump is too long or too short or not jumping in time, the piggy will drop into the water, causing a splash on the position of the drop, and the game will end 5 seconds atfer the drop. Then the screen will show the score and the user can play again by pressing 'b' again. We simulated the ripple after the pig fell into the water, in spring and fall where the sea is calm. 

![Splash](/readme_image/ripple.png)
![Splash](/readme_image/ripple2.png)
screenshot for the animation of dropping into the water

During creation of this project, we utilized our knowlendge from the class to build or load custom shapes and shaders. Also we built own basic physical engine, and did collision detection using physics and math knowledge. 

## Features:
Collision detection, Physical based simulations, Water simulation.

## Each team member's contribution:

This is a team project that requires good collaboration between team members. We discussed and coded the project together so it is hard to draw a line of "who did what". Roughly the work may be divided into:

### Qingyuan Pan:
I modeled the pig and the stands by using different kind of shapes defined in the dependencies.js. I also loaded the water lily obj file and use it to draw water lilies.

I built the physical engine based on simple Newton's theory of gravity and apply it to the pig. And did the collision detection to decide whether the pig lands on the next stone or drop into the sea.

I simulated the splash based on the Newton's theory of gravity, the water drips to random direction an fall due to gravity. 

### Yuxin Wang:
I created two shapes to simulate water surface with waves and water drip when collide with object. Both shapes are created using similar method, I calculated their 3D surface equation and normals at each point, them draw each point with proper x, y, z coordinates and normals, last connect the points as small triangles. 

I simulated the rain and snow particles, giving each single particle a random starting position and let it drop in slightly different speeds.

I simulated the firefly using a firefly shader extended from the funny shader. For each texture coordinate, calculate its distance from the center, and give it different colors and brightness based on the distance, finally let brightness change as a sin function of time.

I drew the skybox using six squares. Move each square to proper location and change the normals at each vertex from perpendicular to the surface to shooting out from center of the skybox. Finally apply proper image to each side of the box.




## Source Cited:
Shape_From_File class refers to previous projects:
http://web.cs.ucla.edu/~dt/courses/CS174A/animations/assignment2-best-17f/

Pictures ,audios and OBJ models are free resources on the Internet:
http://seamless-pixels.blogspot.com/2012/09/free-seamless-marble-textures.html
https://www.cnet.com/news/hubble-reveals-soul-wrenching-view-of-the-distant-universe/
http://www.custommapmakers.org/skyboxes.php
https://www.roblox.com/users/163228573/profile
http://soundbible.com/tags-splash.html
http://bbs.52mole.net/thread-756-1-1.html
https://free3d.com/3d-models/lotus

