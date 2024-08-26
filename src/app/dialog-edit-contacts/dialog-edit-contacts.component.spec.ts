import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditContactsComponent } from './dialog-edit-contacts.component';

describe('DialogEditContactsComponent', () => {
  let component: DialogEditContactsComponent;
  let fixture: ComponentFixture<DialogEditContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
