import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPage } from './main-page';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '../../../../store/store';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPage,
        TranslateModule.forRoot()
      ],
      providers: [Store, provideRouter([]), provideHttpClient, provideHttpClientTesting]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
