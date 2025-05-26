export type Slide = {
  title: string
  header?: string
  subtitle?: string
  content?: string
  visual?: string
  speakerNote?: string
  link?: string // Optional link for slides with external navigation
}

const slides: Slide[] = [
  {
    title: "Programming in the Age of Prompts",
    subtitle: "Using Agentic LLMs in VS Code to Accelerate Development",
    content: `
Presented by: Daniel Bryar
Date: 28 May 2025

Welcome! Today we'll explore how programming has evolved and how you can use AI to boost your coding performance. We'll demystify prompt-based development and show how natural language is now a core developer skill.
    `,
    visual: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    speakerNote: "The emphasis of todays is understanding that AI tools empower developers, not replace them.",
  },
  {
    title: "A Brief History of Programming Interfaces",
    header: "From Punch Cards to Prompts",
    visual: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    content: `
**Timeline (1960s → 2020s)**

🟤 1960s - Punch cards: Tedious, error-prone, physical programming.
🟠 1970s - Assembly (machine code): Directly manipulating memory and CPU instructions.
🟡 1980s - Interpreted languages (BASIC, Python): Write code, run instantly, more readable.
🟢 1990s - Compiled/managed (Java, C#): Code is translated and optimized for platforms, is safer.
🔵 2020s - Prompt-based programming: Use natural language to instruct code assistants and agents.
    `,
    speakerNote: "Each step made programming more accessible, transformed machine instruction, and made the previous method obsolete.",
  },
  {
    title: "What is Machine Code?",
    header: "The Foundation: 1s and 0s",
    visual: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=900&q=80",
    content: `
Machine code is the lowest-level programming language, consisting of binary instructions executed directly by the CPU.

Example:
\`10111000 01100001\` (Move value 97 into register)

Writing in machine code is extremely difficult and error-prone, which is why higher-level languages were invented.
    `,
    speakerNote: "Early programming was really hard. Most developers today never see raw machine code.",
  },
  {
    title: "Assembly Language",
    header: "A Small Step Up",
    visual: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80",
    content: `
Assembly language uses mnemonics to represent machine instructions, making code slightly more readable.

Example:
\`MOV AL, 61h\` (Move value 97 into register AL)

Still requires detailed hardware knowledge and is not portable across systems.
    `,
    speakerNote: "See how assembly improved on machine code, but was still very technical and hardware-specific.",
  },
  {
    title: "Interpreted Languages",
    header: "Readability and Speed",
    visual: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=900&q=80",
    content: `
Interpreted languages like BASIC and Python let you write code that's easy to read and run instantly.

Example (Python):
\`\`\`python
print("Hello, world!")
\`\`\`
This made programming accessible to many more people.
    `,
    speakerNote: "Massive leap in accessibility and productivity. No need to manage memory or hardware directly.",
  },
  {
    title: "Compiled & Managed Languages",
    header: "Performance and Safety",
    visual: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
    content: `
Compiled languages (C, C++) and managed languages (Java, C#) translate code into efficient machine instructions.

- Faster execution
- Type safety and error checking
- Large ecosystems and tooling

Example (Java):
\`\`\`java
System.out.println("Hello, world!");
\`\`\`
    `,
    speakerNote: "Compilers and managed runtimes improved reliability and performance.",
  },
  {
    title: "Prompt-Based Programming",
    header: "The Natural Language Revolution",
    visual: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    content: `
Now, we can use natural language to instruct AI tools and agents.

- Write prompts instead of code for many tasks
- Automate repetitive work
- Focus on higher-level problem solving
Example:
\`Refactor this function to use async/await and add error handling.\`
    `,
    speakerNote: "Prompt-based tools let developers work at a higher level of abstraction.",
  },
  {
    title: "AI Tools Won't Replace You",
    header: "You're Not Competing with AI—You're Augmenting With It",
    visual: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    content: `
> “AI won't replace developers.<br><br> Developers who use AI will replace those who don't.”
AI is a tool to boost your productivity, not a threat to your job.
    `,
    speakerNote: "Quote me on this. Compare to the adoption of IDEs, version control, or Stack Overflow.",
  },
  {
    title: "3 Levels of LLM Usage in Dev Work",
    header: "From Prompts to Agents",
    visual: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
    content: `
| Level      | What It Is                       | Example Use                   |
|------------|----------------------------------|-------------------------------|
| One-shot   | Single prompt, one reply         | “Define a TypeScript Interface from this JSON" |
| Chat-based | Stateful, back-and-forth context | “Help me write a Bash script to launch a Docker container” |
| Agentic    | Goal-directed, uses tools/files  | “Fix all input param mismatches for the modified methods in this Class” |

Agentic LLMs can plan, use tools, and work across files—true automation.
    `,
    speakerNote: "Understand the difference between simple prompting and agentic workflows.",
  },
  {
    title: "LLM Tools in VS Code",
    header: "What's In Your Toolkit?",
    visual: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=900&q=80",
    content: `
🤖 Claude or ChatGPT (copy/paste)
🦾 GitHub Copilot (code completions, test / fix / explain)
💬 Copilot Chat (contextual feedback)
🛠️ Roo Code (generative evaluating agentic loops)
📦 Model variety: OpenAI, Claude, Mistral, Gemini, etc.
🐋 Parameter/Model depth: 7B, 14B, 30B, 70B, 300B, etc.

Each tool serves different needs—exploration, debugging, rewriting, or full transformation.
Each has strengths and weaknesses.
    `,
    speakerNote: "Experiment with different tools. Each has strengths/weaknesses, speed/accuracy.",
  },
  {
    title: "Best Practices for Prompting",
    header: "How to Get the Most from LLMs",
    visual: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80",
    content: `
- Be specific: Clear, detailed prompts yield better results.
- Give examples: Show the LLM what you want. Link files or add code snippets.
- Use markdown: Not just for formatting, but to structure complex prompts.
- Iterate: Refine prompts based on output.
- Use LLMs for education, review, refactoring, and documentation.
Prompting is a skill—practice improves results!
    `,
    speakerNote: "Share within your team. Offer actionable advice for using LLMs effectively.",
  },
  {
    title: "Maintaining Knowledge in the Codebase",
    header: "Document for Humans and Machines",
    visual: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=900&q=80",
    content: `
- Store design decisions in the repo (Architecture, tech stack, design patterns)
- Keep API descriptions up to date (OpenAPI-swagger, code comments)
- Use searchable, machine-readable formats (Always prefer Markdown)
- Document everything your agent might need to see
Good documentation helps both your team and your AI tools.
Example strategy → https://github.com/dbryar/rooles
    `,
    speakerNote: "Documentation is of such importantance for both human and AI collaborators.",
  },
  {
    title: "Live Demo: Roo Code in Action",
    header: "Building Features with Agentic LLMs",
    visual: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80",
    content: `
**Demo Steps:**
1. Launch the Todo app in a browser tab.
   - Add a few tasks to showcase its current functionality.
2. Switch to VS Code and input the following prompt into Roo Code:
   - "read all the files in @/src/example and understand the todo app. Add a priority dropdown to tasks with options: High, Medium, Low. Save the priority in the task model and update the test to include this new feature"
3. Refresh the Todo app to see the new feature in action.
   - Verify the priority dropdown works as expected.
**Goal:** Highlight how Roo Code simplifies feature development through natural language prompts.
    `,
    speakerNote: `Notice how it discovered references, refactored usage, and respected your code style.
    No need to touch a single file.`,
    link: "/example", // Link to the Todo app route
  },
  {
    title: "Model Context Protocol (MCP)",
    header: "Model Context Protocol: Agents Need to Know What They Can Use",
    visual: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80",
    content: `
**Diagram:** LLM ↔ MCP ↔ Tools/APIs/Docs

**Key Points:**
- MCP = A way to declare tools, data, or sources an agent can access.
- Without it, agents can't discover APIs, doc stores, or custom workflows.
- Soon, APIs must support MCP or they'll be ignored by agents.
- Enables querying across Confluence, GitHub, OpenAPI, S3, etc.
    `,
    speakerNote: "MCP is becoming the glue between LLM agents and everything we know. It's metadata that makes tools discoverable and usable.",
  },
  {
    title: "Final Takeaways",
    header: "Prompting is Programming",
    visual: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
    content: `
- LLMs are not autocomplete — they are agents in training.
- Start by replacing low-value tasks (boilerplate, rename/refactor).
- Use Roo Code to experience real-world workflows.
- Document everything your agent might need to see.
- MCP is the future of discoverability.
Prompt fluency and tooling awareness are modern dev skills. **Let's lead, not lag**.
    `,
    speakerNote: "Our whole team needs to embrace prompt-based workflows and keep learning.",
  },
  {
    title: "Q&A",
    header: "Questions, Concerns, Ideas?",
    visual: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    content: `
Thanks for attending and/or watching my latest Ted Talk.

Like 👍 and subscribe ✅ if you found this useful or want to see more cool ways to spend less time at work, working.
    `,
  },
]

export default slides
