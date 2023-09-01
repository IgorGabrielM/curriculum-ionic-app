import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CollaboratorService } from 'src/app/core/services/collaborator.service';
import { RandomUserService } from 'src/app/core/services/randomUser.service';
import { SendDataSubjectService } from 'src/app/core/services/sendData.subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [CollaboratorService, RandomUserService]

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

    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => this.loadColaborator(), 500)
  }

  loadColaborator() {
    this.isLoading = true
    this.collaboratorService.loadJSON().subscribe((res: any) => {
      this.payload = res
      //console.log(this.payload.payload)
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
        console.log(res)
        //salvar esse dado
        const alert = await this.alertController.create({
          header: 'Atualizado',
          message: 'Aplicativo atualizado com sucesso',
          buttons: ['OK'],
        });
        await alert.present();
      }, 1000)

    })
  }

}
