import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotboxComponent } from './dotbox.component';

describe('DotboxComponent', () => {
  let component: DotboxComponent;
  let fixture: ComponentFixture<DotboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
