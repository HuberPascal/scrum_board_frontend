import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditContactDataComponent } from './dialog-edit-contact-data.component';

describe('DialogEditContactDataComponent', () => {
  let component: DialogEditContactDataComponent;
  let fixture: ComponentFixture<DialogEditContactDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditContactDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditContactDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
