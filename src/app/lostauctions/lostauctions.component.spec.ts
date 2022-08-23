import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostauctionsComponent } from './lostauctions.component';

describe('LostauctionsComponent', () => {
  let component: LostauctionsComponent;
  let fixture: ComponentFixture<LostauctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostauctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostauctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
