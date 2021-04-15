import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Result } from 'src/shared/helpers/result.helper';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public roles: string[]) {}

  public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const payload: IJwtPayload = context.switchToHttp().getRequest().user;
    console.log(payload);

    // eslint-disable-next-line prefer-const
    let hasRole = false;

    payload.roles.forEach((role) => {
      if (this.roles.includes(role)) {
        hasRole = true;
      }
    });

    if (!hasRole) {
      throw new HttpException(new Result('Acesso não autorizado!', false, null, null), HttpStatus.FORBIDDEN);
    }

    return next.handle();
  }
}
