import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { FakeResponse } from '../../interfaces/fake';

@Injectable({
  providedIn: 'root',
})
export class FakeService {
  private fakeArr!: Array<FakeResponse>;
  private fakeCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.fakeCollection = collection(this.afs, 'fake');
  }

  getAll() {
    return collectionData(this.fakeCollection, { idField: 'id' });
  }

  getfakeById(id: any) {
    const fakeDocumentReference = doc(this.afs, `fake/${id}`);
    return docData(fakeDocumentReference, { idField: 'id' });
  }

  getFakeByCountryID(countryID: string) {
    const queryRef = query(
      this.fakeCollection,
      where('country.id', '==', countryID)
    );
    return collectionData(queryRef, { idField: 'id' });
  }

  addFake(fake: FakeResponse) {
    return addDoc(this.fakeCollection, fake);
  }

  editFake(fake: FakeResponse, id: string) {
    const fakeReference = doc(this.afs, `fake/${id}`);
    return updateDoc(fakeReference, { ...fake });
  }

  delFake(id: any) {
    const fakeReference = doc(this.afs, `fake/${id}`);
    return deleteDoc(fakeReference);
  }
}
