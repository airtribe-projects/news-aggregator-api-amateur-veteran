import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jaya'; // should be stored in environment variable
interface VerifyAuthTokenResult {
    success: boolean;
    userId?: string;
    error?: any;
  }

function generateAuthTokenForUser(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET);
}

function verifyAuthTokenSignatureAndGetPayload(token: string): VerifyAuthTokenResult {
    try {
      const res = jwt.verify(token, JWT_SECRET) as any;
      return { success: true, userId: res.userId };
    } catch (error) {
      return { success: false, error };
    }
}

export {
    generateAuthTokenForUser, 
    verifyAuthTokenSignatureAndGetPayload,
};
