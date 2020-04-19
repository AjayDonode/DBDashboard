import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilllistComponent } from './pilllist.component';

describe('PilllistComponent', () => {
  let component: PilllistComponent;
  let fixture: ComponentFixture<PilllistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilllistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
