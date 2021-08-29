let RADIO_GROUP = 90
let LEFT = 0
let RIGHT = 1
let FORWARD = 0
let BACKWARD = 1
function setup() {
    basic.showIcon(IconNames.Heart)
    radio.setGroup(RADIO_GROUP)
    radio.onReceivedValue(function receive_message(key: string, value: number) {
        if (key == "turning") {
            show_turning(value)
        } else if (key == "moving") {
            show_moving(value)
        } else if (key == "done") {
            basic.clearScreen()
        }
        
    })
    joystickbit.initJoystickBit()
    joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function turn_left_90() {
        basic.showIcon(IconNames.Square)
        send_message("turn", LEFT)
        basic.clearScreen()
    })
    joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function move_forward() {
        basic.showIcon(IconNames.Triangle)
        send_message("move", FORWARD)
        basic.clearScreen()
    })
    joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function move_backward() {
        basic.showIcon(IconNames.No)
        send_message("move", BACKWARD)
        basic.clearScreen()
    })
    joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function turn_right_90() {
        basic.showLeds(`
                  . # # # .
                  # . . . #
                  # . . . #
                  # . . . #
                  . # # # .
                  `)
        send_message("turn", RIGHT)
        basic.clearScreen()
    })
    basic.clearScreen()
}

//  def calibrate():
//  def loop():
function send_message(key: string, value: number) {
    radio.sendValue(key, value)
}

function show_turning(value: number) {
    if (value == LEFT) {
        basic.showLeds(`
                    . . # . .
                    . # . . .
                    # # # # #
                    . # . . .
                    . . # . .
                    `)
    } else if (value == RIGHT) {
        basic.showLeds(`
                    . . # . .
                    . . . # .
                    # # # # #
                    . . . # .
                    . . # . .
                    `)
    }
    
}

function show_moving(value: number) {
    if (value == FORWARD) {
        basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
    } else if (value == BACKWARD) {
        basic.showLeds(`
                    . . # . .
                    . . # . .
                    # . # . #
                    . # # # .
                    . . # . .
                    `)
    }
    
}

setup()
