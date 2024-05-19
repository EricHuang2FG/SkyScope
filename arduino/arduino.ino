int AZ_LEFT = 2;
int AZ_RIGHT = 3;
int PT_UP = 4;
int PT_DOWN = 5;

char buffer[512];
int indexBuffer = 0;

float targetBearing = 0.0f;
float targetPitch = 0.0f;

float currentBearing = 0.0f;
float currentPitch = 0.0f;

float deadzone = 2.0f;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(AZ_LEFT, OUTPUT);
  pinMode(AZ_RIGHT, OUTPUT);
  pinMode(PT_UP, OUTPUT);
  pinMode(PT_DOWN, OUTPUT);

  digitalWrite(AZ_LEFT, LOW);
  digitalWrite(AZ_RIGHT, LOW);
  digitalWrite(PT_UP, LOW);
  digitalWrite(PT_DOWN, LOW);

  while(!Serial) {
    delay(5);  
  }
}

void parseInput() {

    int offset = 0;
    char *token = strtok(buffer, "|");
    while(token != NULL) {
    float f = atof(token);

      switch(offset) {
        case 0:
          targetBearing = f;
          break;
        case 1:
          targetPitch = f;
          break;
        case 2:
          currentBearing = f;
          break;
        case 3:
          currentPitch = f;
          break;  
      }
      token = strtok(NULL, "|");
      offset++;
    }
}

void loop() {
  while(Serial.available()) {
    int c = Serial.read();

    if(c == '\n' || c == '\r') c = 0;
    
    buffer[indexBuffer++] = c;

    if(c == 0) {
      parseInput();
      indexBuffer = 0;  
    }
  }

  if (abs(targetBearing - currentBearing) < 2) {
    digitalWrite(AZ_LEFT, LOW);
    digitalWrite(AZ_RIGHT, LOW);  
  } else if(targetBearing < currentBearing) {
    digitalWrite(AZ_LEFT, LOW);
    digitalWrite(AZ_RIGHT, HIGH);  
  } else {  
    digitalWrite(AZ_LEFT, HIGH);
    digitalWrite(AZ_RIGHT, LOW);
  }

  if (abs(targetPitch - currentPitch) < 10) {
    digitalWrite(PT_DOWN, LOW);
    digitalWrite(PT_UP, LOW);  
  } else if(targetPitch > currentPitch) {
    digitalWrite(PT_DOWN, LOW);
    digitalWrite(PT_UP, HIGH);  
  } else {  
    digitalWrite(PT_DOWN, HIGH);
    digitalWrite(PT_UP, LOW);
  }
}
