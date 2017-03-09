import orderRouter from './orders.js';
import uploadRouter from './upload.js';
import adminRouter from './admin';

export default function routes (router, passport) {
  router.use('/api', orderRouter);

  router.use('/uploads', function (req, res, next) {
    uploadRouter(router);
  });

  router.use('/admin', adminRouter);
}
