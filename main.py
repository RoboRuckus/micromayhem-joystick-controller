RADIO_GROUP = 90
LEFT = 0
RIGHT = 1
FORWARD = 0
BACKWARD = 1

def setup():
  basic.show_icon(IconNames.HEART)
  radio.set_group(RADIO_GROUP)
  radio.on_received_value(receive_message)
  joystickbit.init_joystick_bit()
  joystickbit.on_button_event(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.DOWN, turn_left_90)
  joystickbit.on_button_event(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.DOWN, move_forward)
  joystickbit.on_button_event(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.DOWN, move_backward)
  joystickbit.on_button_event(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.DOWN, turn_right_90)
  basic.clear_screen()

# def calibrate():

# def loop():

def send_message(key, value):
  radio.send_value(key, value)

def receive_message(key, value):
  if key == 'turning':
    show_turning(value)
  elif key == 'moving':
    show_moving(value)
  elif key == 'done':
    basic.clear_screen()

def show_turning(value):
  if value == LEFT:
    basic.show_leds("""
                    . . # . .
                    . # . . .
                    # # # # #
                    . # . . .
                    . . # . .
                    """)
  elif value == RIGHT:
    basic.show_leds("""
                    . . # . .
                    . . . # .
                    # # # # #
                    . . . # .
                    . . # . .
                    """)

def show_moving(value):
  if value == FORWARD:
    basic.show_leds("""
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    """)
  elif value == BACKWARD:
    basic.show_leds("""
                    . . # . .
                    . . # . .
                    # . # . #
                    . # # # .
                    . . # . .
                    """)

def move_forward():
  basic.show_icon(IconNames.TRIANGLE)
  send_message('move', FORWARD)
  basic.clear_screen()

def move_backward():
  basic.show_icon(IconNames.NO)
  send_message('move', BACKWARD)
  basic.clear_screen()

def turn_right_90():
  basic.show_leds("""
                  . # # # .
                  # . . . #
                  # . . . #
                  # . . . #
                  . # # # .
                  """)
  send_message('turn', RIGHT)
  basic.clear_screen()

def turn_left_90():
  basic.show_icon(IconNames.SQUARE)
  send_message('turn', LEFT)
  basic.clear_screen()

setup()
# basic.forever(loop)
