const urlParams = new URLSearchParams(window.location.search);
let next_Question = 0;

let path = window.location.href;
let stringId;
if(~path.indexOf("?"))stringId = path.substring(path.indexOf("?")-24,path.indexOf("?"));
else stringId = path.slice(path.length-24);

console.log(stringId);

Promise.all([
        fetch("/api/v1/tests/" + stringId).then(x => x.json())
    ])
    .then((itemsData) => {
        let test = itemsData[0].test;
        let questions = test.questions;
        let question = questions[next_Question];
        let answers = [];
        for (let i = 0; i < parseInt(test.numOfQuestions); i++) {
            let quest = {
                id: questions[i],
                value: null
            };
            answers.push(quest)
        }
        document.getElementById('answers').value = JSON.stringify(answers);
        console.log(question);
        return Promise.all([
            fetch("/templates/testQuestion.mst").then(x => x.text()),
            fetch("/api/v1/questions/" + question).then(x => x.json())
        ])
    })

    .then(([templateStr, itemsData]) => {
        let randAnswers = [];
        randAnswers.push(itemsData.fakeAnswer1);
        randAnswers.push(itemsData.fakeAnswer2);
        randAnswers.push(itemsData.fakeAnswer3);
        randAnswers.push(itemsData.fakeAnswer4);
        
        for (let i = randAnswers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [randAnswers[i], randAnswers[j]] = [randAnswers[j], randAnswers[i]];
        }
        
        const dataObject = {
            question: itemsData.question,
            picUrl: itemsData.picUrl,
            answer1: randAnswers[0],
            answer2: randAnswers[1],
            answer3: randAnswers[2],
            answer4: randAnswers[3],
        };
        const renderedHtmlStr = Mustache.render(templateStr, dataObject);
        return {
            renderedHtmlStr,
            itemsData
        };
    })
    .then((result) => {
        let htmlStr = result.renderedHtmlStr;
        let question = result.question;
        const appEl = document.getElementById('testQuestion');
        appEl.innerHTML = htmlStr;
        window.history.replaceState('', '', updateURLParameter(window.location.href, "next_Question", next_Question + 1));
    })
    .catch(err => console.error(err));
