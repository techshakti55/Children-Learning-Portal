# Children Learning Portal Product Plan

Planning baseline v1.0 • 26 October 2026

This Markdown copy follows the original Word planning document. Update both when the agreed scope changes.

## Children Learning Portal

## Product and Development Plan

Prepared for Shakti • Version 1.0 • 26 October 2026

Build a separate learning website where children understand a topic, explore it through a game, practise with useful feedback and revise their mistakes. Start with Class 4 Maths and one complete topic before expanding.

### Planning status

This document records the agreed product direction and proposed implementation plan. The portal is not yet built. No domain, repository, hosting service or ChatGPT Project has been created through this planning task. Brand, domain and final technology choices remain open.

### Agreed starting point

| Decision | Baseline |
| --- | --- |
| Audience | Class 4 children; initially test with the parent and child. |
| Identity | Separate learning brand and domain, distinct from TechNotes. |
| First topic | Number Types, presented as Number Detectives. |
| Language | Simple English; optional Hindi help for explanations. |
| Learning design | Short lessons, visual examples, games, practice and revision. |
| Content management | Admin editor, preview and publish; bulk question paste. |
| First release | One complete topic; three game formats; MCQs; print and OMR. |
| Progress | On-device progress first; parent-managed accounts later. |

### Success means

A child can open the site on a phone, choose a topic, understand an example, complete a game and practice set, see why an answer is wrong, and return to learning. Shakti can update normal lesson content without editing source code.

### Responsibilities

Shakti owns learning priorities, reviews content and chooses the name and domain. The assistant designs and implements the UI, explains backend decisions and works through implementation with Shakti. Completed work must be demonstrated and checked before it is described as live.

## Release scope and future roadmap

| Area | First release | Later |
| --- | --- | --- |
| Learning | Class 4 Maths; Number Types topic | Factors and Multiples, HCF and LCM, Fractions, Squares |
| Lessons | Four short lessons; optional challenge lesson | More topics, classes and subjects |
| Games | Sorting, matching and visual construction | More reusable activity types |
| Practice | 20 lesson questions and 10 mixed revision questions | Larger banks and performance-based revision |
| Feedback | Hints, explanations, retry and mistake review | Cross-device personal learning history |
| Print | Download reviewed notes, worksheets and OMR | Custom worksheet generation |
| OMR | Printable sheet and online A–D answer grid | Photo scanning and automatic bubble recognition |
| Management | Admin login; editor; reorder; import; preview; publish | Multiple teachers and contributor review |
| Student data | Local progress without student registration | Parent-managed accounts and private results |
| Access | Responsive website for mobile and desktop | Offline support and installable PWA |

### Keep outside the first release

Public child profiles, messaging, leaderboards, paid plans, native mobile apps, open-ended AI tutoring, automatic OMR photo checking and multi-school administration are outside the first release.

### Topic expansion order

1. Number Types → 2. Factors and Multiples → 3. HCF and LCM → 4. Fractions → 5. Squares and Number Patterns. Each topic must pass content and usability review before it is published.

### Domain and hosting

Use a separate domain when the name is selected. A separate domain does not require a separate server. Assess the existing EC2 capacity, isolation, backups and operating cost before deciding where to host. Do not alter the live TechNotes stack during initial UI work.

## Learning experience and first topic

Learning flow: Choose a card → Understand → See examples → Try with hints → Play → Practise → Review mistakes → Finish. Children can go back without losing their place.

| Lesson | Learning content | Interaction |
| --- | --- | --- |
| 1  Counting World | Natural and whole numbers; the role of zero | Sort numbers by family; match definitions |
| 2  Pair Up | Even and odd numbers; zero is even | Pair objects; identify leftovers |
| 3  Prime Detectives | Factors; prime and composite numbers | Build rectangles and inspect factor pairs |
| 4  Number Neighbours | Integers, co-prime numbers and twin primes | Number line plus number-pair matching; extra challenge |

### Content package

Prepare 4 short lessons, 2 solved examples per lesson, 5 practice questions per lesson and a 10-question mixed revision. Each question needs one correct answer, plausible distractors, a hint and an explanation. Lesson 4 is optional enrichment and should follow prerequisite understanding of factors.

### Accuracy rules

