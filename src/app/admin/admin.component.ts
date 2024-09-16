import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/localStorage/local-storage.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigeinComponent } from '../modal/sigein/sigein.component';
import { ROLE } from '../shared/guard/role.constant';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  public isLogin = false
  public loginUrl = ''


  constructor(
    private router: Router,
    private locaStorge: LocalStorageService,
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const courentUser = this.locaStorge.getData('curentUser');
    console.log(courentUser);

    if (courentUser) {
      this.isLogin = true;
      this.loginUrl = 'admin';
    } else {
      const modalRef = this.modalService.open(SigeinComponent);
    }
  }
}
