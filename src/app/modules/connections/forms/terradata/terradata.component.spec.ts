import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerradataComponent } from './terradata.component';

describe('TerradataComponent', () => {
  let component: TerradataComponent;
  let fixture: ComponentFixture<TerradataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerradataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerradataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
