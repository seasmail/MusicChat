import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListPageComponent } from './dialog-list-page.component';

describe('DialogListPageComponent', () => {
  let component: DialogListPageComponent;
  let fixture: ComponentFixture<DialogListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
