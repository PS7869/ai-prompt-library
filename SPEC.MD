# AI Prompt Library - Project Specification

## Overview

A web-based prompt library showcasing best practices from the three major AI platforms: **Claude (Anthropic)**, **Gemini (Google)**, and **ChatGPT (OpenAI)**. The library helps users write better AI prompts by displaying examples, techniques, and platform-specific guidance.

## Research Sources

### Claude (Anthropic)
- [Prompting Best Practices - Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)
- [Interactive Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)

### Gemini (Google)
- [Prompt Design Strategies - Gemini API](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Gemini 3 Prompting Guide](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/start/gemini-3-prompting-guide)
- [Prompting Guide - Gemini](https://www.promptingguide.ai/models/gemini)

### ChatGPT/OpenAI
- [Prompt Engineering Guide - OpenAI](https://platform.openai.com/docs/guides/prompt-engineering)
- [GPT-5 Prompting Guide - OpenAI Cookbook](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide)
- [Prompt Engineering Best Practices - OpenAI Help](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt)

---

## Key Techniques by Platform

### Universal Techniques (All Platforms)
1. **Clear & Specific Instructions** - Be explicit about what you want
2. **Providing Context** - Explain the WHY, not just the WHAT
3. **Few-Shot Examples** - Show input/output pairs
4. **Chain of Thought** - "Think step by step" reasoning
5. **Role Assignment** - "You are a [role]..."
6. **Structured Outputs** - Request JSON, XML, or specific formats
7. **Task Decomposition** - Break complex tasks into steps

### Claude-Specific Techniques
1. **XML Tags** - Use `<tags>` for structured sections (Claude's specialty)
2. **Extended/Adaptive Thinking** - Enable thinking for complex reasoning
3. **Context Awareness** - Claude tracks token budget automatically
4. **Parallel Tool Calling** - Run multiple operations simultaneously
5. **Motivation/Explanation** - Explain WHY instructions matter
6. **Anti-Verbosity Control** - Claude 4.x is more concise by default

### Gemini-Specific Techniques
1. **Multimodal Prompting** - Combine text, images, video, audio natively
2. **Temperature 1.0 Default** - Gemini 3 optimized for default temp
3. **Concise Prompts** - Gemini 3 prefers shorter, direct instructions
4. **Prefix Labels** - Use "Text:", "Answer:" for parsing
5. **Self-Consistency** - Multiple samples with voting for accuracy
6. **32K Context Leverage** - Long-form document analysis

### ChatGPT/OpenAI-Specific Techniques
1. **System Messages** - Foundational role/context setting
2. **Reasoning Effort** - Control depth with parameters
3. **Verbosity Control** - Adjust output length independently
4. **Tool Preambles** - Structure agentic communication
5. **Metaprompting** - Use GPT to optimize its own prompts
6. **Markdown Guidance** - Explicit formatting instructions

---

## Categories

| Category | Description | Platforms |
|----------|-------------|-----------|
| Clear & Specific Instructions | Writing unambiguous prompts | All |
| Providing Context | Background info and motivation | All |
| Few-Shot Examples | Input/output demonstrations | All |
| Chain of Thought Reasoning | Step-by-step thinking | All |
| Structured Outputs | XML, JSON, specific formats | All (XML best for Claude) |
| Role & System Prompts | Persona and behavior setting | All |
| Task Decomposition | Breaking down complex tasks | All |
| Multimodal Prompting | Images, video, audio | Gemini (native), Claude, GPT |
| Agentic Workflows | Tool use, autonomy control | Claude, GPT |
| Output Formatting | Markdown, verbosity, style | All |

---

## Data Structure

```javascript
const prompts = [
  {
    id: "unique-id",
    title: "Prompt Title",
    category: "category-slug",
    platforms: ["claude", "gemini", "chatgpt"], // or ["universal"]
    prompt: `The actual prompt text here...`,
    whyItWorks: "Explanation of the technique",
    platformNotes: {
      claude: "Claude-specific considerations",
      gemini: "Gemini-specific considerations",
      chatgpt: "ChatGPT-specific considerations"
    },
    tags: ["tag1", "tag2"],
    difficulty: "beginner" | "intermediate" | "advanced"
  }
];

const categories = [
  {
    slug: "clear-instructions",
    name: "Clear & Specific Instructions",
    description: "Write unambiguous prompts that leave no room for misinterpretation",
    icon: "📝"
  },
  // ... more categories
];

const platforms = [
  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    color: "#7C3AED", // Purple
    latestModel: "Claude Opus 4.6"
  },
  {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    color: "#4285F4", // Blue
    latestModel: "Gemini 3"
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    color: "#10A37F", // Green
    latestModel: "GPT-5"
  },
  {
    id: "universal",
    name: "Universal",
    company: "All Platforms",
    color: "#6B7280", // Gray
    latestModel: null
  }
];
```

---

## UI Design Specification

### Color Scheme
```css
:root {
  /* Platform Colors */
  --claude-purple: #7C3AED;
  --claude-purple-light: #A78BFA;
  --gemini-blue: #4285F4;
  --gemini-blue-light: #93C5FD;
  --chatgpt-green: #10A37F;
  --chatgpt-green-light: #6EE7B7;
  --universal-gray: #6B7280;

  /* UI Colors */
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-card: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --border-color: #475569;

  /* Accent */
  --accent-gradient: linear-gradient(135deg, #7C3AED, #4285F4, #10A37F);
}
```

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ Logo | Title | GitHub Link                                      │
├─────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                    │
│ "AI Prompt Library" - Best practices from Claude, Gemini & GPT │
├─────────────────────────────────────────────────────────────────┤
│ FILTER BAR                                                      │
│ [Search...] [Claude] [Gemini] [ChatGPT] [Universal] [Category▼]│
├─────────────────────────────────────────────────────────────────┤
│ STATS BAR                                                       │
│ Showing X of Y prompts | Clear Filters                         │
├─────────────────────────────────────────────────────────────────┤
│ PROMPT GRID (Responsive: 1-3 columns)                          │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│ │ Prompt Card │ │ Prompt Card │ │ Prompt Card │                │
│ │             │ │             │ │             │                │
│ │ [Claude]    │ │ [Universal] │ │ [Gemini]    │                │
│ │ [ChatGPT]   │ │             │ │             │                │
│ └─────────────┘ └─────────────┘ └─────────────┘                │
│                                                                 │
│ ... more cards ...                                              │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER                                                          │
│ Sources | Credits | Last Updated                                │
└─────────────────────────────────────────────────────────────────┘
```

### Prompt Card Design
```
┌─────────────────────────────────────────┐
│ [Category Badge]              [Copy 📋] │
├─────────────────────────────────────────┤
│ Prompt Title                            │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Prompt text displayed in a code     │ │
│ │ block with syntax highlighting...   │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 💡 Why It Works                         │
│ Brief explanation of the technique...  │
├─────────────────────────────────────────┤
│ Platform Tags:                          │
│ [🟣 Claude] [🔵 Gemini] [🟢 ChatGPT]   │
├─────────────────────────────────────────┤
│ 📝 Platform Notes (expandable)          │
│ > Claude: ...                           │
│ > Gemini: ...                           │
│ > ChatGPT: ...                          │
└─────────────────────────────────────────┘
```

---

## Features

### Core Features
1. **Prompt Display Cards**
   - Title and category badge
   - Formatted prompt text with copy button
   - Platform compatibility badges
   - "Why it works" explanation
   - Expandable platform-specific notes

2. **Filtering System**
   - Platform filter (multi-select toggles)
   - Category dropdown
   - Keyword search (title, prompt text, tags)
   - "Universal" filter for cross-platform prompts
   - Clear all filters button

3. **Copy Functionality**
   - One-click copy button per card
   - Visual feedback (button changes to ✓)
   - Toast notification

4. **Responsive Design**
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns
   - Collapsible filter bar on mobile

### Enhanced Features
5. **Platform Comparison Mode**
   - Show same technique across platforms
   - Highlight differences in approach

6. **Difficulty Levels**
   - Beginner / Intermediate / Advanced badges
   - Filter by difficulty

7. **Favorites (Local Storage)**
   - Star prompts for quick access
   - Persist across sessions

8. **Dark/Light Mode Toggle**
   - Default: Dark mode
   - User preference saved

---

## File Structure

```
ai-prompt-library/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── app.js              # Application logic
├── data/
│   └── prompts.js      # Prompt data
├── SPEC.MD             # This specification
└── README.md           # Usage documentation
```

---

## Prompt Content Plan (40+ Prompts)

### 1. Clear & Specific Instructions (6 prompts)
- [ ] Basic explicit instruction example (Universal)
- [ ] Specifying output format (Universal)
- [ ] Negative constraints - what NOT to do (Universal)
- [ ] Claude-specific: Being explicit about "above and beyond" behavior
- [ ] Gemini-specific: Direct, concise instructions for Gemini 3
- [ ] GPT-specific: Contradiction-free instruction hierarchies

### 2. Providing Context (5 prompts)
- [ ] Adding motivation/WHY to instructions (Claude specialty)
- [ ] Background context for tasks (Universal)
- [ ] Audience specification (Universal)
- [ ] Domain-specific context (Universal)
- [ ] Text-to-speech context example (Claude)

### 3. Few-Shot Examples (5 prompts)
- [ ] Basic few-shot format (Universal)
- [ ] Structured few-shot with prefixes (Gemini)
- [ ] Few-shot in messages array (ChatGPT)
- [ ] Consistent formatting in examples (Universal)
- [ ] Few-shot for classification (Universal)

### 4. Chain of Thought Reasoning (5 prompts)
- [ ] "Let's think step by step" (Universal)
- [ ] Explicit reasoning request (Universal)
- [ ] Extended thinking guidance (Claude)
- [ ] Self-consistency with CoT (Gemini)
- [ ] Reasoning effort control (ChatGPT)

### 5. Structured Outputs (6 prompts)
- [ ] XML tags for sections (Claude specialty)
- [ ] JSON output request (Universal)
- [ ] Markdown formatting control (Universal)
- [ ] Claude structured outputs feature
- [ ] Gemini prefix-based parsing
- [ ] GPT semantic markdown guidance

### 6. Role & System Prompts (5 prompts)
- [ ] Basic role assignment (Universal)
- [ ] System message setup (ChatGPT)
- [ ] Persona with constraints (Universal)
- [ ] Expert role with domain knowledge (Universal)
- [ ] Model self-identification (Claude)

### 7. Task Decomposition (4 prompts)
- [ ] Breaking down complex tasks (Universal)
- [ ] Multi-step workflow (Universal)
- [ ] Agentic task planning (Claude, GPT)
- [ ] Long-horizon task management (Claude)

### 8. Agentic Workflows (4 prompts)
- [ ] Tool usage patterns (Claude)
- [ ] Reducing/increasing eagerness (GPT)
- [ ] Parallel tool calling (Claude)
- [ ] Autonomy and safety balance (Claude)

### 9. Output Formatting (4 prompts)
- [ ] Controlling verbosity (Universal)
- [ ] Avoiding excessive markdown (Claude)
- [ ] Prose vs bullet points (Universal)
- [ ] LaTeX control (Claude)

### 10. Multimodal Prompting (3 prompts)
- [ ] Image analysis prompt (Gemini, Claude, GPT)
- [ ] Video understanding (Gemini specialty)
- [ ] Chart/document extraction (Universal)

---

## Technical Requirements

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- Initial load < 2 seconds
- Filter updates < 100ms
- No external JS dependencies
- Minimal CSS (< 15KB)
- Inline SVG icons

### Accessibility
- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation
- Focus visible states
- Color contrast 4.5:1 minimum

---

## Development Phases

### Phase 1: Foundation
1. Create HTML structure
2. Implement CSS styling
3. Set up data structure

### Phase 2: Core Features
4. Render prompt cards
5. Implement filtering
6. Add search functionality
7. Copy button with feedback

### Phase 3: Content
8. Add 40+ prompts across categories
9. Write explanations
10. Add platform notes

### Phase 4: Polish
11. Mobile responsive testing
12. Performance optimization
13. Accessibility audit
14. Documentation

---

## Example Prompts Preview

### Example 1: Claude XML Tags
```xml
<task>
Analyze the following customer feedback and extract:
1. Main sentiment (positive/negative/neutral)
2. Key topics mentioned
3. Suggested improvements
</task>

<format>
Respond in JSON with keys: sentiment, topics, improvements
</format>

<feedback>
{{USER_FEEDBACK}}
</feedback>
```
**Platform:** Claude (primary), Universal (works on all)
**Why it works:** XML tags provide clear structure that Claude is specifically trained to recognize and follow.

### Example 2: ChatGPT System Message
```
System: You are an expert code reviewer specializing in Python.
Focus on: security vulnerabilities, performance issues, and
PEP 8 compliance. Be direct and specific in your feedback.
Rate severity as: Critical, Major, Minor, or Suggestion.

User: Review this code: [code]
```
**Platform:** ChatGPT (primary), Universal
**Why it works:** System messages establish persistent behavior and expertise that carries through the conversation.

### Example 3: Gemini Few-Shot with Prefixes
```
Classify the emotion in each text. Output only the emotion label.

Text: I can't believe I won the lottery!
Emotion: joy

Text: The news of the accident devastated the community.
Emotion: sadness

Text: {{USER_INPUT}}
Emotion:
```
**Platform:** Gemini (primary), Universal
**Why it works:** Consistent prefixes and format make parsing reliable. Gemini excels at following structured patterns.

---

## Success Metrics

1. **Content Quality:** 40+ well-researched prompts from official sources
2. **Usability:** Users can find relevant prompts in < 10 seconds
3. **Accuracy:** All platform-specific claims verified against documentation
4. **Performance:** Lighthouse score > 90
5. **Accessibility:** WCAG 2.1 AA compliant

---

*Last Updated: February 2026*
*Version: 1.0*
