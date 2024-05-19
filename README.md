# SkyScope
A captivating tool to automatically align a telescope to view a celestial object, any time, any where, any thing.

### Demo Video
[SkyScope Demo](https://youtu.be/CmvtFA55fYE)

### Project Page
[SkyScope](https://taikai.network/hackbox/hackathons/hawkhacks/projects/clwdewjpl0dljuc0145ylzz1k/idea)

### Project Structure
- arduino/ Code for the Arduino microcontroller for talking between the motors and the computer. Use the ArduinoIDE to upload.
- vex/ Code for the vex brain to control the motors. Use the Vex VSCode extension.
- backend/ Code for the python backend (which also hosts the frontend client in html, js, and css). The code for the mobile phone attached to the telescope is also here, located in compass.html and compass.js. Run python3 server.py to host.
