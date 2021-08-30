//  Which radio group to transmit to, will need to vary this between bots
let RADIO_GROUP = 90
//  We can only transmit numbers via send_value, create ENUM
let LEFT = 0
let RIGHT = 1
let FORWARD = 0
let BACKWARD = 1
//  Joystick Related
let JOYSTICK_DEADZONE = 20
let MANUAL_CONTROL = false
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
    input.onButtonPressed(Button.B, function toggle_joystick() {
        
        MANUAL_CONTROL = !MANUAL_CONTROL
        basic.clearScreen()
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
function joystick_x(): number {
    //  return input.acceleration(Dimension.X)
    return -(joystickbit.getRockerValue(joystickbit.rockerType.X) - 500)
}

function joystick_y() {
    //  return input.acceleration(Dimension.Y)
    return -(joystickbit.getRockerValue(joystickbit.rockerType.Y) - 500)
}

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

function direction_arrow() {
    let straight = -joystick_y()
    let turn = joystick_x()
    if (straight > JOYSTICK_DEADZONE) {
        if (turn > JOYSTICK_DEADZONE) {
            basic.showLeds(`
                            . # # # #
                            . . . # #
                            . . # . #
                            . # . . #
                            # . . . .
                            `)
        } else if (turn < -JOYSTICK_DEADZONE) {
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
        
    } else if (straight < -JOYSTICK_DEADZONE) {
        if (turn > JOYSTICK_DEADZONE) {
            basic.showLeds(`
                            # . . . .
                            . # . . #
                            . . # . #
                            . . . # #
                            . # # # #
                            `)
        } else if (turn < -JOYSTICK_DEADZONE) {
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
        
    } else if (turn > JOYSTICK_DEADZONE) {
        basic.showLeds(`
                            . . # . .
                            . . . # .
                            # # # # #
                            . . . # .
                            . . # . .
                            `)
    } else if (turn < -JOYSTICK_DEADZONE) {
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
    let straight = -joystick_y()
    let turn = joystick_x()
    if (Math.abs(straight) > JOYSTICK_DEADZONE) {
        send_message("straight", straight)
    } else {
        send_message("straight", 0)
    }
    
    if (Math.abs(turn) > JOYSTICK_DEADZONE) {
        send_message("turn", turn)
    } else {
        send_message("turn", 0)
    }
    
}

setup()
basic.forever(function loop() {
    if (MANUAL_CONTROL == true) {
        direction_arrow()
        send_direction()
    }
    
})
