import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CfpFormComponent } from './cfp-form.component';

describe('CfpFormComponent', () => {
  let fixture: ComponentFixture<CfpFormComponent>;
  let component: CfpFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CfpFormComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CfpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('estado inicial: todos os signals começam vazios, isFormValid é false, isSubmitDisabled é false', () => {
    expect(component['nome']()).toBe('');
    expect(component['email']()).toBe('');
    expect(component['talkTitle']()).toBe('');
    expect(component['isGDE']()).toBe(false);
    expect(component['isSubmitting']()).toBe(false);
    expect(component['submitted']()).toBe(false);
    expect(component['errorMessage']()).toBe('');
    expect(component['isFormValid']()).toBe(false);
    // isSubmitDisabled = !isFormValid || isSubmitting = !false || false = true
    expect(component['isSubmitDisabled']()).toBe(true);
  });

  it('botão de envio fica disabled quando formulário inválido', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(true);

    component['nome'].set('Fulano');
    component['email'].set('fulano@example.com');
    component['talkTitle'].set('Angular Signals');
    fixture.detectChanges();

    expect(component['isFormValid']()).toBe(true);
    expect(button.disabled).toBe(false);
  });

  it('botão de envio fica disabled durante isSubmitting', () => {
    component['nome'].set('Fulano');
    component['email'].set('fulano@example.com');
    component['talkTitle'].set('Angular Signals');
    component['isSubmitting'].set(true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Enviando...');
  });
});
