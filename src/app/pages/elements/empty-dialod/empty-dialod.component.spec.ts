import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDialodComponent } from './empty-dialod.component';

describe('EmptyDialodComponent', () => {
  let component: EmptyDialodComponent;
  let fixture: ComponentFixture<EmptyDialodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyDialodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyDialodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
