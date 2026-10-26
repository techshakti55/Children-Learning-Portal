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

A first Home → Topic → Lesson UI is implemented for review on
`feature/03-05-first-ui-milestone`. It uses native JavaScript modules and CSS with
no runtime dependencies. See [frontend run/check commands](frontend/README.md).
Number Types previews the four canonical draft lessons from PR #1 exact reviewed
commit `b0eced932ac8f694a63985478ea63c558eeef6ae`; other topics are Coming soon.
The working name is provisional. Draft publication and real-browser visual review
remain pending; backend, games, accounts, admin and deployment are not implemented.

## Working conventions

Use feature branches and pull requests for implementation. Keep docs/TASKS.md and docs/STATUS.md accurate. Never commit secrets or real child data. This repository is public. See [contributing](CONTRIBUTING.md).
