import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanceCardsComponent } from './chance-cards.component';

describe('ChanceCardsComponent', () => {
  let component: ChanceCardsComponent;
  let fixture: ComponentFixture<ChanceCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanceCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
