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
  collaborators: any[] = []
  seeMore: boolean = false
  isLoading: boolean = false

  constructor(
    private sendDataSubjectService: SendDataSubjectService,
  ) {
    this.dataSubscription = this.sendDataSubjectService.getData().subscribe((data) => {
      this.collaborators.push(data.payload[0].sections)
      this.sections = data.payload[0].sections
    })
  }

  ngOnInit() {
  }

  loadMoreData() {
    this.isLoading = true
    setTimeout(() => {
      this.collaborators.push(this.sections)
      this.isLoading = false
    }, 1000);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
