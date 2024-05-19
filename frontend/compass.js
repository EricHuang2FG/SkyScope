let server = `localhost`
let heading = 0;
let pitch = 0;

const run = () => {
  if ("AbsoluteOrientationSensor" in window) {
    let compass = new AbsoluteOrientationSensor();
    compass.addEventListener("reading", function (e) {
      let q = e.target.quaternion;

      console.log(e.target);

      heading =
        Math.atan2(
          2 * q[0] * q[1] + 2 * q[2] * q[3],
          1 - 2 * q[1] * q[1] - 2 * q[2] * q[2]
        ) *
        (180 / Math.PI);

        document.innerHTML = heading
    });

    compass.start();

    console.log("compass created");
  } else {
    alert("not supported");
  }

  // if ("Accelerometer" in window) {
  //   let accelerometer = new Accelerometer();
  //   accelerometer.addEventListener("reading", function (e) {
  //     pitch = e.target.y;

  //     document.innerHTML = pitch;
  //   });

  //   accelerometer.start();

  //   console.log("accelerometer created");
  // } else {
  //   alert("not supported");
  // }

  window.addEventListener("deviceorientation", (event) => {
    pitch = event.beta
  }, true)
};

const setup = async () => {
  server = prompt("server");
 
  const permissions = await Promise.all([
    navigator.permissions.query({ name: "accelerometer" }),
    navigator.permissions.query({ name: "magnetometer" }),
    navigator.permissions.query({ name: "gyroscope" }),
  ]);

  if (permissions.every((result) => result.state === "granted")) {
    console.log('success')
    run();
    setInterval(update, 2000);
  } else {
    console.log("No permissions to use sensors.");
  }
};

const update = async () => {
  const request = await fetch(`https://${server}/angles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"horizontal_angle": heading, "vertical_angle": pitch})
  })
 
  const response = await request.json()
};

document.getElementById("start").addEventListener("click", setup)