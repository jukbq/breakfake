import { Injectable } from '@angular/core';
import { EventResponse } from '../../interfaces/events';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventArr!: Array<EventResponse>;
  private eventCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.eventCollection = collection(this.afs, 'event');
  }

  getAll() {
    return collectionData(this.eventCollection, { idField: 'id' });
  }

  geteventById(id: any) {
    const eventDocumentReference = doc(this.afs, `event/${id}`);
    return docData(eventDocumentReference, { idField: 'id' });
  }

  getEventByCountryID(countryID: string) {
    const queryRef = query(
      this.eventCollection,
      where('country.id', '==', countryID)
    );
    return collectionData(queryRef, { idField: 'id' });
  }

  addEvent(event: EventResponse) {
    return addDoc(this.eventCollection, event);
  }

  editEvent(event: EventResponse, id: string) {
    const eventReference = doc(this.afs, `event/${id}`);
    return updateDoc(eventReference, { ...event });
  }

  delEvent(id: any) {
    const eventReference = doc(this.afs, `event/${id}`);
    return deleteDoc(eventReference);
  }

  /*   async addPetitionField(date: any): Promise<void> {
      const q = query(this.eventCollection);
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (document) => {
        const docRef = doc(this.afs, `event/${document.id}`);
        await updateDoc(docRef, {
          createdAt: date
        });
      });
    } */
}
