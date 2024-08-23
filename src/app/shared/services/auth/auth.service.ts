import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  authState,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = authState(this.auth);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  // Метод для перевірки чи користувач існує в базі даних
  async checkUserExists(email: string): Promise<boolean> {
    const userRef = doc(this.firestore, `users/${email}`);
    const userSnap = await getDoc(userRef);

    return userSnap.exists();
  }
}
