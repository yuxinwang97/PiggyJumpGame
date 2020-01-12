// Name: Yuxin Wang, Qingyuan Pan
// UID: 905129084, 405101723
window.Assignment_Four_Scene = window.classes.Assignment_Four_Scene =
class Assignment_Four_Scene extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   ) 
          context.register_scene_component( new Movement_Controls( context, control_box.parentElement.insertCell() ) ); 

        //context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 6,5,8 ), Vec.of( 3,0,0 ), Vec.of( 0,1,0 ) );
        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,0,1.3 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );

        const r = context.width/context.height;
        this.total_time = context.globals.graphics_state.animation_time/1000;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );
        
        this.camera = context.globals.graphics_state.camera_transform;

        //const sound = { drop: new Audio("splash.mp3"),}
        this.droping = new Audio("assets/splash.mp3");
        this.mole = new Audio("assets/mole.mp3");
        
        // TODO:  Create two cubes, including one with the default texture coordinates (from 0 to 1), and one with the modified
        //        texture coordinates as required for cube #2.  You can either do this by modifying the cube code or by modifying
        //        a cube instance's texture_coords after it is already created.
        const shapes = { box:   new Cube(),
                         axis:  new Axis_Arrows(),
                         title: new Square(),
                         //our project:
                         sphere: new Subdivision_Sphere(4),
                         cylinder: new Capped_Cylinder( 10, 50 ),
                         cone: new Closed_Cone(10,10),
                         stand: new Cube(),
                         square: new Rain_Surface(50),
                         triangle: new Triangle(),
                         torus: new Torus(45,45),
                         firefly: new Firefly(),

                         //sky
                         face: new Square_Map(200),//marker

                         //water
                         water: new Water(),
                         drip: new Drip(),

                         snow: new (Subdivision_Sphere.prototype.make_flat_shaded_version())(4),
                         text: new Text_Line(40),
                         lotus: new Shape_From_File( "assets/lotus.obj"),
                       };
        
        //shapes.water.texture_coords = shapes.stand.texture_coords.map(v => Vec.of(v[0] * 100, v[1] * 100));

        this.submit_shapes( context, shapes );

        // TODO:  Create the materials required to texture both cubes with the correct images and settings.
        //        Make each Material from the correct shader.  Phong_Shader will work initially, but when 
        //        you get to requirements 6 and 7 you will need different ones.
        this.materials =
          { phong: context.get_instance( Phong_Shader ).material( Color.of( 1,0.82,0.80,1 ), {ambient: 0.5, diffusivity: 1, specularity : 0,}),
            
            //all pig stuff
            pig: context.get_instance( Phong_Shader ).material( Color.of( 1,190/255,190/255,1 ), { ambient: 0.5}),
            nose: context.get_instance( Phong_Shader ).material( Color.of( 1,160/255,160/255,1 ), { ambient: 0.5}),
            nostril: context.get_instance( Phong_Shader ).material( Color.of( 0,0,0,1 ), { ambient: 0.5}),
            eye: context.get_instance( Phong_Shader ).material( Color.of( 0,0,0,1 ), { ambient: 0.5}),
            leg: context.get_instance( Phong_Shader ).material( Color.of( 1,160/255,160/255,1 ), { ambient: 0.5}),
            ear: context.get_instance( Phong_Shader ).material( Color.of( 1-0.3,160/255-0.3,160/255-0.3,1 ), { ambient: 0.5} ),

            stand: context.get_instance( Phong_Shader ).material( Color.of( 0,0,0,1 ), { ambient: 1, texture: context.get_instance("assets/marble.png",false) }),
            water: context.get_instance( Phong_Shader ).material(Color.of(0.143,0.251,0.427,1), { ambient: 1, diffusivity: 1, specularity : 1, } ),
            star_river: context.get_instance( Texture_Scroll_X ).material( Color.of( 0.08,0.05,0.2,1 ), { ambient: 0.3, texture: context.get_instance("assets/star_river.jpg",false) }),
            snow: context.get_instance( Phong_Shader ).material( Color.of( 0.85,0.85,0.85,1 ), { ambient: 1, diffusivity: 1, specularity: 0,} ),
            //new rain
            //rain: context.get_instance( Phong_Shader ).material(Color.of(0.2,0.3,0.4,1), { ambient: 1, diffusivity: 1, specularity : 1, } ),
            rain: context.get_instance( Phong_Shader ).material(Color.of(0.28, 0.30, 0.441,1), { ambient: 1, diffusivity: 1, specularity : 1, } ),
            lotus: context.get_instance( Phong_Shader ).material(Color.of(0,0,0,0), { ambient: 1, texture: context.get_instance("assets/pink.png",false) } ),
            spring_water: context.get_instance( Texture_Scroll_X ).material(Color.of(0.7,0.9,0.9,0.7), { ambient: 1, diffusivity: 1, specularity : 1, } ),
            title: context.get_instance( Phong_Shader ).material( Color.of( 0,0,0,1 ), { ambient: 1, texture: context.get_instance("assets/title.png",false) }),
            firefly: context.get_instance( Fly_Shader ).material( Color.of( 0,0,0,0 )),
            

            //skybox
            1: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/spring/sky_bottom.png", false ) } ),
            2: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/spring/sky_top.png", false ) } ),
            3: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/spring/sky_left.png", false ) } ),
            4: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/spring/sky_right.png", false ) } ),
            5: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/spring/sky_back.png", false ) } ),
            6: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/spring/sky_front.png", false ) } ),

            7: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/night/sky_bottom.png", false ) } ),
            8: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/night/sky_top.png", false ) } ),
            9: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/night/sky_left.png", false ) } ),
            10: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/night/sky_right.png", false ) } ),
            11: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/night/sky_back.png", false ) } ),
            12: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/night/sky_front.png", false ) } ),

            13: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/raining/sky_bottom.png", false ) } ),
            14: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/raining/sky_top.png", false ) } ),
            15: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/raining/sky_left.png", false ) } ),
            16: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/raining/sky_right.png", false ) } ),
            17: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/raining/sky_back.png", false ) } ),
            18: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/raining/sky_front.png", false ) } ),

            19: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/snow/sky_bottom.png", false ) } ),
            20: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/snow/sky_top.png", false ) } ),
            21: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/snow/sky_left.png", false ) } ),
            22: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/snow/sky_right.png", false ) } ),
            23: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/snow/sky_back.png", false ) } ),
            24: context.get_instance(Phong_Shader).material( Color.of(0,0,0,1), { ambient: 1, texture: context.get_instance( "assets/snow/sky_front.png", false ) } ),





            text: context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {ambient: 1, diffusivity: 0, specularity: 0, texture: context.get_instance( "assets/text.png", false )})

          }

        //this.lights = [ new Light( Vec.of( 0,100,0,1 ), Color.of( 1,1,1,1 ), 10000000000 ) ];
        this.lights = [];

        //pig
        this.model_transform = Mat4.identity();
        //stand related
        this.direction = 0;
        this.pre_dir = this.direction;
        this.step = Math.random()*3+3;
        this.current = Mat4.identity().times(Mat4.translation([0,-1.1,0])).times(Mat4.scale([1,0.7,1]));
        this.next = this.current.times(Mat4.translation([this.step,0,0]));
        this.is_standing = this.current;
        
        //water related
        this.water_transform = this.current.times(Mat4.translation([-10,0,-10])).times(Mat4.scale([500,1,500]));
        this.splash = 0;
        this.splash_time = -100;
        this.drop_pos = Mat4.identity();

        this.snows = [];
        this.drips = [];
        this.rand = [];

        for (var i = 0; i < 400; i++){
          this.rand[i] = Math.random();
        }
        
        this.splash_play = 1;
        this.df = 0;

        //key related
        this.keyed = 0;
        this.key_down = 0;
        this.strength = 0;
        this.pig_state = 0;
        //normal          0
        //jumping         1
        //dead            2
        //direct_falling  3
        //under water     4

        this.season = 0;//TODO
        this.score = 0;
        this.now = context.globals.graphics_state.animation_time / 1000;
        this.keyup_time = 0;
        this.start_time = 0;

        this.next_time = 6;

        context.canvas.addEventListener('mousedown', (e) => {
            this.key_down = new Date();
        });
        context.canvas.addEventListener('mouseup', (e) => {
            this.strength = new Date();
            this.strength = this.strength - this.key_down;
            if (this.pig_state != 1)  this.keyed = 1;
        });
      
      }

      reload_everithing(){
        //pig
        this.model_transform = Mat4.identity();
        //stand related
        this.direction = 0;
        this.splash_play = 1;
        this.pre_dir = this.direction;
        this.step = Math.random()*3+3;
        this.current = Mat4.identity().times(Mat4.translation([0,-1.1,0])).times(Mat4.scale([1,0.7,1]));
        this.next = this.current.times(Mat4.translation([this.step,0,0]));
        this.is_standing = this.current;
        
        //water related
        this.water_transform = this.current.times(Mat4.translation([-10,0,-10])).times(Mat4.scale([500,1,500]));
        this.splash = 0;
        this.splash_time = -100;
        this.drop_pos = Mat4.identity();
        this.season = 1;

        this.score = 0;
        this.df = 0;

        //key related
        this.keyed = 0;
        this.key_down = 0;
        this.strength = 0;
        this.pig_state = 0;
        //normal          0
        //jumping         1
        //dead            2
        //direct_falling  3
        //under water     4
        this.start_time = this.total_time;
        this.keyup_time = 0;
        this.next_time = 6;

        this.camera =   Mat4.look_at( Vec.of( 6,5,8 ), Vec.of( 3,0,0 ), Vec.of( 0,1,0 ) );

    

      }
    
       
    make_control_panel()
      { 
        this.key_triggered_button( "Spring",       [ "u" ], () => {this.season = 1;});
        this.key_triggered_button( "Summer",       [ "i" ],() =>{this.season = 2;});
        this.key_triggered_button( "Fall",       [ "o" ], () =>{this.season = 3;});
        this.key_triggered_button( "Winter",       [ "p" ], () =>{this.season = 4;});
        this.key_triggered_button( "start",       [ "b" ], () => this.reload_everithing() );
        
      }





    draw_pig( graphics_state, model_transform )
      {
        ///////
        var pig_position;
        ///////

        if(this.pre_dir == 0 && this.direction == 1) 
        {
          model_transform = model_transform.times(Mat4.rotation(-Math.PI/2, Vec.of(0,1,0)));
          //this.pre_dir = this.direction;
        }
        else if(this.pre_dir == 1 && this.direction == 1) 
        {
          model_transform = model_transform.times(Mat4.rotation(-Math.PI/2, Vec.of(0,1,0)));
          //this.pre_dir = this.direction;
        }

        model_transform = model_transform.times(Mat4.scale([0.4,0.3,0.3]));
        this.shapes.sphere.draw( graphics_state, model_transform, this.materials.pig );
        pig_position = model_transform;
        //reverse
        model_transform = model_transform.times(Mat4.scale([1/0.4,1/0.3,1/0.3]));


        model_transform = model_transform.times(Mat4.translation([0.38,0,0]));
        model_transform = model_transform.times(Mat4.rotation(Math.PI/2, Vec.of(0,1,0)));
        model_transform = model_transform.times(Mat4.scale([0.15,0.1,0.1]));
        this.shapes.cylinder.draw(graphics_state, model_transform, this.materials.nose);
        model_transform = model_transform.times(Mat4.translation([0.5,0,0]));
        model_transform = model_transform.times(Mat4.scale([0.2,0.4,1.01]));
        this.shapes.cylinder.draw(graphics_state, model_transform, this.materials.nostril);
        model_transform = model_transform.times(Mat4.translation([-4.2,0,0]));
        this.shapes.cylinder.draw(graphics_state, model_transform, this.materials.nostril);
        //reverse
        model_transform = model_transform.times(Mat4.translation([4,0,0]));
        model_transform = model_transform.times(Mat4.scale([1/0.2,1/0.4,1/1.01])); 
        model_transform = model_transform.times(Mat4.translation([-0.5,0,0]));
        model_transform = model_transform.times(Mat4.scale([1/0.15,1/0.1,1/0.1]));
        model_transform = model_transform.times(Mat4.rotation(-Math.PI/2, Vec.of(0,1,0)));
        model_transform = model_transform.times(Mat4.translation([-0.38,0,0]));

        
        model_transform = model_transform.times(Mat4.translation([0.25,0.15,0.15]));
        model_transform = model_transform.times(Mat4.scale([0.05,0.05,0.05]));
        this.shapes.sphere.draw( graphics_state, model_transform, this.materials.eye);
        model_transform = model_transform.times(Mat4.translation([0,0,-6.3]));
        this.shapes.sphere.draw( graphics_state, model_transform, this.materials.eye);
        //reverse
        model_transform = model_transform.times(Mat4.translation([0,0,6]));
        model_transform = model_transform.times(Mat4.scale([1/0.05,1/0.05,1/0.05]));
        model_transform = model_transform.times(Mat4.translation([-0.25,-0.15,-0.15]));
        
        
        model_transform = model_transform.times(Mat4.translation([-0.15,-0.3,0.12]));
        model_transform = model_transform.times(Mat4.scale([0.07,0.1,0.07]));
        model_transform = model_transform.times(Mat4.rotation(Math.PI/2, Vec.of(1,0,0)));
        this.shapes.cone.draw( graphics_state, model_transform, this.materials.leg);
        model_transform = model_transform.times(Mat4.translation([0.25/0.07,0,0]));
        this.shapes.cone.draw( graphics_state, model_transform, this.materials.leg);
        model_transform = model_transform.times(Mat4.translation([0,-0.25/0.07,0]));
        this.shapes.cone.draw( graphics_state, model_transform, this.materials.leg);
        model_transform = model_transform.times(Mat4.translation([-0.25/0.07,0,0]));
        this.shapes.cone.draw( graphics_state, model_transform, this.materials.leg);
        //reverse
        model_transform = model_transform.times(Mat4.translation([0.25/0.07,0,0]));
        model_transform = model_transform.times(Mat4.translation([0,0.25/0.07,0]));
        model_transform = model_transform.times(Mat4.translation([-0.25/0.07,0,0]));
        model_transform = model_transform.times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0)));
        model_transform = model_transform.times(Mat4.scale([1/0.07,1/0.1,1/0.07]));
        model_transform = model_transform.times(Mat4.translation([0.15,0.3,-0.12]));


        model_transform = model_transform.times(Mat4.translation([0.1,0.18,0.18]));
        model_transform = model_transform.times(Mat4.rotation(Math.PI, Vec.of(1,0,0)));
        model_transform = model_transform.times(Mat4.rotation(-Math.PI/2, Vec.of(0,1,0)));
        model_transform = model_transform.times(Mat4.scale([0.04,0.09,0.03]));
        this.shapes.torus.draw( graphics_state, model_transform, this.materials.ear );
        model_transform = model_transform.times(Mat4.scale([1/0.04,1/0.09,1/0.03]));
        model_transform = model_transform.times(Mat4.rotation(Math.PI/2, Vec.of(0,1,0)));
        model_transform = model_transform.times(Mat4.rotation(Math.PI, Vec.of(1,0,0)));
        model_transform = model_transform.times(Mat4.translation([-0.1,-0.18,-0.18]));

        model_transform = model_transform.times(Mat4.translation([0.1,0.18,-0.18]));
        model_transform = model_transform.times(Mat4.rotation(Math.PI, Vec.of(1,0,0)));
        model_transform = model_transform.times(Mat4.rotation(-Math.PI/2, Vec.of(0,1,0)));
        model_transform = model_transform.times(Mat4.scale([0.04,0.09,0.03]));
        this.shapes.torus.draw( graphics_state, model_transform, this.materials.ear );

        if(this.pre_dir == 0 && this.direction == 1) 
        {
          model_transform = model_transform.times(Mat4.rotation(Math.PI/2, Vec.of(0,1,0)));
          //this.pre_dir = this.direction;
        }
        
        return model_transform;
      }
    
    
    jump(strength,model_pig,model_stand)
    {
      if (this.direction == 0)
      { 
        model_pig = model_pig.times(Mat4.translation([strength*0.00015*Math.sin(this.counter*Math.PI/100),
                                                      0.10*Math.sin(this.counter*Math.PI/50),0]));
      }
      else 
      {
        model_pig = model_pig.times(Mat4.translation([0,0.10*Math.sin(this.counter*Math.PI/50),
                                                      0.00015*strength*Math.sin(this.counter*Math.PI/100)]));
      }
      return model_pig;
    }
    


    draw_stand()
    {
      this.pre_dir = this.direction;
      this.direction = ((10*Math.random())%2)|0;
      //this.direction = !this.direction;
      this.step = Math.random()*3+3;
      this.current = this.next;
      if ( ( this.direction== 0 ) )
        this.next = this.current.times(Mat4.translation([this.step,0,0]));
      else 
        this.next = this.current.times(Mat4.translation([0,0,this.step]));
    }

    draw_stands(graphics_state){
      this.shapes.stand.draw( graphics_state, this.current, this.materials.stand );
      this.shapes.stand.draw( graphics_state, this.next, this.materials.stand);
    }


    collision_detection(is_falling){
        var height = this.model_transform[1][3];
        var x = this.model_transform[0][3];
        var z = this.model_transform[2][3];
        if ( height > -0.2 && height <= 0.2 && this.pig_state == 1 && is_falling){
            if ( (x < this.current[0][3] + 1 && x > this.current[0][3] - 1) && z < this.current[2][3] + 1 && z > this.current[2][3] - 1 ){
                this.pig_state = 0;
                this.model_transform[1][3] = 0;
            }
            else if ( (x < this.next[0][3] + 1 && x > this.next[0][3] - 1) && z < this.next[2][3] + 1 && z > this.next[2][3] - 1 ){
                this.pig_state = 0;
                this.model_transform[1][3] = 0;
            }
        }
        if (this.pig_state == 0){
            if ( x < this.current[0][3] + 1 && x > this.current[0][3] - 1 && z < this.current[2][3] + 1 && z > this.current[2][3] - 1 ){
                this.pig_state = 0;
            }
            else if ( x < this.next[0][3] + 1 && x > this.next[0][3] - 1 && z < this.next[2][3] + 1 && z > this.next[2][3] - 1 ){
                this.pig_state = 0;
            }
            else this.pig_state = 3;
        }
        if (height <= -0.2 && this.pig_state != 4) {
            this.pig_state = 4;
            this.splash = 1;
        }
    }

    jumping_pig(t){
        if (this.pig_state == 1) {
          var duration = t-this.keyup_time;
          if ( ( this.direction== 0 ) ){
            this.model_transform = this.model_transform.times(Mat4.translation([0.05*duration*this.strength*0.005,0.4*duration-0.5*duration*duration,0]));
            }
          else {
            this.model_transform = this.model_transform.times(Mat4.translation([0,0.4*duration-0.5*duration*duration,0.05*duration*this.strength*0.005]));
            }
          if (0.4-0.5*duration < 0) this.collision_detection(1);
        }
    }

    splashing(season,graphics_state,mater,t,dt){
      //splash stuff
      let drop_x, drop_z = 0;
      if (this.splash == 1){
          this.splash = 0;
          this.splash_time = t;

          drop_x = this.model_transform[0][3];
          drop_z = this.model_transform[2][3];
          this.drop_pos = Mat4.identity().times(Mat4.translation([drop_x,-1.1,drop_z])).times(Mat4.scale([0.05,0.05,0.05]));
      }
      if (this.pig_state == 4 && (this.season == 1 || this.season == 3)) this.shapes.drip.draw(graphics_state,this.drop_pos.times(Mat4.scale([4*Math.log(t/2),8*Math.sin(3*t),4*Math.log(t/2)])).times(Mat4.translation([-3,0,-3])),mater);
      if (this.pig_state == 4 && this.splash_play == 1) {this.droping.play(); this.splash_play = 0;}
      if (this.splash_time + 1 > t){
          for (var i = 0; i < 12; i++){
              for (var j = 0; j < 12; j++){
                  var diff = (t - this.splash_time)*10;
                  var temp = this.drop_pos.times(Mat4.translation([4*Math.sin(i+this.rand[i+j])*diff, 15*this.rand[i+j]*diff - 2*diff*diff ,4*Math.cos(i+this.rand[i+j])*diff]));
                  
                  this.shapes.snow.draw(graphics_state,temp,mater);
              }
          }
      }
      if( this.pig_state == 4 && this.splash_time + 5 < t) {
        this.season = 5;
        this.mole.pause();
      }
    }

    skybox(graphics_state,square_transform,k,t){
      for( var i = 0; i < 3; i++ )                    
      for( var j = 0; j < 2; j++ )
      { k += 1;
        square_transform = Mat4.rotation( i == 0 ? Math.PI/2 : 0, Vec.of(1, 0, 0) )
                        .times( Mat4.rotation( Math.PI * j - ( i == 1 ? Math.PI/2 : 0 ), Vec.of( 0, 1, 0 ) ) )
                        .times( Mat4.rotation(  k > 2 ? t/10 : 0, Vec.of( 0, 1, 0 ) ) )
                        .times( Mat4.translation([ 0, 0, 199.6 ]) );//marker
        this.shapes.face.draw(graphics_state,square_transform,this.materials[k+6*(this.season-1)]);
      }
    }

    spring(graphics_state, t, dt){
      this.skybox(graphics_state,this.current,0,t);

      this.draw_lutos(graphics_state,t);

      this.water_transform = this.current.times(Mat4.rotation( Math.PI/4,Vec.of(0, 1, 0) )).times(Mat4.translation([-18*3-2*Math.sin(t),0,-60]));
      this.shapes.water.draw(graphics_state,this.water_transform.times(Mat4.scale([50,0.01+0.01*Math.abs( Math.sin(1.2*t) ),50])),this.materials.spring_water);
      

      this.splashing(1,graphics_state,this.materials.spring_water,t,dt);
    }


    summer(graphics_state, t, dt){

      this.water_transform = this.current.times(Mat4.rotation( Math.PI/4,Vec.of(0, 1, 0) )).times(Mat4.translation([-18*3-6*Math.sin(t/5),0,-60]));
      this.shapes.water.draw(graphics_state,this.water_transform.times(Mat4.scale([3,0.1+0.1*Math.abs( Math.sin(1.2*t) ),3])),this.materials.star_river);
      var firefly_pos = this.current;
      firefly_pos = firefly_pos.times(Mat4.rotation(Math.PI/4,Vec.of(0,1,0))).times(Mat4.scale([1,1/0.7,1]));
      for (var m = 1; m <= 15; m++){
          this.shapes.firefly.draw(graphics_state,firefly_pos.times(Mat4.translation([m/6+3.5*Math.sin(m*this.rand[m]+t/(10*m) ),3+m/7+1.5*Math.sin(m*this.rand[m]+t*this.rand[m]),m/4+5.5*Math.cos(m*this.rand[m]+t/(m*10*this.rand[m]) ) ])),this.materials.firefly);
      }
      this.skybox(graphics_state,this.current,0,t);
      this.splashing(1,graphics_state,this.materials.star_river,t,dt);
    }

    fall(graphics_state, t, dt){

        var rain_surface = this.current.times(Mat4.translation([-20,-0.01,-20]));
        this.shapes.square.draw(graphics_state,rain_surface,this.materials.rain);
        
        for (var ct = 0; ct < 14; ct++){
          for (var ctn = 0; ctn < 14; ctn++){
          //var rain_trans = this.current.times(Mat4.translation([5*this.rand[ct+ctn*10]-8,0,5*this.rand[ct+ctn*10]-9]));
          //rain_trans = rain_trans.times(Mat4.scale([0.1,0.09*Math.sin(2*t+ct+ctn+ct*ctn),0.1])).times(Mat4.translation([10*ct,0,10*ctn]));
          //new drip
          var rain_trans = this.current.times(Mat4.translation([6*this.rand[2*ct+3*ctn]-9,0,6*this.rand[10*ct-ctn+10]-11]));
          var rmove = 0.09*Math.sin(2*t+ct*ctn);
          rain_trans = rain_trans.times(Mat4.scale([0.1,rmove,0.1])).times(Mat4.translation([10*ct+3*Math.sin( (rmove == 0) ? t|0 :0  ),0,10*ctn]));
          
          this.shapes.drip.draw(graphics_state,rain_trans,this.materials.rain);
          }
        }

        for (var i = 0; i < 400; i++){
            //this.temp_snow = this.snows[i].times(Mat4.scale([0.002,0.05,0.002])).times(Mat4.translation([-1,100*this.rand[i]-(45*t)%50-i+100,-5]));
            //new rain
            this.temp_snow = this.snows[i].times(Mat4.scale([0.002,0.05,0.002])).times(Mat4.translation([-2,100*this.rand[i]-(45*t)%50-i/2+100,-5]));
            
            this.shapes.snow.draw(graphics_state,this.temp_snow,this.materials.rain);
        }
      this.skybox(graphics_state,this.current,0,t);

      this.splashing(1,graphics_state,this.materials.rain,t,dt);
      
    }
    
    winter(graphics_state, t, dt){
      //skybox
      var square_transform = this.current;
      var k = 0;
      this.skybox(graphics_state,this.current,0,t);

      for (var i = 0; i < 400; i++){
        //this.temp_snow = this.snows[i].times(Mat4.scale([0.03,0.03,0.03])).times(Mat4.translation([-1,100*this.rand[i]-(45*t)%50-i+100,-5]));
        //new snow
        this.temp_snow = this.snows[i].times(Mat4.scale([0.03,0.03,0.03])).times(Mat4.translation([-1,80*Math.sin(5*this.rand[i])+190-((10+i/5)*t)%250-i/5,-5]));
        this.shapes.snow.draw(graphics_state,this.temp_snow,this.materials.snow);
    }

      this.splashing(1,graphics_state,this.materials.snow,t,dt);
        
      //this.water_transform = this.current.times(Mat4.rotation( Math.PI/4,Vec.of(0, 1, 0) )).times(Mat4.translation([-18*3-6*Math.sin(t/5),0,-60]));
      //this.shapes.water.draw(graphics_state,this.water_transform.times(Mat4.scale([3,0.1+0.1*Math.abs( Math.sin(1.2*t) ),3])),this.materials.snow);
      //new water surface
      this.water_transform = this.current.times(Mat4.rotation( Math.PI/4,Vec.of(0, 1, 0) )).times(Mat4.translation([-18*3-6*Math.sin(t/4),0,-60]));
      this.shapes.water.draw(graphics_state,this.water_transform.times(Mat4.scale([3,0.1+0.1*Math.abs(Math.sin(1.2*t)),3])),this.materials.snow);
       

    }

    draw_lutos(graphics_state,t){
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([8+0.2*Math.sin(t),0,-5+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.4,0.4,0.4])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([-11+0.2*Math.cos(t),0,-3+0.2*Math.sin(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.5,0.5,0.5])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([-3+0.2*Math.sin(t),0,-15+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.5,0.5,0.5])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([6+0.2*Math.sin(t),0,-3+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.55,0.55,0.55])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([2+0.2*Math.sin(t),0,-15+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.5,0.5,0.5])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([-3+0.2*Math.sin(t),0,-13+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.4,0.4,0.4])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([7+0.2*Math.sin(t),0,-15+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.55,0.55,0.55])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([5+0.2*Math.sin(t),0,4+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.55,0.55,0.55])), this.materials.phong);
      this.shapes.lotus.draw(graphics_state, this.current.times(Mat4.translation([-4+0.2*Math.sin(t),0,5+0.2*Math.cos(t)])).times(Mat4.rotation(-Math.PI/2, Vec.of(1,0,0))).times(Mat4.scale([0.55,0.55,0.55])), this.materials.phong);

    }


    
    
    display( graphics_state ){  
      this.total_time = graphics_state.animation_time/1000;
      const t = ( this.total_time- this.start_time), dt = graphics_state.animation_delta_time / 1000;
      console.log(this.season);
      if(this.season == 0){
        this.shapes.title.draw(graphics_state,Mat4.identity(),this.materials.title);
        this.camera = Mat4.look_at( Vec.of( 0,0,1.3 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
      }
      else{
      for (var i = 0; i < 400; i++){
        this.snows[i] = this.current.times(Mat4.translation([10*this.rand[i],5*this.rand[i],10*this.rand[399-i]]));
       
      }
        if ( this.season != 0 && this.season != 5) this.mole.play();
        
        if (this.pig_state == 3) {
          this.df = 1;
          this.model_transform = this.model_transform.times(Mat4.translation([0,-20*dt,0]));
        }


        this.lights = [ new Light( Vec.of(500,0,0,1 ), Color.of( 1,1,1,1 ), 1000000 ),
                        new Light( Vec.of(-500,0,0,1 ), Color.of( 1,1,1,1 ), 10000000 ),
                        new Light( Vec.of(0,0,500,1 ), Color.of( 1,1,1,1 ), 10000000 ), 
                        new Light( Vec.of(0,0,-500,1 ), Color.of( 1,1,1,1 ), 10000000 ), 
                      ];
        
        if(this.season == 1) {
          this.spring(graphics_state, t, dt);
        }
        else if(this.season == 2) {
          this.summer(graphics_state, t, dt);
        }
        else if(this.season == 3) {
          this.fall(graphics_state, t, dt);
        }
        else if(this.season == 4) {
          this.winter(graphics_state, t, dt);
        }
        else if(this.season == 5) {
          this.score = Math.floor((this.splash_time-this.now)/6) - this.df;
          this.shapes.text.set_string("Game Over!  Your Score is " + this.score);
          this.shapes.text.draw(graphics_state, Mat4.identity().times(Mat4.scale([0.3,0.3,0.3])).times(Mat4.rotation(Math.PI/6, Vec.of(0,1,0))).times(Mat4.translation([-15,0,0])), this.materials.text);
        }
        console.log(this.df);
        graphics_state.lights = this.lights;        // Use the lights stored in this.lights.

        //draw the pig
        if (this.pig_state != 4)  this.draw_pig(graphics_state,this.model_transform);
        
        //drawing the stand:
        if (this.season != 5) this.draw_stands(graphics_state)

        //key detected, into jump state
        if (this.keyed){
          if(this.pig_state == 0) this.pig_state = 1;
          this.keyed = 0;
          this.keyup_time = t;
        }

        //collision_detection with out jumping
        this.collision_detection(0);

        //key pushed pig jumping
        this.jumping_pig(t);


        //pig is falling directly
        

        //time to move stand
        if ( t > this.next_time){
          this.draw_stand();
          this.is_standing = this.current;
          this.next_time += 6;
        }   


      //track camera_transform
        
       var desired = Mat4.inverse(this.next.times(Mat4.scale([1,1/0.7,1])).times(Mat4.translation([6,2,5])).times(Mat4.rotation(Math.PI/4, Vec.of(0,1,0))));
       desired = desired.map((x, i) => Vec.from( graphics_state.camera_transform[i]).mix(x, .1));
       graphics_state.camera_transform = desired;
       if (this.season == 5) graphics_state.camera_transform = Mat4.look_at( Vec.of( 8,0,8 ), Vec.of( 3,0,0 ), Vec.of( 0,1,0 ) );

    

      }
    }
    }


class Texture_Scroll_X extends Phong_Shader
{ fragment_glsl_code()           // ********* FRAGMENT SHADER ********* 
    {
      // TODO:  Modify the shader below (right now it's just the same fragment shader as Phong_Shader) for requirement #6.
      return `
        uniform sampler2D texture;
        void main()
        { if( GOURAUD || COLOR_NORMALS )    // Do smooth "Phong" shading unless options like "Gouraud mode" are wanted instead.
          { gl_FragColor = VERTEX_COLOR;    // Otherwise, we already have final colors to smear (interpolate) across vertices.            
            return;
          }                                 // If we get this far, calculate Smooth "Phong" Shading as opposed to Gouraud Shading.
                                            // Phong shading is not to be confused with the Phong Reflection Model.
          //vec4 tex_color = texture2D( texture, f_tex_coord );                       // Sample the texture image in the correct place.
                                                                                      // Compute an initial (ambient) color:
          
          vec2 v = vec2(f_tex_coord.x + 0.05 * mod(animation_time, 8.), f_tex_coord.y);
          vec4 tex_color = texture2D( texture, v );
                                                                                
          if( USE_TEXTURE ) gl_FragColor = vec4( ( tex_color.xyz + shapeColor.xyz ) * ambient, shapeColor.w * tex_color.w ); 
          else gl_FragColor = vec4( shapeColor.xyz * ambient, shapeColor.w );
          gl_FragColor.xyz += phong_model_lights( N );                     // Compute the final color with contributions from lights.
        }`;
    }
}

class Texture_Rotate extends Phong_Shader
{ fragment_glsl_code()           // ********* FRAGMENT SHADER ********* 
    {
      // TODO:  Modify the shader below (right now it's just the same fragment shader as Phong_Shader) for requirement #7.
      return `
        uniform sampler2D texture;
        void main()
        { if( GOURAUD || COLOR_NORMALS )    // Do smooth "Phong" shading unless options like "Gouraud mode" are wanted instead.
          { gl_FragColor = VERTEX_COLOR;    // Otherwise, we already have final colors to smear (interpolate) across vertices.            
            return;
          }                                 // If we get this far, calculate Smooth "Phong" Shading as opposed to Gouraud Shading.
                                            // Phong shading is not to be confused with the Phong Reflection Model.
          vec4 tex_color = texture2D( texture, f_tex_coord );                         // Sample the texture image in the correct place.
                                                                                      // Compute an initial (ambient) color:
          if( USE_TEXTURE ) gl_FragColor = vec4( ( tex_color.xyz + shapeColor.xyz ) * ambient, shapeColor.w * tex_color.w ); 
          else gl_FragColor = vec4( shapeColor.xyz * ambient, shapeColor.w );
          gl_FragColor.xyz += phong_model_lights( N );                     // Compute the final color with contributions from lights.
        }`;
    }
}
