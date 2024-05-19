function stop() {
    return new Promise(async (resolve, reject) => {
        fetch("https://localhost:9001/stop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      resolve(data)
    })
    .catch(error => {
      console.error("Error:", error);
      reject(error)
    });
    })
}

async function back() {
    await stop()
    window.location.href = '/'
}

document.getElementById("stop-tracking").addEventListener("click", stop)
document.getElementById("track-new").addEventListener("click", back)