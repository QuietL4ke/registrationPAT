import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const MongoString: string = process.env.MongoString ?? '';
let pendingConnection: Promise<typeof import('mongoose')> | undefined =
    undefined;

export const getDBConnection = async (): Promise<typeof import('mongoose')> => {
    if (pendingConnection) {
        return pendingConnection;
    }

    pendingConnection = mongoose.connect(MongoString);

    return pendingConnection;
};

export interface IUser {
    name: string;
    email: string;
    hash: string;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            index: true,
        },
        hash: String,
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    const user = this;
    user.hash = await bcrypt.hash(user.hash, 12);
    next();
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
