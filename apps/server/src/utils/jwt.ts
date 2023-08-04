import env from '@/utils/env';
import jwt, { JsonWebTokenError, SignOptions } from 'jsonwebtoken';

export function signJWT(object: Object, options?: SignOptions) {
  console.log(env.JWT_PRIVATE_KEY);

  return jwt.sign(object, env.JWT_PRIVATE_KEY, {
    ...options,
    algorithm: 'RS256',
  });
}

export function verifyJWT(token: string) {
  try {
    const decodedToken = jwt.verify(token, env.JWT_PUBLIC_KEY);

    return {
      valid: true,
      expired: false,
      decoded: decodedToken,
    };
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return {
        valid: false,
        expired: error.message === 'jwt expired',
        decoded: null,
      };
    }

    throw error;
  }
}
