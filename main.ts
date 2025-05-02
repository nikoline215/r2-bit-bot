datalogger.onLogFull(function () {
    logging = false
    basic.showIcon(IconNames.Skull)
})
input.onButtonPressed(Button.AB, function () {
    if (input.logoIsPressed()) {
        basic.showIcon(IconNames.No)
        datalogger.deleteLog()
        logging = false
        datalogger.setColumnTitles("x")
    }
})
let logging = false
let nuværende_temp = input.temperature()
let max_temperatur = nuværende_temp
let minimum_temperatur = nuværende_temp
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Ringtone), music.PlaybackMode.InBackground)
basic.pause(5000)
logging = true
datalogger.setColumnTitles("x")
basic.forever(function () {
    basic.showString("" + (nuværende_temp))
    nuværende_temp = input.temperature()
    if (nuværende_temp < minimum_temperatur) {
        minimum_temperatur = nuværende_temp
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.InBackground)
    } else if (nuværende_temp > max_temperatur) {
        max_temperatur = nuværende_temp
    }
    basic.pause(1000)
    if (nuværende_temp < 12) {
        basic.showString("Cold")
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
    } else if (nuværende_temp > 25) {
        basic.showString("Hot")
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.InBackground)
    }
})
basic.forever(function () {
    if (bitbot.sonar(BBPingUnit.Centimeters) < 20) {
        bitbot.goms(BBDirection.Forward, -600, 400)
        bitbot.rotatems(BBRobotDirection.Left, 600, 400)
    } else {
        bitbot.go(BBDirection.Forward, 600)
    }
})
loops.everyInterval(5000, function () {
    if (logging) {
        datalogger.log(datalogger.createCV("x", input.temperature()))
    }
})
