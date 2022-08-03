import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInscriptionComponent } from './create-inscription.component';

describe('CreateInscriptionComponent', () => {
  let component: CreateInscriptionComponent;
  let fixture: ComponentFixture<CreateInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
