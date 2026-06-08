import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsOrderByAge } from './students-order-by-age';

describe('StudentsOrderByAge', () => {
  let component: StudentsOrderByAge;
  let fixture: ComponentFixture<StudentsOrderByAge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsOrderByAge],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsOrderByAge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
