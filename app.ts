import { Request, Response, NextFunction } from 'express';
import indexRouter from "./routes/index";
import userRouter from './routes/users';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'dev' ? 'dev' : 'tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404)
        .send({
            status: 404,
            message: 'INVALID_ERROR',
        });
});

// error handler
app.use((err: Error, req:Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(503).send({
        status: 503,
        message: err.message,
    });
    
});

module.exports = app;
