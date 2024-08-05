import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardEditContainerComponent } from './task-card-edit-container.component';

describe('TaskCardEditContainerComponent', () => {
  let component: TaskCardEditContainerComponent;
  let fixture: ComponentFixture<TaskCardEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardEditContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
