// chatbot/C1/scenarios/corporateStrategy.js

const corporateStrategy = {
    id: 1,
    title: "Corporate Strategy",
    level: "C1",
    description: "Analyze and develop a comprehensive corporate strategy, addressing market positioning, competitive advantages, and growth opportunities in a complex business environment.",
    estimatedTime: "35-40 minutes",
    vocabulary: ["strategic initiative", "market penetration", "competitive advantage", "diversification", "vertical integration", "scalability", "portfolio optimization", "shareholder value", "market segmentation", "sustainable growth", "ROI", "capital allocation", "disruptive innovation", "core competencies", "strategic alignment"],
    steps: [
      {
        id: 1,
        botMessage: "Welcome to our strategic planning session. Before we begin formulating our corporate strategy, could you provide an assessment of our current market position and competitive landscape?",
        inputMode: "freeText",
        suggestions: [
          "Our company currently holds a 23% market share in a highly fragmented industry characterized by rapid technological disruption. We possess significant competitive advantages in proprietary technology and supply chain optimization, though we face intensifying competition from both established multinationals and agile startups leveraging alternative business models.",
          "Based on the latest market analysis, our organization occupies a distinctive position as a premium provider with strong brand equity, though our growth has plateaued in traditional segments. The competitive landscape reveals three emerging threats: digital-native competitors with lower cost structures, consolidation among mid-tier competitors, and regulatory changes affecting market access in key regions.",
          "Our current position reflects a transition phase between established product lines generating consistent but declining revenue and emerging offerings with promising but unproven market potential. The competitive environment has evolved substantially, with cross-industry entrants disrupting conventional business boundaries and raising the threshold for differentiation."
        ],
        hints: "Provide a nuanced analysis of the organization's current market position and competitive environment, incorporating relevant data and market intelligence.",
        expectedKeywords: ["market share", "competitive advantage", "position", "industry", "landscape", "analysis", "trends", "disruption", "challenges", "competitors", "differentiation"],
        feedback: {
          correct: "Thank you for that comprehensive assessment. Given this analysis, what do you see as our primary strategic objectives for the next 3-5 years, and what theoretical frameworks might inform our approach?",
          partial: "You've provided some insights into our position, but could you elaborate on the competitive dynamics and our distinctive advantages or vulnerabilities?",
          incorrect: "I'd appreciate a more detailed assessment of our market position and the competitive landscape we're operating within before we proceed with strategic planning."
        }
      },
      {
        id: 2,
        botMessage: "Given this market assessment, what do you see as our primary strategic objectives for the next 3-5 years, and what theoretical frameworks might inform our approach?",
        inputMode: "hybrid",
        suggestions: [
          "Our strategic imperatives should focus on three interconnected objectives: diversifying revenue streams through adjacent market entry, accelerating digital transformation of core operations to enhance marginal profitability, and restructuring our innovation portfolio toward higher-growth segments. I recommend employing the ambidextrous organization framework to balance exploitation of existing capabilities with exploration of disruptive opportunities, supplemented by blue ocean strategy principles to identify uncontested market spaces.",
          "I propose our strategic objectives center on: strengthening our competitive moat through proprietary ecosystem development, selective international expansion prioritizing high-growth emerging markets, and vertical integration in critical value chain components to mitigate supply vulnerabilities. The dynamic capabilities framework would be particularly relevant, emphasizing our ability to reconfigure resources in response to volatile market conditions, alongside Porter's differentiation strategy to sustain premium positioning.",
          "Our primary objectives should encompass: reorienting our product portfolio toward recurring revenue models, strategic acquisition of complementary technology capabilities, and fundamental reinvention of our customer experience architecture. The resource-based view provides a valuable framework for leveraging our distinctive capabilities, while disruptive innovation theory offers guidance on responding to lower-end market entrants without compromising premium positioning."
        ],
        hints: "Articulate clear strategic objectives and reference relevant business strategy frameworks or theories that inform your approach.",
        expectedKeywords: ["objectives", "strategy", "framework", "theory", "growth", "innovation", "transformation", "competitive", "diversification", "capabilities", "advantage"],
        acceptablePhrases: [
          "strategic imperatives",
          "strategic objectives",
          "primary objectives",
          "recommend employing",
          "framework would be",
          "provides a valuable framework"
        ],
        feedback: {
          correct: "Excellent articulation of our strategic direction. Now, what specific initiatives would you prioritize to execute this strategy, and how would you allocate resources across these initiatives?",
          partial: "You've outlined some objectives, but could you strengthen your response by incorporating relevant strategic frameworks and theories that support your proposed direction?",
          incorrect: "Please articulate specific strategic objectives for our organization and reference appropriate business strategy frameworks that would inform our approach."
        }
      },
      {
        id: 3,
        botMessage: "What specific strategic initiatives would you prioritize to execute this strategy, and how would you approach resource allocation across these initiatives?",
        inputMode: "freeText",
        suggestions: [
          "I would prioritize five key initiatives: first, establishing an autonomous digital ventures unit with dedicated funding of 15% of our R&D budget to incubate disruptive business models; second, implementing a value-based pricing transformation supported by advanced analytics capabilities, requiring significant IT investment but promising margin improvements of 3-5 percentage points; third, executing targeted acquisitions of emerging technology providers in the $50-200M range to accelerate capability development; fourth, redesigning our operating model to enable greater regional autonomy while maintaining global efficiency, necessitating restructuring costs but reducing decision latency; and fifth, developing an ecosystem partnership program to extend our market reach without proportional capital investment.",
          "My prioritized initiatives would include: developing an integrated sustainability strategy that transforms our supply chain while creating premium positioning opportunities, representing approximately 20% of discretionary investment; accelerating our platform business model conversion through both organic development and strategic acquisitions, allocated 35% of growth capital; establishing centers of excellence in artificial intelligence and advanced analytics with dedicated cross-functional teams and technology infrastructure, requiring 25% of innovation budget; implementing a strategic workforce transformation emphasizing digital capabilities and agile methodologies, with significant training investment; and rationalizing our geographic footprint to concentrate resources in markets offering superior growth-to-investment ratios.",
          "I recommend prioritizing: comprehensive digital transformation of customer engagement channels requiring approximately 30% of our technology budget but promising to increase customer lifetime value by 25%; strategic restructuring of our manufacturing network to balance cost optimization, resilience, and sustainability objectives; launch of an internal corporate venture capital function to systematically invest in emerging technologies relevant to our industry, allocated 10% of free cash flow; implementation of zero-based budgeting across the organization to rebalance resources toward strategic priorities; and development of a comprehensive data strategy and governance framework as the foundation for broader digital initiatives, requiring organizational redesign and specialized talent acquisition."
        ],
        hints: "Identify and prioritize specific strategic initiatives, outlining resource allocation considerations across these priorities.",
        expectedKeywords: ["initiatives", "prioritize", "allocation", "investment", "resources", "budget", "implementation", "execution", "transformation", "development", "strategic"],
        feedback: {
          correct: "Those are well-reasoned priorities with thoughtful resource allocation. How would you measure the success of this strategy implementation, and what key performance indicators would you establish?",
          partial: "You've suggested some initiatives, but could you be more explicit about prioritization and how you would allocate limited resources across these areas?",
          incorrect: "Please identify specific strategic initiatives that would execute our strategy and explain how you would prioritize and allocate resources among them."
        }
      },
      {
        id: 4,
        botMessage: "How would you measure the success of this strategy implementation? What key performance indicators and monitoring mechanisms would you establish?",
        inputMode: "hybrid",
        suggestions: [
          "I would establish a multi-dimensional performance measurement framework comprising financial, operational, and strategic KPIs. Financial metrics would include risk-adjusted return on strategic investments, incremental margin contribution, and economic profit growth. Operational indicators would monitor execution velocity through milestone achievement rates, resource utilization efficiency, and capability development metrics. Strategic measures would track competitive positioning through market share evolution, share of innovation-driven revenue, and customer perception indices. These would be monitored through a quarterly strategy review process incorporating predictive analytics to identify leading indicators of strategy effectiveness or potential adjustments needed.",
          "Success measurement would be structured around a balanced scorecard approach with four perspectives. From the financial perspective, we would track portfolio revenue growth differential versus market averages, gross margin expansion, and free cash flow generation. The customer dimension would measure net promoter scores segmented by strategic customer cohorts, conquest rates from targeted competitors, and solution penetration within key accounts. Internal processes would be evaluated through digital adoption metrics, innovation pipeline velocity, and operational excellence indicators. Learning and growth would assess capability acquisition, talent retention, and organizational health indices. This framework would be embedded within our enterprise performance management system with monthly executive reviews.",
          "I advocate for a strategic measurement approach integrating leading and lagging indicators across three timeframes. Near-term operational metrics would include transformation milestone delivery, capability deployment, and initiative-specific KPIs. Medium-term strategic indicators would track market share trajectories, competitive win rates, and progress on business model evolution. Long-term value creation metrics would encompass total shareholder return relative to industry peers, return on invested capital versus weighted average cost of capital, and sustainability performance indicators. This would be supported by a digital strategy dashboard providing real-time visibility into critical performance dimensions and early warning indicators requiring intervention."
        ],
        hints: "Define a comprehensive approach to measuring strategic success, including specific metrics and monitoring processes.",
        expectedKeywords: ["KPIs", "metrics", "measure", "indicators", "performance", "success", "monitoring", "tracking", "evaluation", "benchmarks", "targets"],
        acceptablePhrases: [
          "performance measurement framework",
          "balanced scorecard approach",
          "strategic measurement approach",
          "would establish",
          "would track",
          "would measure"
        ],
        feedback: {
          correct: "You've outlined a robust performance measurement system. What do you see as the most significant risks to successful strategy execution, and how would you mitigate these risks?",
          partial: "You've suggested some measurements, but could you develop a more comprehensive framework with specific KPIs and monitoring mechanisms?",
          incorrect: "Please define specific key performance indicators and monitoring approaches that would measure the success of our strategy implementation."
        }
      },
      {
        id: 5,
        botMessage: "What do you see as the most significant risks to successful strategy execution, and how would you mitigate these risks?",
        inputMode: "freeText",
        suggestions: [
          "The predominant risks include execution complexity overwhelming organizational capacity, competitive response intensifying during our transition period, and disruptive technological shifts invalidating core strategic assumptions. To mitigate execution complexity, I would implement a dedicated transformation office with specialized program management capabilities and a disciplined stage-gate approach to initiative advancement. For competitive response risks, I recommend developing contingency scenarios with pre-authorized response protocols and competitive intelligence enhancement. Regarding technological disruption, we should establish a strategic foresight function employing scenario planning methodologies and maintain optionality through our partnership ecosystem while avoiding premature commitment to uncertain technologies. Additionally, we face financial risks if expected returns materialize more slowly than anticipated, requiring modular implementation allowing for recalibration without abandoning the strategic direction.",
          "I identify four critical risk categories: first, organizational resistance to transformative change, particularly among middle management; second, execution capability gaps in emerging technical domains central to our strategy; third, macroeconomic volatility potentially constraining investment capacity; and fourth, regulatory evolution in priority markets. Mitigation approaches would include implementing a systematic change management program incorporating behavioral science principles and executive role modeling; establishing strategic talent acquisition channels and learning acceleration programs for critical capability areas; creating a flexible implementation roadmap with identified decision points for scaling or contracting investments based on economic conditions; and enhancing our regulatory affairs function while proactively engaging with policy development processes in key jurisdictions.",
          "The primary execution risks comprise: misalignment between strategic ambition and organizational capabilities; emergence of unforeseen competitive threats from non-traditional sources; deterioration of employee engagement during transformation; and overextension of management bandwidth across multiple complex initiatives. My mitigation strategy would incorporate capability-based strategic pacing to ensure transformation velocity aligns with organizational absorption capacity; implementation of advanced competitive intelligence systems with expanded scanning parameters beyond traditional industry boundaries; establishment of a strategic narrative with consistent reinforcement through multiple channels and authentic leadership engagement; and implementation of a formal portfolio management discipline with explicit prioritization mechanisms and resource allocation governance to prevent initiative proliferation."
        ],
        hints: "Identify significant strategic risks and outline comprehensive mitigation approaches for each risk category.",
        expectedKeywords: ["risks", "mitigation", "challenges", "threats", "implementation", "execution", "complexity", "capability", "contingency", "uncertainty", "strategic"],
        feedback: {
          correct: "You've provided an insightful risk assessment and thoughtful mitigation strategies. As a final consideration, how would you approach the organizational and cultural dimensions of this strategic transformation?",
          partial: "You've identified some risks, but could you develop more comprehensive mitigation strategies for each major risk category?",
          incorrect: "Please articulate the significant risks that could undermine our strategy execution and explain specific approaches to mitigate these risks."
        }
      },
      {
        id: 6,
        botMessage: "How would you approach the organizational and cultural dimensions of this strategic transformation to ensure sustainable implementation?",
        inputMode: "hybrid",
        suggestions: [
          "The organizational and cultural dimensions require deliberate architecture aligned with our strategic intent. Structurally, I would implement a network-based operating model balancing global scale with local responsiveness, characterized by clear accountability frameworks and simplified decision pathways. Culturally, we need to cultivate strategic agility through experimentation norms, psychological safety for constructive dissent, and comfort with measured risk-taking. Leadership development would emphasize paradoxical thinking capabilities essential for navigating strategic tensions. Implementation would follow a measured cadence, beginning with executive alignment on cultural aspirations, followed by systematic translation of abstract values into concrete behavioral expectations, and reinforcement through realigned performance management and recognition systems. Throughout this evolution, we would maintain dual focus on performance and health metrics, recognizing that sustainable transformation requires both outcome delivery and cultural foundations.",
          "I would approach organizational transformation through a systematic diagnostic of our current state against strategic requirements, identifying specific shifts needed in structure, capabilities, processes, and cultural attributes. Structurally, we would evolve toward a platform organization with dynamic teaming around strategic priorities while maintaining necessary hierarchical elements for efficiency. The leadership model would emphasize enterprise thinking, coaching capabilities, and innovation catalysis. Cultural transformation would be driven through four mechanisms: symbolic actions by senior leaders signaling new priorities; targeted talent interventions including strategic hiring, development, and deployment; redesigned performance mechanisms aligning incentives with strategic objectives; and accelerated learning systems promoting rapid experimentation and knowledge diffusion. This approach recognizes that cultural evolution derives from tangible system changes rather than abstract values statements.",
          "The organizational architecture supporting our strategy would feature a hybrid structure incorporating stable backbone functions optimized for efficiency alongside dynamic capability pods configured for innovation and market responsiveness. Critical to success would be deliberate cultivation of an ambidextrous culture balancing performance discipline with entrepreneurial orientation. Implementation would follow a co-creation methodology engaging multiple organizational levels in translating strategic direction into operating model implications. We would establish cultural accelerators including immersive leadership experiences, cross-functional innovation forums, and redesigned advancement criteria emphasizing collaborative value creation. Recognizing the challenges of simultaneous operational excellence and strategic transformation, we would implement a measured migration approach phasing structural and cultural changes to maintain business continuity while building future capabilities."
        ],
        hints: "Address both organizational structure/processes and cultural elements required for successful strategic transformation.",
        expectedKeywords: ["organizational", "cultural", "structure", "leadership", "change management", "transformation", "capabilities", "alignment", "implementation", "sustainability", "behavior"],
        acceptablePhrases: [
          "organizational architecture",
          "cultural dimensions",
          "structural changes",
          "leadership development",
          "cultural transformation",
          "organizational transformation"
        ],
        feedback: {
          correct: "You've presented a comprehensive approach to the organizational and cultural dimensions of our strategic transformation. Your analysis throughout this session has been exceptionally thorough, balancing theoretical frameworks with pragmatic implementation considerations.",
          partial: "You've touched on some important aspects, but could you address both organizational structure/processes and cultural elements more comprehensively?",
          incorrect: "Please explain how you would approach both the organizational structure and the cultural aspects required to support our strategic transformation."
        }
      },
      {
        id: 7,
        botMessage: "How would you engage key stakeholders—including the board, leadership team, employees, and external partners—to build support for this strategic direction?",
        inputMode: "freeText",
        suggestions: [
          "I would implement a differentiated stakeholder engagement strategy addressing the distinct concerns and influence of each constituency. For the board, I would frame the strategy within a governance context emphasizing risk-adjusted value creation, conducting dedicated sessions on strategic assumptions, alternatives considered, and implementation governance. With the executive team, engagement would focus on collective ownership through collaborative refinement of the strategy, clarifying interdependencies and establishing shared accountability mechanisms. Middle management engagement would emphasize translating enterprise strategy into functional implications, providing tools and forums for cascading strategic context. For frontline employees, we would develop a compelling strategic narrative with emotional resonance, communicated through multiple channels including experiential elements and two-way dialogue opportunities. External stakeholders would receive tailored communication emphasizing mutual value creation opportunities, with systematic relationship management for strategic partners, targeted analyst briefings, and coordinated customer communications emphasizing benefit implications.",
          "Stakeholder engagement requires a carefully orchestrated approach recognizing different perspectives and interests. Board engagement would proceed through a sequential process beginning with strategy committee deep-dives followed by full board workshops addressing fundamental strategic choices and investment implications. The executive leadership approach would combine collective direction-setting with individual accountability for strategic initiatives, supported by capability development addressing identified leadership gaps. For the broader organization, we would implement a strategic communication architecture balancing consistency of core messages with flexibility in functional translation, emphasizing storytelling techniques connecting strategy to organizational purpose. We would establish formal listening mechanisms to capture implementation insights and evolutionary opportunities. External engagement would be governed by a comprehensive stakeholder map identifying influence patterns and relationship owners, with tailored engagement plans for high-priority stakeholders including key customers, critical supply partners, and capital providers.",
          "My stakeholder engagement approach would be grounded in change management principles, recognizing that strategic transformation requires intellectual understanding, emotional commitment, and behavioral alignment. For the board and investors, we would emphasize the long-term value creation thesis while establishing transparent milestone reporting to maintain confidence during transition periods. Executive engagement would focus on co-creation within strategic guardrails, building genuine conviction through rigorous debate of strategic options. For the broader organization, we would segment approaches based on impact and influence analysis, with particular attention to identified change catalysts and potential resistance centers. We would establish feedback mechanisms providing real-time insights into implementation challenges and emergent opportunities. External engagement would be coordinated through a centralized stakeholder management function ensuring consistent messaging while allowing relationship owners to maintain authentic engagement."
        ],
        hints: "Develop a comprehensive stakeholder engagement approach addressing different constituencies and their distinct needs in the strategic process.",
        expectedKeywords: ["stakeholders", "engagement", "board", "leadership", "employees", "partners", "communication", "alignment", "buy-in", "influencers", "relationship"],
        feedback: {
          correct: "You've outlined a sophisticated stakeholder engagement strategy that recognizes the diverse needs and roles of different constituencies. One final question: how would you adapt this strategy in response to significant market disruptions or unexpected competitive developments?",
          partial: "You've addressed some stakeholder considerations, but could you develop a more comprehensive approach addressing the specific engagement needs of different constituencies?",
          incorrect: "Please outline a stakeholder engagement approach addressing how you would build support among the board, leadership team, employees, and external partners for our strategic direction."
        }
      },
      {
        id: 8,
        botMessage: "How would you ensure this strategy remains adaptive and responsive to changing market conditions while maintaining core strategic direction?",
        inputMode: "hybrid",
        suggestions: [
          "Strategic adaptability requires institutionalizing dynamic strategy processes rather than treating strategy as a periodic event. I would establish quarterly strategy review sessions structured around three components: performance assessment against established metrics, evaluation of strategic assumption validity through leading indicators, and systematic scanning of emerging opportunities and threats. These reviews would operate with predefined decision parameters for initiative acceleration, deceleration, or redirection based on performance thresholds and external developments. Additionally, we would implement horizon scanning mechanisms monitoring technological discontinuities, regulatory developments, and competitive innovations with potential strategic implications. To balance adaptiveness with continuity, we would maintain unwavering commitment to core strategic identity and destination while embracing flexibility in implementation pathways and velocity. This approach would be supported by scenario planning capabilities enabling rapid response to major environmental shifts through pre-developed contingency options and trigger-based activation protocols.",
          "I would architect a strategy system balancing stability and adaptability through several mechanisms. First, we would distinguish between foundational strategic elements expected to remain consistent and dynamic elements anticipated to evolve, creating appropriate governance for each category. Second, we would implement a continuous monitoring system tracking critical strategic assumptions and competitive developments, with established thresholds triggering reassessment. Third, we would maintain a portfolio of strategic options representing alternative pathways with defined decision criteria and activation requirements. To operationalize adaptability, we would establish a dedicated strategic response team with cross-functional composition and decision rights for predefined adjustment parameters. Annual strategy refreshes would systematically reassess fundamental direction while quarterly reviews would focus on execution adaptation. Throughout, we would cultivate organizational capabilities in pattern recognition, divergent thinking, and strategic pivoting to enable responsive transformation when required.",
          "Strategic responsiveness requires both structural and process elements. Structurally, I would establish a dedicated strategic intelligence function responsible for continuous environmental monitoring, trend analysis, and implication assessment. We would implement a tiered strategic governance model distinguishing between stable core elements requiring leadership consensus for modification and flexible execution dimensions delegated to initiative owners with adjustment authority. Processually, we would conduct quarterly strategy impact assessments evaluating performance trajectory, assumption validity, and disruptive signals, with explicit decision protocols for different adaptation scenarios. To build organizational adaptability, we would develop contingency options for major strategic initiatives, maintain resource flexibility through staged commitment approaches, and establish cross-functional sense-making forums to collectively interpret ambiguous market signals. This balanced approach would preserve strategic coherence while enabling responsive evolution as conditions warrant."
        ],
        hints: "Address mechanisms for maintaining strategic adaptability while preserving core direction and momentum.",
        expectedKeywords: ["adaptive", "responsive", "flexible", "agile", "monitoring", "adjustment", "assumptions", "conditions", "environment", "evolution", "balance"],
        acceptablePhrases: [
          "strategic adaptability",
          "dynamic strategy processes",
          "balance stability and adaptability",
          "strategic responsiveness",
          "continuous monitoring"
        ],
        feedback: {
          correct: "Your comprehensive approach to building strategic adaptability while maintaining directional consistency is excellent. This concludes our strategic planning session—your analysis has provided valuable insights for our corporate strategy development.",
          partial: "You've touched on adaptation, but could you develop a more comprehensive framework addressing both ongoing monitoring and structured adaptation processes?",
          incorrect: "Please explain how you would ensure our strategy remains adaptive to changing conditions while maintaining consistent strategic direction."
        }
      }
    ],
    completionMessage: "Congratulations! You've demonstrated exceptional strategic thinking capabilities through this corporate strategy development exercise. Your analysis was comprehensive, incorporating theoretical frameworks while remaining practical and actionable. You effectively balanced analytical rigor with implementation considerations across multiple dimensions of strategy formulation.",
    learningObjectives: [
      "Analyze complex business environments using appropriate strategic frameworks",
      "Formulate coherent strategic objectives based on market positioning and competitive dynamics",
      "Prioritize strategic initiatives and allocate resources effectively",
      "Design comprehensive performance measurement systems for strategy implementation",
      "Identify strategic risks and develop appropriate mitigation approaches",
      "Address organizational and cultural dimensions of strategic change",
      "Develop effective stakeholder engagement strategies for strategic transformations",
      "Balance strategic adaptability with consistent directional focus"
    ],
    grammar: {
      points: [
        "Complex conditional structures for scenario analysis",
        "Advanced causal relationships and logical reasoning",
        "Sophisticated compare and contrast structures",
        "Nuanced hedging language appropriate for strategic uncertainty",
        "Precise use of business strategy terminology",
        "Complex noun phrases for concept development",
        "Multi-part sentence structures for multifaceted analysis"
      ]
    }
  };

  export default corporateStrategy;
