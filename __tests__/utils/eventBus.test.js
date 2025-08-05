// __tests__/utils/eventBus.test.js
import { subscribe, emit } from '../../src/utils/eventBus';

describe('eventBus', () => {
  beforeEach(() => {
    // Reset listeners avant chaque test
    const eventBus = require('../../src/utils/eventBus');
    // Accéder aux listeners internes pour les nettoyer
    const listeners = eventBus.listeners || {};
    Object.keys(listeners).forEach(key => delete listeners[key]);
  });

  describe('subscribe', () => {
    it('devrait permettre de s\'abonner à un événement', () => {
      const callback = jest.fn();
      const unsubscribe = subscribe('test-event', callback);

      expect(typeof unsubscribe).toBe('function');
    });

    it('devrait permettre plusieurs abonnements au même événement', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      subscribe('test-event', callback1);
      subscribe('test-event', callback2);

      emit('test-event', 'test-data');

      expect(callback1).toHaveBeenCalledWith('test-data');
      expect(callback2).toHaveBeenCalledWith('test-data');
    });

    it('devrait retourner une fonction de désabonnement', () => {
      const callback = jest.fn();
      const unsubscribe = subscribe('test-event', callback);

      emit('test-event', 'test-data');
      expect(callback).toHaveBeenCalledTimes(1);

      unsubscribe();
      emit('test-event', 'test-data-2');
      expect(callback).toHaveBeenCalledTimes(1); // Pas appelé après unsubscribe
    });

    it('devrait gérer les désabonnements multiples sans erreur', () => {
      const callback = jest.fn();
      const unsubscribe = subscribe('test-event', callback);

      unsubscribe();
      expect(() => unsubscribe()).not.toThrow();
    });
  });

  describe('emit', () => {
    it('devrait émettre un événement vers les abonnés', () => {
      const callback = jest.fn();
      subscribe('test-event', callback);

      emit('test-event', 'test-data');

      expect(callback).toHaveBeenCalledWith('test-data');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('devrait émettre vers tous les abonnés', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      subscribe('test-event', callback1);
      subscribe('test-event', callback2);
      subscribe('other-event', callback3);

      emit('test-event', 'test-data');

      expect(callback1).toHaveBeenCalledWith('test-data');
      expect(callback2).toHaveBeenCalledWith('test-data');
      expect(callback3).not.toHaveBeenCalled();
    });

    it('devrait gérer l\'émission d\'événements sans abonnés', () => {
      expect(() => {
        emit('non-existent-event', 'data');
      }).not.toThrow();
    });

    it('devrait passer les données correctement', () => {
      const callback = jest.fn();
      subscribe('test-event', callback);

      const testData = { id: 1, message: 'hello', array: [1, 2, 3] };
      emit('test-event', testData);

      expect(callback).toHaveBeenCalledWith(testData);
    });

    it('devrait gérer les données undefined et null', () => {
      const callback = jest.fn();
      subscribe('test-event', callback);

      emit('test-event', undefined);
      expect(callback).toHaveBeenCalledWith(undefined);

      emit('test-event', null);
      expect(callback).toHaveBeenCalledWith(null);
    });
  });

  describe('Gestion mémoire', () => {
    it('devrait nettoyer correctement les listeners', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      const unsubscribe1 = subscribe('event1', callback1);
      const unsubscribe2 = subscribe('event1', callback2);
      subscribe('event2', callback3);

      // Désabonner callback1
      unsubscribe1();

      emit('event1', 'data');
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();

      // Désabonner callback2
      unsubscribe2();

      emit('event1', 'data2');
      expect(callback2).toHaveBeenCalledTimes(1); // Pas appelé à nouveau
    });

    it('devrait gérer les événements avec des noms similaires', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      subscribe('user-login', callback1);
      subscribe('user-logout', callback2);

      emit('user-login', 'login-data');
      expect(callback1).toHaveBeenCalledWith('login-data');
      expect(callback2).not.toHaveBeenCalled();

      emit('user-logout', 'logout-data');
      expect(callback2).toHaveBeenCalledWith('logout-data');
      expect(callback1).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cas d\'usage réels', () => {
    it('devrait gérer un scénario de progression utilisateur', () => {
      const progressCallback = jest.fn();
      const achievementCallback = jest.fn();

      subscribe('progress-updated', progressCallback);
      subscribe('achievement-unlocked', achievementCallback);

      // Simulation progression
      emit('progress-updated', { level: 1, score: 85 });
      expect(progressCallback).toHaveBeenCalledWith({ level: 1, score: 85 });

      // Simulation achievement
      emit('achievement-unlocked', { type: 'streak', value: 7 });
      expect(achievementCallback).toHaveBeenCalledWith({ type: 'streak', value: 7 });
    });

    it('devrait gérer un scénario de settings mis à jour', () => {
      const settingsCallback = jest.fn();
      const themeCallback = jest.fn();

      subscribe('settings-updated', settingsCallback);
      subscribe('theme-changed', themeCallback);

      emit('settings-updated', { theme: 'dark', language: 'fr' });
      emit('theme-changed', 'dark');

      expect(settingsCallback).toHaveBeenCalledWith({ theme: 'dark', language: 'fr' });
      expect(themeCallback).toHaveBeenCalledWith('dark');
    });
  });

  describe('Fonctionnalités de base', () => {
    it('devrait avoir les fonctions principales', () => {
      expect(typeof subscribe).toBe('function');
      expect(typeof emit).toBe('function');
    });

    it('devrait gérer les callbacks qui ne font rien', () => {
      const emptyCallback = jest.fn();
      subscribe('test-event', emptyCallback);

      expect(() => {
        emit('test-event', 'data');
      }).not.toThrow();

      expect(emptyCallback).toHaveBeenCalledWith('data');
    });

    it('devrait gérer les événements avec des noms vides', () => {
      const callback = jest.fn();
      subscribe('', callback);

      expect(() => {
        emit('', 'data');
      }).not.toThrow();

      expect(callback).toHaveBeenCalledWith('data');
    });
  });

  describe('Robustesse', () => {
    it('devrait gérer de nombreux abonnés', () => {
      const callbacks = [];
      for (let i = 0; i < 100; i++) {
        const callback = jest.fn();
        callbacks.push(callback);
        subscribe('mass-event', callback);
      }

      emit('mass-event', 'mass-data');

      callbacks.forEach(callback => {
        expect(callback).toHaveBeenCalledWith('mass-data');
      });
    });

    it('devrait gérer de nombreux événements différents', () => {
      const callbacks = {};
      for (let i = 0; i < 50; i++) {
        const eventName = `event-${i}`;
        const callback = jest.fn();
        callbacks[eventName] = callback;
        subscribe(eventName, callback);
      }

      // Émettre tous les événements
      Object.keys(callbacks).forEach(eventName => {
        emit(eventName, `data-${eventName}`);
      });

      // Vérifier que chaque callback a été appelé avec les bonnes données
      Object.entries(callbacks).forEach(([eventName, callback]) => {
        expect(callback).toHaveBeenCalledWith(`data-${eventName}`);
      });
    });
  });
});