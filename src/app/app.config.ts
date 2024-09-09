import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp({ "projectId": "prometeus-79b24", "appId": "1:663155614511:web:47398f23a9c553782937da", "storageBucket": "prometeus-79b24.appspot.com", "apiKey": "AIzaSyBVoTt6Am5VCC3Ikv5PMsblwKudNEqr8mM", "authDomain": "prometeus-79b24.firebaseapp.com", "messagingSenderId": "663155614511", "measurementId": "G-95MNMXZCP9" })),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideVertexAI(() => getVertexAI()),
    provideFunctions(() => getFunctions()),],
};
