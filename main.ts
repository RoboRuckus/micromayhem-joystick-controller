function showStick () {
    basic.showLeds(`
        . # # # .
        # # # # #
        . # # # .
        . . # . .
        . . # . .
        `)
}
function multiple (maximumAmount: number) {
    for (let index = 0; index <= maximumAmount; index++) {
        setVarsToPins()
        if (direction == "empty") {
            continue;
        } else if (amount == maximumAmount) {
            amount = 0
            basic.showLeds(`
                . # # # .
                # . . . #
                # . . . #
                # . . . #
                . # # # .
                `)
            continue;
        } else if (direction == currentButton) {
            amount += 1
        }
        if (direction == FORWARD) {
            forward_arrow()
        } else if (direction == BACKWARD) {
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
        } else {
            display_left_right_arrow()
        }
        basic.pause(500)
    }
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
    if (direction == FORWARD) {
        radio.sendString("300")
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            `)
        basic.pause(100)
    } else if (direction == BACKWARD) {
        radio.sendString("400")
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . #
            . # . # .
            . . # . .
            `)
        basic.pause(100)
    } else if (direction == RIGHT) {
        radio.sendString("200")
        basic.showLeds(`
            . . # . .
            . . . # .
            . . . . #
            . . . # .
            . . # . .
            `)
        basic.pause(100)
    } else if (direction == LEFT) {
        radio.sendString("100")
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
    direction = "empty"
}
function sendStop () {
    radio.sendString("S")
}
function setVarsToPins () {
    if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        direction = LEFT
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        direction = BACKWARD
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        direction = RIGHT
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        direction = FORWARD
    } else {
        direction = "empty"
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
function forward_arrow () {
    if (amount == 1) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            `)
    } else if (amount == 2) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . # . #
            . # . # .
            # . . . #
            `)
    } else if (amount == 3) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            # # . # #
            # . . . #
            `)
    }
}
function buttonCheck () {
    setVarsToPins()
    currentButton = direction
    if (direction == FORWARD) {
        multiple(3)
        if (amount != 0) {
            radio.sendString("" + FORWARD + ("" + amount + "0"))
        }
    } else if (direction == BACKWARD) {
        multiple(1)
        if (amount != 0) {
            radio.sendString("" + BACKWARD + ("" + amount + "0"))
        }
    } else if (direction == RIGHT) {
        multiple(2)
        if (amount != 0) {
            radio.sendString("" + RIGHT + ("" + amount + "0"))
        }
    } else if (direction == LEFT) {
        multiple(2)
        if (amount != 0) {
            radio.sendString("" + LEFT + ("" + amount + "0"))
        }
    } else {
        sendStop()
    }
    direction = "empty"
    amount = 0
}
function display_left_right_arrow () {
    if (amount == 2) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # . #
            # . . # #
            # . . . #
            `)
    } else if (direction == LEFT) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (direction == RIGHT) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    }
}
let stickControl = false
let btgroupnum = 0
let done = 0
let currentButton = ""
let amount = 0
let direction = ""
let BACKWARD = ""
let FORWARD = ""
let RIGHT = ""
let LEFT = ""
LEFT = "1"
RIGHT = "2"
FORWARD = "3"
BACKWARD = "4"
let DAMAGE = "5"
direction = "empty"
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
