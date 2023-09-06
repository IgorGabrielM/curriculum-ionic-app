import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async createDatabase() {
    await this.storage.create();
    this.findData('database').then((res) => {
      if (!res) {
        this.storage.set('database', { data: [] });
      }
    })
  }

  async findData(key: string): Promise<any> {
    return this.storage.get(key);
  }

  async getData(): Promise<any> {
    return this.storage.get('database')
  }

  async editData(payload: any) {
    const currentData: { data: any[] } = await this.getData();
    const payloadData = currentData.data.push(payload)
    const test = { data: [...currentData.data] }
    await this.storage.set('database', { data: test.data });
  }

  async deleteData() {
    await this.storage.remove('database');
  }
}
