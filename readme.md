[![CircleCI](https://circleci.com/gh/d3trax/2d-game.svg?style=svg)](https://circleci.com/gh/d3trax/2d-game)

Requirements
---
* NPM Version 5.0.3
* Node Version 8.1.2
* Chrome 58

Start
---
```bash
npm i
npm test
npm start
```

Docker
---

```bash
docker build -t d3trax/2d-game .
docker run --rm -d -p 3000:3000 d3trax/2d-game
```
