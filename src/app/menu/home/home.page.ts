import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CollaboratorService } from 'src/app/core/services/collaborator.service';
import { JsonStorageService } from 'src/app/core/services/json-storage.service';
import { RandomUserService } from 'src/app/core/services/randomUser.service';
import { SendDataSubjectService } from 'src/app/core/services/sendData.subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [CollaboratorService, RandomUserService, JsonStorageService]

})
export class HomePage implements OnInit {
  payload: any
  isLoading: boolean = true

  constructor(
    private collaboratorService: CollaboratorService,
    private sendDataSubjectService: SendDataSubjectService,
    private randomUserService: RandomUserService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private jsonStorageService: JsonStorageService,

    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => this.loadColaborator(), 5000)
  }

  loadColaborator() {
    this.isLoading = true
    this.collaboratorService.loadJSON().subscribe((res: any) => {
      this.payload = res
      this.isLoading = false
    })
  }

  navigateToCollaborator() {
    this.sendDataSubjectService.sendData(this.payload)
    this.router.navigate(['/menu/home/collaborator']);
  }

  async reloadApp() {
    const loading = await this.loadingCtrl.create({
      message: 'Atualizando app',
      duration: 1000,
    });

    loading.present();
    this.randomUserService.getRandomUser().subscribe(async (res: any) => {
      setTimeout(async () => {
        this.jsonStorageService.saveJson(res.results[0].login.username, res)

        const alert = await this.alertController.create({
          header: 'Atualizado',
          message: 'Aplicativo atualizado com sucesso',
          buttons: ['Confirmar'],
        });
        await alert.present();
      }, 1000)

    })
  }

}
