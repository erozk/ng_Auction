import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistauctionsComponent } from './watchlistauctions.component';

describe('WatchlistauctionsComponent', () => {
  let component: WatchlistauctionsComponent;
  let fixture: ComponentFixture<WatchlistauctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistauctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistauctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
