import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CollaboratorService } from 'src/app/core/services/collaborator.service';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';
import { RandomUserService } from 'src/app/core/services/randomUser.service';
import { SendDataSubjectService } from 'src/app/core/services/sendData.subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [CollaboratorService, RandomUserService, IonicStorageService]

})
export class HomePage implements OnInit {
  payload: any
  isLoading: boolean = true
  showToast: boolean = false

  data: any[] = []

  constructor(
    private sendDataSubjectService: SendDataSubjectService,
    private randomUserService: RandomUserService,
    private loadingCtrl: LoadingController,
    private ionicStorageService: IonicStorageService,

    private router: Router
  ) { }

  ngOnInit() {
    this.ionicStorageService.createDatabase()
    this.loadData()
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.reloadApp()
    }, 1000);
  }

  loadData() {
    this.isLoading = true
    this.ionicStorageService.getData().then((res) => {
      setTimeout(() => {
        if (res || res.data) {
          this.data = res.data
          this.isLoading = false
        } else {
          this.data = []
          this.isLoading = false
        }
      }, 1000)
    })
  }

  navigateToCollaborator() {
    this.sendDataSubjectService.sendData(this.payload)
    this.router.navigate(['/menu/home/collaborator']);
  }

  clearDatabase() {
    this.ionicStorageService.deleteData().then(async () => {
      const loading = await this.loadingCtrl.create({
        message: 'Apagando dados',
        duration: 1000,
      });
      loading.present()
      this.showToast = true
      this.data = []
    })
  }

  async reloadApp() {
    this.randomUserService.getRandomUser().subscribe(async (res: any) => {
      this.ionicStorageService.editData(res).then(() => {
        this.ionicStorageService.getData().then((res) => {
          this.data = res.data
        })
      })
    })
  }

}
