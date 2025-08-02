import grammarRulesB1 from '../src/data/grammar/B1/rules/grammarRulesB1';
import grammarRulesB2 from '../src/data/grammar/B2/rules/grammarRulesB2';
import grammarRulesC1 from '../src/data/grammar/C1/rules/grammarRulesC1';
import { vocab as slangVocab } from '../src/data/vocabulary/bonus/categories/18_slang';
import { vocab as a1Vocab } from '../src/data/fastVocabulary/1';
import slangConversations from '../src/data/phrases/bonus/categories/slang-conversations';
import modernLifeSituations from '../src/data/phrases/bonus/categories/modern-life-situations';
import workplaceCasual from '../src/data/phrases/bonus/categories/workplace-casual';
import smallTalkSocial from '../src/data/phrases/bonus/categories/small-talk-social';
import foodRestaurant from '../src/data/phrases/bonus/categories/food-restaurant';
import phrasalVerbsContext from '../src/data/phrases/bonus/categories/phrasal-verbs-context';
import problemsComplaints from '../src/data/phrases/bonus/categories/problems-complaints';
import relationshipDynamics from '../src/data/phrases/bonus/categories/relationship-dynamics';
import formalInformalDiscourse from '../src/data/phrases/5/categories/formal-informal-discourse';
import idiomaticExpressions from '../src/data/phrases/4/categories/idiomatic-expressions';
import stylisticMasteryVariations from '../src/data/phrases/6/categories/stylistic-mastery-variations';
import businessMeeting from '../src/data/conversation/B1/scenarios/businessMeeting';
import explainProblemIT from '../src/data/conversation/B1/scenarios/explainProblemIT';
import meetingFriendOfFriend from '../src/data/conversation/A2/scenarios/meetingFriendOfFriend';
import programmingParadigmDebate from '../src/data/conversation/C1/scenarios/programmingParadigmDebate';
import literaryCriticism from '../src/data/conversation/C2/scenarios/literaryCriticism';
import assessmentsC1 from '../src/data/assessment/assessmentsC1';

describe('Data Integrity Checks', () => {
  describe('Grammar Rules', () => {
    const grammarFiles = { grammarRulesB1, grammarRulesB2, grammarRulesC1 };

    Object.entries(grammarFiles).forEach(([fileName, rules]) => {
      describe(`${fileName}`, () => {
        it('should have unique IDs', () => {
          const ids = rules.map(rule => rule.id);
          const uniqueIds = new Set(ids);
          expect(uniqueIds.size).toBe(ids.length);
        });

        it('should have all required fields for each rule', () => {
          rules.forEach(rule => {
            expect(rule.id).toBeDefined();
            expect(rule.title).toBeDefined();
            expect(rule.explanation).toBeDefined();
            expect(rule.examples).toBeInstanceOf(Array);
            expect(rule.examples.length).toBeGreaterThanOrEqual(0);
            expect(rule.rules).toBeInstanceOf(Array);
            expect(rule.rules.length).toBeGreaterThan(0);
          });
        });
      });
    });
  });

  describe('Vocabulary Lists', () => {
    it('should have a valid structure for slang vocabulary', () => {
      expect(slangVocab.title).toBeDefined();
      expect(slangVocab.words).toBeInstanceOf(Array);
      expect(slangVocab.words.length).toBeGreaterThan(0);
    });

    it('should ensure all A1 vocabulary words have the required fields', () => {
      a1Vocab.words.forEach(item => {
        expect(item.word).toBeDefined();
        expect(item.translation).toBeDefined();
        expect(item.example).toBeDefined();
      });
    });
  });

  describe('Phrase Lists', () => {
    const phraseFiles = {
      slangConversations, modernLifeSituations, workplaceCasual,
      smallTalkSocial, foodRestaurant, phrasalVerbsContext, problemsComplaints,
      relationshipDynamics, formalInformalDiscourse, idiomaticExpressions,
      stylisticMasteryVariations
    };

    Object.entries(phraseFiles).forEach(([fileName, phrases]) => {
      it(`should have a valid structure for each phrase in ${fileName}`, () => {
        expect(phrases).toBeInstanceOf(Array);
        expect(phrases.length).toBeGreaterThan(0);
        phrases.forEach(phrase => {
          expect(phrase.categoryId).toEqual(expect.any(Number));
          expect(phrase.english).toEqual(expect.any(String));
          expect(phrase.translation).toEqual(expect.any(String));
          expect(phrase.context).toEqual(expect.any(String));
          expect(phrase.examples).toBeInstanceOf(Array);
          expect(phrase.examples.length).toBeGreaterThan(0);
          expect(phrase.examples[0].english).toBeDefined();
          expect(phrase.examples[0].translation).toBeDefined();
        });
      });
    });
  });

  describe('Conversation Scenarios', () => {
    const scenarios = {
      businessMeeting, explainProblemIT, meetingFriendOfFriend,
      programmingParadigmDebate, literaryCriticism
    };

    Object.entries(scenarios).forEach(([fileName, scenario]) => {
      it(`should have a valid structure for ${fileName}`, () => {
        expect(scenario.id).toBeDefined();
        expect(scenario.title).toBeDefined();
        expect(scenario.level).toBeDefined();
        expect(scenario.steps).toBeInstanceOf(Array);
        expect(scenario.steps.length).toBeGreaterThan(0);
        scenario.steps.forEach(step => {
          expect(step.id).toBeDefined();
          expect(step.botMessage).toBeDefined();
          // Feedback is optional for advanced scenarios
          if (step.feedback) {
            expect(step.feedback).toBeDefined();
          }
        });
        expect(scenario.completionMessage).toBeDefined();
      });
    });
  });

  describe('Assessments', () => {
    it('should have a valid structure for C1 assessment', () => {
      expect(assessmentsC1.level).toBe('C1');
      expect(assessmentsC1.totalQuestions).toBeDefined();
      Object.values(assessmentsC1).forEach(section => {
        if (typeof section === 'object' && section.questions) {
          expect(section.title).toBeDefined();
          expect(section.questions).toBeInstanceOf(Array);
          section.questions.forEach(q => {
            expect(q.text).toBeDefined();
            expect(q.options).toBeInstanceOf(Array);
            expect(q.options.length).toBeGreaterThan(1);
            expect(q.correctAnswer).toBeDefined();
            expect(q.explanation).toBeDefined();
          });
        }
      });
    });
  });
});
