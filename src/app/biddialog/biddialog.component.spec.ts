import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddialogComponent } from './biddialog.component';

describe('BiddialogComponent', () => {
  let component: BiddialogComponent;
  let fixture: ComponentFixture<BiddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
