
// Student :  Colin H Hebert     in CSC 2463  (at LSU Spring 2022)

//  HW 6   Synths and Sequencers 
//
//

//  repository zip file uploaded to the following git webpage.
//
//  
//
//


let notes = {
  '1' : 'A4',
  '2' : 'D4',
  '3' : 'F4',
  '4' : 'E4',
  '5' : 'C4',
  '6' : 'B4',
  '7' : 'F4',
  '8' : 'B4',
  '9' : 'A4',
  '0' : 'G3'

}

let players;

let slider1;

let slider_int_value = 0.99;

let synthType;

let synth_type_var = 0;

let synth_index__i__var = 0;

let synth_activated_bool = [];

let position_on_canvas__x = 270;

let position_displace_y_amount = 50;

// initially retrieved temp variable ::
// for use as :: slider acquiring
//  value variable...
let val;


let random_note_index_array1 = [1,4,6,8];

let random_note_index_array2 = [3,5];

let random_note_duration_index_array1 = [1.2, 1.55, 0.45, 0.352];

let random_note_duration_index_array2 = [2.4, 0.68, 1.65];


let synthArray= [];

for(i=0;i<5;i++){
  synthArray[i] = new Tone.Synth({
    oscillator: {
      type: "sine",
      envelope: { 
        attack: 0.06,
        decay: 0.0472,
        sustain: 0.22,
        release: 0.97
      }
    }
    })
}

let phaserEffects = [] ;


let start_freq_phaser = 360;

for (i = 0; i < 5; i++) {
  phaserEffects[i] = new	Tone.Phaser(start_freq_phaser, 2, 580);
}

let phaserEffect_bool = [];

let reverb_effect = [];

let random_reverb_int_index_array = [];


let amModulatorSOURCE_osc = new Tone.AMOscillator ( 136, 'sawtooth', 'sine');

let amModulatorSOURCE_osc2 = new Tone.AMOscillator ( 83.224, 'sine', 'triangle');

let independent_synth = new Tone.Synth({
  amModulatorSOURCE_osc
}).toDestination();

let independent_synth1 = new Tone.Synth({
  amModulatorSOURCE_osc
}).toDestination();



let delayEffect = [];

for (i = 0; i < 4; i++) {
  if (i == 0) {
    delayEffect[i] = new Tone.Delay(0.06);
  } else if (i == 1) {
    delayEffect[i] = new Tone.Delay(0.14);
  } else if (i == 2) {
    delayEffect[i] = new Tone.Delay(0.68);
  } else if (i == 3) {
    delayEffect[i] = new Tone.Delay(0.956);
  }
}


function keyPressed(){


  for (i = 0; i < 5; i++) {

    if (synth_activated_bool[i]) {
      if (keyCode === 48) {
        synthArray[i].partials = [0.82, 0.59];
        synthArray[i].partialCount = 2;
        synthArray[i].triggerAttackRelease(notes[0], .6);
      }
      else if (keyCode === 49) {
        synthArray[i].partials = [0.68, 0.87, 0.63];
        synthArray[i].partialCount = 3;
        synthArray[i].triggerAttackRelease(notes[1], 1.2);
      } else if (keyCode === 50) {
        synthArray[i].partials = [0.82];
        synthArray[i].partialCount = 1;
        synthArray[i].triggerAttackRelease(notes[2], 0.9);
      } else if (keyCode === 51) {
        synthArray[i].partials = [0.23, 0.59, 0.352];
        synthArray[i].partialCount = 3;
        synthArray[i].triggerAttackRelease(notes[3], 0.45);
      } else if (keyCode === 52) {
        synthArray[i].partials = [0.378, 0.68, 0.89];
        synthArray[i].partialCount = 3;
        synthArray[i].triggerAttackRelease(notes[4], 1.35);
      } else if (keyCode === 53) {
        synthArray[i].partials = [0.35, 0.94, 0.42];
        synthArray[i].partialCount = 3;
        synthArray[i].triggerAttackRelease(notes[5], 0.45);
      } else if (keyCode === 54) {
        synthArray[i].partials = [0.45, 0.68];
        synthArray[i].partialCount = 2;
        synthArray[i].triggerAttackRelease(notes[6], 0.225);
      } else if (keyCode === 55) {
        synthArray[i].partials = [0.94, 0.86];
        synthArray[i].partialCount = 2;
        synthArray[i].triggerAttackRelease(notes[7], 1.2);
      } else if (keyCode === 56) {
        synthArray[i].partials = [0.372, 0.40, 0.09];
        synthArray[i].partialCount = 3;
        synthArray[i].triggerAttackRelease(notes[8], 0.9);
      } else if (keyCode === 57) {
        synthArray[i].partials = [0.82, 0.59];
        synthArray[i].partialCount = 2;
        synthArray[i].triggerAttackRelease(notes[9], 1.2);
      }
    }
  }

  independent_synth.triggerAttackRelease(random_note_index_array1[parseInt( random(0,3))], random_note_duration_index_array1[ parseInt( random(0, 3))]);

  independent_synth1.triggerAttackRelease(random_note_index_array2[parseInt( random(0,1))], random_note_duration_index_array2[parseInt( random(0,2))]);

}

    


    



