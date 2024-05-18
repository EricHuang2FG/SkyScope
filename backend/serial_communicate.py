import serial

def send_angle_to_mc(horizontal_angle, vertical_angle):
  ser = serial.Serial("/dev/cu.usbmodem101")
  ser.write(f"{horizontal_angle},{vertical_angle}\n".encode())
  print(ser.readline().decode())
  ser.close()
