import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApodItem } from './apod-item';

describe('ApodItem', () => {
  let component: ApodItem;
  let fixture: ComponentFixture<ApodItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApodItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ApodItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
