function handleOrientation(event) {
  const absolute = event.absolute;
  const alpha = event.alpha;
  const beta = event.beta;
  const gamma = event.gamma;
  
  console.log(absolute);
  console.log(alpha);
  console.log(beta);
  console.log(gamma);
}

window.addEventListener("deviceorientation", handleOrientation, true);
