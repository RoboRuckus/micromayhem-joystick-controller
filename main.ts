function showStick () {
    basic.showLeds(`
        . # # # .
        # # # # #
        . # # # .
        . . # . .
        . . # . .
        `)
}
function setBTGroup () {
    basic.showString("SET CHANNEL")
    soundExpression.giggle.playUntilDone()
    done = 0
    btgroupnum = 0
    while (done == 0) {
        if (input.buttonIsPressed(Button.B)) {
            music.playTone(131, music.beat(BeatFraction.Sixteenth))
            btgroupnum += 1
        }
        if (input.buttonIsPressed(Button.A)) {
            soundExpression.spring.playUntilDone()
            done = 1
        }
        basic.showNumber(btgroupnum)
    }
    radio.setGroup(btgroupnum)
    basic.showIcon(IconNames.Yes)
}
function stickCheck () {
    if (pins.analogReadPin(AnalogPin.P2) > 550 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
        radio.sendValue("forward", pins.analogReadPin(AnalogPin.P2))
        basic.showLeds(`
            . . # . .
            . # . # .
            # . # . #
            . . . . .
            . . # . .
            `)
    } else if (pins.analogReadPin(AnalogPin.P2) < 450 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
        radio.sendValue("backward", pins.analogReadPin(AnalogPin.P2))
        basic.showLeds(`
            . . # . .
            . . . . .
            # . # . #
            . # . # .
            . . # . .
            `)
    } else if (pins.analogReadPin(AnalogPin.P1) < 450 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
        radio.sendValue("left", pins.analogReadPin(AnalogPin.P1))
        basic.showLeds(`
            . . # . .
            . # . . .
            # . # . #
            . # . . .
            . . # . .
            `)
    } else if (pins.analogReadPin(AnalogPin.P1) > 550 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
        radio.sendValue("right", pins.analogReadPin(AnalogPin.P1))
        basic.showLeds(`
            . . # . .
            . . . # .
            # . # . #
            . . . # .
            . . # . .
            `)
    } else {
        sendStop()
    }
}
function incremental () {
    setVarsToPins()
    if (forwardButton) {
        radio.sendString("300")
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            `)
        basic.pause(100)
        forwardButton = false
    } else if (backwardButton) {
        radio.sendString("400")
        backwardButton = false
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . #
            . # . # .
            . . # . .
            `)
        basic.pause(100)
    } else if (rightButton) {
        radio.sendString("200")
        rightButton = false
        basic.showLeds(`
            . . # . .
            . . . # .
            . . . . #
            . . . # .
            . . # . .
            `)
        basic.pause(100)
    } else if (leftButton) {
        radio.sendString("100")
        leftButton = false
        basic.showLeds(`
            . . # . .
            . # . . .
            # . . . .
            . # . . .
            . . # . .
            `)
        basic.pause(100)
    } else {
        sendStop()
    }
}
function sendStop () {
    radio.sendString("S")
}
function setVarsToPins () {
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        forwardButton = true
    } else if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        leftButton = true
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        backwardButton = true
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        rightButton = true
    }
}
function showButtons () {
    basic.showLeds(`
        . # # # .
        # . # . #
        # # . # #
        # . # . #
        . # # # .
        `)
}
function setPins () {
    pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
}
function buttonCheck () {
    setVarsToPins()
    if (forwardButton) {
        radio.sendString("310")
        forwardButton = false
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        basic.pause(100)
    } else if (backwardButton) {
        radio.sendString("410")
        backwardButton = false
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        basic.pause(100)
    } else if (rightButton) {
        radio.sendString("210")
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        basic.pause(100)
        rightButton = false
    } else if (leftButton) {
        radio.sendString("" + LEFT + "10")
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        basic.pause(100)
        leftButton = false
    } else {
        sendStop()
    }
}
let stickControl = false
let leftButton = false
let rightButton = false
let backwardButton = false
let forwardButton = false
let btgroupnum = 0
let done = 0
let LEFT = ""
LEFT = "1"
let RIGHT = "2"
let FORWARD = "3"
let BACKWARD = "4"
let DAMAGE = "5"
radio.setGroup(1)
setPins()
setBTGroup()
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        if (stickControl) {
            stickControl = false
        } else {
            stickControl = true
        }
    }
    if (stickControl) {
        showStick()
        stickCheck()
    } else if (input.buttonIsPressed(Button.B)) {
        showButtons()
        incremental()
    } else {
        showButtons()
        buttonCheck()
    }
})
