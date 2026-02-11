/* ============================================
   AI Prompt Library - Data
   ============================================ */

// ============================================
// Platform Definitions
// ============================================

const platforms = [
    {
        id: 'claude',
        name: 'Claude',
        company: 'Anthropic',
        color: '#7C3AED',
        latestModel: 'Claude Opus 4.6'
    },
    {
        id: 'gemini',
        name: 'Gemini',
        company: 'Google',
        color: '#4285F4',
        latestModel: 'Gemini 3'
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        company: 'OpenAI',
        color: '#10A37F',
        latestModel: 'GPT-5'
    },
    {
        id: 'universal',
        name: 'Universal',
        company: 'All Platforms',
        color: '#6B7280',
        latestModel: null
    }
];

// ============================================
// Category Definitions
// ============================================

const categories = [
    {
        slug: 'clear-instructions',
        name: 'Clear Instructions',
        description: 'Write unambiguous prompts that leave no room for misinterpretation',
        icon: '🎯'
    },
    {
        slug: 'context',
        name: 'Providing Context',
        description: 'Background information and motivation for better results',
        icon: '📋'
    },
    {
        slug: 'few-shot',
        name: 'Few-Shot Examples',
        description: 'Input/output demonstrations to guide the model',
        icon: '📚'
    },
    {
        slug: 'chain-of-thought',
        name: 'Chain of Thought',
        description: 'Step-by-step reasoning for complex problems',
        icon: '🔗'
    },
    {
        slug: 'structured-output',
        name: 'Structured Outputs',
        description: 'XML, JSON, and specific format requests',
        icon: '📐'
    },
    {
        slug: 'role-system',
        name: 'Role & System Prompts',
        description: 'Persona and behavior setting for consistent responses',
        icon: '🎭'
    },
    {
        slug: 'task-decomposition',
        name: 'Task Decomposition',
        description: 'Breaking down complex tasks into manageable steps',
        icon: '🧩'
    },
    {
        slug: 'agentic',
        name: 'Agentic Workflows',
        description: 'Tool use, autonomy control, and multi-step execution',
        icon: '🤖'
    },
    {
        slug: 'output-formatting',
        name: 'Output Formatting',
        description: 'Controlling verbosity, style, and presentation',
        icon: '✨'
    },
    {
        slug: 'multimodal',
        name: 'Multimodal Prompting',
        description: 'Working with images, video, and audio',
        icon: '🖼️'
    }
];

// ============================================
// Teaching Framework Definitions
// ============================================

const frameworks = [
    {
        id: '3c',
        name: 'Context, Content, Constraints',
        shortLabel: '3C',
        color: '#F59E0B',
        colorBg: 'rgba(245, 158, 11, 0.15)',
        description: 'Structure prompts with clear context, content, and constraints'
    },
    {
        id: 'rfgold',
        name: 'Role, Format, Goal, Objective, Limitations, Details',
        shortLabel: 'RFGOLD',
        color: '#EC4899',
        colorBg: 'rgba(236, 72, 153, 0.15)',
        description: 'Define the role, format, goal, objectives, limitations, and details'
    },
    {
        id: 'cot',
        name: 'Chain of Thought',
        shortLabel: 'CoT',
        color: '#3B82F6',
        colorBg: 'rgba(59, 130, 246, 0.15)',
        description: 'Guide the model through step-by-step reasoning'
    },
    {
        id: 'few-shot',
        name: 'Train with Examples',
        shortLabel: 'Few-Shot',
        color: '#14B8A6',
        colorBg: 'rgba(20, 184, 166, 0.15)',
        description: 'Demonstrate desired output with input/output examples'
    },
    {
        id: 'reverse',
        name: 'Reverse Engineer a Prompt',
        shortLabel: 'Reverse',
        color: '#F97316',
        colorBg: 'rgba(249, 115, 22, 0.15)',
        description: 'Work backward from the desired output to craft the prompt'
    },
    {
        id: 'brockman',
        name: 'Iterative Refinement (Brockman)',
        shortLabel: 'Brockman',
        color: '#8B5CF6',
        colorBg: 'rgba(139, 92, 246, 0.15)',
        description: 'Start simple, iterate, and refine based on results'
    }
];

// ============================================
// Prompt Data (25 prompts, 2-3 per category)
// ============================================

