export const vocab = {
  title: "Cybersécurité et Protection des Données",
  words: [
    // Principes fondamentaux et menaces (50 mots)
    
    
    
    { word: "integrity", translation: "intégrité", example: "Data integrity verification mechanisms detect unauthorized modifications to critical information." },
    { word: "availability", translation: "disponibilité", example: "Redundant systems enhance availability by ensuring continuous access to essential services despite component failures." },
    
    { word: "authorization", translation: "autorisation", example: "Granular authorization controls provide access to specific resources based on validated user privileges." },
    { word: "non-repudiation", translation: "non-répudiation", example: "Digital signatures ensure non-repudiation by providing cryptographic proof of message origin." },
    
    { word: "threat", translation: "menace", example: "Advanced persistent threats maintain long-term unauthorized access through sophisticated evasion techniques." },
    { word: "exploit", translation: "exploitation", example: "Attackers developed an exploit targeting the zero-day vulnerability before patches were available." },
    { word: "attack vector", translation: "vecteur d'attaque", example: "Phishing remains a primary attack vector for initial network penetration attempts." },
    
    { word: "breach", translation: "violation de données", example: "The data breach exposed sensitive information from millions of customer accounts." },
    
    
    { word: "spyware", translation: "logiciel espion", example: "The spyware covertly monitored user activities and transmitted sensitive information to remote servers." },
    { word: "trojan", translation: "cheval de Troie", example: "The trojan appeared legitimate but secretly installed backdoor access to the compromised system." },
    
    { word: "worm", translation: "ver informatique", example: "The worm exploited network vulnerabilities to self-replicate without user intervention." },
    { word: "botnet", translation: "réseau de machines zombies", example: "The distributed denial-of-service attack leveraged thousands of compromised devices in a botnet." },
    
    { word: "spear phishing", translation: "harponnage", example: "The spear phishing attack used personalized information gathered from social media to increase credibility." },
    { word: "social engineering", translation: "ingénierie sociale", example: "Social engineering exploits human psychology rather than technical vulnerabilities to obtain sensitive information." },
    { word: "insider threat", translation: "menace interne", example: "The insider threat program monitors for anomalous behavior patterns among employees with privileged access." },
    
    { word: "supply chain attack", translation: "attaque par chaîne d'approvisionnement", example: "The supply chain attack compromised legitimate software distribution channels to deliver malicious updates." },
    { word: "man-in-the-middle attack", translation: "attaque de l'homme du milieu", example: "The man-in-the-middle attack intercepted encrypted communications by impersonating the legitimate server." },
    { word: "denial-of-service attack", translation: "attaque par déni de service", example: "The denial-of-service attack overwhelmed server resources by flooding the network with malicious traffic." },
    { word: "distributed denial-of-service attack", translation: "attaque par déni de service distribué", example: "The distributed denial-of-service attack originated from thousands of compromised IoT devices." },
    { word: "brute force attack", translation: "attaque par force brute", example: "The brute force attack systematically attempted all possible password combinations to gain unauthorized access." },
    { word: "dictionary attack", translation: "attaque par dictionnaire", example: "The dictionary attack attempted common words and variations rather than random character combinations." },
    { word: "SQL injection", translation: "injection SQL", example: "The SQL injection attack exploited improper input validation to execute unauthorized database commands." },
    { word: "cross-site scripting", translation: "script intersites", example: "The cross-site scripting vulnerability allowed attackers to inject malicious code executed in users' browsers." },
    { word: "cross-site request forgery", translation: "falsification de requête intersites", example: "The cross-site request forgery attack tricked authenticated users into executing unintended actions." },
    { word: "buffer overflow", translation: "débordement de tampon", example: "The buffer overflow vulnerability allowed arbitrary code execution by writing beyond allocated memory space." },
    { word: "privilege escalation", translation: "élévation de privilèges", example: "After gaining initial access, the attacker performed privilege escalation to obtain administrative rights." },
    { word: "lateral movement", translation: "mouvement latéral", example: "The threat actor used lateral movement techniques to access increasingly sensitive systems after the initial breach." },
    { word: "data exfiltration", translation: "exfiltration de données", example: "The investigation revealed systematic data exfiltration occurring over several months before detection." },
    
    
    { word: "vulnerability assessment", translation: "évaluation des vulnérabilités", example: "The quarterly vulnerability assessment identified and prioritized security weaknesses across the infrastructure." },
    
    { word: "red team", translation: "équipe rouge", example: "The red team conducted an adversarial simulation to evaluate the effectiveness of security controls." },
    { word: "blue team", translation: "équipe bleue", example: "The blue team defended against the simulated attack while improving detection and response capabilities." },
    { word: "purple team", translation: "équipe violette", example: "Purple team exercises combine offensive and defensive personnel to maximize security improvement outcomes." },
    
    { word: "attack lifecycle", translation: "cycle de vie de l'attaque", example: "Understanding the attack lifecycle helps defenders implement controls at each potential stage." },
    { word: "kill chain", translation: "chaîne cybernétique", example: "The Cyber Kill Chain framework maps defensive countermeasures to each stage of an attack sequence." },
    { word: "MITRE ATT&CK framework", translation: "cadre MITRE ATT&CK", example: "The security team mapped detection capabilities to adversary techniques documented in the MITRE ATT&CK framework." },
    
    // Techniques et contrôles de sécurité (50 mots)
    { word: "defense in depth", translation: "défense en profondeur", example: "Defense in depth implements multiple security layers so no single control failure compromises the entire system." },
    { word: "principle of least privilege", translation: "principe du moindre privilège", example: "The principle of least privilege limits user permissions to the minimum required for legitimate job functions." },
    { word: "need-to-know basis", translation: "besoin d'en connaître", example: "Sensitive information access is restricted on a need-to-know basis to minimize exposure risk." },
    { word: "segregation of duties", translation: "séparation des tâches", example: "Segregation of duties prevents individuals from controlling entire processes that could facilitate fraud." },
    
    
    { word: "security control", translation: "contrôle de sécurité", example: "Administrative, technical, and physical security controls work together to protect information assets." },
    { word: "preventive control", translation: "contrôle préventif", example: "Preventive controls deter security incidents before they occur through proactive measures." },
    { word: "detective control", translation: "contrôle détectif", example: "Detective controls identify potentially malicious activities that circumvent preventive measures." },
    { word: "corrective control", translation: "contrôle correctif", example: "Corrective controls mitigate damage and restore systems following security incidents." },
    
    { word: "intrusion detection system", translation: "système de détection d'intrusion", example: "The intrusion detection system monitors network traffic for patterns matching known attack signatures." },
    { word: "intrusion prevention system", translation: "système de prévention d'intrusion", example: "Unlike passive IDS, intrusion prevention systems actively block suspected malicious traffic." },
    { word: "endpoint detection and response", translation: "détection et réponse sur les terminaux", example: "Endpoint detection and response solutions monitor devices for suspicious activities and facilitate incident investigation." },
    
    
    { word: "network segmentation", translation: "segmentation réseau", example: "Network segmentation limits lateral movement by restricting communication between different system components." },
    
    { word: "multi-factor authentication", translation: "authentification multifacteur", example: "Multi-factor authentication significantly reduces unauthorized access even when credentials are compromised." },
    { word: "single sign-on", translation: "authentification unique", example: "Single sign-on balances security and usability by requiring one authentication for multiple applications." },
    { word: "identity and access management", translation: "gestion des identités et des accès", example: "The identity and access management framework centralizes user provisioning, authentication, and authorization." },
    { word: "privileged access management", translation: "gestion des accès à privilèges", example: "Privileged access management provides enhanced controls for administrative and sensitive accounts." },
    
    { word: "symmetric encryption", translation: "chiffrement symétrique", example: "Symmetric encryption uses the same key for both encryption and decryption operations." },
    { word: "asymmetric encryption", translation: "chiffrement asymétrique", example: "Asymmetric encryption uses mathematically related public and private key pairs for different operations." },
    { word: "public key infrastructure", translation: "infrastructure à clés publiques", example: "Public key infrastructure establishes a trusted environment for digital certificate issuance and verification." },
    { word: "digital certificate", translation: "certificat numérique", example: "Digital certificates verify entity identities through cryptographic techniques and trusted authorities." },
    { word: "hashing", translation: "hachage", example: "Cryptographic hashing creates fixed-size outputs that change dramatically with even minor input modifications." },
    
    { word: "secure sockets layer/transport layer security", translation: "couche de sockets sécurisée/sécurité de la couche de transport", example: "SSL/TLS protocols establish encrypted connections between clients and servers across untrusted networks." },
    { word: "virtual private network", translation: "réseau privé virtuel", example: "The virtual private network creates encrypted tunnels for secure communication across public networks." },
    { word: "patch management", translation: "gestion des correctifs", example: "Effective patch management balances security requirements with operational impact considerations." },
    
    { word: "security baseline", translation: "base de référence de sécurité", example: "Security baselines establish minimum requirements for different system categories across the organization." },
    { word: "security hardening", translation: "renforcement de la sécurité", example: "System hardening removes unnecessary services and applies secure configuration settings." },
    { word: "configuration management", translation: "gestion de la configuration", example: "Configuration management maintains and enforces secure settings across the technology environment." },
    
    { word: "security awareness training", translation: "formation à la sensibilisation à la sécurité", example: "Regular security awareness training educates employees about evolving threats and protective measures." },
    
    
    { word: "security orchestration, automation and response", translation: "orchestration, automatisation et réponse de sécurité", example: "SOAR platforms integrate diverse security tools to automate incident response workflows." },
    
    
    { word: "backup and recovery", translation: "sauvegarde et restauration", example: "The 3-2-1 backup strategy maintains three copies on two different media with one offsite." },
    
    { word: "threat hunting", translation: "chasse aux menaces", example: "Proactive threat hunting searches for adversaries who have evaded existing detection mechanisms." },
    { word: "security metrics", translation: "métriques de sécurité", example: "Actionable security metrics enable data-driven decisions about control effectiveness and resource allocation." },
    
    
    { word: "penetration test", translation: "test d'intrusion", example: "The penetration test identified exploitable vulnerabilities that automated scans had missed." },
    
    // Protection des données et conformité (50 mots)
    
    { word: "personally identifiable information", translation: "informations personnelles identifiables", example: "Personally identifiable information requires enhanced safeguards under multiple regulatory frameworks." },
    { word: "sensitive personal data", translation: "données personnelles sensibles", example: "Sensitive personal data includes health information, biometrics, and other categories requiring special protection." },
    { word: "data classification", translation: "classification des données", example: "Data classification categorizes information based on sensitivity and business impact to apply appropriate controls." },
    { word: "data mapping", translation: "cartographie des données", example: "Data mapping documents information flows throughout collection, processing, storage, and transfer phases." },
    { word: "data inventory", translation: "inventaire des données", example: "A comprehensive data inventory identifies all sensitive information and its storage locations across systems." },
    
    { word: "purpose limitation", translation: "limitation des finalités", example: "Purpose limitation restricts data usage to the specific reasons for which it was originally collected." },
    
    
    
    { word: "data subject rights", translation: "droits des personnes concernées", example: "Modern privacy regulations grant data subjects various rights regarding their personal information." },
    { word: "right to access", translation: "droit d'accès", example: "The right to access enables individuals to obtain confirmation of processing and copies of their personal data." },
    { word: "right to rectification", translation: "droit de rectification", example: "Right to rectification allows individuals to correct inaccurate or incomplete personal information." },
    { word: "right to erasure", translation: "droit à l'effacement", example: "The right to erasure—or 'right to be forgotten'—permits individuals to request deletion of their data under certain conditions." },
    { word: "right to data portability", translation: "droit à la portabilité des données", example: "Data portability rights enable individuals to transfer their information between service providers." },
    { word: "data retention", translation: "conservation des données", example: "Data retention policies define how long information is kept based on legal requirements and business needs." },
    { word: "data disposal", translation: "élimination des données", example: "Secure data disposal prevents unauthorized recovery of information at the end of its lifecycle." },
    { word: "anonymization", translation: "anonymisation", example: "True anonymization permanently prevents re-identification even with additional data sources." },
    { word: "pseudonymization", translation: "pseudonymisation", example: "Unlike anonymization, pseudonymization allows re-identification with additional information kept separately." },
    { word: "data masking", translation: "masquage de données", example: "Data masking replaces sensitive information with realistic but fictitious values for testing environments." },
    
    
    
    { word: "homomorphic encryption", translation: "chiffrement homomorphique", example: "Homomorphic encryption allows computation on encrypted data without decryption, preserving confidentiality." },
    
    
    { word: "breach notification", translation: "notification de violation", example: "Regulatory frameworks specify breach notification requirements including timelines and content." },
    
    { word: "General Data Protection Regulation", translation: "Règlement général sur la protection des données", example: "The GDPR established comprehensive privacy requirements for organizations processing EU residents' data." },
    { word: "California Consumer Privacy Act", translation: "Loi californienne sur la protection de la vie privée des consommateurs", example: "The CCPA grants California residents specific rights regarding personal information collected by businesses." },
    { word: "Health Insurance Portability and Accountability Act", translation: "Loi sur la portabilité et la responsabilité de l'assurance maladie", example: "HIPAA establishes standards for protected health information in the United States." },
    { word: "Payment Card Industry Data Security Standard", translation: "Norme de sécurité des données de l'industrie des cartes de paiement", example: "PCI DSS compliance is mandatory for organizations processing payment card transactions." },
    { word: "jurisdictional requirements", translation: "exigences juridictionnelles", example: "Global organizations must navigate complex jurisdictional requirements across different regulatory regimes." },
    { word: "cross-border data transfer", translation: "transfert transfrontalier de données", example: "Cross-border data transfers require specific safeguards under various privacy frameworks." },
    { word: "standard contractual clauses", translation: "clauses contractuelles types", example: "Standard contractual clauses provide a legal mechanism for compliant international data transfers." },
    { word: "binding corporate rules", translation: "règles d'entreprise contraignantes", example: "Binding corporate rules enable data transfers within multinational organizations under consistent privacy standards." },
    { word: "data processing agreement", translation: "accord de traitement des données", example: "Data processing agreements formalize responsibilities between controllers and processors handling personal information." },
    { word: "data controller", translation: "responsable du traitement", example: "The data controller determines purposes and means of processing personal information." },
    { word: "data processor", translation: "sous-traitant", example: "Data processors handle personal information on behalf of and under the instructions of controllers." },
    { word: "data protection officer", translation: "délégué à la protection des données", example: "The data protection officer independently advises on privacy compliance and serves as a regulatory contact point." },
    { word: "privacy notice", translation: "politique de confidentialité", example: "A comprehensive privacy notice transparently discloses data collection and processing practices to individuals." },
    { word: "cookie consent", translation: "consentement aux cookies", example: "European regulations require explicit cookie consent before storing non-essential tracking technologies." },
    { word: "vendor risk management", translation: "gestion des risques liés aux fournisseurs", example: "Vendor risk management assesses third-party data handling practices before and during relationships." },
    
    { word: "security assessment", translation: "évaluation de sécurité", example: "Third-party security assessments verify control effectiveness through documentation review and testing." },
    { word: "attestation", translation: "attestation", example: "Independent attestation reports provide assurance regarding control design and operational effectiveness." },
    { word: "security certification", translation: "certification de sécurité", example: "Industry security certifications demonstrate compliance with established standards through external validation." },
    { word: "continuous monitoring", translation: "surveillance continue", example: "Continuous monitoring provides real-time visibility into security and compliance posture." },
    
    // Cybersécurité avancée et tendances émergentes (50 mots)
    
    
    
    { word: "cyber insurance", translation: "cyber-assurance", example: "The cyber insurance policy provides financial protection against specific categories of security incidents." },
    { word: "offensive security", translation: "sécurité offensive", example: "Offensive security approaches identify vulnerabilities through the same techniques utilized by adversaries." },
    
    
    { word: "devsecops", translation: "devsecops", example: "DevSecOps integrates security throughout the development pipeline rather than as a separate phase." },
    { word: "shift-left security", translation: "sécurité décalée vers la gauche", example: "Shift-left security implements controls earlier in the development lifecycle to reduce remediation costs." },
    { word: "cloud security", translation: "sécurité du cloud", example: "Cloud security requires different approaches than traditional infrastructure due to shared responsibility models." },
    { word: "cloud access security broker", translation: "courtier de sécurité d'accès au cloud", example: "Cloud access security brokers provide visibility and control over cloud service usage and data transfers." },
    { word: "containerization security", translation: "sécurité de la conteneurisation", example: "Containerization security addresses unique risks in these lightweight virtualization environments." },
    { word: "infrastructure as code security", translation: "sécurité de l'infrastructure en tant que code", example: "Security scanning of infrastructure as code identifies misconfigurations before deployment." },
    { word: "serverless security", translation: "sécurité sans serveur", example: "Serverless security focuses on application layer protections when underlying infrastructure is abstracted." },
    { word: "internet of things security", translation: "sécurité de l'internet des objets", example: "Internet of Things security addresses challenges of limited computing resources and massive deployment scale." },
    
    { word: "industrial control system security", translation: "sécurité des systèmes de contrôle industriel", example: "Industrial control system security prioritizes availability and physical safety alongside confidentiality and integrity." },
    { word: "SCADA security", translation: "sécurité SCADA", example: "SCADA security protects supervisory control and data acquisition systems controlling critical infrastructure." },
    { word: "embedded device security", translation: "sécurité des appareils embarqués", example: "Embedded device security addresses risks in firmware and hardware with limited update capabilities." },
    
    { word: "bring your own device", translation: "apportez votre appareil personnel", example: "Bring your own device policies balance security requirements with employee flexibility." },
    
    
    { word: "user and entity behavior analytics", translation: "analyse comportementale des utilisateurs et des entités", example: "UEBA establishes baselines of normal activity to detect potentially malicious deviations." },
    
    
    { word: "extended detection and response", translation: "détection et réponse étendues", example: "XDR solutions integrate multiple security controls for comprehensive visibility and coordinated response." },
    { word: "threat intelligence platform", translation: "plateforme de renseignement sur les menaces", example: "The threat intelligence platform aggregates, analyzes, and operationalizes information about potential adversaries." },
    
    { word: "managed security service provider", translation: "fournisseur de services de sécurité gérés", example: "The organization partnered with a managed security service provider for 24/7 monitoring capabilities." },
    { word: "security as a service", translation: "sécurité en tant que service", example: "Security as a service offerings provide subscription-based protection without capital investment." },
    
    
    
    { word: "security framework", translation: "cadre de sécurité", example: "The organization adopted the NIST Cybersecurity Framework to structure its security program." },
    { word: "zero trust", translation: "confiance zéro", example: "Zero trust architecture requires verification of every access request regardless of source location." },
    { word: "microsegmentation", translation: "microsegmentation", example: "Microsegmentation creates granular security zones to contain lateral movement during breaches." },
    { word: "software-defined perimeter", translation: "périmètre défini par logiciel", example: "Software-defined perimeter creates dynamic, identity-based boundaries instead of static network segments." },
    
    { word: "post-quantum cryptography", translation: "cryptographie post-quantique", example: "Post-quantum cryptographic algorithms resist attacks from both classical and quantum computers." },
    { word: "blockchain security", translation: "sécurité de la blockchain", example: "Blockchain security addresses unique concerns including consensus mechanisms and smart contract vulnerabilities." },
    
    { word: "artificial intelligence in cybersecurity", translation: "intelligence artificielle en cybersécurité", example: "Artificial intelligence enhances threat detection through pattern recognition and anomaly identification." },
    { word: "adversarial machine learning", translation: "apprentissage automatique antagoniste", example: "Adversarial machine learning studies how attackers can manipulate AI systems through specially crafted inputs." },
    
    
    { word: "cyber threat framework", translation: "cadre de cybermenace", example: "The cyber threat framework provides a common language for describing adversary behaviors across different contexts." },
    { word: "attack simulation", translation: "simulation d'attaque", example: "Automated attack simulation tools continuously validate security controls against common adversary techniques." },
    { word: "breach and attack simulation", translation: "simulation de violation et d'attaque", example: "Breach and attack simulation platforms automate security control validation against common adversary techniques." },
    { word: "security validation", translation: "validation de sécurité", example: "Continuous security validation ensures controls perform as expected against realistic attack scenarios." }
  ]
};