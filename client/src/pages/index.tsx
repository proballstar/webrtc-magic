import { useState } from "react";


function App() {
  const [name, setName] = useState<string>("");
  const [media, setMedia] = useState<MediaRecorder>(null);

  const [anchor, setAnchor] = useState(<></>);

  async function a() {
    let videoStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "monitor",
        cursor: "always",
        width: { ideal: 1920, max: 1920 },
    height: { ideal: 1080, max: 1080 }
      }
    })

    const chunks = []

    setMedia(() => {
      const m: MediaRecorder = new MediaRecorder(videoStream)
      console.log(m)
      console.log("START")
      m.ondataavailable = e => {
        console.log(e);
        chunks.push(e.data)
      }
      m.onstop = (ev) => {
        // window.clearTimeout(timoutStop);
        let blob = new Blob(chunks, { type: "video/mp4" });
        console.log(blob)
        videoStream.getTracks().forEach(function (track) {
            track.stop();
        });
        var url = URL.createObjectURL(blob);
        setAnchor(<a href={url} download="test.mp4">
          Download
        </a>)

    }
      m.start(10);
      return m;
    })
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <button
        onClick={() => a()}
      >
        Connect
      </button>
      <button
        onClick={() => media.stop()}
      >
        Disconnected
      </button>
      {anchor}
    </div>
  );
}

export default App;
