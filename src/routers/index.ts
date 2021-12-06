import Router from 'koa-router';

import ViewRouter from './view/index';

const router = new Router();

router.use('/view', ViewRouter.routes(), ViewRouter.allowedMethods());

export default router;
