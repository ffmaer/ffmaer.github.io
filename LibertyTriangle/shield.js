function startShield(){
    if(typeof shieldtimeout !== "undefined") clearTimeout(shieldtimeout)
    shield = true
    shieldtimeout=setTimeout(function () {
        shield = false
    }, 3000)
}