import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favourites } from './favourites';
import { HeaderService } from '../../../../shared/services/header-service';
import { FavService } from '../../../../shared/services/fav-service';
import { TranslateModule } from '@ngx-translate/core';

describe('Favourites', () => {
  let component: Favourites;
  let fixture: ComponentFixture<Favourites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favourites, TranslateModule.forRoot()],
      providers: [HeaderService, FavService]
    }).compileComponents();

    fixture = TestBed.createComponent(Favourites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
