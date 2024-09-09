import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, getDocs, query, updateDoc } from '@angular/fire/firestore';
import { CountryResponse } from '../../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countryCollection: any;

  constructor(private afs: Firestore) {
    this.countryCollection = collection(this.afs, 'country');
  }

  getAll() {
    return collectionData(this.countryCollection, { idField: 'id' });
  }

  getcountryById(id: any) {
    const countryDocumentReference = doc(this.afs, `country/${id}`);
    return docData(countryDocumentReference, { idField: 'id' });
  }

  addCountry(country: CountryResponse) {
    return addDoc(this.countryCollection, country);
  }


  delCountry(id: any) {
    const countryDocumentReference = doc(this.afs, `country/${id}`);
    return deleteDoc(countryDocumentReference);
  }

  async addPetitionField(): Promise<void> {
    const q = query(this.countryCollection);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.afs, `country/${document.id}`);
      await updateDoc(docRef, {
        petition: ''
      });
    });
  }

}
