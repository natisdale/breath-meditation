/**
File: torso.js
Class: Torso
Author: Nathan Tisdale
**/
class Torso {
  constructor() {
    this._diaphram = 0;
    this._inhaling = true;
    this._active = false;
    this._soundEnabled = false;
    this._prompt = 0;
    this._breathR = 170;
    this._breathG = 204;
    this._breathB = 190;
    this._breathColor = color(this._breathR, this._breathG, this._breathB);
    this._prompts = [
      "Following the breath is one of the most accessbile ways to practice meditation, while sitting, standing, or even laying down. This short guided meditation is approximately four minutes. Find a space where you can be uninterupted for the duration of the meditation. Eyes may be closed or open, whichever you find feels comfortable and safe.  If sitting in a chair, sitting on the front half of the chair helps allow the belly to expand fully.  After settling into whichever position you choose press the start button to begin.",
      "Feel the weight of your body against the chair, cushion or earth, as you bring your attention to this moment.",
      "Imagine the crown of your head being gently pulled elongating the neck and the air passages in your throat",
      "Relax the belly, allowing it to extend naturally, rising and falling with the breath.",
      "Notice the sensation of the air as you inhale and exhale.",
      "Where does the flow of the breath feel most noticable? As the air passes the tip of your nose?",
      "Is it at the air touches the back of your throat?",
      "As it enters and exits your lungs",
      "Or perhaps through the movement of the belly as your diaphragm expands and contracts",
      "Rest your attention on the breath, wherever you most feel it in your body at this moment",
      "Begin to notice how the air feels as you inhale and exhale.",
      "Just noticing, without attempting to change your breathing in any way, does it feel slow, or fast?",
      "Does it feel warm, or cool?",
      "Does it feel dry, or moist?",
      "Is it rough or smooth?",
      "Follow the inhalation.",
      "And Follow the  exhalation.",
      "Notice the moment between, before the breath changes direction",
      "The moment at the top of the breath.",
      "And the moment at the bottom of the breath.",
      "Continue to follow the rise and fall of the breath.",
      "When you notice your attention has drifted, simply notice, and allow the mind to return to the breath",
      "Resting your attention on the breath, and the qualities of the breath",
      "Welcome each moment you notice that the mind has wandered, and the ease with which your attention returned without effort.",
      "Continue to follow the breath, allowing for the natural cycle of your mind resting on the breath, wandering away from the breath, and returning.",
      "Now,as you finish this meditation, notice any shift that you may sense in your body, mind, or heart.",
    ];
    soundFormats("mp3");

    this._soundFiles = [
      "audio/english-breath-00",
      "audio/english-breath-01",
      "audio/english-breath-02",
      "audio/english-breath-03",
      "audio/english-breath-04",
      "audio/english-breath-05",
      "audio/english-breath-06",
      "audio/english-breath-07",
      "audio/english-breath-08",
      "audio/english-breath-09",
      "audio/english-breath-10",
      "audio/english-breath-11",
      "audio/english-breath-11",
      "audio/english-breath-12",
      "audio/english-breath-13",
      "audio/english-breath-13",
      "audio/english-breath-15",
      "audio/english-breath-16",
      "audio/english-breath-17",
      "audio/english-breath-18",
      "audio/english-breath-19",
      "audio/english-breath-20",
      "audio/english-breath-21",
      "audio/english-breath-22",
      "audio/english-breath-23",
      "audio/english-breath-24",
      "audio/english-breath-25",
    ];
    this._currentTrack;

    stopButton.style.display = "none";
  }

  toggleActive() {
    this._active = !this._active;
    stopButton.style.display = "block";
  }

  isActive() {
    return this._active;
  }

  toggleSound() {
    this._soundEnabled = !this._soundEnabled;
    if (visual.soundIsEnabled()) {
      soundButton.innerHTML =
        '<span class="material-symbols-outlined">volume_up</span>';
    } else {
      soundButton.innerHTML =
        '<span class="material-symbols-outlined">no_sound</span>';
    }
  }

  soundIsEnabled() {
    return this._soundEnabled;
  }
  getCaption() {
    // return this._prompt < this._prompts.size ? this._prompts[this._prompt] : this._prompts[this._prompt.size - 1];
    return this._prompts[this._prompt];
  }

  expandDiaphram() {
    this._diaphram = this._diaphram + 0.5;
    return this._diaphram;
  }

  contractDiaphram() {
    this._diaphram = this._diaphram - 0.5;
    return this._diaphram;
  }

  reset() {
    this._active = false;
    this._prompt = 0;
    this._diaphram = 0;
    this._inhaling = true;
    stopButton.style.display = "none";
    this._breathB = 190;
  }

