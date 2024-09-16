import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from './role.constant';
import { AdminComponent } from '../../admin/admin.component';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router: Router = inject(Router);
  const adminComponent: AdminComponent = inject(AdminComponent);
  const login = JSON.parse(localStorage.getItem('currentUser') as string);
  if (login && (login.role === ROLE.ADMIN)) {
    adminComponent.isLogin = true;
    return true;
  }
  adminComponent.isLogin = false;
  router.navigate(['']);
  return false;
};
