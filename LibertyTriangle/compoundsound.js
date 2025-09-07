function csnd(snd, times) {
    for (let i = 0; i < times; i++) {
        setTimeout(function () {
            snd.play()
        }, 100 * i)
    }
}