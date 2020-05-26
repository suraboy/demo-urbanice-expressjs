import passport from 'passport';
import passportJwt from 'passport-jwt/lib';
import fs from 'fs';
const publicKey = fs.readFileSync('./storage/' + (process.env.NODE_ENV == 'test' ? 'oauth-public.test.key' : 'oauth-public.key'), 'utf8');

class passportManager {
    initialize(){
        const opts = {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: publicKey,
            algorithm: "RS256"
        };
        passport.use(new passportJwt.Strategy(opts, (payload, done) => {
            if (payload.sub === "dev-test") done(null, true);
            else done(null, false);
        }));
        return passport.initialize();
    }
    authenticate(req, res, next){
        passport.authenticate('jwt', { session: false}, (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                if (info.name === "TokenExpiredError") {
                    return res.status(401).json({
                        errors: {
                            status_code: 401,
                            message: 'Provided token is expired.',
                        }
                    });
                } else {
                    return res.status(401).json({
                        errors: {
                            status_code: 401,
                            message:  info.message
                        }
                    });
                }
            }
            req.user = user;
            return next();
        })(req, res, next);
    };

}
export default new passportManager();