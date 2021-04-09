import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsaKeyComponent } from './rsa-key.component';

describe('RsaKeyComponent', () => {
  let component: RsaKeyComponent;
  let fixture: ComponentFixture<RsaKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsaKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsaKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
