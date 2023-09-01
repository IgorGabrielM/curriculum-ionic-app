import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SendDataSubjectService } from 'src/app/core/services/sendData.subject.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.page.html',
  styleUrls: ['./collaborator.page.scss'],
})
export class CollaboratorPage implements OnInit {
  dataSubscription: Subscription

  sections: any
  isLoading: boolean = true
  data: any

  constructor(
    private sendDataSubjectService: SendDataSubjectService,
  ) {
    this.dataSubscription = this.sendDataSubjectService.getData().subscribe((data) => {

      this.data = data
      console.log(this.data)
    })
  }

  ngOnInit() {
    //this.sections = data.payload[0].sections
    //this.isLoading = false
  }

  /*   loadColaborator() {
      this.isLoading = true
      this.collaboratorService.loadJSON().subscribe((res: any) => {
        this.sections = res.payload[0].sections
        console.log(this.sections)
        this.isLoading = false
      })
    } */

  /*   ngOnDestroy() {
      this.dataSubscription.unsubscribe();
    }
   */
}
