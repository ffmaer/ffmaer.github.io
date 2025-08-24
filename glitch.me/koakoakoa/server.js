const Koa = require('koa');
const app = new Koa();
app.proxy = true;
// response
app.use(ctx => {
  console.log(ctx.ips);
  ctx.body = `${ctx.ips}`;
});

app.listen(3000);