import { readFileSync } from 'fs';

import { config } from 'dotenv';
import { sign, decode, verify } from 'jsonwebtoken';

// You can generate public and private key here http://travistidwell.com/jsencrypt/demo/
class JWT {
    private privateKey: string;
    private publicKey: string;
    constructor() {
        const { parsed } = config();
        this.privateKey = readFileSync(parsed.PRIVATE_KEY).toString();
        this.publicKey = readFileSync(parsed.PUBLIC_KEY).toString();
    }

    sign(userId: string, phoneNumber: string, role = "Regular", expiresIn = "30d") {
        const token = sign(
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

    verify(token: string) {
        const result = verify(token, this.publicKey);
        return result;
    }

    decode(token: string) {
        return decode(token);
    }
}

export default JWT;
