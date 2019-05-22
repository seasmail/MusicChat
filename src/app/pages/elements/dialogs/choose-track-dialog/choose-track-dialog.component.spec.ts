import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTrackDialogComponent } from './choose-track-dialog.component';

describe('ChooseTrackDialogComponent', () => {
  let component: ChooseTrackDialogComponent;
  let fixture: ComponentFixture<ChooseTrackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseTrackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
