import jwt from 'jsonwebtoken';

const DEFAULT_EXPIRY = '7d';

export const generateToken = (user, expiresIn = DEFAULT_EXPIRY) => {
    const token = jwt.sign(
        {
            user,
        },
        process.env.SHARED_JWT_SECRET,
        { expiresIn }
    );

    return token;
};
