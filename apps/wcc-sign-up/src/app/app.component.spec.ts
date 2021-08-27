import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeMockComponent } from '../test';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HomeMockComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wcc-sign-up'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('wcc-sign-up');
  });

  it('should render the home component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement;
    const home = debugElement.query(By.css('wcc-home')).componentInstance;

    expect(home).toBeTruthy();
  });
});
