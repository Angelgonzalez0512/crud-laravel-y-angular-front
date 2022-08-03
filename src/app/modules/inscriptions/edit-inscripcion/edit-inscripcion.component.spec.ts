import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInscripcionComponent } from './edit-inscripcion.component';

describe('EditInscripcionComponent', () => {
  let component: EditInscripcionComponent;
  let fixture: ComponentFixture<EditInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
