import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNaoLogadaComponent } from './area-nao-logada.component';

describe('AreaNaoLogadaComponent', () => {
  let component: AreaNaoLogadaComponent;
  let fixture: ComponentFixture<AreaNaoLogadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaNaoLogadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaNaoLogadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
