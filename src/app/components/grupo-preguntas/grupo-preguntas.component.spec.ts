import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoPreguntasComponent } from './grupo-preguntas.component';

describe('GrupoPreguntasComponent', () => {
  let component: GrupoPreguntasComponent;
  let fixture: ComponentFixture<GrupoPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoPreguntasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
