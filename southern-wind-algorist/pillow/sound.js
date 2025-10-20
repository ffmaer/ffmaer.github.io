function tcSoundLib() {
    notes = {
        D: 62,
        E: 64,
        F: 66, // F#
        G: 67,
        A: 69
    }

    ode_seq = "FFGAAGFEDDEFFEEFFGAAGFEDDEFEDDEEFDEFGFDEFGFEDEFFGAAGFEDDEFEDD".split("")
    note_index = 0
}

function nextNote() {
    c = ode_seq[note_index]

    wave.freq(midiToFreq(notes[c]));
    note_index++
    note_index %= ode_seq.length
}

function randomNote() {
    c = random(["D", "E", "F", "G", "A"])
    wave.freq(midiToFreq(notes[c]));

}

function randomOdeNote() {
    c = random(ode_seq)
    wave.freq(midiToFreq(notes[c]));
}

function playOscillator() {
    wave.start();
  }