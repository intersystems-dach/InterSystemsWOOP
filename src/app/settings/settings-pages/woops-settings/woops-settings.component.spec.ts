import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoopsSettingsComponent } from './woops-settings.component';

describe('WoopsSettingsComponent', () => {
  let component: WoopsSettingsComponent;
  let fixture: ComponentFixture<WoopsSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WoopsSettingsComponent]
    });
    fixture = TestBed.createComponent(WoopsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
