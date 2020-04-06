import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectConnectionDialogComponent } from './select-connection-dialog.component';

describe('SelectConnectionDialogComponent', () => {
  let component: SelectConnectionDialogComponent;
  let fixture: ComponentFixture<SelectConnectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectConnectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectConnectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
