import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelongsStationsComponent } from './belongs-stations.component';

describe('BelongsStationsComponent', () => {
  let component: BelongsStationsComponent;
  let fixture: ComponentFixture<BelongsStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelongsStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelongsStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
