import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class JsonStorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async saveJson(key: string, json: any) {
    await this.storage.set(key, json);
  }

  async getJson(key: string): Promise<any> {
    return this.storage.get(key);
  }
}
