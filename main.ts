function showStick() {
    basic.showLeds(`
        . # # # .
        # # # # #
        . # # # .
        . . # . .
        . . # . .
    `)
}

function incramental() {
    
    setVarsToPins()
    if (forwardButton == 0) {
        radio.sendString("slowForward")
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
        `)
        basic.pause(100)
        forwardButton = 1
    } else if (backwardButton == 0) {
        radio.sendString("slowBackward")
        backwardButton = 1
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . #
            . # . # .
            . . # . .
        `)
        basic.pause(100)
    } else if (rightButton == 0) {
        radio.sendString("oneDegreeRight")
        rightButton = 1
        basic.showLeds(`
            . . # . .
            . . . # .
            . . . . #
            . . . # .
            . . # . .
        `)
        basic.pause(100)
    } else if (leftButton == 0) {
        radio.sendString("oneDegreeLeft")
        leftButton = 1
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

function stickCheck() {
    if (pins.analogReadPin(AnalogPin.P2) > 550 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
        radio.sendValue("F", pins.analogReadPin(AnalogPin.P2))
        basic.showLeds(`
            . . # . .
            . # . # .
            # . # . #
            . . . . .
            . . # . .
        `)
    } else if (pins.analogReadPin(AnalogPin.P2) < 450 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
        radio.sendValue("B", pins.analogReadPin(AnalogPin.P2))
        basic.showLeds(`
            . . # . .
            . . . . .
            # . # . #
            . # . # .
            . . # . .
        `)
    } else if (pins.analogReadPin(AnalogPin.P1) < 450 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
        radio.sendValue("L", pins.analogReadPin(AnalogPin.P1))
        basic.showLeds(`
            . . # . .
            . # . . .
            # . # . #
            . # . . .
            . . # . .
        `)
    } else if (pins.analogReadPin(AnalogPin.P1) > 550 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
        radio.sendValue("R", pins.analogReadPin(AnalogPin.P1))
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

function sendStop() {
    radio.sendString("S")
}

function setVarsToPins() {
    
    forwardButton = pins.digitalReadPin(DigitalPin.P15)
    backwardButton = pins.digitalReadPin(DigitalPin.P13)
    rightButton = pins.digitalReadPin(DigitalPin.P14)
    leftButton = pins.digitalReadPin(DigitalPin.P16)
}

function showButtons() {
    basic.showLeds(`
        . # # # .
        # . # . #
        # # . # #
        # . # . #
        . # # # .
    `)
}

function setPins() {
    pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
}

function loop() {
    
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
        incramental()
    } else {
        showButtons()
        buttonCheck()
    }
    
}

function buttonCheck() {
    
    setVarsToPins()
    if (forwardButton == 0) {
        radio.sendString("FA")
        forwardButton = 1
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
        `)
        basic.pause(100)
    } else if (backwardButton == 0) {
        radio.sendString("BA")
        backwardButton = 1
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
        `)
        basic.pause(100)
    } else if (rightButton == 0) {
        radio.sendString("RA")
        rightButton = 1
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
        `)
        basic.pause(100)
    } else if (leftButton == 0) {
        radio.sendString("LA")
        leftButton = 1
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
        `)
        basic.pause(100)
    } else {
        sendStop()
    }
    
}

let leftButton = 0
let rightButton = 0
let backwardButton = 0
let forwardButton = 0
let stickControl = false
radio.setGroup(1)
stickControl = false
setPins()
basic.forever(function on_forever() {
    loop()
})
