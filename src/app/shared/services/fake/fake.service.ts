import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
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
    console.log(id);
    const fakeReference = doc(this.afs, `fake/${id}`);
    return deleteDoc(fakeReference);
  }

  async addPetitionField(): Promise<void> {
    // Отримуємо всі документи з колекції fake
    const q = query(this.fakeCollection);
    const querySnapshot = await getDocs(q);

    // Проходимося по кожному документу в колекції fake
    for (const document of querySnapshot.docs) {
      const docRef = doc(this.afs, `fake/${document.id}`);
      const fakeData = document.data() as FakeResponse;

      // Перевіряємо наявність властивості petition
      if (fakeData.country && fakeData.country.petition === undefined) {
        await updateDoc(docRef, {
          'country.petition': ''  // Додаємо властивість всередині об'єкта country
        });
      }
    }
  }
}