function setup() {

  createCanvas(900, 850);

  slider1 = createSlider(0, 100, 50, 02);

  slider1.position(40, 690);

  slider1.mouseReleased(()=>{
    
    val = slider1.value();

    if(val >= 86){
      slider_int_value = 0.93;
    } else if(val >= 72){
      slider_int_value = 0.78;
    } else if(val >= 58){
      slider_int_value = 0.68;
    } else if(val >= 44){
      slider_int_value = 0.58;
    } else if(val >= 30){
      slider_int_value = 0.48;
    } else if(val >= 16){
      slider_int_value = 0.44;
    } else if(val >= 2){
      slider_int_value = 0.35;
    } 

    phaserEffects[synth_index__i__var].frequency = start_freq_phaser * slider_int_value;
    
  });

  synthType = 'square';

  button1 = createButton("synth_type_toggle_switch");

  button1.position(40, 234);

  button1.mousePressed( () => set_synth_type(synth_index__i__var) );

  button2 = createButton("synthIndex_i__(i'th_element_toggle_switch)");

  button2.position(40, 310);

  button2.mousePressed( () => set_synth_i_index() );


  synth_activated_bool[0] = 0;

  synth_activated_bool[1] = 0;

  synth_activated_bool[2] = 0;

  synth_activated_bool[3] = 0;

  synth_activated_bool[4] = 0;


  random_reverb_int_index_array = [1.1, 0.32, 0.76];

  for (i = 0; i < 5; i++) {
    reverb_effect[i] = new Tone.Reverb( random_reverb_int_index_array[ parseInt( random(0, 2) ) ] );
  }

  for (i = 0; i < 5; i++) {
    reverb_effect[i] = new Tone.Reverb( random_reverb_int_index_array[ parseInt( random(0, 2) ) ] );
  }

  synthArray[0].connect(reverb_effect[0]).toDestination();
  synthArray[1].connect(reverb_effect[1]).connect(delayEffect[0]).toDestination();
  synthArray[2].connect(reverb_effect[2]).connect(delayEffect[1]).toDestination();
  synthArray[3].connect(reverb_effect[3]).connect(delayEffect[2]).toDestination();
  synthArray[4].connect(reverb_effect[4]).connect(delayEffect[3]).toDestination();

  phaserEffect_bool[0] = 0;

  phaserEffect_bool[1] = 0;

  phaserEffect_bool[2] = 0;

  phaserEffect_bool[3] = 0;

  phaserEffect_bool[4] = 0;


  // position_on_canvas__x = 270;

  // position_displace_y_amount = 50;

  button3 = createButton("Turn ON/OFF synth 0");

  button3.position(position_on_canvas__x, position_displace_y_amount * 1);

  button3.mousePressed( function() { if( ! synth_activated_bool[0]){ synth_activated_bool[0] = 1 ;} else {synth_activated_bool[0] = 0;} }  );


  button4 = createButton("Turn ON/OFF synth 1");

  button4.position(position_on_canvas__x, position_displace_y_amount * 2);

  button4.mousePressed( function() { if( ! synth_activated_bool[1]){ synth_activated_bool[1] = 1 ;} else {synth_activated_bool[1] = 0;} }  );


  button5 = createButton("Turn ON/OFF synth 2");

  button5.position(position_on_canvas__x, position_displace_y_amount * 3);

  button5.mousePressed( function() { if( ! synth_activated_bool[2]){ synth_activated_bool[2] = 1 ;} else {synth_activated_bool[2] = 0;} }  );


  button6 = createButton("Turn ON/OFF synth 3");

  button6.position(position_on_canvas__x, position_displace_y_amount * 4);

  button6.mousePressed( function() { if( ! synth_activated_bool[3]){ synth_activated_bool[3] = 1 ;} else {synth_activated_bool[3] = 0;} }  );


  button7 = createButton("Turn ON/OFF synth 4");

  button7.position(position_on_canvas__x, position_displace_y_amount * 5);

  button7.mousePressed( function() { if( ! synth_activated_bool[4]){ synth_activated_bool[4] = 1 ;} else {synth_activated_bool[4] = 0;} }  );




  button8 = createButton("Activate/Deactivate phaserEffect on synth number i");

  button8.position(63, 430);

  button8.mousePressed( () => setPhaserOn_and_Off() );

}







