import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsMembersComponent } from './admins-members.component';

describe('AdminsMembersComponent', () => {
  let component: AdminsMembersComponent;
  let fixture: ComponentFixture<AdminsMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
