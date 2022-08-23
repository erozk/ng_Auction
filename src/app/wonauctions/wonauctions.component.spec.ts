import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonauctionsComponent } from './wonauctions.component';

describe('WonauctionsComponent', () => {
  let component: WonauctionsComponent;
  let fixture: ComponentFixture<WonauctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WonauctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WonauctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