function draw() {
  background(220);

  // Text label  for   "synth type"
  fill(130, 78, 98);
  textSize(27);
  text("synth " + synth_index__i__var + " == " + synthArray[synth_index__i__var].oscillator.type, 40, 228);

  // Text label  for   "synth" index number.
  fill(130, 78, 98);
  textSize(27);
  text("synth index  " + synth_index__i__var, 40, 305);



  // position_on_canvas__x == 270


  if (synth_activated_bool[0]) {
    // Text label  for   "synth" index number 0.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 0 + " is \"ON\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 1);
  } else {
    // Text label  for   "synth" index number 0.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 0 + " is \"OFF\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 1);

  }
  if (synth_activated_bool[1]) {
    // Text label  for   "synth" index number 1.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 1 + " is \"ON\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 2);
  } else {
    // Text label  for   "synth" index number 1.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 1 + " is \"OFF\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 2);
  }
  if (synth_activated_bool[2]) {
    // Text label  for   "synth" index number 2.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 2 + " is \"ON\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 3);
  } else {
    // Text label  for   "synth" index number 2.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 2 + " is \"OFF\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 3);
  }
  if (synth_activated_bool[3]) {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 3 + " is \"ON\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 4);
  } else {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 3 + " is \"OFF\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 4);
  }
  if (synth_activated_bool[4]) {
    // Text label  for   "synth" index number 4.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 4 + " is \"ON\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 5);
  } else {
    // Text label  for   "synth" index number 4.
    fill(30, 45, 160);
    textSize(23);
    text("synth " + 4 + " is \"OFF\" .", position_on_canvas__x + 172, 19 + position_displace_y_amount * 5);
  }


  if (!phaserEffect_bool[0]) {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 0 is OFF ... FOR : synth 0 .", 80, 480);
  } else {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 0 is ON ... FOR : synth 0 .", 80, 480);
  }
  if (!phaserEffect_bool[1]) {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 1 is OFF ... FOR : synth 1 .", 80, 514);
  } else {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 1 is ON ... FOR : synth 1 .", 80, 514);
  }
  if (!phaserEffect_bool[2]) {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 2 is OFF ... FOR : synth 2 .", 80, 548);
  } else {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 2 is ON ... FOR : synth 2 .", 80, 548);
  }
  if (!phaserEffect_bool[3]) {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 3 is OFF ... FOR : synth 3 .", 80, 582);
  } else {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 3 is ON ... FOR : synth 3 .", 80, 582);
  }
  if (!phaserEffect_bool[4]) {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 4 is OFF ... FOR : synth 4 .", 80, 616);
  } else {
    // Text label  for   "synth" index number 3.
    fill(30, 45, 160);
    textSize(18);
    text("phaserEffect_bool 4 is ON ... FOR : synth 4 .", 80, 616);
  }
}

// synth_type_var = 0, 1, 2, or 3.
function set_synth_i_index(){
  synth_index__i__var += 1;
  
  synth_index__i__var = synth_index__i__var % 5;

}


// synth_type_var = 0, 1, 2, or 3.
function set_synth_type(synth_index_number){

  synth_type_var += 1;

  synth_type_var = synth_type_var % 4;

  // 'sine'
  if(synth_type_var == 0){
    
    synthArray[synth_index_number].oscillator.type = 'sine';

  } 
  // 'triangle'
  else if (synth_type_var == 1){

    synthArray[synth_index_number].oscillator.type = 'triangle';

  } 
  // 'sawtooth'
  else if (synth_type_var == 2){

    synthArray[synth_index_number].oscillator.type = 'sawtooth';

  }
  // 'square'
  else if (synth_type_var == 3){

    synthArray[synth_index_number].oscillator.type = 'square';

  }

}


function setPhaserOn_and_Off() {
  


  if (synth_index__i__var == 0) {

    if (!phaserEffect_bool[synth_index__i__var]) { phaserEffect_bool[synth_index__i__var] = 1; synthArray[synth_index__i__var].connect(phaserEffects[synth_index__i__var]).connect(reverb_effect[synth_index__i__var]).toDestination(); } else {
      phaserEffect_bool[synth_index__i__var] = 0; synthArray[synth_index__i__var].connect(reverb_effect[synth_index__i__var]).toDestination();
    }
  } else if (synth_index__i__var >= 1 && synth_index__i__var <= 4) {

    if (!phaserEffect_bool[synth_index__i__var]) { phaserEffect_bool[synth_index__i__var] = 1; synthArray[synth_index__i__var].connect(delayEffect[synth_index__i__var - 1]).connect(phaserEffects[synth_index__i__var]).connect(reverb_effect[synth_index__i__var]).toDestination(); } else {
      phaserEffect_bool[synth_index__i__var] = 0; synthArray[synth_index__i__var].connect(delayEffect[synth_index__i__var - 1]).connect(reverb_effect[synth_index__i__var]).toDestination();
    }

    
  }


}
