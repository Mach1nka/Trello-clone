import { Request, Response, NextFunction } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

// import User from '../models/user';
import { userRepository } from '../database/repositories';
import { User } from '../entities/user';
import CONFIG from '../../config';
import InvalidCredentials from '../../utils/errors/invalid-credentials';

declare global {
  namespace Express {
    interface User {
      _id: string;
      login: string;
    }
  }
}

interface DTO {
  userId: string;
  login: string;
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONFIG.JWT_SECRET_KEY
};

const passportMiddleware = (): void => {
  passport.use(
    new JwtStrategy(options, async (payload: DTO, done) => {
      try {
        const user: User | undefined = await userRepository().findOne(payload.userId, {
          select: ['login', 'id']
        });
        console.log('');
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

function jwtAuthenticate(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (err, user) => {
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
