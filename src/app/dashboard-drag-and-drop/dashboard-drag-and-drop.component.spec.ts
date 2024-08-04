import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDragAndDropComponent } from './dashboard-drag-and-drop.component';

describe('DashboardDragAndDropComponent', () => {
  let component: DashboardDragAndDropComponent;
  let fixture: ComponentFixture<DashboardDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDragAndDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
