import { auth } from '@/configs/firebase-admin';

export const withAuth = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end('Not authenticated. No Auth header');
    }

    const token = authHeader.split(' ')[1];

    try {
      let decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid)
        return res.status(401).end('Not authenticated');
      req.uid = decodedToken.uid;
    } catch (error) {
      const errorCode = error.errorInfo.code;
      error.status = 401;
      let code = 'auth-error';
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
        code = 'internal-error';
      }
      if (errorCode === 'auth/id-token-expired') {
        code = 'token-expired';
      }
      //TODO handlle firebase admin errors in more detail
      return res
        .status(error.status)
        .json({ message: errorCode, code });
    }

    return handler(req, res);
  };
};
