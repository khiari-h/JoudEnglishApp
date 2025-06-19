// chatbot/B2/scenarios/diplomacyDisagreement.js

const diplomacyDisagreement = {
    id: 9,
    title: "Diplomatic Disagreement",
    level: "B2",
    description: "Express disagreement diplomatically in professional contexts while maintaining relationships and finding constructive paths forward.",
    estimatedTime: "20-25 minutes",
    vocabulary: ["perspective", "appreciate", "alternative", "consider", "suggestion", "concerns", "understand", "acknowledge", "respectfully", "approach", "viewpoint", "compromise", "clarify", "interpret", "proposal"],
    steps: [
      {
        id: 1,
        botMessage: "In our project meeting, I've proposed extending the deadline by two weeks. What do you think about this timeline change?",
        inputMode: "freeText",
        suggestions: [
          "While I appreciate the need for flexibility, I have concerns about extending the deadline because it could affect our quarterly targets and client commitments.",
          "I understand why you might want more time, but I see some challenges with this proposal as it may impact other dependent projects and our resource allocation.",
          "I respectfully disagree with extending the deadline. Our team has already committed to the original timeline, and a delay would affect several stakeholders who are counting on our deliverables."
        ],
        hints: "Express disagreement politely while acknowledging the other person's perspective.",
        expectedKeywords: ["appreciate", "understand", "concerns", "however", "respectfully", "disagree", "challenge", "issue", "perspective", "alternative", "consider"],
        feedback: {
          correct: "You've expressed your disagreement constructively. Could you explain your specific concerns in more detail?",
          partial: "That's a start, but try to both acknowledge my proposal and clearly express your alternative view.",
          incorrect: "Remember to express disagreement diplomatically by acknowledging my perspective while clearly stating your different viewpoint."
        }
      },
      {
        id: 2,
        botMessage: "I suggested the extension because I'm concerned about quality issues if we rush. Could you elaborate on your specific concerns about keeping the original deadline?",
        inputMode: "hybrid",
        suggestions: [
          "I appreciate your focus on quality. My concern is that we've already communicated this timeline to clients who have planned their operations around our delivery date. Changing it now could damage our credibility and potentially impact our contract renewal discussions.",
          "I understand the quality concerns, which are valid. However, delaying would create significant complications with resource allocation as we've scheduled our design team to move to another critical project immediately after our current delivery date.",
          "While quality is certainly important, I'm concerned that extending the deadline would conflict with our quarterly financial targets that the executive team has committed to shareholders. Perhaps we could explore alternative solutions that address quality without extending the timeline."
        ],
        hints: "Explain your reasoning clearly while acknowledging the validity of their concern.",
        expectedKeywords: ["appreciate", "understand", "valid", "concern", "however", "impact", "issue", "reason", "committed", "scheduled", "financial", "targets", "stakeholders"],
        acceptablePhrases: [
          "I appreciate your",
          "I understand the",
          "My concern is",
          "However,",
          "The issue is"
        ],
        feedback: {
          correct: "You've clearly explained your concerns while acknowledging mine. What alternative approach might you suggest?",
          partial: "You've mentioned some concerns, but could you be more specific about the impact while acknowledging my quality concerns?",
          incorrect: "Please explain your specific concerns about keeping the original deadline while acknowledging my point about quality."
        }
      },
      {
        id: 3,
        botMessage: "It seems we have different priorities here. What alternative approach would you suggest that might address both our concerns?",
        inputMode: "freeText",
        suggestions: [
          "Instead of extending the full deadline, perhaps we could implement a phased delivery approach. We could deliver core functionality on the original date to meet commitments, then enhance secondary features in a follow-up release two weeks later. This would maintain our timeline commitments while allowing more time for quality assurance on complex elements.",
          "What if we maintain the deadline but allocate additional resources to the project? I could work with the resource management team to identify team members who could temporarily join us to address the quality concerns without extending our timeline. This balances both quality and timeliness.",
          "I suggest we review our scope and identify any features that could be deprioritized or simplified for the initial release. This would reduce quality pressure without moving the deadline. We could then schedule these deprioritized features for a subsequent update, which we'd communicate transparently to stakeholders."
        ],
        hints: "Propose a constructive alternative that addresses both sets of concerns.",
        expectedKeywords: ["suggest", "propose", "alternative", "approach", "solution", "compromise", "option", "balance", "address", "both", "concerns", "maintain", "quality", "timeline"],
        feedback: {
          correct: "That's a thoughtful alternative that addresses both perspectives. How would you present this compromise to other stakeholders?",
          partial: "You've proposed an alternative, but could you ensure it clearly addresses both quality concerns and timeline constraints?",
          incorrect: "Please suggest a specific alternative approach that would address both my quality concerns and your timeline concerns."
        }
      },
      {
        id: 4,
        botMessage: "Your suggestion has merit. How would you communicate this compromise to other team members and stakeholders who have different expectations?",
        inputMode: "hybrid",
        suggestions: [
          "I would organize a brief stakeholder meeting where we transparently present both the timeline concerns and quality considerations. I'd emphasize that our proposed approach isn't a compromise on either quality or timeliness, but rather an optimized solution that respects both priorities. I'd outline specific benefits to each stakeholder group and provide a detailed implementation plan to build confidence.",
          "I'd draft a clear communication that acknowledges the different perspectives and explains the rationale behind our solution. For clients, I'd emphasize our commitment to their deadlines; for the technical team, I'd highlight how the approach addresses quality concerns; and for management, I'd explain how this balances business objectives while minimizing risks. I'd also establish checkpoints to evaluate progress.",
          "I would communicate this as a strategic refinement rather than a compromise. In my explanation, I'd acknowledge the valid concerns raised from different perspectives and demonstrate how our approach actually enhances the project outcome rather than simply splitting the difference. I'd prepare specific talking points for different stakeholders, addressing their particular priorities and how this solution serves them."
        ],
        hints: "Describe how you would effectively communicate the compromise to various stakeholders.",
        expectedKeywords: ["communicate", "explain", "present", "meeting", "email", "transparently", "acknowledge", "perspectives", "benefits", "rationale", "priorities", "address", "concerns"],
        acceptablePhrases: [
          "I would",
          "organize a",
          "draft a",
          "communicate this as",
          "explain the",
          "present both",
          "acknowledge the"
        ],
        feedback: {
          correct: "That's an effective communication approach. What would you do if someone still strongly objects to this compromise?",
          partial: "Your communication plan has some good elements. Could you address how you'd tailor the message to different stakeholders' priorities?",
          incorrect: "Please describe specifically how you would communicate this compromise solution to various stakeholders with different priorities and expectations."
        }
      },
      {
        id: 5,
        botMessage: "Our technical lead still strongly objects to this approach, insisting that the full extension is necessary. How would you respond to this continued disagreement?",
        inputMode: "freeText",
        suggestions: [
          "I would arrange a one-on-one conversation with the technical lead to better understand their specific concerns in depth. Rather than debating our positions, I'd focus on exploring what specific quality aspects worry them most. This might reveal particular issues we could address in targeted ways without a full extension. I'd validate their expertise while collaboratively identifying the most critical technical risks that need mitigation.",
          "I would acknowledge the technical lead's expertise and ask them to help prioritize which specific quality concerns pose the greatest risks to project success. Then I'd suggest we collectively develop targeted solutions for those highest-priority issues within our proposed approach. This respects their professional judgment while still working within our constraints, and they might identify focused solutions we haven't considered.",
          "I would invite the technical lead to elaborate on the specific quality issues they're concerned about and what concrete problems might arise without the full extension. Then I'd ask what minimum adjustments would be required to address the most critical technical concerns. This moves from a yes/no stance on the extension to a problem-solving discussion where we can find specific, targeted compromises based on technical priorities."
        ],
        hints: "Describe how you would respectfully address continued disagreement while seeking resolution.",
        expectedKeywords: ["listen", "understand", "specific", "concerns", "acknowledge", "expertise", "explore", "further", "compromise", "priority", "critical", "targeted", "solution"],
        feedback: {
          correct: "That's a constructive approach to continued disagreement. How would you ensure your tone remains diplomatic if the conversation becomes heated?",
          partial: "You've outlined some steps to address the disagreement. Could you focus more on how you'd respectfully engage with their continued objection?",
          incorrect: "Please explain how you would respectfully respond to the technical lead's continued strong objection while working toward resolution."
        }
      },
      {
        id: 6,
        botMessage: "The discussion has become quite tense, with raised voices and interruptions. How would you maintain diplomatic communication while still advocating for your position?",
        inputMode: "hybrid",
        suggestions: [
          "I would deliberately lower my voice and slow my speech pattern to create a calming effect. I might say, 'I notice this discussion has become quite intense, which suggests how much we all care about the project's success. Perhaps we could take a short break and resume when we're all feeling more centered.' When we continue, I'd reframe the conversation around our shared goal of project success rather than competing positions.",
          "I would acknowledge the tension directly: 'I understand this is a challenging situation, and we all feel strongly because we care about doing our best work. I value your expertise and commitment.' Then I'd suggest we establish some discussion guidelines, like taking turns speaking without interruption, to ensure everyone feels heard. Throughout, I'd maintain a calm, measured tone regardless of others' emotional intensity.",
          "I would pause the discussion and suggest we take a step back: 'It seems we're all passionate about this project, which is actually a strength of our team. Let's take a moment to reset.' Then I'd propose we each summarize our core concern in one sentence without rebuttal, to ensure mutual understanding. Throughout, I'd maintain open body language, avoid defensive phrasing, and use 'we' language to emphasize our shared responsibility for finding a solution."
        ],
        hints: "Describe techniques for maintaining diplomatic communication in a tense situation.",
        expectedKeywords: ["calm", "tone", "acknowledge", "tension", "pause", "listen", "respect", "break", "shared", "goal", "understand", "reset", "measured", "emotion"],
        acceptablePhrases: [
          "lower my voice",
          "slow my speech",
          "acknowledge the tension",
          "suggest we take",
          "pause the discussion",
          "maintain a calm",
          "open body language"
        ],
        feedback: {
          correct: "Those are excellent techniques for de-escalating tension while maintaining productive dialogue. How would you summarize the key points of agreement and disagreement to move forward?",
          partial: "You've identified some approaches to managing tension. Could you be more specific about how you would maintain diplomacy while still advocating your position?",
          incorrect: "Please describe specific techniques you would use to maintain diplomatic communication when the discussion becomes heated with raised voices and interruptions."
        }
      },
      {
        id: 7,
        botMessage: "After our heated discussion, we need to find a path forward. How would you summarize the points of agreement and disagreement, and propose next steps?",
        inputMode: "freeText",
        suggestions: [
          "From our discussion, it seems we agree on several key points: quality is essential for project success, we have commitments to stakeholders that should be honored, and we need a solution that balances multiple priorities. Where we differ is on whether our resource constraints allow for quality delivery within the original timeline. I propose we jointly develop a risk assessment matrix identifying specific quality concerns with their probability and impact. For high-risk items, we'll develop targeted mitigation strategies. Let's reconvene tomorrow to review this assessment and finalize our approach.",
          "I believe we've made progress in understanding each perspective better. We align on the importance of both quality deliverables and meeting our commitments. The core disagreement centers on whether quality issues can be adequately addressed without a full timeline extension. As a next step, I suggest we create a detailed project quality checklist together, identifying critical versus nice-to-have elements. This will help us make data-driven decisions about where to focus our efforts. I'll draft this framework today and share it for your input by end of day.",
          "It appears we've reached consensus that both quality and timeliness matter, and that we need a workable solution that respects both. Our main point of contention is how severe the quality risks actually are without a full extension. To move forward constructively, I suggest we bring in our QA lead to help us objectively assess the highest-priority quality concerns and quantify them. Based on that assessment, we can jointly decide which aspects might need additional time or resources. I'm happy to coordinate this review if that would be helpful."
        ],
        hints: "Summarize key agreements and disagreements, then propose concrete next steps.",
        expectedKeywords: ["agree", "consensus", "differ", "disagreement", "propose", "next steps", "suggest", "move forward", "assessment", "review", "develop", "create", "coordinate"],
        feedback: {
          correct: "That's an excellent summary and constructive path forward. You've demonstrated strong skills in diplomatically managing disagreement while working toward solutions.",
          partial: "You've started to summarize the situation. Could you more clearly identify both agreements and disagreements, and propose specific next steps?",
          incorrect: "Please summarize the specific points where we agree and disagree, and propose concrete next steps to move forward after our discussion."
        }
      }
    ],
    completionMessage: "Excellent work! You've successfully demonstrated the ability to express disagreement diplomatically, maintain constructive dialogue even in tense situations, and find paths forward that respect different perspectives. These communication skills are valuable in professional and personal contexts.",
    learningObjectives: [
      "Express disagreement constructively while acknowledging others' perspectives",
      "Explain reasoning clearly and diplomatically",
      "Propose alternative solutions that address multiple concerns",
      "Communicate compromise effectively to various stakeholders",
      "Maintain diplomatic tone during tense discussions",
      "Summarize points of agreement and disagreement to move conversations forward"
    ],
    grammar: {
      points: [
        "Conditional structures for suggesting alternatives",
        "Modal verbs for expressing possibilities and suggestions",
        "Concessive clauses with 'while' and 'although'",
        "Hedging language to soften disagreement",
        "Complex sentences with subordinate clauses"
      ]
    }
  };

  export default diplomacyDisagreement;
