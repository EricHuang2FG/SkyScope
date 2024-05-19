# ---------------------------------------------------------------------------- #
#                                                                              #
# 	Module:       main.py                                                      #
# 	Author:       Tait                                                         #
# 	Created:      5/18/2024, 12:59:15 AM                                       #
# 	Description:  V5 project                                                   #
#                                                                              #
# ---------------------------------------------------------------------------- #

# Library imports
from vex import *

# Brain should be defined by default
brain=Brain()

base = Motor(Ports.PORT1, GearSetting.RATIO_18_1, False)
pitch = Motor(Ports.PORT2, GearSetting.RATIO_18_1, False)

base.set_max_torque(25, PERCENT)
base.set_velocity(3, PERCENT)

pitch.set_max_torque(40, PERCENT)
pitch.set_velocity(2, PERCENT)

az_left = DigitalIn(brain.three_wire_port.g)
az_right = DigitalIn(brain.three_wire_port.f)
pt_up = DigitalIn(brain.three_wire_port.e)
pt_down = DigitalIn(brain.three_wire_port.b)

def loop():
  while True:
    if(az_left.value() == 1):
      base.spin(FORWARD)
    elif(az_right.value() == 1):
      base.spin(REVERSE)
    else:
      base.stop()
    
    if(pt_up.value() == 1):
      pitch.spin(FORWARD)
    elif(pt_down.value() == 1):
      pitch.spin(REVERSE)
    else:
      pitch.stop()

task = Thread(loop)
