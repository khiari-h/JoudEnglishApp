// chatbot/B2/scenarios/technicalExplanation.js

const technicalExplanation = {
    id: 6,
    title: "Technical Explanation",
    level: "B2",
    description: "Explain a complex technical process or system to colleagues or clients, using specialized vocabulary and ensuring comprehension.",
    estimatedTime: "25-30 minutes",
    vocabulary: ["system", "process", "algorithm", "interface", "functionality", "architecture", "component", "integration", "implementation", "configuration", "framework", "protocol", "workflow", "infrastructure", "optimization"],
    steps: [
      {
        id: 1,
        botMessage: "Hello, I understand you're going to explain our new cloud migration process. Could you start by giving us an overview of what this involves?",
        inputMode: "freeText",
        suggestions: [
          "Our cloud migration process involves transferring on-premises applications and data to a distributed cloud infrastructure while maintaining security and performance.",
          "The process consists of four key phases: assessment, planning, migration execution, and post-migration optimization to ensure business continuity.",
          "It's a comprehensive approach to moving our legacy systems to a scalable cloud environment with minimal disruption to operations."
        ],
        hints: "Provide a high-level overview of the technical process or system.",
        expectedKeywords: ["process", "involves", "consists", "approach", "system", "infrastructure", "migration", "transfer", "phases", "overview", "framework"],
        feedback: {
          correct: "Thank you for that clear overview. Could you now explain the key components or architecture of this system?",
          partial: "That's a start, but could you provide a more comprehensive overview of the entire process?",
          incorrect: "Please begin with a general overview of what the cloud migration process involves."
        }
      },
      {
        id: 2,
        botMessage: "Thanks for the overview. Could you explain the architecture or main components of this migration system?",
        inputMode: "hybrid",
        suggestions: [
          "The architecture consists of three layers: a discovery module that inventories existing resources, a transformation engine that converts workloads, and an orchestration layer that manages the deployment sequence.",
          "Our system comprises five interconnected components: resource assessment tools, automated dependency mapping, workload conversion utilities, deployment automation, and performance monitoring infrastructure.",
          "The migration framework is built around a central database that tracks the status of each migration object, with specialized microservices handling specific migration tasks according to predefined workflows."
        ],
        hints: "Describe the main components, architecture, or structure of the technical system.",
        expectedKeywords: ["architecture", "components", "layers", "modules", "system", "framework", "consists", "comprises", "built", "interconnected", "structure"],
        acceptablePhrases: [
          "consists of",
          "comprises",
          "is built around",
          "interconnected components",
          "architecture includes"
        ],
        feedback: {
          correct: "That's a clear explanation of the architecture. Now, could you walk us through the step-by-step process of how it actually works?",
          partial: "You've mentioned some components, but could you explain how they fit together in the overall architecture?",
          incorrect: "Please describe the main components or architecture of the migration system in more detail."
        }
      },
      {
        id: 3,
        botMessage: "Now I'd like to understand how this process works step by step. Could you explain the workflow from start to finish?",
        inputMode: "freeText",
        suggestions: [
          "The process begins with an automated discovery phase where our tools scan the existing infrastructure and create a comprehensive inventory. Next, dependencies are mapped and analyzed to determine migration groups. Then, each application is assessed for cloud compatibility and transformed using appropriate strategies. Finally, the migration is executed according to a predetermined sequence with continuous validation.",
          "Initially, we run a comprehensive assessment of the current environment using our proprietary scanning tools. Based on this data, we develop a detailed migration plan identifying dependencies and risks. During implementation, we convert and migrate applications in prioritized waves, followed by extensive testing and optimization in the new environment.",
          "We start by establishing a secure connection between on-premises and cloud environments. Then we replicate the existing data while maintaining synchronization. Next, we transform application components to be cloud-compatible and deploy them to the target environment. Finally, we verify functionality, optimize performance, and cut over to the cloud system."
        ],
        hints: "Explain the process step by step, from beginning to end.",
        expectedKeywords: ["first", "initially", "begins", "next", "then", "following", "subsequently", "finally", "lastly", "process", "procedure", "steps", "stages", "workflow"],
        feedback: {
          correct: "Thank you for that clear step-by-step explanation. What are the most common technical challenges or issues that might arise during this process?",
          partial: "Could you provide more detail about the sequence of steps in the process?",
          incorrect: "Please explain the workflow in a step-by-step manner, showing how the process moves from beginning to end."
        }
      },
      {
        id: 4,
        botMessage: "What are the most common technical challenges or issues that we might encounter during this migration?",
        inputMode: "hybrid",
        suggestions: [
          "The most significant challenges include database compatibility issues, network latency affecting replication, legacy applications with undocumented dependencies, and maintaining data integrity during the transition phase.",
          "We frequently encounter security compliance challenges when moving sensitive data, performance degradation due to architectural differences, and integration issues between cloud-native and legacy components.",
          "Common obstacles include unexpected downtime during cutover, authentication and access control reconfiguration complexities, and resource utilization disparities between on-premises and cloud environments."
        ],
        hints: "Identify potential technical issues, challenges, or complications in the process.",
        expectedKeywords: ["challenges", "issues", "problems", "complications", "difficulties", "obstacles", "encounter", "arise", "compatibility", "integration", "performance"],
        acceptablePhrases: [
          "challenges include",
          "frequently encounter",
          "common obstacles",
          "issues arise",
          "potential problems"
        ],
        feedback: {
          correct: "You've identified important challenges. How do we address or mitigate these potential issues?",
          partial: "You've mentioned some issues. Could you elaborate on the technical aspects of these challenges?",
          incorrect: "Please explain the common technical challenges or issues that might occur during the migration process."
        }
      },
      {
        id: 5,
        botMessage: "How do we address or mitigate these potential issues to ensure a successful migration?",
        inputMode: "freeText",
        suggestions: [
          "We implement a comprehensive pre-migration testing protocol that simulates the target environment, allowing us to identify and resolve compatibility issues before actual migration. Additionally, we maintain parallel systems during transition with automated data synchronization, and we perform incremental migrations to minimize disruption.",
          "Our approach includes creating detailed dependency maps through automated discovery tools, establishing a robust rollback strategy for each migration phase, and implementing continuous monitoring with predefined performance thresholds that trigger intervention when exceeded.",
          "We mitigate risks through a combination of thorough pre-migration assessment, specialized conversion tools for legacy applications, and a phased implementation approach. Each migration wave undergoes rigorous validation before proceeding, and we maintain 24/7 support teams during critical transition periods."
        ],
        hints: "Explain strategies, solutions, or approaches to address the potential challenges.",
        expectedKeywords: ["mitigate", "address", "resolve", "overcome", "prevent", "minimize", "strategy", "approach", "solution", "implement", "ensure"],
        feedback: {
          correct: "Those are effective mitigation strategies. Now, could you explain some of the technical terminology or concepts that might be unfamiliar to non-technical team members?",
          partial: "You've suggested some approaches. Could you provide more specific technical details about how these solutions work?",
          incorrect: "Please explain the specific strategies or methods used to address the potential issues you identified earlier."
        }
      },
      {
        id: 6,
        botMessage: "Some team members may not be familiar with technical terminology. Could you explain a few key technical concepts in simpler terms?",
        inputMode: "hybrid",
        suggestions: [
          "Certainly. 'Workload containerization' simply means packaging applications with everything they need to run, making them portable across different environments. 'API integration' refers to how different software components communicate with each other through standardized interfaces. 'Infrastructure as code' means we define our cloud resources through text files rather than manual configuration.",
          "Of course. When we say 'data replication,' we're talking about creating synchronized copies of information across different systems. 'Authentication protocols' are simply the security processes that verify users' identities. 'Virtual private cloud' is essentially a secure, isolated section of the cloud that only our organization can access.",
          "I'd be happy to clarify. 'Microservices architecture' means breaking down applications into smaller, independent services instead of one large program. 'Load balancing' refers to distributing network traffic evenly across servers to prevent overloading. 'Serverless computing' doesn't actually mean no servers - it means the cloud provider manages the servers, so we only pay for the exact resources we use."
        ],
        hints: "Explain technical terms or concepts in simpler, more accessible language.",
        expectedKeywords: ["means", "refers to", "essentially", "simply", "basically", "concept", "terminology", "technical term", "in other words", "think of it as"],
        acceptablePhrases: [
          "means",
          "refers to",
          "essentially",
          "simply put",
          "can be understood as",
          "think of it as"
        ],
        feedback: {
          correct: "Thank you for those clear explanations. How can we monitor and verify that the migration has been successful?",
          partial: "Those explanations help, but could you make them even simpler for non-technical team members?",
          incorrect: "Please explain some technical terminology in simpler terms that non-technical colleagues could understand."
        }
      },
      {
        id: 7,
        botMessage: "How will we monitor and verify that the migration has been successful once it's complete?",
        inputMode: "freeText",
        suggestions: [
          "We implement a multi-layered monitoring approach: technical validation through automated testing suites that verify functionality and data integrity; performance monitoring comparing key metrics before and after migration; business validation confirming critical processes function correctly; and user experience validation through feedback collection and analysis.",
          "Our verification process includes comprehensive system health dashboards that track resource utilization, response times, and error rates in real-time. We also conduct scheduled penetration testing to verify security controls, and implement synthetic transactions that simulate user activity to confirm business process continuity.",
          "Success verification happens through our integrated monitoring framework that tracks four key dimensions: application performance metrics compared against baseline measurements, data consistency validation through automated reconciliation processes, system availability tracking, and business process completion rates. Any anomalies trigger immediate investigation protocols."
        ],
        hints: "Explain how to monitor, measure, or verify the success of the technical process.",
        expectedKeywords: ["monitor", "verify", "validate", "measure", "metrics", "indicators", "tracking", "testing", "comparing", "performance", "success criteria"],
        feedback: {
          correct: "Excellent explanation of the monitoring and verification process. Finally, do you have any recommendations for documentation or training for the team?",
          partial: "You've outlined some monitoring approaches. Could you be more specific about success metrics?",
          incorrect: "Please explain how we will monitor and verify that the migration has been successful once it's completed."
        }
      },
      {
        id: 8,
        botMessage: "Do you have any recommendations for documentation or training that our team should prepare for this migration?",
        inputMode: "hybrid",
        suggestions: [
          "I recommend creating three levels of documentation: technical implementation guides for IT staff, process-focused documentation for project managers, and impact-oriented materials for end users. For training, we should conduct hands-on workshops for technical teams, webinars for general staff, and designated champions should receive advanced training to support their departments.",
          "We should develop a comprehensive knowledge base documenting the new architecture, configuration details, and troubleshooting procedures. Additionally, role-based training modules should be created covering operational procedures, monitoring practices, and incident response protocols for different team members based on their responsibilities.",
          "My recommendation is to implement a living documentation approach using a collaborative platform where technical specifications, best practices, and lessons learned are continuously updated. Training should follow a blended learning model with self-paced online modules for fundamentals and facilitated sessions for complex topics and scenarios."
        ],
        hints: "Suggest appropriate documentation and training approaches for different team members.",
        expectedKeywords: ["documentation", "training", "guides", "materials", "workshops", "knowledge base", "modules", "sessions", "resources", "recommend", "suggest"],
        acceptablePhrases: [
          "recommend creating",
          "should develop",
          "my recommendation",
          "training should",
          "documentation approach"
        ],
        feedback: {
          correct: "Thank you for the comprehensive explanation of our cloud migration process. Your clear technical explanations will help ensure everyone understands their role in the project.",
          partial: "Those are helpful suggestions. Could you be more specific about the content needed for different roles?",
          incorrect: "Please recommend what documentation and training should be prepared to support this migration process."
        }
      }
    ],
    completionMessage: "Excellent! You've successfully explained a complex technical process clearly and thoroughly, demonstrating strong communication skills and technical vocabulary. You effectively addressed potential issues and ensured comprehension by clarifying technical concepts.",
    learningObjectives: [
      "Explain complex technical processes or systems clearly",
      "Structure technical explanations logically with appropriate transitions",
      "Define and clarify specialized terminology for non-technical audiences",
      "Identify and address potential challenges or issues",
      "Respond to technical questions effectively",
      "Use appropriate technical vocabulary consistently"
    ],
    grammar: {
      points: [
        "Present simple for describing systems and processes",
        "Passive voice for technical descriptions",
        "Conditional structures for explaining potential scenarios",
        "Sequential markers (first, then, next, finally)",
        "Relative clauses for defining technical components"
      ]
    }
  };

  export default technicalExplanation;
