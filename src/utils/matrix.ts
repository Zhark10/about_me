export const matrixRun = (canvas: React.RefObject<HTMLCanvasElement>) => {

    let ctx = canvas.current!.getContext('2d')!;
    let letters: any = '01';
    let height = canvas.current!.height = window.innerHeight;
    let width = canvas.current!.width = window.innerWidth;
    let font_size = 16;
    let columns = width / font_size;
    let drops: any = [];
    let frame = 1;

    letters = letters.split("");

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    clear();

    function draw() {
        if (frame === 1) {
            clear();
            showLetters();
        } else if (frame === 2) {
            frame = 0;
        }

        frame++;
        window.requestAnimationFrame(draw);
    }

    function showLetters() {
        ctx.fillStyle = 'rgba(245, 215, 110, 0.2)';
        ctx.font = font_size + "px arial";

        for (let i = 0; i < drops.length; i++) {
            let text = letters[Math.floor(Math.random() * letters.length)];
            let textPosY = drops[i] * font_size;

            ctx.fillText(text, i * font_size, textPosY);

            if (textPosY > height && Math.random() > 0.956) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    function clear() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, width, height);
    }

    window.requestAnimationFrame(draw);
    window.addEventListener('resize', function () {
        height = canvas.current!.height = window.innerHeight;
        width = canvas.current!.width = window.innerWidth;
    })
}