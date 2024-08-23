import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, doc, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private about!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.about = collection(this.afs, 'about');
  }

  getAbout() {
    return collectionData(this.about, { idField: 'id' });
  }

  addAbout(about: any) {
    return addDoc(this.about, about);
  }

  editAbout(about: any, id: any) {
    const aboutReference = doc(this.afs, `about/${id}`);
    return updateDoc(aboutReference, { ...about });
  }
}
