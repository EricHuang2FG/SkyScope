import serial
# import serial.tools.list_ports
# ports = serial.tools.list_ports.comports()

# for port, desc, hwid in sorted(ports):
#         print("{}: {} [{}]".format(port, desc, hwid))

def send_angle_to_mc(horizontal_angle, vertical_angle):
  ser = serial.Serial("/dev/cu.usbmodem101")
  ser.write(f"{horizontal_angle},{vertical_angle}\n".encode())
  print(ser.readline().decode())
  ser.close()


send_angle_to_mc(20, 20)