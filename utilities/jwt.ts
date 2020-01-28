import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

import { config } from 'dotenv';

// You can generate public and private key here http://travistidwell.com/jsencrypt/demo/
class JWT {
    private privateKey;
    private publicKey;
    constructor() {
        const { parsed } = config();
        this.privateKey = readFileSync(parsed.PRIVATE_KEY);
        this.publicKey = readFileSync(parsed.PUBLIC_KEY);
    }

    sign(userId: string, phoneNumber: string, role = "Regular", expiresIn = "30d") {
        const token = jwt.sign(
            { userId, phoneNumber, role },
            this.privateKey, {
                issuer: userId,
                subject: "signIn",
                audience: phoneNumber,
                expiresIn,
                algorithm: "RS256"
            });
        return token;
    }

    verify(token: string, userId: string, phoneNumber: string) {
        const result = jwt.verify(token, this.publicKey, {
            issuer: userId,
            subject: "signIn",
            audience: phoneNumber,
            expiresIn: "30d",
            algorithm: "RS256"
        });
        return result;
    }

    decode(token: string) {
        return jwt.decode(token);
    }
}

export default JWT;
