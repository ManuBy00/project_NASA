import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPage } from './details-page';
import { TranslateModule } from '@ngx-translate/core';
import { ApodService } from '../../../../shared/services/apod-service';
import { HeaderService } from '../../../../shared/services/header-service';
import { FavService } from '../../../../shared/services/fav-service';
import { provideRouter } from '@angular/router';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPage],
      providers: [TranslateModule.forRoot, ApodService, HeaderService, FavService, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
