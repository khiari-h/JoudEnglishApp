// chatbot/B2/scenarios/economicDiscussion.js

const economicDiscussion = {
    id: 10,
    title: "Economic Discussion",
    level: "B2",
    description: "Analyze and discuss economic situations, trends, and policies using appropriate terminology and supporting evidence.",
    estimatedTime: "25-30 minutes",
    vocabulary: ["inflation", "recession", "monetary policy", "fiscal stimulus", "interest rates", "economic growth", "unemployment", "deficit", "productivity", "market trends", "consumer confidence", "economic indicators", "supply chain", "trade balance", "currency valuation"],
    steps: [
      {
        id: 1,
        botMessage: "Recent economic data shows rising inflation alongside slowing growth in our economy. How would you interpret this situation?",
        inputMode: "freeText",
        suggestions: [
          "This combination of rising inflation and slowing growth suggests we may be entering a period of stagflation. This challenging economic environment is likely driven by supply chain disruptions limiting production capacity while demand remains relatively strong, pushing prices upward despite the growth slowdown.",
          "The data indicates potential economic trouble ahead. Rising inflation typically erodes purchasing power, while slowing growth signals weakening economic fundamentals. This combination may be caused by external supply shocks, such as energy price increases or logistical bottlenecks, rather than by excessive demand, making it particularly challenging for policymakers.",
          "These indicators point to an economy in transition. The inflation could be resulting from pandemic-related supply constraints not keeping pace with recovering demand, while the slowing growth may reflect diminishing effects of earlier fiscal stimulus measures. This situation presents difficult tradeoffs for central banks, as traditional anti-inflation measures could further dampen growth."
        ],
        hints: "Analyze the economic situation using appropriate terminology and potential causes.",
        expectedKeywords: ["inflation", "growth", "stagflation", "supply", "demand", "purchasing power", "policy", "indicators", "economy", "prices", "constraints", "factors"],
        feedback: {
          correct: "That's a thoughtful analysis of the situation. What economic policies might be appropriate to address these challenges?",
          partial: "You've touched on some relevant aspects. Could you expand your analysis with more economic terminology and potential causes?",
          incorrect: "Please provide a more detailed analysis of the economic situation described, using appropriate economic terminology."
        }
      },
      {
        id: 2,
        botMessage: "What economic policies would you recommend to address this combination of inflation and slowing growth?",
        inputMode: "hybrid",
        suggestions: [
          "Policymakers face a difficult balancing act. I would recommend targeted fiscal measures to address specific supply bottlenecks, rather than broad stimulus that could worsen inflation. Simultaneously, the central bank should take a measured approach to monetary tightening—raising rates gradually to control inflation expectations while avoiding a severe growth contraction. Structural reforms to improve productivity and supply-side capacity would also be crucial for longer-term economic health.",
          "In this challenging scenario, conventional tools present tradeoffs. A mixed approach might be most effective: selective infrastructure investments to alleviate supply constraints; tax incentives for productivity-enhancing investments; and careful monetary policy that signals commitment to price stability while avoiding aggressive tightening that could trigger recession. Additionally, clear communication about the temporary nature of some inflationary factors could help anchor inflation expectations.",
          "The situation calls for nuanced policy responses. On the fiscal side, I'd recommend redirecting spending from general demand stimulus toward targeted investments in supply-chain resilience and workforce development. For monetary policy, a data-dependent approach that balances inflation concerns with growth support would be prudent. The central bank might need to tolerate slightly above-target inflation temporarily if it appears supply constraints will ease as global conditions normalize."
        ],
        hints: "Recommend specific fiscal and monetary policies with appropriate rationales.",
        expectedKeywords: ["fiscal", "monetary", "policy", "central bank", "interest rates", "stimulus", "supply", "inflation expectations", "targeted", "balance", "investments", "productivity"],
        acceptablePhrases: [
          "I would recommend",
          "central bank should",
          "fiscal measures",
          "monetary policy",
          "interest rates",
          "balance",
          "infrastructure investments",
          "productivity"
        ],
        feedback: {
          correct: "You've provided well-reasoned policy recommendations. What economic indicators would you monitor to evaluate whether these policies are effective?",
          partial: "You've suggested some policy directions. Could you be more specific about both fiscal and monetary recommendations and their rationales?",
          incorrect: "Please recommend specific economic policies to address the situation, explaining your rationale in economic terms."
        }
      },
      {
        id: 3,
        botMessage: "What key economic indicators would you monitor to evaluate whether your proposed policies are working effectively?",
        inputMode: "freeText",
        suggestions: [
          "I would monitor several categories of indicators. For inflation: core CPI to track underlying inflation trends excluding volatile food and energy; PPI as a leading indicator of future consumer price pressures; and inflation expectations surveys to gauge whether expectations remain anchored. For growth: real GDP growth rates; industrial production indices to measure output; and capacity utilization to assess supply constraints. Additionally, labor market metrics such as unemployment rates, labor force participation, and wage growth would help evaluate overall economic health and potential wage-price spirals.",
          "To evaluate policy effectiveness, I would track inflation measures like the PCE price index (preferred by the Fed) and its core version, along with consumer inflation expectations which influence future price-setting. For growth assessment, beyond headline GDP figures, I'd examine forward-looking indicators like purchasing managers' indices (PMIs) and new orders components. Supply chain healing could be monitored through supplier delivery times, inventory-to-sales ratios, and shipping costs. Finally, I'd watch credit conditions and business investment to gauge monetary policy impacts.",
          "I would establish a dashboard of key indicators across multiple dimensions. On prices: core inflation rates, producer price indices, and import price trends to distinguish between domestic and external inflation drivers. On economic activity: GDP growth components to identify where slowdowns are concentrated, retail sales for consumption trends, and manufacturing output. On market signals: yield curve shapes to assess growth expectations, credit spreads for financial stress, and consumer confidence indices. Finally, sector-specific indicators for areas with supply bottlenecks would help track resolution of constraints."
        ],
        hints: "Identify specific economic indicators across different categories and explain their relevance.",
        expectedKeywords: ["inflation", "GDP", "unemployment", "indicators", "consumer confidence", "production", "monitor", "measure", "core", "index", "growth", "rate", "prices"],
        feedback: {
          correct: "You've identified appropriate indicators to monitor across multiple economic dimensions. How might global economic factors influence this domestic situation?",
          partial: "You've mentioned some relevant indicators. Could you provide a more comprehensive set covering different aspects of the economy with specific explanation of their relevance?",
          incorrect: "Please specify several economic indicators you would monitor to evaluate policy effectiveness, explaining why each would be informative."
        }
      },
      {
        id: 4,
        botMessage: "How might international economic factors be influencing the inflation and growth situation in our economy?",
        inputMode: "hybrid",
        suggestions: [
          "International factors likely play a significant role in our economic situation. Global supply chain disruptions following the pandemic have created persistent bottlenecks in key sectors. Meanwhile, commodity prices, particularly energy and agricultural goods, are determined in global markets and have risen sharply due to geopolitical tensions and extreme weather events. Additionally, divergent monetary policies among major economies affect currency valuations, potentially leading to imported inflation if our currency depreciates. Finally, weakening growth in major trading partners could reduce export demand, contributing to our growth slowdown.",
          "The domestic economic picture is substantially shaped by global factors. Energy price shocks originating from international markets are feeding into production costs across sectors. Simultaneously, worldwide shipping constraints and port congestion have extended delivery times and increased logistics costs. Labor shortages in many developed economies have pushed wages upward internationally. On the financial side, global investors' reactions to monetary tightening by major central banks impact our bond yields and capital flows, affecting domestic credit conditions and investment. These external pressures complicate domestic policy responses.",
          "Our inflation and growth challenges have strong international dimensions. The post-pandemic global recovery created synchronized demand surges when production capacity remained constrained, driving worldwide inflationary pressures. Trade patterns have shifted as countries prioritize resilience over efficiency, raising costs. Currency fluctuations resulting from changing interest rate differentials between major economies influence imported goods prices and export competitiveness. Furthermore, varying vaccination rates and pandemic management approaches across countries have created asymmetric recovery paths, disrupting established supply relationships and contributing to input shortages in global production networks."
        ],
        hints: "Analyze how global economic factors could impact domestic inflation and growth.",
        expectedKeywords: ["global", "international", "supply chain", "commodity prices", "currency", "exchange rates", "trade", "imports", "exports", "energy", "foreign", "worldwide"],
        acceptablePhrases: [
          "international factors",
          "global supply chain",
          "commodity prices",
          "energy prices",
          "currency valuations",
          "imported inflation",
          "trading partners",
          "worldwide shipping"
        ],
        feedback: {
          correct: "You've provided a comprehensive analysis of international factors. How might different demographic groups be affected differently by this economic situation?",
          partial: "You've identified some international factors. Could you develop a more complete analysis of how global economic conditions impact domestic inflation and growth?",
          incorrect: "Please explain how international economic factors might be influencing our domestic inflation and growth situation."
        }
      },
      {
        id: 5,
        botMessage: "How would this economic situation of high inflation and slowing growth likely affect different socioeconomic groups differently?",
        inputMode: "freeText",
        suggestions: [
          "This economic environment would likely exacerbate existing inequalities. Lower-income households would be disproportionately affected by inflation since they spend higher percentages of their budgets on necessities like food, energy, and housing—categories experiencing particularly high inflation. They also typically have fewer savings to buffer against rising prices and less bargaining power to secure wage increases that keep pace with inflation. Meanwhile, slowing growth often impacts employment opportunities for vulnerable workers first, including those with less education, younger workers, and minorities. In contrast, wealthier households may be relatively insulated, as they often have more diverse income sources, greater savings, and assets like real estate that can appreciate during inflationary periods.",
          "The combination of inflation and slowing growth creates divergent impacts across socioeconomic groups. Working-class families face a double burden: essential expenses consuming larger portions of their budgets while job security potentially weakens. Fixed-income retirees see their purchasing power steadily erode if their pensions or annuities lack robust inflation adjustments. Middle-class homeowners face mixed effects: higher mortgage costs if rates rise, but potential appreciation of their primary asset. Business owners experience margin pressures from rising input costs and potentially decreasing consumer spending power. Higher-income professionals with specialized skills may maintain negotiating leverage for inflation-matching compensation, while those with substantial financial assets might reposition investments to inflation-resistant categories.",
          "This stagflationary environment would create uneven distributional effects. Economically vulnerable groups—including low-wage workers, rural communities, and those without college education—would face heightened challenges as inflation erodes purchasing power while job markets tighten. The urban middle class would experience financial strain through rising housing costs and potentially reduced career advancement opportunities in a slowing economy. Small business owners would struggle with the dual pressure of rising input costs and customers' reduced purchasing power. Meanwhile, certain asset owners might benefit if investments in commodities, real estate, or inflation-protected securities outperform, potentially widening wealth disparities. Historically, these economic conditions have increased income inequality and reduced economic mobility."
        ],
        hints: "Analyze differential impacts across socioeconomic groups with specific examples.",
        expectedKeywords: ["lower-income", "middle-class", "wealthy", "inequality", "disproportionate", "purchasing power", "necessities", "assets", "savings", "vulnerable", "fixed-income", "employment"],
        feedback: {
          correct: "You've provided an insightful analysis of distributional effects. What historical examples might provide lessons for addressing our current economic challenges?",
          partial: "You've identified some differential impacts. Could you provide more specific analysis of how various socioeconomic groups would be affected differently?",
          incorrect: "Please explain how inflation combined with slowing growth would impact different socioeconomic groups in different ways."
        }
      },
      {
        id: 6,
        botMessage: "Can you discuss a historical example of similar economic conditions and what lessons it might offer for our current situation?",
        inputMode: "hybrid",
        suggestions: [
          "The stagflation of the 1970s provides relevant historical parallels. Like today, it featured supply shocks (oil crises) combined with monetary factors. Key lessons include: first, the danger of letting inflation expectations become unanchored—once embedded in wage-price spirals, inflation became much more costly to tame; second, the importance of credible monetary policy—Paul Volcker's decisive but painful rate hikes eventually succeeded where earlier stop-go policies failed; third, the need to address supply-side constraints rather than solely focusing on demand management; and finally, the recognition that structural economic transitions (then from manufacturing, now perhaps from pandemic disruptions) require targeted support for affected industries and workers rather than general stimulus.",
          "The economic situation in the early 1980s offers instructive parallels. Following the second oil shock of 1979, many economies faced double-digit inflation alongside rising unemployment. The policy response—particularly in the US under Fed Chairman Volcker—prioritized inflation control through steep interest rate increases, which successfully broke inflation expectations but triggered a severe recession. The key lessons are nuanced: while controlling inflation expectations is crucial, today's policymakers might consider more graduated approaches given improvements in central bank credibility and communication tools. Additionally, the 1980s experience highlights the importance of coordinating monetary and fiscal policies rather than working at cross-purposes, and suggests that structural reforms addressing supply constraints can reduce the growth sacrifice needed to control inflation.",
          "Japan's experience with its economic bubble collapse in the early 1990s and subsequent decades of stagnation offers cautionary lessons. Though Japan's initial problem was deflation rather than inflation, it demonstrates how policy hesitancy and uncoordinated responses can prolong economic difficulties. Japanese authorities initially underestimated structural problems in the financial system and relied too heavily on fiscal stimulus without addressing underlying productivity challenges. For our current situation, this suggests the importance of promptly addressing financial vulnerabilities that might be exposed by tightening monetary conditions, ensuring transparent assessment of balance sheet risks, and implementing structural reforms alongside macroeconomic policies. Japan's experience also highlights demographic challenges as a potential constraint on growth—a factor increasingly relevant for many developed economies today."
        ],
        hints: "Discuss a relevant historical economic example and draw specific applicable lessons.",
        expectedKeywords: ["stagflation", "1970s", "oil crisis", "Volcker", "inflation expectations", "monetary policy", "historical", "recession", "parallel", "lessons", "policy response"],
        acceptablePhrases: [
          "stagflation of the 1970s",
          "oil shocks",
          "Paul Volcker",
          "inflation expectations",
          "policy response",
          "historical parallel",
          "Japan's experience",
          "early 1980s"
        ],
        feedback: {
          correct: "You've drawn apt historical comparisons with thoughtful lessons for current policy. Finally, how might long-term structural economic trends factor into this situation?",
          partial: "You've mentioned a historical example. Could you develop more specific lessons applicable to our current economic challenges?",
          incorrect: "Please discuss a specific historical example of similar economic conditions and explain what lessons it might offer for addressing our current situation."
        }
      },
      {
        id: 7,
        botMessage: "Beyond immediate policy responses, how might longer-term structural economic trends influence our approach to these challenges?",
        inputMode: "freeText",
        suggestions: [
          "Several structural trends require consideration in our economic strategy. Demographic aging in many advanced economies reduces labor force growth and may constrain potential output, suggesting we need productivity-enhancing investments rather than just demand management. Technological change, particularly automation and artificial intelligence, may increase productivity but could exacerbate inequality without complementary education and labor market policies. Climate change adaptation and the energy transition create both economic risks and opportunities, potentially affecting inflation through carbon pricing and stranded asset effects. Finally, evolving patterns of globalization, with greater emphasis on supply chain resilience over pure efficiency, may structurally increase certain costs. These trends suggest that alongside cyclical policies, we need longer-term strategies focusing on innovation capacity, workforce development, sustainable infrastructure, and inclusive growth frameworks.",
          "Long-term structural trends should significantly inform our policy approaches. The accelerating digital transformation of the economy creates productivity opportunities but requires substantial investment in human capital and digital infrastructure to be broadly beneficial. Simultaneously, demographic trends in many developed economies point toward persistent labor market tightness as workforces shrink relative to total populations, potentially maintaining upward wage pressure. The climate transition necessitates massive capital reallocation toward sustainable technologies and infrastructure, likely creating sectoral inflation pressures during the adjustment period. Additionally, the partial reversal of hyperglobalization may permanently increase production costs as supply chains prioritize resilience over minimal cost. These structural factors suggest that alongside short-term stabilization policies, we need comprehensive strategies addressing skills development, sustainable investment frameworks, and inclusive innovation systems to achieve stable, non-inflationary growth in this changing environment.",
          "Several fundamental structural shifts warrant consideration alongside cyclical policies. First, the reconfiguration of global supply chains following pandemic and geopolitical disruptions represents a potential regime change in how businesses approach operational efficiency versus resilience, with implications for price formation and investment patterns. Second, accelerating digital transformation creates both deflationary forces through efficiency gains and inflationary pressures through market concentration and the need for new infrastructure. Third, the clean energy transition involves substantial adjustment costs before potential efficiency benefits materialize. Fourth, demographic aging in advanced economies affects everything from labor markets to consumption patterns and healthcare costs. These structural factors suggest that beyond traditional demand management tools, we need forward-looking policies supporting adaptation capacity, including education reform, infrastructure modernization, research investment, and regulatory frameworks that facilitate rather than impede necessary economic transitions."
        ],
        hints: "Analyze how long-term structural trends might affect economic policy approaches.",
        expectedKeywords: ["demographic", "aging", "technological", "automation", "digital", "climate change", "globalization", "structural", "long-term", "productivity", "inequality", "sustainability", "transition"],
        feedback: {
          correct: "Your analysis effectively integrates long-term structural trends with current economic challenges. You've demonstrated strong economic analysis skills throughout this discussion.",
          partial: "You've identified some structural trends. Could you more clearly explain how they should influence our policy approaches to current challenges?",
          incorrect: "Please analyze how long-term structural economic trends might influence our approach to addressing the current inflation and growth challenges."
        }
      }
    ],
    completionMessage: "Excellent work! You've demonstrated sophisticated economic analysis skills and the ability to discuss complex economic situations using appropriate terminology. Your analysis of policy options, economic indicators, distributional effects, historical parallels, and structural trends shows strong economic reasoning abilities.",
    learningObjectives: [
      "Analyze economic situations using appropriate terminology",
      "Evaluate economic policy options and their implications",
      "Identify relevant economic indicators for different scenarios",
      "Assess differential impacts across socioeconomic groups",
      "Draw lessons from historical economic examples",
      "Connect short-term economic challenges to longer-term structural trends"
    ],
    grammar: {
      points: [
        "Complex sentences with multiple subordinate clauses",
        "Conditional structures for policy recommendations",
        "Cause and effect relationships",
        "Comparative and superlative forms",
        "Academic register and specialized vocabulary"
      ]
    }
  };
  
  export default economicDiscussion;