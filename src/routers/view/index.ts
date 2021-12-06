import canvas from 'canvas';
import { Context } from 'koa';
import Router from 'koa-router';
import moment from 'moment';

const router = new Router();

const ePaper7in5Width = 800;
const ePaper7in5Height = 480;

router.get(
  '/ePaper7in5/test',
  async (ctx: Context, next: () => Promise<void>) => {
    ctx.body = `<html>
    <head></head>
    <body>
      <canvas id="canvas" height="480" width="800" />
      <script>
        const width = ${ePaper7in5Width};
        const height = ${ePaper7in5Height};
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#000000";
        console.log(canvas);
        fetch('/view/ePaper7in5/getId')
        .then(res => res.json())
          .then(async (id) => {
            console.log(id);
            for (let page = 0; page < 10; page++) {
                await fetch('/view/ePaper7in5?id=' + id + '&page=' + page)
                .then(res => res.text())
                .then((data) => {
                    console.log(data);
                    for (const index in data) {
                        const d = data[index];
                        if (d === '1') {
                            const x = index % width;
                            const y = index / width + page * height / 10;
                            ctx.fillRect(x, y, 1, 1);
                        }
                    }
                });
            }
          });
      </script>
    </body>
  </html>`;
    await next();
  }
);

const resList: {
  imgData: Uint8ClampedArray;
  id: string;
}[] = [];

const makeData = (text?: string) => {
  const id = text ? text : moment().format('YYYYMMDDHHmmss');
  const canvasEle = canvas.createCanvas(ePaper7in5Width, ePaper7in5Height);
  const context = canvasEle.getContext('2d');
  let item;
  context.textAlign = 'center';
  context.font = '30px Arial';
  if (text) {
    context.fillText(text, 400, 440);
    item = {
      id,
      imgData: context.getImageData(0, 0, ePaper7in5Width, ePaper7in5Height)
        .data,
    };
  } else {
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(200, 400);
    context.lineTo(200, 200);
    context.lineTo(150, 200);
    context.lineTo(400, 50);
    context.lineTo(650, 200);
    context.lineTo(600, 200);
    context.lineTo(600, 400);
    context.moveTo(320, 400);
    context.lineTo(320, 300);
    context.lineTo(480, 300);
    context.lineTo(480, 400);
    context.stroke();
    context.fillText(
      `当前时间：${moment().format('YYYY-MM-DD HH:mm')}`,
      400,
      440
    );
    const { data: imgData } = context.getImageData(
      0,
      0,
      ePaper7in5Width,
      ePaper7in5Height
    );
    item = {
      id,
      imgData,
    };
    resList.push(item);
    if (resList.length > 10) {
      resList.shift();
    }
  }
  return item;
};

router.get(
  '/ePaper7in5/getId',
  async (ctx: Context, next: () => Promise<void>) => {
    const res = resList[resList.length - 1];
    if (res) {
      ctx.body = res.id;
    } else {
      const item = makeData();
      ctx.body = item.id;
    }
    await next();
  }
);

setInterval(makeData, 60000);

router.get('/ePaper7in5', async (ctx: Context, next: () => Promise<void>) => {
  const imageStr = [];
  const page = parseInt(ctx.query.page as string);
  const id = ctx.query.id as string;
  const item = resList.find((r) => r.id === id) || makeData('获取数据失败');
  if (item) {
    const { imgData } = item;
    try {
      for (
        let i = (page * ePaper7in5Width * ePaper7in5Height) / 10;
        i < ((page + 1) * ePaper7in5Width * ePaper7in5Height) / 10;
        i++
      ) {
        const a = imgData[i * 4 + 3];
        if (a > 2) {
          imageStr.push('1');
        } else {
          imageStr.push('0');
        }
      }
    } catch (err) {
      console.log(err);
    }
    //   console.log(imageStr.length);
    // console.log('b', ctx.query.page, imageStr.length);
    ctx.body = imageStr.join('');
  }
  await next();
});

export default router;
