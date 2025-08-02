import { renderHook, act } from '@testing-library/react-native';
import useConversation from './src/screens/exercises/conversations/hooks/useConversation';
import programmingParadigmDebate from './src/data/conversation/C1/scenarios/programmingParadigmDebate';

// Le hook attend un objet avec une propriété `exercises` contenant un tableau de scénarios.
const mockConversationData = {
  exercises: [programmingParadigmDebate],
};

describe('useConversation Hook', () => {
  let result;

  // On utilise de faux timers pour contrôler les `setTimeout` du hook
  beforeAll(() => {
    jest.useFakeTimers();
  });

  // On initialise le hook avant chaque test
  beforeEach(async () => {
    const { result: hookResult } = renderHook(() => useConversation(mockConversationData));
    result = hookResult;

    // On attend que le hook charge les données et on avance les timers pour le premier message du bot
    await act(async () => {});
    act(() => {
      jest.runAllTimers();
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should initialize and start the conversation with the first message', async () => {
    const currentStepObject = result.current.currentScenario.steps[result.current.currentStep];
    
    // Le hook doit être à la première étape (index 0)
    expect(result.current.currentStep).toBe(0);
    expect(currentStepObject.id).toBe(1); // L'objet de l'étape a l'ID 1
    
    // La conversation doit contenir le premier message du bot
    expect(result.current.conversation.length).toBe(1);
    expect(result.current.conversation[0].sender).toBe('bot');
    expect(result.current.conversation[0].text).toBe(programmingParadigmDebate.steps[0].botMessage);
    
    // Le scénario ne doit pas être terminé
    expect(result.current.isLastStep).toBe(false);
  });

  it('should handle user message and bot response', async () => {
    // L'utilisateur tape et envoie un message
    act(() => {
      result.current.setMessage('A valid user response.');
    });
    act(() => {
      result.current.sendMessage();
    });

    // Vérifie que le message de l'utilisateur est ajouté et que le bot tape
    expect(result.current.conversation.length).toBe(2);
    expect(result.current.conversation[1].sender).toBe('user');
    expect(result.current.isTyping).toBe(true);

    // On avance les timers pour la réponse du bot
    act(() => {
      jest.runAllTimers();
    });

    // Vérifie la réponse du bot et le nouvel état
    expect(result.current.conversation.length).toBe(3);
    expect(result.current.conversation[2].sender).toBe('bot');
    expect(result.current.conversation[2].text).toBe(programmingParadigmDebate.steps[1].botMessage);
    expect(result.current.currentStep).toBe(1); // L'étape a avancé
    expect(result.current.isTyping).toBe(false);
  });
});
