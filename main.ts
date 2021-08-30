//  The following extensions are required:
//  * MaqueenPlus
//  This program is not block-code compatible.
let DEADZONE = 20
let RADIO_GROUP = 90
function x_input(): number {
    //  return input.acceleration(Dimension.X)
    return -(joystickbit.getRockerValue(joystickbit.rockerType.X) - 500)
}

function y_input() {
    //  return input.acceleration(Dimension.Y)
    return -(joystickbit.getRockerValue(joystickbit.rockerType.Y) - 500)
}

function setup() {
    radio.setGroup(RADIO_GROUP)
    joystickbit.initJoystickBit()
    basic.showIcon(IconNames.Heart)
}

function direction_arrow() {
    let straight = -y_input()
    let turn = x_input()
    if (straight > DEADZONE) {
        if (turn > DEADZONE) {
            basic.showLeds(`
                            . # # # #
                            . . . # #
                            . . # . #
                            . # . . #
                            # . . . .
                            `)
        } else if (turn < -DEADZONE) {
            basic.showLeds(`
                            # # # # .
                            # # . . .
                            # . # . .
                            # . . # .
                            . . . . #
                            `)
        } else {
            basic.showLeds(`
                            . . # . .
                            . # # # .
                            # . # . #
                            . . # . .
                            . . # . .
                            `)
        }
        
    } else if (straight < -DEADZONE) {
        if (turn > DEADZONE) {
            basic.showLeds(`
                            # . . . .
                            . # . . #
                            . . # . #
                            . . . # #
                            . # # # #
                            `)
        } else if (turn < -DEADZONE) {
            basic.showLeds(`
                            . . . . #
                            # . . # .
                            # . # . .
                            # # . . .
                            # # # # .
                            `)
        } else {
            basic.showLeds(`
                            . . # . .
                            . . # . .
                            # . # . #
                            . # # # .
                            . . # . .
                            `)
        }
        
    } else if (turn > DEADZONE) {
        basic.showLeds(`
                            . . # . .
                            . . . # .
                            # # # # #
                            . . . # .
                            . . # . .
                            `)
    } else if (turn < -DEADZONE) {
        basic.showLeds(`
                            . . # . .
                            . # . . .
                            # # # # #
                            . # . . .
                            . . # . .
                            `)
    } else {
        basic.showLeds(`
                            . # # # .
                            # . . . #
                            # . . . #
                            # . . . #
                            . # # # .
                            `)
    }
    
}

function send_direction() {
    let straight = -y_input()
    let turn = x_input()
    if (Math.abs(straight) > DEADZONE) {
        radio.sendValue("straight", straight)
    } else {
        radio.sendValue("straight", 0)
    }
    
    if (Math.abs(turn) > DEADZONE) {
        radio.sendValue("turn", turn)
    } else {
        radio.sendValue("turn", 0)
    }
    
}

setup()
basic.forever(function loop() {
    direction_arrow()
    send_direction()
})