Natural numbers start at 1 in this portal. Whole numbers include 0. Integers include negative integers, zero and positive integers. Both 0 and 1 are neither prime nor composite. The only even prime is 2. Co-prime numbers need not both be prime. A number may belong to several families: 2 is natural, whole, integer, even and prime.

### How games teach

Sorting must allow overlapping number families when relevant. Pairing games must show the leftover object for an odd number. Factor rectangles must connect rows × columns to multiplication. For integer ordering, provide a labelled number line. On mobile, every drag action needs a tap alternative.

### Feedback and rewards

Explain the reasoning after an answer. Example: “9 is composite because its positive factors are 1, 3 and 9.” Offer a hint and another try. Award badges for completion and thoughtful retries; do not remove stars after mistakes. Timers are optional and off by default. Sound is off by default and motion can be reduced.

### Reuse existing materials carefully

Existing handwritten definitions, the 60-question worksheet and OMR are candidate resources. Review their content and map each question to the right topic before publishing. The existing worksheet spans several topics; the new Number Types bank must not require untaught HCF or LCM methods.

## UI screens and design rules

| Screen | What the child or parent can do |
| --- | --- |
| Home | Continue learning; choose topic cards; see simple progress. |
| Topic overview | See lesson sequence, prerequisites and available print resources. |
| Lesson | Read a short explanation; reveal example steps; use optional Hindi help. |
| Game | Read one instruction, interact, reset, get a hint and retry. |
| Practice | Answer, request a hint and read a reason; move between questions. |
| Results and revision | See completion and correct answers; retry mistakes; resume later. |
| Print corner | Download notes, worksheet, answer key and matching OMR. |
| Online OMR | Choose A–D bubbles; navigate; see unanswered items before submit. |
| Admin | Edit content, reorder cards, import questions, preview and publish. |

### Visual direction

Use a cheerful, calm design: large topic cards, readable dark text, soft backgrounds and limited accent colours. Use small illustrations that explain the topic. Keep navigation consistent and animations short. Avoid busy screens, flashing effects and pop-ups during lessons.

### Responsive and accessible behaviour

Design for phones, tablets and desktop. Use comfortable touch targets, visible keyboard focus, labelled controls and readable text. Never communicate right or wrong by colour alone. Cards, options and lessons must work without hover. Support keyboard and tap alternatives for games.

### Common UI states

Design loading, empty, error, retry, completed, coming-soon and unsaved-change states. Coming-soon cards must not look playable. If content fails to load, keep the child’s current answers where possible and show a clear retry action.

### Easy UI changes for Shakti

Expose topic title, image, icon, a safe colour preset, order and visibility in the admin editor. Share fonts, spacing, buttons and cards through common components. Normal content updates need no code edits. A new page layout or game mechanic still needs development and review.

### Review milestone

First demonstrate Home → Topic → Lesson with realistic sample content. Check it on a phone and desktop before building the remaining screens. Prototype data must be labelled in the review environment; no sample score should appear as a real saved learner result.

## Admin workflow and content structure

Publishing flow: Create draft → Add content → Validate → Preview as a child → Publish. Allow editing a published lesson in a draft without exposing unfinished changes. Permit unpublishing with a warning when a lesson has linked questions or files.

| Record | Main fields |
| --- | --- |
| Class and subject | Stable ID, name, order and visibility |
| Topic | Class, subject, title, slug, summary, icon, image, colour preset, order, status |
| Lesson | Topic, objectives, prerequisites, explanation blocks, examples, optional Hindi help, order |
| Question | Lesson/topic, type, prompt, four options, correct option, hint, explanation, difficulty |
| Activity | Lesson, game type, approved configuration, instructions and learning goal |
| Resource | Topic/lesson, file, title, type, version, answer-key flag and visibility |
| Worksheet | Ordered question IDs and fixed option order; matching answer key and OMR |
| Local progress | Content version, lesson completion, attempts and last position on this device |

### Question import by copy and paste

Provide a documented paste format: Question, A, B, C, D, Correct, Hint, Explanation, Topic and Difficulty. Show a preview before saving. Flag missing answers, duplicate options, unknown topic names and questions without exactly one valid correct option. Import into draft; never publish automatically.

### Content quality controls

Preview mobile layout; check maths accuracy and reading level; confirm that only one MCQ option is correct. Validate activity configurations. Review generated text and images before publishing. Keep essential explanations as editable text, even when handwritten images are offered for printing.

### Print and OMR consistency

