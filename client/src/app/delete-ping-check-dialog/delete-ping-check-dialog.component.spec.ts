import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePingCheckDialogComponent } from './delete-ping-check-dialog.component';

describe('DeletePingCheckDialogComponent', () => {
  let component: DeletePingCheckDialogComponent;
  let fixture: ComponentFixture<DeletePingCheckDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePingCheckDialogComponent]
    });
    fixture = TestBed.createComponent(DeletePingCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
