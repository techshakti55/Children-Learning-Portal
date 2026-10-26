# Children Learning Portal

A separate learning website for Class 4 Maths: understand, explore, practise and revise.

## Start here

- [Product plan](docs/planning/PRODUCT_PLAN.md)
- [Original planning document](docs/planning/Children_Learning_Portal_Planning_Document.docx)
- [Task tracker](docs/TASKS.md)
- [Project status](docs/STATUS.md)
- [Technical decisions](docs/architecture/DECISIONS.md)
- [First topic brief](content/class-4/maths/number-types/README.md)

## Repository structure

| Folder | Purpose |
| --- | --- |
| frontend/ | Child-facing UI, reusable games and admin screens |
| backend/ | Content APIs, admin access and scoring |
| content/ | Reviewed lessons, questions and import examples |
| docs/ | Planning, decisions, API contracts and progress |
| tests/ | Cross-application acceptance checks |
| deployment/ | Environment and release instructions |

## Current state

Planning and repository scaffold only. There is no runnable app, selected framework, database, deployment or student account system yet. No install/build commands are available until the stack is selected.

First milestone: reviewed Number Types content and a Home → Topic → Lesson UI demonstration. Everyday content updates will use the admin editor in the completed application; that editor is not implemented yet.

## Working conventions

Use feature branches and pull requests for implementation. Keep docs/TASKS.md and docs/STATUS.md accurate. Never commit secrets or real child data. This repository is public. See [contributing](CONTRIBUTING.md).
