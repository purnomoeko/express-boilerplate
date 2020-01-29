import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    const { value } = req.body;
    res.status(200)
        .send({
            status: 200,
            message: 'HOME_PAGE_PRINTED',
            value,
        });
});

module.exports = router;
export default router;

