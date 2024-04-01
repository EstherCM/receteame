import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCreateComponent } from './recipes-create.component';

describe('RecipesCreateComponent', () => {
  let component: RecipesCreateComponent;
  let fixture: ComponentFixture<RecipesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
