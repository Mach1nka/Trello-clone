import { Response, NextFunction } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

import { userRepository } from '../database/repositories';
import { User } from '../entities/user';
import CONFIG from '../../config';
import InvalidCredentials from '../../utils/errors/invalid-credentials';
import { JWTDto, CustomRequest } from '../../types/common';

// FIXME: should be extend from Request
declare global {
  namespace Express {
    interface User {
      id: string;
      login: string;
    }
  }
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONFIG.JWT_SECRET_KEY
};

const passportMiddleware = (): void => {
  passport.use(
    new JwtStrategy(options, async (payload: JWTDto, done) => {
      try {
        const user: Pick<User, 'id' | 'login'> | undefined = await userRepository().findOne(
          payload.userId,
          {
            select: ['login', 'id']
          }
        );
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
};

function jwtAuthenticate(req: CustomRequest, res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (err, user: Pick<User, 'id' | 'login'>) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      res.json(new InvalidCredentials());
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
}

export { passportMiddleware, jwtAuthenticate };
