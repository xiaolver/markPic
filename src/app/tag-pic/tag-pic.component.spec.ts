import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPicComponent } from './tag-pic.component';

describe('TagPicComponent', () => {
  let component: TagPicComponent;
  let fixture: ComponentFixture<TagPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
