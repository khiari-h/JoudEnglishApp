// chatbot/B2/scenarios/mediationConflict.js

const mediationConflict = {
    id: 7,
    title: "Mediating a Conflict",
    level: "B2",
    description: "Intervene in a workplace or interpersonal conflict, helping to identify issues and facilitate resolution through effective communication.",
    estimatedTime: "25-30 minutes",
    vocabulary: ["mediation", "conflict", "resolution", "perspective", "compromise", "misunderstanding", "underlying", "interests", "negotiation", "common ground", "facilitation", "reconciliation", "stakeholders", "constructive", "concerns"],
    steps: [
      {
        id: 1,
        botMessage: "You've been asked to help mediate a conflict between two colleagues in the marketing department who disagree about project leadership. How would you begin the mediation process?",
        inputMode: "freeText",
        suggestions: [
          "I would begin by meeting separately with each colleague to understand their perspective before bringing them together, establishing ground rules for the discussion that emphasize respectful communication.",
          "First, I'd create a neutral environment and explain my role as a facilitator rather than a decision-maker. Then I would invite each person to share their version of the situation without interruption.",
          "I would start by acknowledging that conflicts are natural in collaborative environments and frame this as an opportunity to improve working relationships, then establish a structured process that gives equal speaking time to both parties."
        ],
        hints: "Describe how you would initiate a mediation process, emphasizing neutrality and structure.",
        expectedKeywords: ["begin", "start", "first", "initially", "neutral", "ground rules", "perspectives", "separately", "together", "establish", "process", "facilitate"],
        feedback: {
          correct: "That's an excellent approach to begin the mediation process. Now, what questions would you ask to better understand the core issues of the conflict?",
          partial: "You've touched on some important initial steps. Could you elaborate on how you would establish neutrality and structure?",
          incorrect: "Please describe specific steps you would take to begin mediating this conflict between colleagues."
        }
      },
      {
        id: 2,
        botMessage: "What specific questions would you ask to identify the underlying issues in this leadership conflict?",
        inputMode: "hybrid",
        suggestions: [
          "I would ask: 'What specific aspects of project leadership are creating tension? Can you describe a recent situation where this conflict manifested? What outcome would you consider satisfactory for resolving this issue?'",
          "My questions would include: 'How has the current situation affected your work and wellbeing? What communication breakdown do you believe contributed to this conflict? What are your primary concerns regarding project leadership?'",
          "I would inquire: 'What are your main responsibilities and priorities for this project? Where do you see overlap or conflict in your roles? What previous attempts have been made to resolve this issue, and why do you think they were unsuccessful?'"
        ],
        hints: "Propose specific questions that would help identify core issues and interests.",
        expectedKeywords: ["ask", "questions", "inquire", "specific", "situation", "concerns", "priorities", "expectations", "outcome", "responsibilities", "affected"],
        acceptablePhrases: [
          "I would ask",
          "questions would include",
          "would inquire",
          "specific aspects",
          "main concerns"
        ],
        feedback: {
          correct: "Those are thoughtful questions that would help reveal the underlying issues. After hearing both perspectives, how would you identify common ground between them?",
          partial: "You've suggested some questions. Could you make them more specific to uncovering the core issues of the leadership conflict?",
          incorrect: "Please propose specific questions you would ask to better understand the underlying issues in this conflict."
        }
      },
      {
        id: 3,
        botMessage: "After hearing both sides, you notice they actually agree on the project goals but disagree on methods. How would you help them identify common ground and areas of agreement?",
        inputMode: "freeText",
        suggestions: [
          "I would explicitly highlight the shared project goals they've both mentioned and create a visual representation of their points of agreement. Then I'd facilitate a discussion specifically about these commonalities before addressing areas of disagreement.",
          "I would summarize and reflect back the common elements I've observed: 'It seems you both want the project to succeed and meet its deadlines. You both value quality work and team collaboration. Can we start by acknowledging these shared priorities?'",
          "I would ask them to individually identify what they appreciate about the other's approach and contribution to the project, then facilitate a discussion about how their different methods might be complementary rather than contradictory."
        ],
        hints: "Explain how you would highlight and build upon areas of agreement and common interests.",
        expectedKeywords: ["common", "shared", "agree", "similar", "both", "highlight", "acknowledge", "summarize", "reflect", "priorities", "goals", "interests"],
        feedback: {
          correct: "That's an effective way to establish common ground. Now, how would you facilitate a discussion about the specific areas of disagreement regarding project leadership?",
          partial: "You've identified some approaches to finding common ground. Could you be more specific about how you would make these commonalities explicit to both parties?",
          incorrect: "Please explain how you would help the colleagues identify and acknowledge their areas of agreement and common interests."
        }
      },
      {
        id: 4,
        botMessage: "One colleague feels they should lead the project because of their experience, while the other believes they should lead due to their relationship with the client. How would you help them discuss this specific disagreement constructively?",
        inputMode: "hybrid",
        suggestions: [
          "I would reframe the discussion from 'who should lead' to 'how can both valuable perspectives be incorporated in the leadership structure?' I'd ask them to identify specific project components where each person's strengths would be most valuable, potentially suggesting a co-leadership model with clearly defined responsibilities.",
          "I would encourage them to discuss the specific skills required for different aspects of the project and explore how their complementary strengths could be leveraged. I might suggest: 'Could we consider dividing leadership responsibilities according to your respective strengths rather than having a single leader?'",
          "I would facilitate a discussion about the project's success criteria and what type of leadership would best serve those goals. Then I'd ask: 'What if we approach this as a collaborative leadership opportunity where each of you takes primary responsibility for the aspects where you bring the most value?'"
        ],
        hints: "Describe how you would reframe the disagreement and facilitate a constructive discussion of options.",
        expectedKeywords: ["reframe", "specific", "strengths", "skills", "responsibilities", "collaborative", "complementary", "structure", "model", "discuss", "explore"],
        acceptablePhrases: [
          "reframe the discussion",
          "encourage them to discuss",
          "facilitate a discussion",
          "complementary strengths",
          "collaborative leadership"
        ],
        feedback: {
          correct: "That's an excellent approach to reframing the leadership issue. What would you do if emotions escalate during this part of the discussion?",
          partial: "You've suggested some constructive approaches. Could you elaborate on how you would help them move beyond the 'either/or' thinking about leadership?",
          incorrect: "Please explain how you would help them discuss their specific disagreement about project leadership in a constructive way."
        }
      },
      {
        id: 5,
        botMessage: "During your mediation, one colleague becomes visibly upset and starts making accusatory statements. How would you handle this emotional escalation?",
        inputMode: "freeText",
        suggestions: [
          "I would calmly acknowledge their emotions: 'I can see this is frustrating for you,' then suggest a short break if needed. After emotions settle, I would redirect the conversation to focus on specific behaviors and situations rather than personal accusations, and reestablish ground rules about constructive communication.",
          "I would intervene by saying: 'Let's pause for a moment. It's natural to feel strongly about this issue, but it's important we maintain respectful communication.' Then I would suggest they express their concerns using 'I' statements that focus on impact rather than blame, and check if the other person feels comfortable continuing.",
          "I would validate their feelings while redirecting: 'I understand you feel strongly about this, and those feelings are important. Let's try to express these concerns in a way that helps us move toward resolution.' Then I would remind them of our shared goal to find a workable solution and ask if they need a moment before continuing."
        ],
        hints: "Explain how you would manage emotional escalation while maintaining a productive conversation.",
        expectedKeywords: ["acknowledge", "emotions", "pause", "break", "redirect", "calm", "respectful", "validate", "feelings", "ground rules", "intervention"],
        feedback: {
          correct: "That's a thoughtful way to handle emotional escalation. How would you help the colleagues move toward a specific resolution or agreement?",
          partial: "You've addressed the emotional aspect. Could you be more specific about how you would redirect the conversation back to productive discussion?",
          incorrect: "Please explain how you would respond to emotional escalation and accusatory statements during the mediation."
        }
      },
      {
        id: 6,
        botMessage: "After discussing various options, how would you help the colleagues reach a concrete agreement or compromise about the project leadership?",
        inputMode: "hybrid",
        suggestions: [
          "I would summarize the potential solutions we've discussed and ask them to identify which elements they find most promising. Then I'd guide them in crafting a specific written agreement that outlines their respective responsibilities, decision-making authorities, and communication protocols, with concrete criteria for success.",
          "I would facilitate a structured decision-making process by asking them to evaluate each option against agreed criteria such as project efficiency, client satisfaction, and team harmony. Once they identify a preferred approach, I'd help them develop an implementation plan with clear roles and checkpoints to review progress.",
          "I would propose they draft a shared leadership charter that defines their complementary roles, establishes boundaries for autonomous decisions versus joint decisions, and includes a conflict resolution process for future disagreements. I'd ensure they both explicitly commit to the terms and schedule a follow-up meeting to review how the arrangement is working."
        ],
        hints: "Describe how you would facilitate a specific, actionable agreement or compromise.",
        expectedKeywords: ["agreement", "specific", "concrete", "outline", "draft", "written", "responsibilities", "roles", "commit", "follow-up", "review", "implementation"],
        acceptablePhrases: [
          "summarize potential solutions",
          "guide them in crafting",
          "written agreement",
          "facilitate a structured",
          "draft a shared",
          "clear roles"
        ],
        feedback: {
          correct: "That's an excellent approach to creating a concrete agreement. How would you ensure this resolution is sustainable over time?",
          partial: "You've outlined some steps toward agreement. Could you be more specific about how you would ensure the agreement includes actionable details?",
          incorrect: "Please explain how you would help the colleagues create a specific, concrete agreement about project leadership."
        }
      },
      {
        id: 7,
        botMessage: "How would you ensure that the resolution you've helped facilitate remains effective over time and prevents future conflicts?",
        inputMode: "freeText",
        suggestions: [
          "I would suggest scheduling regular check-in meetings specifically to review how their leadership arrangement is working, starting weekly then decreasing frequency as things stabilize. I'd also help them establish clear metrics for success and a process for addressing new concerns before they escalate into conflicts.",
          "I would propose creating a written conflict resolution protocol that they both agree to follow when tensions arise, including specific steps, timeframes, and if needed, designated neutral third parties. Additionally, I'd recommend they regularly reflect together on what's working well in their collaboration to reinforce positive patterns.",
          "I would facilitate the creation of a feedback mechanism where they can constructively communicate about leadership challenges in real-time, rather than allowing frustrations to build. I would also suggest a quarterly review of their leadership structure to assess if adjustments are needed based on changing project requirements or team dynamics."
        ],
        hints: "Explain strategies for monitoring, maintaining, and reinforcing the resolution over time.",
        expectedKeywords: ["follow-up", "check-in", "review", "monitor", "evaluate", "adjust", "feedback", "regular", "process", "protocol", "communication", "sustainable"],
        feedback: {
          correct: "Those are excellent strategies for ensuring a sustainable resolution. Thank you for demonstrating such thoughtful conflict mediation skills.",
          partial: "You've suggested some follow-up approaches. Could you be more specific about the structure and frequency of these measures?",
          incorrect: "Please explain specific strategies for ensuring the resolution remains effective over time and prevents similar conflicts from recurring."
        }
      }
    ],
    completionMessage: "Excellent work! You've successfully demonstrated the ability to mediate conflicts effectively, showing skills in active listening, reframing issues, managing emotions, and facilitating concrete agreements. These communication strategies are valuable in professional and personal contexts.",
    learningObjectives: [
      "Facilitate constructive dialogue between conflicting parties",
      "Identify underlying interests and common ground",
      "Reframe disagreements in more productive terms",
      "Manage emotional escalation appropriately",
      "Help negotiate specific, actionable agreements",
      "Develop strategies for sustainable conflict resolution"
    ],
    grammar: {
      points: [
        "Conditional structures for suggesting possibilities",
        "Reported speech for summarizing perspectives",
        "Modal verbs for making suggestions and expressing possibilities",
        "Sequence markers for structuring the mediation process",
        "Questions forms for probing and clarifying issues"
      ]
    }
  };
  
  export default mediationConflict;