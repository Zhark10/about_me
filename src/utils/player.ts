import { COLORS } from "../global/colors";

const INITIAL = {
  bars: 150,
  bar_width: 5,
  canvasWidth: window.innerHeight * 0.15,
  canvasHeight: window.innerHeight * 0.15,
  lineColor: COLORS.main,
};

export const initAudioPlayer = (
  musicSrc: any,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  setColor: any,
  audioRef: React.RefObject<HTMLAudioElement>
) => {
  const audio: HTMLAudioElement = audioRef.current!;
  window.AudioContext =
    window.AudioContext || (window as any).webkitAudioContext;
  const context = new (window as any).AudioContext();
  audio.src = musicSrc;

  audio.addEventListener(
    "loadeddata",
    async () => {
      const source = await context.createMediaElementSource(audio);
      const analyser = await context.createAnalyser();
      const frequency_array = new Uint8Array(analyser.frequencyBinCount);
      audio.play();

      source.connect(analyser);
      analyser.connect(context.destination);

      animationLooper(canvasRef, analyser, frequency_array, setColor);
    },
    false
  );
  audio.addEventListener("ended", () => audio.play());
};

function animationLooper(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  analyser: AnalyserNode,
  frequency_array: Uint8Array,
  setColor: any
) {
  const canvas = canvasRef.current!;
  const ctx = canvas.getContext("2d");
  const center_x = INITIAL.canvasWidth / 2;
  const center_y = INITIAL.canvasHeight / 2;

  canvas.width = INITIAL.canvasWidth;
  canvas.height = INITIAL.canvasHeight;

  // style the background
  ctx?.fillRect(0, 0, INITIAL.canvasWidth, INITIAL.canvasHeight);
  ctx!.fillStyle = COLORS.main;

  //draw a circle
  ctx?.beginPath();
  ctx?.stroke();

  analyser.getByteFrequencyData(frequency_array);
  for (let i: number = 0; i < INITIAL.bars; i++) {
    //divide a circle into equal parts
    const rads = (Math.PI * 2) / INITIAL.bars;

    const bar_height = frequency_array[i] * 0.13;
    const randomRadius = frequency_array[20] * 0.13;

    // if(frequency_array[])
    if (randomRadius < 15) {
      INITIAL.bar_width = 1;
      INITIAL.lineColor = COLORS.main;
      setColor("rgba(245, 215, 110, 0.6)");
    } else if (randomRadius > 15 && randomRadius < 23) {
      INITIAL.bar_width = 3;
      INITIAL.lineColor = "rgb(62, 106, 171)";
      setColor("rgba(62, 106, 171, 0.6)");
    } else {
      INITIAL.bar_width = 5;
      INITIAL.lineColor = "rgb(62, 106, 71)";
      setColor("rgba(62, 106, 71, 0.6)");
    }

    const _center_x = center_x;
    const _center_y = center_y;

    // set coordinates
    const x = _center_x + Math.cos(rads * i) * randomRadius;
    const y = _center_y + Math.sin(rads * i) * randomRadius;
    const x_end = _center_x + Math.cos(rads * i) * (randomRadius + bar_height);
    const y_end = _center_y + Math.sin(rads * i) * (randomRadius + bar_height);

    //draw a bar
    drawBar(x, y, x_end, y_end, ctx!);
  }
  window.requestAnimationFrame(() =>
    animationLooper(canvasRef, analyser, frequency_array, setColor)
  );
}

function drawBar(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.strokeStyle = INITIAL.lineColor;
  ctx.lineWidth = INITIAL.bar_width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
