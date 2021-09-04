def showStick():
    basic.show_leds("""
        . # # # .
        # # # # #
        . # # # .
        . . # . .
        . . # . .
    """)
def setPins():
    pins.set_pull(DigitalPin.P15, PinPullMode.PULL_UP)
    pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)
    pins.set_pull(DigitalPin.P14, PinPullMode.PULL_UP)
    pins.set_pull(DigitalPin.P16, PinPullMode.PULL_UP)
def setVarsToPins():
    global forwardButton, backwardButton, rightButton, leftButton
    if pins.digital_read_pin(DigitalPin.P15) == 0:
        forwardButton = True
    elif pins.digital_read_pin(DigitalPin.P13) == 0:
        backwardButton = True
    elif pins.digital_read_pin(DigitalPin.P14) == 0:
        rightButton = True
    elif pins.digital_read_pin(DigitalPin.P16) == 0:
        leftButton = True
def incremental():
    global forwardButton, backwardButton, rightButton, leftButton
    setVarsToPins()
    if forwardButton:
        radio.send_string("300")
        basic.show_leds("""
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
        """)
        basic.pause(100)
        forwardButton = False
    elif backwardButton:
        radio.send_string("400")
        backwardButton = False
        basic.show_leds("""
            . . . . .
            . . . . .
            # . . . #
            . # . # .
            . . # . .
        """)
        basic.pause(100)
    elif rightButton:
        radio.send_string("200")
        rightButton = False
        basic.show_leds("""
            . . # . .
            . . . # .
            . . . . #
            . . . # .
            . . # . .
        """)
        basic.pause(100)
    elif leftButton:
        radio.send_string("100")
        leftButton = False
        basic.show_leds("""
            . . # . .
            . # . . .
            # . . . .
            . # . . .
            . . # . .
        """)
        basic.pause(100)
    else:
        sendStop()
def stickCheck():
    if pins.analog_read_pin(AnalogPin.P2) > 550 and (pins.analog_read_pin(AnalogPin.P1) > 400 and pins.analog_read_pin(AnalogPin.P1) < 600):
        radio.send_value("forward", pins.analog_read_pin(AnalogPin.P2))
        basic.show_leds("""
            . . # . .
            . # . # .
            # . # . #
            . . . . .
            . . # . .
        """)
    elif pins.analog_read_pin(AnalogPin.P2) < 450 and (pins.analog_read_pin(AnalogPin.P1) > 400 and pins.analog_read_pin(AnalogPin.P1) < 600):
        radio.send_value("backward", pins.analog_read_pin(AnalogPin.P2))
        basic.show_leds("""
            . . # . .
            . . . . .
            # . # . #
            . # . # .
            . . # . .
        """)
    elif pins.analog_read_pin(AnalogPin.P1) < 450 and (pins.analog_read_pin(AnalogPin.P2) > 400 and pins.analog_read_pin(AnalogPin.P2) < 600):
        radio.send_value("left", pins.analog_read_pin(AnalogPin.P1))
        basic.show_leds("""
            . . # . .
            . # . . .
            # . # . #
            . # . . .
            . . # . .
        """)
    elif pins.analog_read_pin(AnalogPin.P1) > 550 and (pins.analog_read_pin(AnalogPin.P2) > 400 and pins.analog_read_pin(AnalogPin.P2) < 600):
        radio.send_value("right", pins.analog_read_pin(AnalogPin.P1))
        basic.show_leds("""
            . . # . .
            . . . # .
            # . # . #
            . . . # .
            . . # . .
        """)
    else:
        sendStop()
def sendStop():
    radio.send_string("S")

def showButtons():
    basic.show_leds("""
        . # # # .
        # . # . #
        # # . # #
        # . # . #
        . # # # .
    """)

def buttonCheck():
    global forwardButton, backwardButton, rightButton, leftButton
    setVarsToPins()
    if forwardButton:
        radio.send_string("310")
        forwardButton = False
        basic.show_leds("""
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
        """)
        basic.pause(100)
    elif backwardButton:
        radio.send_string("410")
        backwardButton = False
        basic.show_leds("""
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
        """)
        basic.pause(100)
    elif rightButton:
        radio.send_string("210")
        basic.show_leds("""
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
        """)
        basic.pause(100)
        rightButton = False
    elif leftButton:
        radio.send_string(LEFT+"10")
        
        basic.show_leds("""
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
        """)
        basic.pause(100)
        leftButton = False
    else:
        sendStop()

leftButton = False
rightButton = False
backwardButton = False
forwardButton = False
stickControl = False
LEFT = "1"
RIGHT = "2"
FORWARD = "3"
BACKWARD = "4"
DAMAGE = "5"
radio.set_group(1)
setPins()

def on_forever():
    global stickControl
    if input.button_is_pressed(Button.A):
        if stickControl:
            stickControl = False
        else:
            stickControl = True
    if stickControl:
        showStick()
        stickCheck()
    elif input.button_is_pressed(Button.B):
        showButtons()
        incremental()
    else:
        showButtons()
        buttonCheck()
basic.forever(on_forever)