const promptsData = [

    // ========================================
    // CATEGORY: Clear Instructions (3 prompts)
    // ========================================

    {
        id: 'clear-explicit-mobile',
        title: 'Explicit Instructions with Motivation',
        category: 'clear-instructions',
        platforms: ['universal'],
        prompt: `Write a product description for an e-commerce listing.

Context: This will be displayed on mobile devices where screen space is limited.
Customers typically scan rather than read fully, and purchase decisions
happen in under 30 seconds.

Product: {{PRODUCT_NAME}}
Key Features: {{FEATURES}}
Target Audience: {{AUDIENCE}}

Requirements:
- Keep it under 150 words
- Lead with the primary benefit, not features
- Use bullet points for scanability (max 5)
- Include one emotional hook
- End with a clear call-to-action

Do NOT include:
- Technical jargon unless the audience expects it
- Vague claims like "best" or "amazing" without specifics
- More than one exclamation mark`,
        whyItWorks: 'This prompt combines three powerful techniques: (1) explaining WHY with context about mobile/scanning behavior, (2) explicit positive requirements, and (3) explicit negative constraints. The motivation helps the AI make better judgment calls on edge cases.',
        platformNotes: {
            claude: 'Claude 4.x particularly benefits from the "why" explanation. It generalizes from your reasoning to handle edge cases.',
            gemini: 'Gemini 3 prefers concise prompts, but the structure here is efficient. Avoid adding more constraints.',
            chatgpt: 'Works well. You can move the requirements to a system message for reuse across multiple products.'
        },
        tags: ['copywriting', 'e-commerce', 'constraints', 'context'],
        difficulty: 'intermediate',
        frameworks: ['3c']
    },

    {
        id: 'clear-negative-constraints',
        title: 'Positive and Negative Constraints',
        category: 'clear-instructions',
        platforms: ['claude'],
        prompt: `<task>
Summarize the following research paper for a non-technical audience.
</task>

<rules>
DO:
- Use analogies to explain complex concepts
- Keep sentences under 20 words on average
- Define any acronym on first use
- Write at an 8th-grade reading level

DO NOT:
- Use passive voice
- Include statistical notation (p-values, confidence intervals)
- Assume the reader has domain expertise
- Exceed 300 words
</rules>

<paper>
{{PAPER_TEXT}}
</paper>`,
        whyItWorks: 'Splitting constraints into explicit DO and DO NOT lists eliminates ambiguity. Claude processes these as hard boundaries rather than suggestions. The XML tags further reinforce the separation between instructions and content.',
        platformNotes: {
            claude: 'Claude respects DO/DO NOT lists precisely. Combine with XML tags for maximum clarity.',
            chatgpt: 'Works well. Place DO/DO NOT rules in the system message for persistent behavior.',
            gemini: 'Gemini follows these well. Keep the total number of constraints under 10 for best adherence.'
        },
        tags: ['constraints', 'summarization', 'academic', 'readability'],
        difficulty: 'beginner',
        frameworks: ['3c']
    },

    {
        id: 'clear-specificity',
        title: 'Vague vs. Specific Instructions',
        category: 'clear-instructions',
        platforms: ['chatgpt'],
        prompt: `Review the following essay and provide feedback.

Instead of general comments like "make it better," follow this structure:

For each issue found:
1. Quote the exact sentence or phrase
2. Explain what's wrong (grammar, clarity, logic, flow)
3. Provide a rewritten version
4. Explain why the revision is stronger

Priorities (address in this order):
- Logical gaps or unsupported claims
- Unclear or ambiguous sentences
- Paragraph transitions
- Grammar and punctuation

Limit feedback to the 5 most impactful issues.

Essay:
{{ESSAY_TEXT}}`,
        whyItWorks: 'Vague prompts get vague responses. By specifying the exact output structure (quote, explain, rewrite, justify) and prioritizing issue types, you get actionable, well-organized feedback instead of generic platitudes.',
        platformNotes: {
            chatgpt: 'GPT models excel when you define the output structure explicitly. Numbered steps are particularly effective.',
            claude: 'Claude naturally provides structured feedback. The priority ordering helps focus on high-impact issues first.',
            gemini: 'Works well with Gemini. The "limit to 5" constraint prevents overly long responses.'
        },
        tags: ['writing', 'feedback', 'editing', 'specific'],
        difficulty: 'beginner',
        frameworks: ['3c', 'rfgold']
    },

    // ========================================
    // CATEGORY: Providing Context (3 prompts)
    // ========================================

    {
        id: 'context-codebase',
        title: 'Codebase Context for Bug Fixing',
        category: 'context',
        platforms: ['claude'],
        prompt: `<context>
I'm working on a Node.js REST API using Express.js and PostgreSQL.
The app follows MVC architecture with routes/ controllers/ models/ directories.
We use JWT for authentication and Joi for validation.
The codebase uses async/await throughout, no callbacks.
</context>

<bug_report>
Users report that the /api/users/:id endpoint returns 500 errors
intermittently, about 10% of the time. The error logs show:
"TypeError: Cannot read property 'rows' of undefined"
</bug_report>

<relevant_code>
{{CODE_SNIPPET}}
</relevant_code>

Diagnose the root cause and provide a fix. Consider:
- Connection pool exhaustion
- Race conditions
- Missing error handling
- Query timeout issues`,
        whyItWorks: 'Providing the tech stack, architecture, and conventions upfront means Claude doesn\'t waste tokens guessing your setup. The structured bug report with error logs gives concrete data to analyze rather than vague symptoms.',
        platformNotes: {
            claude: 'Claude excels when given architectural context in XML tags. It uses this to tailor solutions to your specific stack.',
            chatgpt: 'Include tech stack context in the system message so it persists across follow-up questions.',
            gemini: 'Front-load the most important context. Gemini may lose focus on context that appears far from the question.'
        },
        tags: ['debugging', 'nodejs', 'backend', 'context'],
        difficulty: 'intermediate',
        frameworks: ['3c']
    },

    {
        id: 'context-audience',
        title: 'Audience-Aware Content Generation',
        category: 'context',
        platforms: ['universal'],
        prompt: `Write an explanation of how HTTPS encryption works.

Audience context:
- Who: Junior web developers (1-2 years experience)
- They know: HTML, CSS, JavaScript, basic HTTP request/response
- They DON'T know: Cryptography, TLS handshake details, certificate authorities
- Goal: They should understand enough to debug SSL certificate errors
- Tone: Conversational but technically accurate, like a senior dev explaining over coffee

Use analogies to real-world concepts where helpful.
If you must use a technical term, define it inline on first use.`,
        whyItWorks: 'Defining the audience as a persona with explicit knowledge boundaries prevents the AI from pitching too high or too low. The "know / don\'t know" split is especially effective because it draws a clear line for assumed knowledge.',
        platformNotes: {
            claude: 'Claude adapts tone and depth exceptionally well to audience descriptions. The more specific, the better.',
            gemini: 'Gemini responds well to audience context. Including the "goal" helps it focus on practical rather than theoretical content.',
            chatgpt: 'ChatGPT handles audience targeting well. You can refine further by saying "respond as if teaching a bootcamp class."'
        },
        tags: ['audience', 'explanation', 'technical-writing', 'education'],
        difficulty: 'beginner',
        frameworks: ['3c']
    },

    {
        id: 'context-business',
        title: 'Business Context for Decision Making',
        category: 'context',
        platforms: ['gemini'],
        prompt: `Help me choose between Redis and Memcached for our caching layer.

Business context:
- E-commerce platform with 50K daily active users
- Peak traffic: 10x normal during flash sales (Black Friday)
- Current pain point: Product catalog API response time is 800ms, target is <200ms
- Team: 3 backend engineers, moderate Redis experience, no Memcached experience
- Budget: Can allocate $500/month for managed cache service
- Timeline: Must ship in 2 weeks

Technical context:
- Stack: Python/Django, PostgreSQL, deployed on GCP
- We need to cache: product listings, search results, user cart sessions
- Cart sessions require data persistence across restarts

Compare both options considering our specific constraints above.
Recommend one with clear justification.`,
        whyItWorks: 'Generic "Redis vs Memcached" prompts get generic answers. By including team size, budget, timeline, traffic patterns, and persistence requirements, the AI can make a recommendation grounded in your actual constraints rather than theoretical trade-offs.',
        platformNotes: {
            gemini: 'Gemini excels at structured comparisons when given concrete numbers and constraints to reason about.',
            claude: 'Claude weighs business constraints naturally. It will flag if your timeline or budget makes one option impractical.',
            chatgpt: 'Works well. Follow up with "now create an implementation plan" for a concrete next step.'
        },
        tags: ['architecture', 'decision-making', 'business', 'caching'],
        difficulty: 'intermediate',
        frameworks: ['3c', 'rfgold']
    },

    // ========================================
    // CATEGORY: Few-Shot Examples (3 prompts)
    // ========================================

    {
        id: 'few-shot-emotion',
        title: 'Emotion Classification with Consistent Prefixes',
        category: 'few-shot',
        platforms: ['gemini'],
        prompt: `Classify the emotion expressed in each text.
Output only the lowercase emotion label.

Valid emotions: anger, fear, joy, love, sadness, surprise

Text: I just got promoted after working so hard for this!
Emotion: joy

Text: The thunderstorm came out of nowhere and scared everyone.
Emotion: fear

Text: I can't believe they canceled the concert at the last minute.
Emotion: anger

Text: She showed up at my door after being away for five years.
Emotion: surprise

Text: {{USER_INPUT}}
Emotion:`,
        whyItWorks: 'Gemini excels at following consistent patterns in few-shot examples. Using identical prefixes (Text:/Emotion:) and formatting across all examples helps the model understand exactly what output format you expect. The constraint to valid emotions prevents hallucination.',
        platformNotes: {
            gemini: 'Ensure whitespace, prefixes, and structure are identical across examples. Gemini is sensitive to formatting inconsistencies.',
            claude: 'Claude handles few-shot well but may add explanations. Add "Output only the label, nothing else" if needed.',
            chatgpt: 'Works well with few-shot. Can also use the messages array with user/assistant pairs for examples.'
        },
        tags: ['few-shot', 'classification', 'emotion', 'nlp'],
        difficulty: 'beginner',
        frameworks: ['few-shot']
    },

    {
        id: 'few-shot-code-review',
        title: 'Code Comment Style via Examples',
        category: 'few-shot',
        platforms: ['chatgpt'],
        prompt: `Add inline comments to code following this exact style:

Example 1:
Input:
def calculate_tax(income, rate):
    bracket = income * rate
    return bracket - (bracket * 0.1)

Output:
def calculate_tax(income, rate):
    # Calculate gross tax for the income bracket
    bracket = income * rate
    # Apply 10% standard deduction to the bracket amount
    return bracket - (bracket * 0.1)

Example 2:
Input:
async function fetchUser(id) {
    const res = await api.get(\`/users/\${id}\`);
    if (!res.ok) throw new HttpError(res.status);
    return res.json();
}

Output:
async function fetchUser(id) {
    // Fetch user by ID from the REST API
    const res = await api.get(\`/users/\${id}\`);
    // Throw a typed error so callers can handle specific HTTP status codes
    if (!res.ok) throw new HttpError(res.status);
    return res.json();
}

Now add comments to this code using the same style:
{{CODE_HERE}}`,
        whyItWorks: 'The examples demonstrate the exact comment style you want: what to comment (non-obvious logic), where to place comments (above the line), and tone (explain WHY, not WHAT). Two examples in different languages show the pattern generalizes.',
        platformNotes: {
            chatgpt: 'GPT models learn output patterns very effectively from examples. Two well-chosen examples typically outperform long instructions.',
            claude: 'Claude picks up the style with even one example. Adding a second confirms the pattern.',
            gemini: 'Ensure formatting is perfectly consistent between examples. Gemini mirrors the exact structure it sees.'
        },
        tags: ['few-shot', 'code', 'comments', 'style'],
        difficulty: 'intermediate',
        frameworks: ['few-shot']
    },

    {
        id: 'few-shot-data-extraction',
        title: 'Structured Data Extraction from Text',
        category: 'few-shot',
        platforms: ['universal'],
        prompt: `Extract structured data from job postings. Follow the exact output format shown.

Input: "Senior React Developer at TechCorp. Remote, $140-180K. Must have 5+ years React, TypeScript required. Nice to have: GraphQL, AWS."
Output:
{
  "title": "Senior React Developer",
  "company": "TechCorp",
  "location": "Remote",
  "salary_min": 140000,
  "salary_max": 180000,
  "required_skills": ["React", "TypeScript"],
  "preferred_skills": ["GraphQL", "AWS"],
  "min_experience_years": 5
}

Input: "Junior Backend Engineer - StartupXYZ, NYC office. $80-95K base + equity. Python and SQL needed, 1-3 yrs exp. Bonus: Docker, Redis."
Output:
{
  "title": "Junior Backend Engineer",
  "company": "StartupXYZ",
  "location": "NYC",
  "salary_min": 80000,
  "salary_max": 95000,
  "required_skills": ["Python", "SQL"],
  "preferred_skills": ["Docker", "Redis"],
  "min_experience_years": 1
}

Input: {{JOB_POSTING}}
Output:`,
        whyItWorks: 'Few-shot extraction works because the examples define the schema implicitly. The model learns field names, data types (strings vs numbers), and how to handle variations (Remote vs NYC, nice-to-have vs bonus) without explicit rules.',
        platformNotes: {
            claude: 'Claude is excellent at inferring extraction schemas from examples. Two examples with variation usually suffice.',
            gemini: 'Gemini handles structured extraction well. Ensure JSON formatting is valid in examples.',
            chatgpt: 'GPT models excel at this. For production use, combine with the JSON mode API parameter.'
        },
        tags: ['few-shot', 'extraction', 'json', 'parsing'],
        difficulty: 'beginner',
        frameworks: ['few-shot']
    },

    // ========================================
    // CATEGORY: Chain of Thought (3 prompts)
    // ========================================

    {
        id: 'cot-step-by-step',
        title: 'Step-by-Step Problem Solving',
        category: 'chain-of-thought',
        platforms: ['universal'],
        prompt: `Solve this problem step by step. Show your reasoning at each stage
before giving the final answer.

Problem: {{PROBLEM_DESCRIPTION}}

Let's approach this systematically:

1. First, identify what we know and what we need to find
2. Break down the problem into smaller parts
3. Solve each part, explaining the logic
4. Combine the results
5. Verify the answer makes sense

Think through each step carefully.`,
        whyItWorks: 'Chain-of-thought prompting dramatically improves accuracy on complex reasoning tasks across all major AI platforms. By explicitly asking the model to show intermediate steps, you reduce errors and get transparent, verifiable reasoning.',
        platformNotes: {
            claude: 'Claude\'s extended thinking feature amplifies this further. Enable thinking for complex math or logic problems.',
            gemini: 'Gemini Ultra + CoT achieves 90%+ on many benchmarks. Combine with self-consistency (multiple samples) for best results.',
            chatgpt: 'GPT-5 has built-in reasoning effort control. Set higher reasoning_effort for complex problems.'
        },
        tags: ['reasoning', 'step-by-step', 'problem-solving', 'math'],
        difficulty: 'beginner',
        frameworks: ['cot']
    },

    {
        id: 'cot-debugging',
        title: 'Systematic Debugging with Reasoning',
        category: 'chain-of-thought',
        platforms: ['claude'],
        prompt: `<bug>
{{ERROR_DESCRIPTION}}
</bug>

<code>
{{CODE_SNIPPET}}
</code>

Debug this issue by thinking through it systematically:

Step 1: What is the expected behavior vs actual behavior?
Step 2: What are all the possible causes? List at least 3.
Step 3: For each possible cause, what evidence supports or refutes it?
Step 4: What is the most likely root cause and why?
Step 5: Provide the fix with an explanation.
Step 6: What test would verify this fix works?`,
        whyItWorks: 'Forcing the model through a diagnostic sequence mirrors how experienced developers debug. Step 2 prevents anchoring on the first guess, Step 3 requires evidence-based reasoning, and Step 6 ensures the fix is verifiable.',
        platformNotes: {
            claude: 'Enable extended thinking for complex bugs. Claude will explore multiple hypotheses internally before responding.',
            chatgpt: 'Works well with o1/o3 reasoning models. The structured steps help even non-reasoning models stay focused.',
            gemini: 'Gemini follows the numbered steps well. Consider adding "think out loud" for more transparent reasoning.'
        },
        tags: ['debugging', 'reasoning', 'systematic', 'testing'],
        difficulty: 'intermediate',
        frameworks: ['cot']
    },

    {
        id: 'cot-self-consistency',
        title: 'Self-Consistency Check for Accuracy',
        category: 'chain-of-thought',
        platforms: ['gemini'],
        prompt: `Answer the following question using two different approaches,
then check if they agree.

Question: {{QUESTION}}

Approach 1: Solve it using {{METHOD_A}}
Show your complete work.

Approach 2: Now solve it again using {{METHOD_B}}
Show your complete work.

Comparison:
- Do both approaches give the same answer?
- If not, identify where the reasoning diverged
- Which approach is more reliable and why?

Final answer: [State the answer you're most confident in]`,
        whyItWorks: 'Self-consistency is a proven technique for improving accuracy. By solving the same problem two different ways, errors in one approach get caught by the other. This is especially effective for math, logic, and analytical questions.',
        platformNotes: {
            gemini: 'Gemini benefits strongly from self-consistency. Google research shows this technique significantly boosts accuracy on benchmarks.',
            claude: 'Claude handles multi-approach reasoning well. It will honestly flag when approaches disagree.',
            chatgpt: 'Effective with GPT-5. For API use, you can also sample multiple responses and take the majority answer.'
        },
        tags: ['reasoning', 'verification', 'accuracy', 'math'],
        difficulty: 'advanced',
        frameworks: ['cot']
    },

    // ========================================
    // CATEGORY: Structured Outputs (2 prompts)
    // ========================================

    {
        id: 'structured-xml-tags',
        title: 'Structured Analysis with XML Tags',
        category: 'structured-output',
        platforms: ['claude'],
        prompt: `<task>
Analyze the following customer feedback and extract key insights.
</task>

<requirements>
1. Identify the main sentiment (positive/negative/neutral)
2. List specific product features mentioned
3. Extract any suggestions for improvement
4. Note the urgency level if complaints are present
</requirements>

<output_format>
Respond with a JSON object containing:
- sentiment: string
- features_mentioned: array
- suggestions: array
- urgency: "low" | "medium" | "high" | "none"
</output_format>

<feedback>
{{CUSTOMER_FEEDBACK}}
</feedback>`,
        whyItWorks: 'Claude is specifically trained to recognize and follow XML tag structures. Tags like <task>, <requirements>, and <output_format> create clear sections that Claude processes as distinct instructions, reducing ambiguity and improving accuracy.',
        platformNotes: {
            claude: 'XML tags are Claude\'s preferred structure for complex prompts. Use semantic tag names that describe the content.',
            gemini: 'Gemini can follow XML structure but doesn\'t have the same level of training on it. Consider using markdown headers instead.',
            chatgpt: 'GPT models understand XML but may not follow it as precisely. System messages often work better for structure.'
        },
        tags: ['xml', 'structure', 'analysis', 'json'],
        difficulty: 'intermediate',
        frameworks: ['rfgold']
    },

    {
        id: 'structured-json-schema',
        title: 'JSON Output with Schema Definition',
        category: 'structured-output',
        platforms: ['universal'],
        prompt: `Extract the following information from this meeting transcript
and return it as a JSON object matching this exact schema:

{
  "meeting_title": "string",
  "date": "YYYY-MM-DD",
  "attendees": ["string"],
  "action_items": [
    {
      "task": "string (what needs to be done)",
      "owner": "string (person responsible)",
      "due_date": "YYYY-MM-DD or null if not specified",
      "priority": "high | medium | low"
    }
  ],
  "decisions_made": ["string"],
  "open_questions": ["string"],
  "next_meeting": "YYYY-MM-DD or null"
}

Rules:
- Use null for any field where information is not available
- Infer priority from language cues (urgent/ASAP = high, soon = medium, when possible = low)
- Include ONLY action items with a clear owner

Transcript:
{{TRANSCRIPT}}`,
        whyItWorks: 'Providing the exact JSON schema as a template removes all ambiguity about the output structure. The AI fills in the template like a form. Inline type annotations and the rules section handle edge cases like missing data.',
        platformNotes: {
            claude: 'Claude follows JSON schemas precisely. For API use, you can also prefill the assistant response with "{" to force JSON output.',
            gemini: 'Use Gemini\'s controlled generation API to enforce the schema at the model level for guaranteed valid JSON.',
            chatgpt: 'Enable JSON mode in the API (response_format: json_object) for guaranteed valid JSON output.'
        },
        tags: ['json', 'schema', 'extraction', 'meetings'],
        difficulty: 'intermediate',
        frameworks: ['rfgold']
    },

    {
        id: 'structured-markdown-table',
        title: 'Markdown Table Comparison Output',
        category: 'structured-output',
        platforms: ['gemini'],
        prompt: `Compare the following {{NUMBER}} items and present the results
as a markdown table.

Items to compare: {{ITEMS}}

Table requirements:
- First column: Feature/criteria name
- Remaining columns: One per item being compared
- Use checkmarks and X marks where applicable
- Include a final "Best for" row summarizing each item's strength
- Sort rows by importance (most important criteria first)

After the table, provide a 2-sentence summary of when you'd choose
each option.

Comparison criteria:
{{CRITERIA}}`,
        whyItWorks: 'Requesting a specific output format (markdown table) with explicit column structure gives you predictable, scannable results. The "Best for" row forces a practical conclusion rather than an academic comparison.',
        platformNotes: {
            gemini: 'Gemini produces clean markdown tables. Specify column alignment if needed for numeric data.',
            claude: 'Claude generates excellent markdown tables. It naturally adds helpful notes below the table.',
            chatgpt: 'Works well. ChatGPT renders markdown tables correctly in the UI. Specify column widths if display matters.'
        },
        tags: ['markdown', 'tables', 'comparison', 'format'],
        difficulty: 'beginner',
        frameworks: ['rfgold']
    },

    // ========================================
    // CATEGORY: Role & System Prompts (3 prompts)
    // ========================================

    {
        id: 'role-code-reviewer',
        title: 'Expert Code Reviewer System Prompt',
        category: 'role-system',
        platforms: ['chatgpt'],
        prompt: `System: You are a senior software engineer with 15 years of experience,
specializing in code review and security auditing. Your expertise includes:
- Python, JavaScript, and Go
- OWASP Top 10 vulnerabilities
- Performance optimization
- Clean code principles

When reviewing code:
1. First scan for security vulnerabilities (CRITICAL)
2. Then check for performance issues (HIGH)
3. Then review code style and maintainability (MEDIUM)
4. Finally suggest improvements (LOW)

Format each finding as:
[SEVERITY] Category: Description
  → Recommendation: How to fix

Be direct and specific. Don't explain basic concepts unless asked.

User: Review this code for issues:
\`\`\`python
{{CODE_HERE}}
\`\`\``,
        whyItWorks: 'System messages in ChatGPT establish persistent behavior and expertise throughout the conversation. By defining the role, priorities, and output format upfront, you get consistent, structured responses without repeating instructions.',
        platformNotes: {
            chatgpt: 'System messages are the foundation of ChatGPT customization. They persist across the conversation and set the tone.',
            claude: 'Claude uses system prompts similarly but often responds better to inline instructions mixed with context.',
            gemini: 'Gemini doesn\'t have a distinct system message field in all interfaces. Include role context at the start of your prompt.'
        },
        tags: ['system-prompt', 'code-review', 'role', 'expert'],
        difficulty: 'beginner',
        frameworks: ['rfgold']
    },

    {
        id: 'role-socratic-tutor',
        title: 'Socratic Tutor That Doesn\'t Give Answers',
        category: 'role-system',
        platforms: ['claude'],
        prompt: `You are a Socratic tutor for computer science students.

Core behavior:
- NEVER give the direct answer to a problem
- Instead, ask guiding questions that lead the student to discover the answer
- Start with what the student already knows and build from there
- If the student is stuck, give a small hint, then another question
- Celebrate when they figure it out

When the student shares code with a bug:
1. Ask them what they expect the code to do
2. Ask them to trace through with a specific input
3. Ask "what happens at line X?" to guide them to the bug
4. If they find it, ask them to explain WHY it's a bug

Tone: Patient, encouraging, slightly playful. Use phrases like
"You're on the right track!" and "What would happen if...?"

Student's question: {{QUESTION}}`,
        whyItWorks: 'This prompt defines behavior by what the AI should NOT do (give answers) as strongly as what it should do (ask questions). The specific response patterns for code bugs give Claude a concrete workflow to follow rather than vague "be Socratic" instructions.',
        platformNotes: {
            claude: 'Claude follows behavioral constraints reliably. The NEVER directive combined with alternative behavior works well.',
            chatgpt: 'Place this in the system message. GPT may occasionally break character with direct answers; reinforce with "Remember: never give the answer directly."',
            gemini: 'Works but Gemini may need stronger reinforcement of the "no direct answers" rule. Repeat the constraint periodically.'
        },
        tags: ['role', 'education', 'socratic', 'tutoring'],
        difficulty: 'intermediate',
        frameworks: ['rfgold', '3c']
    },

    {
        id: 'role-multi-persona',
        title: 'Multi-Persona Debate for Decision Making',
        category: 'role-system',
        platforms: ['universal'],
        prompt: `Evaluate this decision by simulating a discussion between three experts:

Decision: {{DECISION}}

Expert 1 - The Advocate: Argues FOR the decision.
Focus on opportunities, competitive advantage, and upside.

Expert 2 - The Skeptic: Argues AGAINST the decision.
Focus on risks, hidden costs, and what could go wrong.

Expert 3 - The Pragmatist: Synthesizes both views.
Focus on implementation reality, timeline, and compromise options.

Format:
**Advocate:** [2-3 paragraphs]
**Skeptic:** [2-3 paragraphs]
**Pragmatist:** [2-3 paragraphs]

**Final Recommendation:** [1 paragraph with the most balanced path forward]`,
        whyItWorks: 'Multi-persona prompting forces the AI to genuinely consider opposing viewpoints rather than defaulting to a single perspective. The structured debate format ensures balanced analysis, and the Pragmatist role prevents analysis paralysis.',
        platformNotes: {
            claude: 'Claude naturally considers multiple viewpoints. The persona structure channels this into organized output.',
            chatgpt: 'GPT handles role-switching well within a single response. Label each section clearly.',
            gemini: 'Gemini produces good multi-perspective analysis. The Pragmatist role helps avoid wishy-washy conclusions.'
        },
        tags: ['role', 'debate', 'decision-making', 'analysis'],
        difficulty: 'intermediate',
        frameworks: ['rfgold']
    },

    // ========================================
    // CATEGORY: Task Decomposition (3 prompts)
    // ========================================

    {
        id: 'decomp-feature-breakdown',
        title: 'Feature Implementation Breakdown',
        category: 'task-decomposition',
        platforms: ['claude'],
        prompt: `<task>
Break down the following feature into implementable subtasks.
</task>

<feature>
{{FEATURE_DESCRIPTION}}
</feature>

<context>
Tech stack: {{TECH_STACK}}
Team size: {{TEAM_SIZE}}
Timeline: {{TIMELINE}}
</context>

For each subtask, provide:
1. **Task name** (concise, action-oriented)
2. **Description** (1-2 sentences)
3. **Dependencies** (which tasks must complete first)
4. **Estimated effort** (S/M/L - hours/day/days)
5. **Acceptance criteria** (how to verify it's done)

Then provide:
- A suggested implementation order
- Tasks that can be parallelized
- The critical path (longest chain of dependent tasks)
- Potential risks or blockers to flag early`,
        whyItWorks: 'This prompt transforms a vague feature request into an actionable project plan. By requiring dependencies and acceptance criteria, it forces thorough thinking. The critical path analysis helps with realistic timeline planning.',
        platformNotes: {
            claude: 'Claude excels at breaking down complex tasks. The XML structure keeps feature context separate from instructions.',
            chatgpt: 'Works well. Follow up with "now generate Jira tickets for each subtask" for project management integration.',
            gemini: 'Gemini handles decomposition well. For very large features, ask it to first identify "epics" then break those down.'
        },
        tags: ['decomposition', 'planning', 'project-management', 'features'],
        difficulty: 'intermediate',
        frameworks: ['cot', 'brockman']
    },

    {
        id: 'decomp-complex-query',
        title: 'Breaking Down Complex Questions',
        category: 'task-decomposition',
        platforms: ['universal'],
        prompt: `I need to answer a complex question, but first I want to
decompose it into simpler sub-questions.

Complex question: {{QUESTION}}

Step 1: Identify 3-5 sub-questions that, when answered individually,
would provide everything needed to answer the main question.

Step 2: For each sub-question, note:
- What information or data is needed to answer it
- Whether it depends on another sub-question's answer

Step 3: Answer each sub-question in dependency order.

Step 4: Synthesize the sub-answers into a comprehensive
answer to the original complex question.`,
        whyItWorks: 'Complex questions often fail because the AI tries to address everything at once. Decomposition forces sequential reasoning on manageable pieces, improving accuracy on each component. The synthesis step then brings it all together coherently.',
        platformNotes: {
            claude: 'Claude\'s extended thinking naturally decomposes complex queries. This prompt makes that process visible and verifiable.',
            chatgpt: 'GPT-5\'s reasoning models handle decomposition internally, but this prompt helps when using standard models.',
            gemini: 'Gemini benefits from explicit decomposition. It helps prevent the model from skipping important sub-problems.'
        },
        tags: ['decomposition', 'reasoning', 'complex-questions', 'analysis'],
        difficulty: 'beginner',
        frameworks: ['cot']
    },

    {
        id: 'decomp-migration',
        title: 'Database Migration Planning',
        category: 'task-decomposition',
        platforms: ['chatgpt'],
        prompt: `Plan a safe database migration for the following change:

Current state: {{CURRENT_SCHEMA}}
Desired state: {{TARGET_SCHEMA}}
Database: {{DB_TYPE}} with {{DATA_VOLUME}} rows in affected tables
Downtime tolerance: {{DOWNTIME}}

Break this migration into sequential phases:

Phase 1 - Preparation:
What needs to happen before any schema changes?

Phase 2 - Non-breaking changes:
Changes that can be deployed without affecting the running application.

Phase 3 - Application updates:
Code changes needed to work with the new schema.

Phase 4 - Breaking changes:
Schema changes that require the application update to be deployed first.

Phase 5 - Cleanup:
Removing old columns, temporary tables, or backward-compatibility code.

For each phase, include:
- Exact SQL statements or migration commands
- Rollback plan if something goes wrong
- Estimated duration
- Risk level (low/medium/high)`,
        whyItWorks: 'Database migrations are inherently sequential and risky. This prompt enforces a safe ordering (non-breaking first, breaking last) and requires rollback plans at every step, mirroring production best practices.',
        platformNotes: {
            chatgpt: 'GPT generates detailed SQL migration scripts. Specify your ORM if you want framework-specific migration files.',
            claude: 'Claude is excellent at identifying risks in each phase. It will proactively flag data loss scenarios.',
            gemini: 'Works well. Gemini can also estimate migration duration based on the data volume you provide.'
        },
        tags: ['database', 'migration', 'planning', 'sql'],
        difficulty: 'advanced',
        frameworks: ['cot', '3c']
    },

    // ========================================
    // CATEGORY: Agentic Workflows (2 prompts)
    // ========================================

    {
        id: 'agentic-tool-use',
        title: 'Tool Use with Decision Framework',
        category: 'agentic',
        platforms: ['claude'],
        prompt: `You have access to the following tools:
- search(query): Search the web for information
- read_file(path): Read a local file
- write_file(path, content): Write content to a file
- run_command(cmd): Execute a shell command
- ask_user(question): Ask the user for clarification

Guidelines for tool use:
1. Before using any tool, explain WHY you're using it
2. Prefer reading existing files before creating new ones
3. NEVER run destructive commands (rm -rf, DROP TABLE, etc.)
   without first asking the user
4. If a command fails, diagnose before retrying
5. Batch related operations together

Decision framework:
- If uncertain about requirements → ask_user first
- If uncertain about system state → read_file or run_command to check
- If you need external data → search
- If you're confident → proceed and explain your reasoning

Task: {{TASK_DESCRIPTION}}`,
        whyItWorks: 'Agentic prompts need explicit safety boundaries and decision frameworks. Without them, agents may take destructive actions or loop on failures. The "explain WHY" requirement creates an audit trail and reduces erratic tool use.',
        platformNotes: {
            claude: 'Claude Code and the Claude Agent SDK follow tool-use guidelines precisely. The safety constraints prevent common agentic failures.',
            chatgpt: 'GPT with function calling follows similar patterns. Define tools as functions in the API for structured tool use.',
            gemini: 'Gemini supports function calling. Define tools with clear descriptions and parameter schemas for best results.'
        },
        tags: ['agentic', 'tool-use', 'safety', 'automation'],
        difficulty: 'advanced',
        frameworks: ['rfgold', '3c']
    },

    {
        id: 'agentic-autonomy-levels',
        title: 'Autonomy Control for AI Agents',
        category: 'agentic',
        platforms: ['universal'],
        prompt: `You are an AI assistant operating at AUTONOMY LEVEL 2.

Level definitions:
- Level 1 (Observer): Only suggest actions, never execute. Ask permission for everything.
- Level 2 (Guided): Execute safe, reversible actions freely. Ask before any irreversible action.
- Level 3 (Autonomous): Execute all actions freely. Only ask when genuinely ambiguous.

At your current Level 2, you MAY freely:
- Read files and search code
- Run tests and linters
- Create or modify files in the working directory
- Install dev dependencies

At your current Level 2, you MUST ASK before:
- Deleting files or directories
- Running database mutations
- Installing production dependencies
- Pushing code or creating PRs
- Modifying CI/CD configuration

If the user says "go autonomous" → move to Level 3
If the user says "just suggest" → move to Level 1

Task: {{TASK_DESCRIPTION}}`,
        whyItWorks: 'Tiered autonomy gives users predictable control over AI agent behavior. Level 2 is the sweet spot for most development work: productive enough to be useful, but with guardrails for irreversible actions. The level-switching commands make it dynamic.',
        platformNotes: {
            claude: 'Claude respects autonomy levels well. This pattern is used in Claude Code\'s own permission system.',
            chatgpt: 'Works with GPT agents and custom GPTs. Define the autonomy level in the system instructions.',
            gemini: 'Gemini agents can follow tiered permissions. Be explicit about what constitutes "safe" in your context.'
        },
        tags: ['agentic', 'autonomy', 'safety', 'permissions'],
        difficulty: 'advanced',
        frameworks: ['rfgold']
    },

    {
        id: 'agentic-error-recovery',
        title: 'Self-Correcting Agent with Retry Logic',
        category: 'agentic',
        platforms: ['chatgpt'],
        prompt: `You are a coding agent. When executing tasks, follow this
error-handling protocol:

On SUCCESS: Report what was done and move to the next step.

On FAILURE:
1. Read the full error message carefully
2. Categorize the error:
   a) Syntax error → Fix the code and retry (max 2 retries)
   b) Missing dependency → Install it, then retry
   c) Permission error → Ask the user for help
   d) Logic error → Re-analyze the approach before retrying
   e) Unknown error → Show the error to the user with your analysis

On REPEATED FAILURE (same error twice):
- STOP and explain the issue to the user
- Propose 2-3 alternative approaches
- Ask which approach to try

NEVER:
- Retry the exact same action more than twice
- Silently ignore errors
- Make assumptions about why something failed

Task: {{TASK_DESCRIPTION}}`,
        whyItWorks: 'Uncontrolled agents often loop infinitely on errors or silently ignore failures. This prompt creates a structured escalation path: try to self-fix, then stop and ask. The error categorization prevents applying the wrong fix strategy.',
        platformNotes: {
            chatgpt: 'GPT agents benefit greatly from explicit retry limits. Without them, they may attempt the same failing action repeatedly.',
            claude: 'Claude naturally avoids blind retries, but the categorization framework improves its error diagnosis.',
            gemini: 'Gemini agents can follow this pattern. The "NEVER" constraints are important for preventing loops.'
        },
        tags: ['agentic', 'error-handling', 'retry', 'automation'],
        difficulty: 'advanced',
        frameworks: ['rfgold', '3c']
    },

    // ========================================
    // CATEGORY: Output Formatting (3 prompts)
    // ========================================

    {
        id: 'format-verbosity-control',
        title: 'Verbosity Levels for Adjustable Detail',
        category: 'output-formatting',
        platforms: ['universal'],
        prompt: `Explain {{TOPIC}} at verbosity level {{LEVEL}}.

Verbosity levels:
- Level 1 (Tweet): 1-2 sentences. Core idea only.
- Level 2 (Summary): One short paragraph. Key points, no examples.
- Level 3 (Standard): 2-3 paragraphs with one example.
- Level 4 (Detailed): Full explanation with multiple examples,
  edge cases, and common mistakes.
- Level 5 (Expert): Comprehensive deep-dive including internals,
  implementation details, trade-offs, and references.

Current level: {{LEVEL}}`,
        whyItWorks: 'A numbered verbosity scale gives you precise control over response length without vague modifiers like "be concise" or "be detailed." You can iterate by just changing the number, and the AI consistently interprets each level the same way.',
        platformNotes: {
            claude: 'Claude calibrates verbosity levels well. Level 3 is closest to Claude\'s natural response length.',
            chatgpt: 'GPT tends to be verbose by default. Using this scale helps rein it in. Level 2 is especially useful.',
            gemini: 'Gemini responds well to explicit length controls. The numbered system is more reliable than word count limits.'
        },
        tags: ['formatting', 'verbosity', 'length-control', 'adaptable'],
        difficulty: 'beginner',
        frameworks: ['brockman']
    },

    {
        id: 'format-audience-adaptation',
        title: 'Same Content, Different Formats',
        category: 'output-formatting',
        platforms: ['gemini'],
        prompt: `Take the following technical content and produce THREE versions:

Content: {{CONTENT}}

Version 1 - Slack message to the team:
- Casual, concise, under 100 words
- Use bullet points
- Include a TL;DR at the top
- Use appropriate Slack emoji

Version 2 - Email to stakeholders:
- Professional tone
- Lead with the business impact
- Include a clear "Next Steps" section
- Under 200 words

Version 3 - Documentation page:
- Formal, thorough
- Include prerequisites and context
- Use headers, code blocks if relevant
- No word limit

Separate each version with a horizontal rule (---).`,
        whyItWorks: 'Asking for multiple formats in one prompt lets you compare how the same information adapts to different audiences. It also saves time: one prompt produces three usable outputs. The specific constraints per version ensure they are genuinely different, not just rephrased.',
        platformNotes: {
            gemini: 'Gemini handles multi-format output well. The separator instruction keeps outputs clearly delineated.',
            claude: 'Claude excels at tone shifting between versions. Each will feel authentically written for that audience.',
            chatgpt: 'Works well. For longer content, consider generating each version in a separate message to avoid truncation.'
        },
        tags: ['formatting', 'adaptation', 'multi-format', 'communication'],
        difficulty: 'intermediate',
        frameworks: ['reverse']
    },

    {
        id: 'format-progressive-disclosure',
        title: 'Progressive Disclosure Answer Format',
        category: 'output-formatting',
        platforms: ['chatgpt'],
        prompt: `Answer my question using progressive disclosure format:

Question: {{QUESTION}}

Structure your response in these collapsible layers:

**TL;DR** (1 sentence)
The shortest possible correct answer.

**Short Answer** (1 paragraph)
Key points with enough context to be useful.

**Full Explanation** (multiple paragraphs)
Complete answer with examples and nuance.

**Deep Dive** (optional, only if relevant)
Implementation details, edge cases, performance
characteristics, or historical context.

**See Also**
Related topics or follow-up questions worth exploring.

Use markdown headers for each section.`,
        whyItWorks: 'Progressive disclosure lets the reader stop at whatever depth they need. The TL;DR catches quick scanners, the Short Answer serves most readers, and the deeper layers are there for those who want them. It mirrors how good documentation is structured.',
        platformNotes: {
            chatgpt: 'GPT-5 handles this format naturally. The layered structure also works well in ChatGPT\'s collapsible UI.',
            claude: 'Claude structures progressive answers well. It tends to write genuinely different content per layer rather than repeating.',
            gemini: 'Works well with Gemini. The "optional" Deep Dive prevents padding on simple topics.'
        },
        tags: ['formatting', 'progressive-disclosure', 'documentation', 'structure'],
        difficulty: 'beginner',
        frameworks: ['rfgold']
    },

    // ========================================
    // CATEGORY: Multimodal Prompting (2 prompts)
    // ========================================

    {
        id: 'multimodal-ui-review',
        title: 'UI Screenshot Review and Feedback',
        category: 'multimodal',
        platforms: ['gemini'],
        prompt: `[Attach a screenshot of the UI]

Review this user interface screenshot and provide feedback on:

1. **Visual Hierarchy**
   - Is the most important element immediately obvious?
   - Does the eye flow naturally through the content?

2. **Accessibility**
   - Are contrast ratios sufficient for readability?
   - Are interactive elements clearly distinguishable?
   - Is text large enough (minimum 16px body text)?

3. **Consistency**
   - Are spacing, colors, and typography consistent?
   - Do similar elements look and behave the same?

4. **Mobile Readiness**
   - Would this layout work at 375px width?
   - Are touch targets at least 44x44px?

For each issue found, specify:
- Exact location in the screenshot
- What's wrong
- How to fix it
- Priority: P0 (critical) / P1 (important) / P2 (nice to have)`,
        whyItWorks: 'Structured review criteria prevent generic "looks good" feedback. The priority system helps developers know what to fix first. Specific measurements (16px, 44x44px, 375px) turn subjective opinions into objective checks.',
        platformNotes: {
            gemini: 'Gemini has strong visual understanding. It can identify specific UI elements and their spatial relationships accurately.',
            claude: 'Claude analyzes UI screenshots well. It excels at accessibility feedback and identifying inconsistencies.',
            chatgpt: 'GPT-4V and GPT-5 handle UI reviews well. For best results, provide a high-resolution screenshot.'
        },
        tags: ['multimodal', 'ui', 'design-review', 'accessibility'],
        difficulty: 'intermediate',
        frameworks: ['rfgold', '3c']
    },

    {
        id: 'multimodal-diagram-to-code',
        title: 'Architecture Diagram to Implementation',
        category: 'multimodal',
        platforms: ['claude'],
        prompt: `[Attach the architecture diagram image]

Analyze this architecture diagram and:

1. **Describe the architecture** in plain English:
   - What components exist?
   - How do they communicate?
   - What protocols/patterns are used?

2. **Identify the tech stack** suggested by the diagram:
   - Map each component to likely technologies
   - Note any components where the technology choice is ambiguous

3. **Generate implementation scaffolding**:
   - Project directory structure
   - Docker Compose file for local development
   - Key interface/contract definitions between components
   - Configuration files with placeholder values

4. **Flag potential issues**:
   - Single points of failure
   - Missing components (auth, monitoring, etc.)
   - Scalability bottlenecks

Target language: {{LANGUAGE}}
Framework preferences: {{FRAMEWORKS}}`,
        whyItWorks: 'Converting a visual diagram directly to implementation artifacts bridges the gap between design and development. Asking for both description and code ensures the AI correctly interprets the diagram before generating code from it.',
        platformNotes: {
            claude: 'Claude provides excellent diagram-to-code conversion. It accurately identifies relationships between components.',
            gemini: 'Gemini handles architecture diagrams well, especially those created with standard tools like Lucidchart or Draw.io.',
            chatgpt: 'GPT-5 can parse diagrams effectively. For complex diagrams, consider also providing a text description alongside the image.'
        },
        tags: ['multimodal', 'architecture', 'diagram', 'scaffolding'],
        difficulty: 'advanced',
        frameworks: ['reverse', '3c']
    },

    {
        id: 'multimodal-chart-analysis',
        title: 'Data Chart Analysis and Insights',
        category: 'multimodal',
        platforms: ['universal'],
        prompt: `[Attach the chart/graph image]

Analyze this data visualization and provide:

1. **What the chart shows** (1-2 sentences)
   Describe the chart type, axes, and what data is represented.

2. **Key findings** (3-5 bullet points)
   What are the most important patterns, trends, or outliers?

3. **Statistical observations**
   - Overall trend (increasing/decreasing/stable/cyclical)
   - Notable inflection points or anomalies
   - Approximate values for key data points

4. **So what?** (Business implications)
   What should a decision-maker take away from this chart?

5. **Questions this raises**
   What follow-up data would you want to see?

Audience: {{AUDIENCE}}
Be specific about numbers - estimate values from the axes
rather than speaking in vague terms.`,
        whyItWorks: 'The "So what?" section is crucial - it transforms data description into actionable insight. Requiring specific number estimates forces the AI to carefully read the chart axes rather than making vague observations.',
        platformNotes: {
            claude: 'Claude reads charts accurately and provides nuanced business implications. It handles complex multi-series charts well.',
            gemini: 'Gemini excels at chart analysis, especially for standard chart types. It can extract approximate data values from axes.',
            chatgpt: 'GPT-5 handles data visualization analysis well. For precise readings, consider also providing the underlying data.'
        },
        tags: ['multimodal', 'data', 'charts', 'analysis'],
        difficulty: 'beginner',
        frameworks: ['3c', 'rfgold']
    }
];
