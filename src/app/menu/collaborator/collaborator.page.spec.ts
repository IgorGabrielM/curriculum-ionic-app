import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorPage } from './collaborator.page';

describe('CollaboratorPage', () => {
  let component: CollaboratorPage;
  let fixture: ComponentFixture<CollaboratorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CollaboratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
