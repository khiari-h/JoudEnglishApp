// chatbot/B2/scenarios/persuasiveArgument.js

const persuasiveArgument = {
    id: 8,
    title: "Building a Persuasive Argument",
    level: "B2",
    description: "Construct and deliver a well-structured persuasive argument supported by evidence and reasoning, while addressing potential counterarguments.",
    estimatedTime: "25-30 minutes",
    vocabulary: ["argument", "evidence", "persuade", "position", "claim", "reasoning", "counterargument", "credibility", "compelling", "substantial", "objective", "perspective", "convincing", "logical", "fallacy"],
    steps: [
      {
        id: 1,
        botMessage: "We're discussing whether companies should implement a four-day work week. Could you state your position on this issue and your main argument?",
        inputMode: "freeText",
        suggestions: [
          "I believe companies should implement a four-day work week because research consistently shows it increases productivity while improving employee wellbeing. This dual benefit makes it a compelling business strategy, not just a worker-friendly policy.",
          "My position is that a four-day work week should be adopted by more companies. My main argument is that it addresses the growing problem of burnout while maintaining or even improving operational efficiency, as demonstrated by successful implementations in multiple countries.",
          "I argue that transitioning to a four-day work week represents a necessary evolution in work culture. My central claim is that it creates a more sustainable work-life balance without sacrificing business outcomes, which is increasingly essential for attracting and retaining talent in competitive industries."
        ],
        hints: "Clearly state your position and primary argument on the issue.",
        expectedKeywords: ["position", "believe", "argue", "support", "advocate", "main argument", "central claim", "because", "reason", "evidence", "research"],
        feedback: {
          correct: "You've clearly stated your position. What specific evidence or examples would you use to support this argument?",
          partial: "I can see your general position, but could you make your main argument more explicit?",
          incorrect: "Please clearly state whether you support or oppose a four-day work week and your main reason for this position."
        }
      },
      {
        id: 2,
        botMessage: "What specific evidence or examples would you cite to support your argument about the four-day work week?",
        inputMode: "hybrid",
        suggestions: [
          "A landmark study by Microsoft Japan showed a 40% productivity increase after implementing a four-day work week. Similarly, Perpetual Guardian in New Zealand reported a 20% gain in productivity while maintaining the same salary levels. These results have been corroborated by studies from the University of Reading showing reduced stress levels and improved job satisfaction.",
          "Iceland conducted the world's largest trial of reduced working hours between 2015-2019, involving 2,500 workers. The results demonstrated maintained or improved productivity across multiple sectors while significantly enhancing worker wellbeing metrics. These findings were substantial enough to lead to nationwide adoption of shorter work weeks for many Icelandic workers.",
          "The UK-based consultancy Autonomy analyzed data from multiple four-day week trials and found that 63% of businesses found it easier to attract and retain talent, while 78% of employees reported lower stress levels. Importantly, 64% of leaders reported increased productivity and better work quality despite fewer hours worked."
        ],
        hints: "Provide specific studies, statistics, examples, or expert opinions that support your position.",
        expectedKeywords: ["study", "research", "data", "statistics", "example", "trial", "demonstrated", "showed", "found", "report", "evidence", "survey", "analysis"],
        acceptablePhrases: [
          "study showed",
          "research found",
          "reported a",
          "demonstrated",
          "results indicated",
          "trial revealed"
        ],
        feedback: {
          correct: "You've provided strong evidence to support your position. How would you address the counterargument that some businesses cannot function effectively with a four-day week?",
          partial: "You've offered some evidence. Could you provide more specific data, studies, or examples to strengthen your argument?",
          incorrect: "Please provide specific research, statistics, or examples that support your argument for or against the four-day work week."
        }
      },
      {
        id: 3,
        botMessage: "A common counterargument is that many businesses, especially in service industries, cannot operate effectively with a four-day work week. How would you address this concern?",
        inputMode: "freeText",
        suggestions: [
          "While this concern is valid, it misunderstands the concept of a four-day work week as simply closing for an extra day. Many successful implementations stagger employee schedules to maintain five or even seven-day operations while giving each employee a four-day schedule. The Belgian service sector has demonstrated this through rotational scheduling that maintains customer service while reducing individual work hours.",
          "This counterargument assumes a one-size-fits-all approach that isn't being proposed. The four-day model can be adapted to different sectors; for instance, healthcare providers in Sweden implemented compressed hours with overlapping shifts to maintain continuous coverage while reducing individual workloads. The key is flexible implementation rather than rigid application across all industries.",
          "I acknowledge that service industries face unique challenges, but the evidence suggests these are not insurmountable. Companies like Shake Shack in the US have successfully tested four-day schedules for managers while maintaining service quality and hours. The approach requires rethinking scheduling and potentially hiring additional part-time staff, but the productivity and retention benefits often offset these adjustments."
        ],
        hints: "Acknowledge the counterargument and then refute it with evidence, examples, or reasoning.",
        expectedKeywords: ["acknowledge", "understand", "concern", "valid", "however", "evidence", "example", "implementation", "adapt", "flexible", "solution", "staggered", "rotational"],
        feedback: {
          correct: "You've effectively addressed the counterargument by acknowledging the concern and providing a nuanced response. How would you structure your overall argument to be most persuasive?",
          partial: "You've begun to address the counterargument. Could you provide more specific examples or solutions to strengthen your response?",
          incorrect: "Please acknowledge the concern about service industries and then explain how this challenge could be addressed or why it doesn't invalidate your position."
        }
      },
      {
        id: 4,
        botMessage: "How would you structure your complete argument for maximum persuasive impact? Outline the key components and their sequence.",
        inputMode: "hybrid",
        suggestions: [
          "I would begin with a compelling introduction highlighting the growing workplace burnout crisis to establish relevance. Next, I'd clearly state my position supporting the four-day week. The body would include three sections: first, evidence of productivity benefits from multiple studies; second, documented wellbeing improvements; and third, successful implementation examples across diverse industries. I would then acknowledge and refute key counterarguments, particularly concerning service industries and implementation costs. Finally, I'd conclude with the broader implications for business sustainability and competitive advantage.",
          "My argument would follow a problem-solution-benefits structure. I'd start by establishing the problem of diminishing returns from traditional work models and employee disengagement. Then I'd present the four-day week as a research-backed solution, citing major studies from Japan, New Zealand, and Iceland. Next, I'd outline the triple benefit: improved productivity, enhanced wellbeing, and environmental advantages. After addressing practical implementation concerns and costs, I'd conclude with a call to action emphasizing the first-mover advantage for early adopters.",
          "I would structure my argument using the PREP method (Point, Reason, Example, Point). My main point is that four-day work weeks benefit both businesses and employees. The reasons include increased productivity, improved wellbeing, and competitive advantage in recruitment. For examples, I'd detail case studies from diverse sectors and countries. I would integrate counterargument responses throughout rather than grouping them separately, and conclude by restating my point with emphasis on the economic and human benefits, appealing to both logical and ethical considerations."
        ],
        hints: "Outline a clear structure for your complete argument, including introduction, key points, counterarguments, and conclusion.",
        expectedKeywords: ["structure", "begin", "first", "next", "then", "finally", "introduce", "establish", "address", "conclude", "sections", "components", "outline"],
        acceptablePhrases: [
          "would begin with",
          "start by",
          "next, I'd",
          "the body would include",
          "then I'd present",
          "address counterarguments",
          "conclude with"
        ],
        feedback: {
          correct: "You've outlined a strong persuasive structure. How would you adapt your tone and language to make your argument more compelling to skeptical business leaders?",
          partial: "You've provided some structural elements. Could you give a more complete outline of how you'd sequence your entire argument?",
          incorrect: "Please outline how you would structure your complete argument from introduction through conclusion, including how you would organize your main points and address counterarguments."
        }
      },
      {
        id: 5,
        botMessage: "Business leaders are often skeptical of workplace innovations that seem idealistic. How would you adapt your tone, language, and framing to be persuasive to this specific audience?",
        inputMode: "freeText",
        suggestions: [
          "I would adopt a pragmatic, results-oriented tone, emphasizing ROI rather than idealism. I'd frame the four-day week as a strategic competitive advantage rather than a worker benefit, using business language like 'operational efficiency,' 'talent acquisition advantage,' and 'measurable productivity metrics.' Instead of theoretical benefits, I'd focus on quantifiable outcomes from case studies, particularly emphasizing cost savings from reduced turnover and decreased absenteeism. I would acknowledge implementation challenges directly while presenting phased approaches with clear KPIs for measuring success.",
          "For business leaders, I would focus on data-driven arguments and avoid emotional appeals. I'd use precise language that emphasizes business outcomes: 'This isn't about work-life balance—it's about optimizing human capital efficiency.' I would quantify benefits wherever possible, comparing implementation costs against projected savings and productivity gains. My examples would feature companies known for operational excellence rather than workplace culture, and I would suggest low-risk pilot programs as a practical first step rather than advocating immediate company-wide changes.",
          "I would approach skeptical business leaders by speaking their language of risk management and competitive advantage. Rather than presenting the four-day week as a radical change, I'd position it as a calculated evolution backed by market research. I would cite examples of traditional companies and direct competitors who have implemented this successfully, emphasizing retention metrics and recruitment cost savings. I'd acknowledge their concern for operational continuity by outlining specific implementation strategies that minimize disruption, and suggest a controlled trial with clear success metrics before wider adoption."
        ],
        hints: "Explain how you would adapt your language, examples, and framing to appeal specifically to business leaders.",
        expectedKeywords: ["business-focused", "ROI", "metrics", "quantify", "data-driven", "costs", "benefits", "efficiency", "competitive", "pragmatic", "strategic", "implementation"],
        feedback: {
          correct: "Your approach is well-tailored to a business audience. What logical fallacies or weak reasoning should you avoid when making this argument?",
          partial: "You've identified some appropriate strategies for this audience. Could you be more specific about the language and framing you would use?",
          incorrect: "Please explain how you would specifically adapt your tone, language, and examples to appeal to skeptical business leaders."
        }
      },
      {
        id: 6,
        botMessage: "What logical fallacies or weak reasoning should you avoid when making your argument about the four-day work week?",
        inputMode: "hybrid",
        suggestions: [
          "I should avoid the hasty generalization fallacy of claiming that because the four-day week worked well in specific companies, it will work universally for all businesses regardless of sector or size. I would also avoid false dichotomy arguments suggesting the only options are a traditional five-day week or a four-day week, when many flexible arrangements exist. Finally, I would be careful not to rely on emotional appeals about work-life balance without substantiating productivity claims with concrete evidence.",
          "I would avoid correlation-causation errors by acknowledging that productivity gains in case studies might be influenced by factors beyond schedule changes, such as the Hawthorne effect or concurrent workplace improvements. I would also steer clear of cherry-picking only successful implementations while ignoring failures or challenges. Additionally, I would avoid appeal to novelty arguments suggesting the approach is better simply because it's newer or trending.",
          "I should avoid slippery slope reasoning that suggests minor schedule modifications would lead to dramatic workplace disruption. I would also be careful not to commit the naturalistic fallacy of arguing that because the five-day week is traditional, it is inherently better or more 'natural.' Finally, I would avoid anecdotal evidence and single-case reasoning, instead relying on systematic studies with appropriate sample sizes and methodological rigor."
        ],
        hints: "Identify specific logical fallacies or weak reasoning approaches you would avoid in your argument.",
        expectedKeywords: ["fallacy", "avoid", "careful", "generalization", "correlation", "causation", "cherry-picking", "anecdotal", "emotional", "dichotomy", "slippery slope", "appeal to"],
        acceptablePhrases: [
          "should avoid",
          "be careful not to",
          "steer clear of",
          "would not rely on",
          "avoid the fallacy of",
          "instead of"
        ],
        feedback: {
          correct: "You've identified important logical pitfalls to avoid. Finally, how would you conclude your argument to leave a strong, memorable impression?",
          partial: "You've mentioned some reasoning issues to avoid. Could you identify more specific logical fallacies relevant to this particular argument?",
          incorrect: "Please identify specific logical fallacies or weak reasoning approaches that you would avoid when making this argument."
        }
      },
      {
        id: 7,
        botMessage: "How would you conclude your argument about the four-day work week to leave a strong, memorable impression?",
        inputMode: "freeText",
        suggestions: [
          "In conclusion, the four-day work week represents not merely a schedule change but a fundamental recalibration of how we value productivity and human capital. The evidence from global implementations consistently demonstrates that when companies invest in sustainable work patterns, they harvest returns in productivity, talent retention, and innovation capacity. As the competition for skilled workers intensifies, organizations that cling to industrial-era work schedules will find themselves at a significant disadvantage. The question is no longer whether a four-day week can work—the data clearly shows it can—but whether your organization will be a leader or a follower in this inevitable workplace evolution.",
          "As we look to the future of work, the four-day work week stands as a rare opportunity to simultaneously advance business interests and human wellbeing. The research is clear: companies implementing this model thoughtfully are seeing measurable gains in productivity, dramatic reductions in turnover costs, and enhanced ability to attract premium talent. While implementation requires careful planning, the return on investment makes this a strategic imperative rather than a workplace perk. In a business landscape where innovation increasingly determines market leadership, how we structure work itself may be the most consequential innovation of all. The four-day week isn't just good for people—it's good business.",
          "To conclude, we stand at an inflection point where traditional workplace assumptions are being tested against emerging data. The four-day work week has moved beyond theoretical debate into the realm of competitive advantage, with early adopters demonstrating significant benefits across productivity, retention, and operational costs. As your competitors begin exploring this model—and make no mistake, they are—the opportunity cost of inaction grows. By implementing a carefully designed pilot program with clear success metrics, you can evaluate this approach with minimal risk while potentially securing substantial long-term advantages. The companies that thrive tomorrow will be those that recognize when established practices have become limitations rather than strengths."
        ],
        hints: "Create a powerful conclusion that reinforces your main argument and leaves a lasting impression.",
        expectedKeywords: ["conclusion", "therefore", "ultimately", "evidence shows", "future", "opportunity", "advantage", "benefits", "action", "implement", "consider", "recommend"],
        feedback: {
          correct: "Excellent conclusion! You've crafted a persuasive argument about the four-day work week that effectively uses evidence, addresses counterarguments, and is tailored to your audience.",
          partial: "You've started to develop a conclusion. Could you make it more impactful and directly tied to your main argument?",
          incorrect: "Please create a strong conclusion that summarizes your key points and leaves a memorable final impression about the four-day work week."
        }
      }
    ],
    completionMessage: "Excellent work! You've demonstrated sophisticated skills in constructing a persuasive argument, using evidence effectively, addressing counterarguments, and adapting your approach to your audience. These persuasive communication skills are valuable in professional, academic, and civic contexts.",
    learningObjectives: [
      "Construct well-structured persuasive arguments",
      "Support claims with relevant evidence and examples",
      "Address and refute counterarguments effectively",
      "Adapt tone and framing for specific audiences",
      "Recognize and avoid logical fallacies",
      "Create powerful conclusions that reinforce main arguments"
    ],
    grammar: {
      points: [
        "Conditional structures for hypothetical scenarios",
        "Complex sentence structures with subordinate clauses",
        "Transition words and phrases for logical flow",
        "Persuasive and hedging language",
        "Comparative and superlative forms"
      ]
    }
  };
  
  export default persuasiveArgument;