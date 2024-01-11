import express, { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser, UserModel, getDBConnection } from './src/db';

const app: Application = express();

const db = getDBConnection();

const tokenKey: string | undefined = process.env.JWT_SECRET_KEY;

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

type ModifiedRequest = Request & {
    user?: IUser;
}

app.use(async (req, res, next) => {
    if (!tokenKey) {
        return res.status(500).send('Error with auth token');
    }
    if (req.headers?.authorization) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            tokenKey,
            async (err, payload) => {
                if (err) next();
                else if (payload) {
                    const user = await UserModel.findById(payload);
                    if (user) {
                        (req as any).user = user;
                    }
                    next();
                }
            }
        );
    } else {
        next();
    }
});

app.post('/auth/login', async (req, res) => {
    if ((req as any).user)
        return res.status(200).json({ message: 'Already Sign in' });
    try {
        const password = req.body.password;
        const email = req.body.email;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const hash = user.hash;
            const isPasswordCorrect = await bcrypt.compare(password, hash);
            if (isPasswordCorrect) {
                const newToken = jwt.sign(user._id.toString(), tokenKey!);

                return res.status(200).json({
                    token: newToken,
                    name: user.name
                })
            }
        }
        return res
            .status(401)
            .json({ message: 'User not found or password is invalid' });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

app.post('/auth/register', async (req, res) => {
    try {
        const email = req.body.email;
        const hash = req.body.password;
        const name = req.body.username;
        const userWithEmail = await UserModel.findOne({ email: email });

        if (userWithEmail) {
            return res.status(409).send('User already exists');
        }
        const user: IUser = {
            email,
            hash,
            name,
        };

        await UserModel.create(user);

        res.status(200).send('User successfully created');
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

app.get('/', (req, res) => {
    const user: any = (req as any).user;

    if (user) {
        return res.status(200).json(user);
    }

    return res.status(401).send('Sign in Please!');
});

app.listen(process.env.PORT, () =>
    console.log(`Server running at port ${process.env.PORT}`)
);
