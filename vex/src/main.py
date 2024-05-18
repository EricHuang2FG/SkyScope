# ---------------------------------------------------------------------------- #
#                                                                              #
# 	Module:       main.py                                                      #
# 	Author:       rui                                                          #
# 	Created:      5/18/2024, 10:03:54 AM                                       #
# 	Description:  V5 project                                                   #
#                                                                              #
# ---------------------------------------------------------------------------- #

# Library imports
from vex import *

# Brain should be defined by default
brain = Brain()

horizontal_drive = Motor(Ports.PORT20, GearSetting.RATIO_18_1, True)
vertical_drive = Motor(Ports.PORT19, GearSetting.RATIO_18_1, True)

horizontal_drive.set_max_torque(20, PERCENT)
vertical_drive.set_max_torque(20, PERCENT)
speed = 1

def move_motor(enable_horizontal, horizontal_forward, enable_vertical, vertical_forward):
    if enable_horizontal:
        if horizontal_forward:
            horizontal_drive.spin(FORWARD, speed, PERCENT)
        else:
            horizontal_drive.spin(REVERSE, speed, PERCENT)
    else:
        horizontal_drive.stop()
    if enable_vertical:
        if vertical_forward:
            vertical_drive.spin(FORWARD, speed, PERCENT)
        else:
            vertical_drive.spin(REVERSE, speed, PERCENT)
    else:
        horizontal_drive.stop()

# brain.screen.print("Hello V5")