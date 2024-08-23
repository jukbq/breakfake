import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  private partnersCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.partnersCollection = collection(this.afs, 'partners');
  }

  getAll() {
    return collectionData(this.partnersCollection, { idField: 'id' });
  }

  getpartnersById(id: any) {
    const partnersDocumentReference = doc(this.afs, `partners/${id}`);
    return docData(partnersDocumentReference, { idField: 'id' });
  }

  addPartners(partners: any) {
    return addDoc(this.partnersCollection, partners);
  }

  editPartners(partners: any, id: string) {
    const partnersReference = doc(this.afs, `partners/${id}`);
    return updateDoc(partnersReference, { ...partners });
  }

  delPartners(id: any) {
    const partnersReference = doc(this.afs, `partners/${id}`);
    return deleteDoc(partnersReference);
  }
}
