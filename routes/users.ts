import { Router, Response, Request, NextFunction } from "express";

const router = Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
        status: 200,
        message: 'LISTING_USER',
    });
});

module.exports = router;
export default router;