  show() {
    if (this._active) {
      if (this._diaphram > 99 || this._diaphram < 0) {
        if (!this._inhaling && this._prompt < this._prompts.length - 1) {
          this._prompt++;
          if (this.soundIsEnabled()) {
            soundFormats("mp3");
            this._currentTrack = loadSound(
              this._soundFiles[this._prompt],
              () => this._currentTrack.play(),
              () =>
                console.log(`Error loading ${this._soundFiles[this._prompt]}`),
              (n) => console.log(n),
            );
          }
        } else {
          // this._soundEnabled = false;
          // this.reset();
        }
        this._inhaling = !this._inhaling;
      }
      if (this._inhaling) {
        this.expandDiaphram();
        this._breathColor = color(
          this._breathR,
          this._breathG,
          this._breathB++,
        );
      } else {
        this.contractDiaphram();
        this._breathColor = color(
          this._breathR,
          this._breathG,
          this._breathB--,
        );
      }
    }

    // console.log(`inhaling: ${this._inhaling}`);
    // console.log(`diaphram: ${this._diaphram}`);
    let scaleAmount = width / 1000;
    push();
    scale(scaleAmount);
    //fill("blue");
    fill(brandPurple);
    stroke(0);
    strokeWeight(5);

    // Body Outline
    beginShape();
    vertex(100, 1000);
    // shoulder
    bezierVertex(100, 200, 500, 600, 400, 350);
    // back of head
    bezierVertex(350, 300, 300, 50, 500, 25);
    bezierVertex(600, 28, 650, 50, 650, 50);
    // brow
    bezierVertex(680, 75, 680, 100, 700, 140);
    bezierVertex(690, 175, 680, 165, 690, 190);
    // nose
    bezierVertex(700, 200, 710, 220, 720, 230);
    bezierVertex(725, 235, 735, 240, 710, 250);
    bezierVertex(700, 250, 680, 260, 685, 280);
    // lips
    bezierVertex(690, 285, 695, 290, 690, 295);
    bezierVertex(695, 300, 690, 305, 690, 310);
    // chin
    bezierVertex(680, 320, 690, 335, 690, 350);
    bezierVertex(685, 355, 670, 360, 600, 370);
    // neck
    bezierVertex(600, 380, 580, 390, 575, 440);
    //bezierVertex(600, 450,900, 460, 900, 1000);
    bezierVertex(600, 450, 700, 455, 720, 475);
    bezierVertex(825, 520, 875, 800, 900, 1000);
    //vertex(900,1000);
    vertex(100, 1000);
    endShape();

    // Lungs
    push();
    noStroke();
    //fill(color(110, 150, 130));
    fill(this._breathColor);
    beginShape();
    vertex(450 + this._diaphram / 10, 800 + this._diaphram);
    bezierVertex(460, 700, 440, 600, 430, 550);
    bezierVertex(440, 480, 400, 450, 300 - this._diaphram / 10, 700);
    bezierVertex(
      290 - this._diaphram / 10,
      750,
      300 - this._diaphram / 10,
      800,
      320 - this._diaphram / 10,
      850 + this._diaphram,
    );
    bezierVertex(
      330 - this._diaphram / 10,
      890 + this._diaphram,
      380 - this._diaphram / 10,
      840 + this._diaphram,
      450 + this._diaphram / 10,
      800 + this._diaphram,
    );
    endShape();

    beginShape();
    vertex(550 - this._diaphram / 10, 800 + this._diaphram);
    bezierVertex(540, 700, 560, 600, 570, 550);
    bezierVertex(560, 480, 600, 450, 700 - this._diaphram / 10, 700);
    bezierVertex(
      710 + this._diaphram / 10,
      750,
      700 + this._diaphram / 10,
      800,
      680 + this._diaphram / 10,
      850 + this._diaphram,
    );
    bezierVertex(
      670 + this._diaphram / 10,
      890 + this._diaphram,
      620 + this._diaphram / 10,
      840 + this._diaphram,
      550 - this._diaphram / 10,
      800 + this._diaphram,
    );
    endShape();
    pop();

    // Airway
    beginShape();
    noStroke();
    //fill(color(110, 150, 130));
    fill(this._breathColor);
    vertex(690, 295);
    bezierVertex(695, 300, 690, 305, 690, 310);
    bezierVertex(690, 298, 600, 300, 550, 360);
    bezierVertex(540, 380, 520, 450, 580, 550);
    vertex(580, 600);
    bezierVertex(575, 600, 500, 550, 425, 600);
    vertex(410, 550);
    bezierVertex(425, 560, 500, 450, 470, 340);
    bezierVertex(465, 300, 500, 250, 680, 290);
    endShape();

    // sinus
    beginShape();
    stroke("white");
    noStroke();
    // fill(color(110, 150, 130));
    fill(this._breathColor);
    vertex(720, 230);
    bezierVertex(725, 235, 735, 240, 710, 250);
    bezierVertex(700, 250, 680, 250, 690, 250);
    bezierVertex(650, 240, 525, 220, 505, 350);
    vertex(470, 340);
    bezierVertex(465, 250, 500, 230, 550, 200);
    bezierVertex(560, 205, 575, 160, 715, 225);
    endShape();

    //Hightlights
    fill(255, 255, 255, 50);
    if (this._prompt === 2) {
      // highlight top of head
      ellipse(525, 50, 150, 20);
    }
    if (this._prompt === 3) {
      // highlight belly
      ellipse(500, 925, 400, 150);
    }
    if (this._prompt === 5) {
      //highlight tip of nose
      ellipse(712, 237, 30, 20);
    }
    if (this._prompt === 6) {
      //highlight back of throat
      ellipse(485, 400, 20, 80);
    }
    if (this._prompt === 7) {
      //highlight lungs
      ellipse(396, 620, 70, 150);
      ellipse(604, 620, 70, 150);
    }
    if (this._prompt === 8) {
      // highlight diaphram
      ellipse(500, 875, 400, 150);
    }
    pop();
  }
}
