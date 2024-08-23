import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  saveData(key: string, data: any) {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getData(key: string) {
    if (this.isBrowser) {
      const savedData = localStorage.getItem(key);

      // Перевірте, чи дані вже були передані з сервера
      const keyData = makeStateKey<any>(`localStorageService:${key}`);
      const transferredData = this.transferState.get(keyData, null);

      // Використовуйте передані дані з сервера, якщо вони є
      if (isPlatformServer(this.platformId) && transferredData !== null) {
        return transferredData;
      }
      return savedData ? JSON.parse(savedData) : null;
    }

    return null;
  }
}
