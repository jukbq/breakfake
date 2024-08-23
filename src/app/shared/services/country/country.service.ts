import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
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

  editCountry(country: any, id: string) {
    const countryDocumentReference = doc(this.afs, `country/${id}`);
    return updateDoc(countryDocumentReference, { ...country });
  }

  delCountry(id: any) {
    const countryDocumentReference = doc(this.afs, `country/${id}`);
    return deleteDoc(countryDocumentReference);
  }
}
