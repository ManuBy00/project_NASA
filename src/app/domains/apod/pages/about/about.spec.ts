import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About } from './about';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderService } from '../../../../shared/services/header-service';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About, TranslateModule.forRoot()],
      providers: [HeaderService]
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
