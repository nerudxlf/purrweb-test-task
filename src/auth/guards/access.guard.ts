import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AccessGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try{
            const requestUserId = Number(req.params["id"]);
            const token = req.headers.authorization.split(' ')[1];
            const tokenUserId = this.jwtService.decode(token)['id'];
            if(tokenUserId === requestUserId){
                return true
            }
            return false;
        }catch(e){
            throw new UnauthorizedException("Пользователь не авторизован");
        }
    }
}