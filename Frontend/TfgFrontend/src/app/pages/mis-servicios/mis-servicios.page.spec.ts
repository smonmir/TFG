import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisServiciosPage } from './mis-servicios.page';

describe('MisServiciosPage', () => {
  let component: MisServiciosPage;
  let fixture: ComponentFixture<MisServiciosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
