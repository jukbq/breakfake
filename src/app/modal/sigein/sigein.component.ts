import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { ROLE } from '../../shared/guard/role.constant';

@Component({
  selector: 'app-sigein',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sigein.component.html',
  styleUrl: './sigein.component.scss'
})
export class SigeinComponent {
  email: string = '';
  password: string = '';
  public user: any;
  public loginSubscription!: Subscription;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    public activeModal: NgbActiveModal,
    private router: Router) { }

  loginUser(): void {
    this.login(this.email, this.password)
      .then(() => {
        console.log('Користувач успішно автроризувався');
      })
      .catch((e) => {
        console.log('Невірний email або пароль');
      });
  }

  async login(email: string, password: string): Promise<void> {

    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    this.loginSubscription = docData(
      doc(this.afs, 'user', userCredential.user.uid)
    ).subscribe((user: any) => {
      this.user = user;
      const curentUser = { ...user, uid: userCredential.user.uid };
      localStorage.setItem('curentUser', JSON.stringify(curentUser));
      this.actuve();
    });
  }

  actuve(): void {
    this.activeModal.close('Petition added');
    this.router.navigate(['/admin']).then(() => {
      window.location.reload();  // Перезавантажує сторінку після навігації
    });

  }


}
