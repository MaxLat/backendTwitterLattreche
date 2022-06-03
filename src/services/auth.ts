import { UserRepository } from "../repository/userRepository";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import bcrypt from 'bcrypt';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
require('dotenv').config();

interface IuserToken {
    id : number,
    email : string,
    iat? : number,
    exp? : number
}

export class AuthService {
  userRepository = new UserRepository();

    authenticateUser() : LocalStrategy {
    
    const localOptions = {usernameField : "email"}
    return new LocalStrategy(localOptions,async (email, password, done) => {
      try {
        const user = await this.userRepository.findOne({ email : email });
        
        if (!user) {
          return done(null, false);
        }

        const isEqual = await this.checkPassword(password,user.password)
        
        if (!isEqual) {
          return done(null, false);
        }

        const payloadUser : IuserToken = {id : user.id , email : user.email}
        const token = this.generateToken(payloadUser);
        user.token = token;

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    });
  }

  authorizeUser() : JwtStrategy {
    const jwtOptions = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.TOKEN_KEY? process.env.TOKEN_KEY : "mon token secret"
    }

    return new JwtStrategy(jwtOptions,async (payload : IuserToken,done) => {
        
        try {
            const user = await this.userRepository.findOne({ id : payload.id });
            if (!user) {
              return done(null, false);
            }
    
            return done(null, user);
          } catch (error) {
            return done({error : error});
          }

    })
  }

  async checkPassword(password : string , userDbPassword : string) : Promise<Boolean | void>  {
    try {
        return await bcrypt.compare(password, userDbPassword);
      } catch (error) {
        console.log(error);
      }
  }

  generateToken(payloadUser : IuserToken) : string {

    const payload = payloadUser;
    const secret : string = process.env.TOKEN_KEY? process.env.TOKEN_KEY : "mon token secret";   
    return sign(payload,secret,{expiresIn : '24h'})

  }

  
}
