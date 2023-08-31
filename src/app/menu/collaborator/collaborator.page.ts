import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from 'src/app/core/services/collaborator.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.page.html',
  styleUrls: ['./collaborator.page.scss'],
  providers: [CollaboratorService]
})
export class CollaboratorPage implements OnInit {
  sections: any[] = []
  isLoading: boolean = true

  constructor(
    private collaboratorService: CollaboratorService,
  ) { }

  ngOnInit() {
    setTimeout(() => this.loadColaborator(), 500)
  }

  loadColaborator() {
    this.isLoading = true
    this.collaboratorService.loadJSON().subscribe((res: any) => {
      this.sections = res.payload[0].sections
      console.log(this.sections)
      this.isLoading = false
    })
  }

}
