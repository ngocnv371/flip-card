# poorman-fantasy

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### How to add new words/topics
At the moment, all topics/words are defined statically in `/src/store/index.ts`. For each `word` defined there must be a `/src/assets/words/${name}.svg` and a `/src/assets/pron/${name}.mp3`.

The `svg` graphic for a word can be find and download for free at https://www.flaticon.com/
The pronunciation can be download from https://www.oxfordlearnersdictionaries.com/ with help from a little script from `/tools/Download US Pronounce At Oxford Dict.user.js`. This script is installed in chrome's pluggin Tampermonkey.

