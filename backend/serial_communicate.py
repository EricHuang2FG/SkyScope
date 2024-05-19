import serial

# DO NOT DELETE, NEED IT FOR LISTING PORTS
# import serial.tools.list_ports
# ports = serial.tools.list_ports.comports()

# for port, desc, hwid in sorted(ports):
#         print("{}: {} [{}]".format(port, desc, hwid))

def send_angle_to_mc(horizontal_angle, vertical_angle, current_horizontal_angle, current_vertical_angle):
  ser = serial.Serial("/dev/cu.usbmodem1101", 9600)
  ser.write(f"{horizontal_angle}|{vertical_angle}|{current_horizontal_angle}|{current_vertical_angle}\0".encode())
  # print(f"{horizontal_angle}|{vertical_angle}|{current_horizontal_angle}|{current_vertical_angle}\0")
  ser.close()
