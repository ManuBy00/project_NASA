import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { HeaderService } from '../../services/header-service';


describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, TranslateModule.forRoot()],
      providers: [provideRouter([]), HeaderService]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
