// chatbot/B2/scenarios/moralDilemma.js

const moralDilemma = {
    id: 11,
    title: "Moral Dilemma",
    level: "B2",
    description: "Debate ethical questions with nuanced perspectives, weighing principles, consequences, and competing moral values.",
    estimatedTime: "25-30 minutes",
    vocabulary: ["ethical", "moral", "principle", "consequence", "dilemma", "values", "integrity", "justified", "responsibility", "perspective", "obligation", "rights", "duty", "autonomy", "virtue"],
    steps: [
      {
        id: 1,
        botMessage: "You've discovered that a colleague has been exaggerating sales figures in their reports to management. The inaccuracies are significant but not enormous. You're concerned, but this person has also confided in you that they're supporting their seriously ill parent and can't afford to lose their job. How would you approach this ethical dilemma?",
        inputMode: "freeText",
        suggestions: [
          "This situation presents a conflict between honesty and professional integrity on one hand, and compassion for my colleague's difficult personal circumstances on the other. While I understand their motivation, falsifying company data violates basic ethical principles and could have serious consequences for the business, other employees, and eventually for my colleague themselves. I would approach them privately first, express my concerns, and encourage them to correct the reports voluntarily. I would also help them explore alternative solutions to their financial challenges, such as company assistance programs or legal financial aid options for family medical care.",
          "I see this as a dilemma between truth and loyalty. While I value honesty and recognize that inaccurate reporting undermines business integrity, I also feel compassion for my colleague's situation. I would first speak directly with them, acknowledging their difficult circumstances while explaining that falsifying reports could ultimately lead to worse consequences if discovered by others. I would offer to help them find resources for their parent's care and suggest they proactively correct the reports, framing it to management as an accounting error rather than deliberate deception.",
          "This situation involves balancing competing ethical principles: truthfulness in professional conduct versus compassion and care for someone in difficult circumstances. I would approach my colleague privately and express both my concern about the inaccuracies and my understanding of their challenging situation. I would point out that continuing this practice puts them at greater risk long-term, and suggest we work together to find alternatives—perhaps speaking confidentially with HR about hardship assistance or family leave options. I believe this approach respects both the importance of honesty and the colleague's dignity."
        ],
        hints: "Identify the ethical principles in conflict and suggest a nuanced approach that considers multiple perspectives.",
        expectedKeywords: ["dilemma", "ethical", "conflict", "honesty", "integrity", "compassion", "consequences", "approach", "balance", "principles", "alternatives", "situation"],
        feedback: {
          correct: "You've thoughtfully identified the competing values and suggested a balanced approach. What specific consequences might result from different ways of handling this situation?",
          partial: "You've touched on some ethical aspects. Could you more clearly identify the competing principles and develop a more nuanced approach?",
          incorrect: "Please identify the ethical principles in conflict in this situation and suggest an approach that considers both the professional integrity concerns and the colleague's personal circumstances."
        }
      },
      {
        id: 2,
        botMessage: "What potential consequences might result from different approaches to this situation, both for the individuals involved and for the organization?",
        inputMode: "hybrid",
        suggestions: [
          "If I report the situation immediately, the consequences could include: my colleague losing their job when they're most vulnerable; damage to workplace trust and relationships; but also proper accountability and correction of misleading business data. If I remain silent, the short-term consequence might be protecting my colleague's livelihood, but longer-term risks include: the deception potentially growing larger; enabling unethical behavior that could harm the company's decision-making; personal liability if I'm seen as complicit; and undermining the culture of integrity. A balanced approach of private intervention might result in: preserving the colleague's dignity; giving them an opportunity to correct the situation themselves; maintaining workplace relationships; while still eventually ensuring accurate business reporting and potentially connecting them with legitimate support resources.",
          "Different approaches would yield varied consequences. Immediate reporting to management would ensure business integrity and accurate decision-making, but could devastate my colleague financially and emotionally during their family crisis, potentially creating a hostile atmosphere among other team members who may see it as callous. Ignoring the situation protects my colleague temporarily but enables potentially escalating dishonesty, makes me complicit in unethical behavior, and could eventually lead to more serious repercussions for everyone if the deception expands or is discovered. The middle-ground approach of speaking directly with my colleague acknowledges their humanity while upholding ethical standards, though it carries the uncertainty of whether they will respond constructively to this intervention.",
          "The consequences vary significantly based on approach. Immediately escalating to management upholds professional standards but could have severe humanitarian consequences for both my colleague and their ill parent, while creating a workplace culture of fear rather than ethical understanding. Saying nothing avoids immediate conflict but tacitly endorses dishonesty, potentially enabling increasingly serious ethical violations that could eventually harm customers, investors, and the company's reputation, while making me ethically complicit. A graduated approach—starting with a private conversation, followed by supporting my colleague in finding alternatives, and only escalating if necessary—balances immediate compassion with ethical principles. This approach has the potential consequence of helping my colleague develop greater ethical awareness while addressing their legitimate needs through proper channels."
        ],
        hints: "Analyze consequences of different approaches, considering ethical, professional, and personal dimensions.",
        expectedKeywords: ["consequences", "reporting", "ignoring", "balanced approach", "short-term", "long-term", "risking", "trust", "integrity", "relationships", "reputation", "ethical"],
        acceptablePhrases: [
          "if I report",
          "if I remain silent",
          "balanced approach",
          "consequences include",
          "could result in",
          "risks include",
          "long-term"
        ],
        feedback: {
          correct: "You've thoroughly analyzed the consequences of different approaches. How might cultural factors or different ethical frameworks influence how someone views this dilemma?",
          partial: "You've identified some consequences. Could you develop a more comprehensive analysis of how different approaches would affect both individuals and the organization?",
          incorrect: "Please analyze the potential consequences of different approaches to this situation, considering impacts on the individual, yourself, and the organization."
        }
      },
      {
        id: 3,
        botMessage: "How might different ethical frameworks or cultural perspectives lead to different approaches to this dilemma?",
        inputMode: "freeText",
        suggestions: [
          "Different ethical frameworks would indeed suggest varying approaches. A utilitarian perspective might weigh the total harm caused by each option, potentially favoring protecting the colleague if their family hardship outweighs the harm of the reporting inaccuracies. A deontological or Kantian approach would emphasize the universal principle of honesty, suggesting that falsifying reports is inherently wrong regardless of circumstances. Virtue ethics might focus on what a person of good character would do, balancing honesty with compassion. Cultural perspectives also influence ethical reasoning—collectivist cultures might prioritize group harmony and the colleague's family needs, while individualist cultures might emphasize personal responsibility and organizational rules. Religious frameworks might emphasize mercy and forgiveness while still requiring truth and restitution. These diverse perspectives explain why reasonable people might disagree about the right approach, highlighting the importance of moral reasoning that considers multiple ethical dimensions rather than applying simplistic rules.",
          "Ethical frameworks provide different lenses for this dilemma. A consequentialist would focus primarily on which approach produces the best overall outcome for all stakeholders, potentially justifying temporary silence if the colleague's situation is truly desperate and the reporting issues relatively minor. A principled deontological approach would emphasize the categorical imperative to be truthful, viewing the falsification as wrong regardless of circumstances. Care ethics would prioritize the relationships involved and the vulnerability of the colleague, perhaps favoring a supportive intervention approach. Cultural differences also significantly impact ethical reasoning—some cultures prioritize family obligations above almost all else, potentially viewing the colleague's actions as justified by filial responsibility, while others might emphasize professional duties and transparent business practices as paramount. A justice perspective would consider what's fair to all parties, including other employees who report honestly despite their own hardships.",
          "Various ethical traditions suggest different resolutions. A rights-based approach would consider both the organization's right to accurate information and the colleague's right to dignified treatment. A communitarian perspective might examine obligations to the broader community, including how falsified reports affect other stakeholders. Professional ethics specifically emphasizes obligations within one's occupational role—the duty to maintain data integrity in business contexts. Cultural factors significantly influence these considerations: in some societies, family obligation might be seen as the highest moral duty, potentially justifying actions taken to protect family members, while in others, adherence to abstract principles like truthfulness might take precedence regardless of circumstances. Religious traditions often grapple with balancing justice and mercy—acknowledging wrongdoing while creating paths for redemption. Finally, contextual ethics would examine the specific power dynamics, noting that organizational policies that lack compassion for employees in crisis might themselves raise ethical concerns."
        ],
        hints: "Analyze how different ethical frameworks and cultural perspectives would approach this dilemma.",
        expectedKeywords: ["utilitarian", "deontological", "virtue ethics", "consequentialist", "principles", "cultural", "religious", "justice", "rights", "care", "collectivist", "individualist", "perspectives"],
        feedback: {
          correct: "You've provided a sophisticated analysis of how different ethical frameworks and cultural perspectives might approach this situation. If you were in a position of authority, what policy or systemic response might help prevent similar dilemmas?",
          partial: "You've mentioned some ethical perspectives. Could you develop a more thorough analysis of how different ethical frameworks and cultural values would approach this situation?",
          incorrect: "Please explain how different ethical frameworks (such as utilitarian, deontological, virtue ethics) and cultural perspectives might lead to different approaches to this dilemma."
        }
      },
      {
        id: 4,
        botMessage: "If you were in a leadership position at this organization, what policies or systemic changes might you implement to reduce the likelihood of such ethical dilemmas arising?",
        inputMode: "hybrid",
        suggestions: [
          "I would implement several interconnected policies. First, I'd establish a robust employee assistance program providing financial support, paid family leave, and counseling services for employees facing personal crises—addressing the underlying needs that drove the desperate behavior. Second, I'd create transparent sales reporting systems with multiple verification points rather than relying on individual self-reporting. Third, I'd develop an ethical climate through regular training that uses realistic scenarios to build moral reasoning skills. Fourth, I'd implement a graduated discipline policy that distinguishes between ethical lapses driven by personal hardship versus self-interest, encouraging self-reporting of mistakes. Finally, I'd establish a confidential ethics consultation service where employees could discuss dilemmas before making decisions they might regret. These systemic approaches would address both the immediate symptoms and underlying causes of ethical dilemmas.",
          "I would address this systemically through both compassionate support and structural integrity measures. On the support side: establish emergency financial assistance programs for employees in crisis; create flexible work arrangements for those with caregiver responsibilities; and partner with community organizations providing elder care resources. On the integrity side: implement a four-eyes principle for financial and sales reporting; conduct regular, randomized audits of reports rather than waiting for red flags; and create dashboards comparing reported figures against objective metrics to quickly identify discrepancies. I would also foster psychological safety by celebrating ethical courage when employees acknowledge mistakes, while still maintaining appropriate accountability. This balanced approach addresses the institutional conditions that often create pressure for unethical choices while maintaining necessary oversight.",
          "I would implement a multi-faceted approach addressing both human needs and organizational integrity. First, developing robust family support policies including emergency loans, expanded family leave, and healthcare advocacy services—removing the desperation that drives some unethical choices. Second, creating structural safeguards within reporting systems, such as automated cross-checks that flag statistical anomalies and regular rotation of reporting responsibilities. Third, building a transparent organization where key metrics and their verification processes are visible to teams, reducing the perception that reporting manipulations go unnoticed. Fourth, establishing proportional response protocols for ethical violations that consider context and intent while still ensuring accountability and correction. And finally, implementing regular ethical decision-making workshops using realistic scenarios to develop employees' moral reasoning skills before they face real dilemmas. This comprehensive approach balances compassion with integrity."
        ],
        hints: "Propose specific policies and systemic changes that address both the immediate ethical issue and underlying causes.",
        expectedKeywords: ["policy", "implement", "assistance", "support", "verification", "transparency", "training", "culture", "reporting", "systems", "accountability", "ethical climate"],
        acceptablePhrases: [
          "I would implement",
          "establish a",
          "create a",
          "develop a",
          "policies including",
          "support systems",
          "verification processes",
          "ethical training"
        ],
        feedback: {
          correct: "You've proposed thoughtful systemic solutions that address both immediate issues and root causes. How might you respond if someone challenged your approach as either too lenient or too rigid?",
          partial: "You've suggested some policy approaches. Could you develop more comprehensive solutions that address both the human needs and accountability concerns?",
          incorrect: "Please propose specific policies or systemic changes you would implement as a leader to prevent similar ethical dilemmas, addressing both employee needs and organizational integrity."
        }
      },
      {
        id: 5,
        botMessage: "Some stakeholders believe ethical standards should be absolute, while others argue they should be flexible based on circumstances. How would you respond to criticism that your approach to this dilemma is either too rigid or too lenient?",
        inputMode: "freeText",
        suggestions: [
          "I would acknowledge that this tension between absolutism and contextualism in ethics reflects a fundamental philosophical question about moral reasoning. To those who view my approach as too lenient, I would emphasize that ethical principles must be applied with an understanding of human complexity—rigid application without considering circumstances can itself become unjust when it ignores relevant moral factors like intent, necessity, or vulnerability. To those who see my approach as too rigid, I would stress that contextual flexibility must still be anchored in core principles, or it risks becoming mere rationalization for convenience. I believe the most defensible ethical reasoning acknowledges both dimensions: upholding fundamental principles like honesty and integrity while recognizing that their application requires thoughtful consideration of circumstances. This balancing approach doesn't mean ethics are arbitrary, but rather that moral wisdom requires both principled commitment and contextual judgment. In organizational settings particularly, ethical systems must be principled enough to provide clear guidance while flexible enough to accommodate human complexity.",
          "I would respond that sophisticated ethical reasoning necessarily involves both principles and context. To critics claiming my approach is too lenient, I would point out that ethical absolutism that ignores human circumstances can become a form of moral cruelty—punishing desperate actions without addressing the conditions that created the desperation. Ethical systems exist to serve human flourishing, not to blindly apply rules regardless of consequences. To those suggesting my approach is too rigid, I would emphasize that contextual flexibility without firm principles becomes moral relativism, where any action can be justified through circumstantial reasoning. The most robust ethical approaches maintain clear principles while acknowledging that their application requires judgment informed by relevant circumstances, just as legal systems distinguish between identical actions performed under different conditions. This nuanced approach recognizes that ethical reasoning is more complex than simple rule-following, requiring both moral clarity about fundamental values and discernment about their application in complex human situations.",
          "I would engage thoughtfully with both perspectives, as they reflect an important philosophical tension. To those arguing my approach is too flexible, I would emphasize that ethical principles derive their meaning within human contexts—justice includes both accountability and mercy, and treating vastly different situations identically can produce fundamentally unjust outcomes. Principles matter precisely because they guide us through complex situations, not because they absolve us from the responsibility of careful moral reasoning. To those viewing my approach as too rigid, I would clarify that contextual consideration doesn't mean subjective preference—not all reasons carry equal moral weight, and some principles (like truth-telling in professional contexts) establish strong presumptions that require substantial justification to override. Ethical reasoning is neither mechanical rule-application nor subjective preference, but rather a disciplined practice of applying principles within contexts. The goal isn't to split the difference between extremes, but to develop wisdom that holds both universal principles and particular circumstances in appropriate tension."
        ],
        hints: "Address criticism from both absolutist and contextualist perspectives, articulating a nuanced ethical position.",
        expectedKeywords: ["balance", "principles", "context", "circumstances", "absolutism", "relativism", "judgment", "wisdom", "complexity", "nuanced", "considerations", "reasoning"],
        feedback: {
          correct: "You've articulated a sophisticated position on ethical reasoning that addresses both absolutist and contextualist criticisms. How is this dilemma relevant to broader ethical challenges in contemporary professional environments?",
          partial: "You've made some good points about balancing perspectives. Could you develop a more thorough response addressing both types of criticism more directly?",
          incorrect: "Please respond to criticism from those who might find your approach either too rigid (absolutist) or too lenient (contextualist), explaining your ethical reasoning."
        }
      },
      {
        id: 6,
        botMessage: "How does this specific ethical dilemma connect to broader ethical challenges in contemporary professional environments?",
        inputMode: "hybrid",
        suggestions: [
          "This dilemma reflects several widespread ethical challenges in modern workplaces. First, it highlights the growing tension between data-driven performance metrics and human realities—as organizations increasingly manage by numbers, the pressure to manipulate those numbers intensifies, especially when compensation and job security depend on them. Second, it illustrates how inadequate social safety nets often create impossible choices for employees, forcing them to choose between professional integrity and family care obligations when systems fail to provide sufficient support. Third, it demonstrates the ethical complexity faced by bystanders or witnesses to questionable behavior, raising questions about collective responsibility in organizational contexts. Finally, it connects to broader questions about organizational justice—whether rules are applied consistently across hierarchical levels, as employees often observe far more serious ethical compromises at leadership levels going unaddressed. These systemic patterns suggest that individual ethical dilemmas like this one aren't merely personal moral failures, but symptoms of structural tensions in contemporary work environments that require systemic rather than merely individual solutions.",
          "This scenario exemplifies several critical ethical challenges facing today's professionals. It illustrates the increasing conflict between organizational demands for continuous performance improvement and the messy reality of human lives with their inevitable crises and limitations. In many industries, aggressive growth targets create implicit pressure to bend rules, while simultaneously organizations emphasize compliance and integrity—creating double binds for employees. The dilemma also highlights how economic insecurity and inadequate healthcare systems create ethical vulnerabilities when people face impossible choices between family obligations and professional integrity. Additionally, it demonstrates the erosion of boundaries between personal and professional life, as employees' personal hardships increasingly affect workplace decisions. Finally, it reflects the ethical complexity of collegial relationships in modern workplaces, where professional obligations and human solidarity sometimes conflict. These tensions aren't merely individual moral challenges but reflect broader systemic issues requiring both personal ethical development and institutional reforms.",
          "This dilemma encapsulates several significant ethical tensions in contemporary work environments. It reflects the growing conflict between the quantification of performance through metrics and the human elements of work, creating pressure to 'game the system' when numbers become paramount. It highlights how financial precarity and inadequate social safety nets transform professional environments into sites of moral compromise when personal crises emerge. It demonstrates the challenges of maintaining community and care within competitive organizational cultures, where reporting a colleague's violation might be professionally rewarded but socially punished. It raises questions about disparities in ethical standards across organizational hierarchies, as rank-and-file employees often observe different standards applied to leadership behaviors. And it illuminates the increasingly blurred boundaries between work and personal life, as family caregiving responsibilities collide with professional obligations. These patterns suggest that creating ethical workplaces requires addressing not just individual moral reasoning but the systemic conditions that repeatedly generate similar dilemmas across organizations."
        ],
        hints: "Connect this specific dilemma to broader ethical patterns and challenges in contemporary workplaces.",
        expectedKeywords: ["performance metrics", "pressure", "social safety", "family obligations", "workplace culture", "integrity", "systemic", "tensions", "contemporary", "challenges", "professional", "environments"],
        acceptablePhrases: [
          "reflects broader",
          "highlights the tension",
          "illustrates how",
          "demonstrates the",
          "connects to",
          "exemplifies",
          "contemporary workplaces",
          "modern organizations"
        ],
        feedback: {
          correct: "You've insightfully connected this specific dilemma to broader ethical patterns and tensions in contemporary work environments. Your analysis throughout this discussion demonstrates sophisticated ethical reasoning.",
          partial: "You've made some connections to broader workplace issues. Could you more thoroughly analyze how this specific case reflects wider ethical patterns in contemporary professional environments?",
          incorrect: "Please explain how this particular ethical dilemma connects to broader patterns and challenges in contemporary professional environments."
        }
      }
    ],
    completionMessage: "Excellent work! You've demonstrated sophisticated ethical reasoning abilities, analyzing a complex moral dilemma from multiple perspectives, considering various ethical frameworks, and connecting individual dilemmas to broader systemic issues. These skills in ethical analysis and articulation are valuable in professional, civic, and personal contexts.",
    learningObjectives: [
      "Analyze ethical dilemmas from multiple perspectives",
      "Evaluate potential consequences of different ethical choices",
      "Apply different ethical frameworks to moral questions",
      "Consider cultural influences on ethical reasoning",
      "Develop systemic approaches to recurring ethical challenges",
      "Articulate nuanced ethical positions balancing principles and context"
    ],
    grammar: {
      points: [
        "Complex sentences with multiple subordinate clauses",
        "Conditional structures for hypothetical scenarios",
        "Concessive clauses with 'while' and 'although'",
        "Evaluative and hedging language",
        "Comparative structures for weighing alternatives"
      ]
    }
  };

  export default moralDilemma;