Freeze question numbering and option order for each printable worksheet version. Its answer key and OMR must use the same version. The child’s paper OMR is checked manually in release one. Online OMR calculates its own attempt score; it does not infer answers from a photo.

### Ownership and visibility

Only the authorised admin can change or publish content. Public visitors receive published learning content only. Keep teacher answer-key downloads clearly separated from student worksheets. Private child progress, when added, must require authorised access on the server.

## Backend and repository plan

Start with a modular application and one repository. Avoid introducing multiple services before the product needs them. The exact framework, database and hosting choice are technical decisions to record before implementation; they are not finalised by this document.

| Module | Responsibility |
| --- | --- |
| Frontend | Home, cards, lessons, games, practice, print links and admin screens |
| Content backend | Published content reads; draft edits; ordering; preview and publication |
| Practice backend | Validate submissions and calculate results using the relevant question version |
| Admin authentication | Secure admin session and server-side permission checks |
| File handling | Validate uploads, store resources and serve permitted files |
| Persistence | Content, publication versions and admin changes; learner accounts later |

### Progress and privacy

Release one may keep completion and practice history in browser storage without a student account. Explain that this data is device-specific and may disappear if browser data is cleared. Shared devices share that local profile. Do not collect a child’s full name, photo or contact details for basic practice. Later accounts must separate each child’s results and provide parent-controlled access.

### Proposed repository folders

frontend/ — website and UI components
backend/ — application and API modules
content/ — reviewed seed content and import examples
docs/ — plan, decisions, API contract and task status
tests/ — cross-application checks
deployment/ — environment examples and release instructions

### Working in ChatGPT

Use one ChatGPT Project with chats for Main Coordination, UI and Games, Backend and Admin, Learning Content, and Testing and Deployment. Keep the current plan and task status in repository documentation. Record each change with task ID, branch, commit, checks and remaining work; do not rely on separate chats automatically sharing implementation state.

### Delivery and operation

Use a local or isolated review environment first. Store secrets outside source control. Require HTTPS for the hosted site, protect admin routes, validate file types and sizes, and provide database/file backups with a restore procedure. Confirm hosting resources before using an existing server. A successful build is not proof of a successful production deployment.

### Decisions to close before their dependent work

Brand/domain before public launch; technology stack before backend setup; file storage before resource integration; hosting and operating budget before deployment. These choices do not block a UI prototype using sample content.

## Development tasks and review gates

| Task | Deliverable | Completion check |
| --- | --- | --- |
| 01 Scope baseline | This plan and a task tracker | First release and future scope clearly separated |
| 02 First topic content | Four lessons, examples and question bank | Definitions and all answers reviewed |
| 03 Design system | Fonts, colours, cards, controls and states | Readable and usable on mobile and desktop |
| 04 Home page | Topic cards and continue section | Ready and coming-soon cards behave correctly |
| 05 Lessons | Topic overview and lesson flow | Home → topic → lesson demonstration passes |
| 06 Games | Three reusable interaction formats | Tap and keyboard alternatives; accurate feedback |
| 07 Practice | Hints, results, mistakes and retry | Scoring and local resume verified |
| 08 Print and OMR | Resources and online answer grid | Question order, answer key and scoring match |
| 09 Backend | Content APIs and admin authentication | Drafts hidden publicly; unauthorised edits blocked |
| 10 Admin tools | Editor, reorder, import and publish | Shakti publishes a lesson without code changes |
| 11 Integration | Frontend and backend together | Full child and admin journeys checked |
| 12 Release | Hosting, domain and operating guide | HTTPS, deployment health and restore checks |

### Dependencies and review points

Task 02 and Task 03 can progress independently. Build Tasks 04–05 on the design system and reviewed sample content. Review the first UI at Task 05. Review games and practice after Tasks 06–07. Agree the API contract before integrating Tasks 09–10. Task 11 follows integration; Task 12 follows acceptance and hosting decisions.

### Final acceptance checklist

A child can complete a lesson and practice on mobile. Hints and explanations are correct. Games support tap access. Scores, retries and local progress behave as described. Admin can draft, preview and publish without code edits. Unpublished content is not public. Worksheets and OMR match. Content and database backups have a documented restore path.

### Next concrete action

Prepare the Number Types lesson content and the UI design system, then demonstrate Home → Topic → Lesson. No student account or production deployment is needed for that first review. Record later scope changes in a new version of this plan.
