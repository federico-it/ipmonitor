import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingCheckDialogComponent } from './ping-check-dialog.component';

describe('PingCheckDialogComponent', () => {
  let component: PingCheckDialogComponent;
  let fixture: ComponentFixture<PingCheckDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PingCheckDialogComponent]
    });
    fixture = TestBed.createComponent(PingCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
