import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApodItem } from './apod-item';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('ApodItem', () => {
  let component: ApodItem;
  let fixture: ComponentFixture<ApodItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApodItem],
      providers: [provideRouter([]),
      TranslateModule.forRoot
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApodItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
