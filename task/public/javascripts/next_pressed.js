

if (document.getElementById('next_Q')) {
    document.getElementById('next_Q').onclick = nextQuestion;
}

function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function calculateScore(answers,testId){
    let trueAnswersJson = await fetch("/api/v1/tests/answers/"+testId);
    
    console.log(trueAnswersJson);
    let trueAnswers = await trueAnswersJson.json();
    console.log(trueAnswers);
    let mark = 0;
    let maxMark = 0;
    for(let i = 0; i < trueAnswers.length; i++){
        if(answers[i].id == trueAnswers[i].id
            && answers[i].value == trueAnswers[i].value){
                mark += trueAnswers[i].points;
            }
            maxMark += trueAnswers[i].points;
    }
    return {mark,maxMark};
};

async function nextQuestion() {
    try{
        const urlParams = new URLSearchParams(window.location.search);
        let next_Question = urlParams.get('next_Question');
        if (next_Question == null) next_Question = 1;
        
        next_Question = parseInt(next_Question);
        
        let path = window.location.href;
        let stringId = path.substring(path.indexOf("?")-24,path.indexOf("?"));
        console.log(stringId);
        let answers = JSON.parse(document.getElementById("answers").value);
        let testJson = await fetch("/api/v1/tests/" + stringId);
        let test = await testJson.json();
        test = test.test;
        let questions = test.questions;
        
        let form = document.getElementById("test");
        answers[next_Question - 1].value = form.elements["test"].value;
        let answersJSON = JSON.stringify(answers)
        document.getElementById('answers').value = answersJSON;
        let status;
        let templateStr;
        let dataObject;
        
            if (next_Question > test.numOfQuestions - 1) {
                const appEl = document.getElementById('testQuestion');
                appEl.innerHTML = answersJSON;
                document.getElementById('next_Q').style.visibility = 'hidden';
                document.getElementById('stop').innerText = "Back to Tests";
                
                status = false;
                templateStr = await fetch("/templates/finished_test.mst");
                console.log(1);
                marks = await calculateScore(answers,test._id);
                
                let user = await fetch("/api/v1/users/"+test.authorID);
                user = await user.json();
                console.log(1);
                dataObject = {
                    mark: marks.mark,
                    maxMark: marks.maxMark,
                    authorName: user.login,
                    authorLink: "/users/"+user._id,
                }
                let userId = document.getElementById('userId').value;
                let sendResults = await fetch("/api/v1/testFinished?id="+test._id+"&user="+userId+"&mark="+marks.mark+"&maxMark="+marks.maxMark);
                sendResults = await sendResults.json();
                
                if(sendResults.status) console.log("sended")
                else console.log("error with sending")
            }

            else{
                let questionJson = await fetch("/api/v1/questions/" + questions[next_Question]);
                let question = await questionJson.json();
                console.log(question);
                status = true;
                templateStr = await fetch("/templates/testQuestion.mst");   
                let randAnswers = [];
                randAnswers.push(question.fakeAnswer1);
                randAnswers.push(question.fakeAnswer2);
                randAnswers.push(question.fakeAnswer3);
                randAnswers.push(question.fakeAnswer4);
                shuffleArray(randAnswers);

                dataObject = {
                    question: question.question,
                    picUrl: question.picUrl,
                    answer1: randAnswers[0],
                    answer2: randAnswers[1],
                    answer3: randAnswers[2],
                    answer4: randAnswers[3]
                } 
            }
                
                templateStr = await templateStr.text();
                const renderedHtmlStr = await Mustache.render(templateStr, dataObject);
                const appEl = document.getElementById('testQuestion');
                appEl.innerHTML = renderedHtmlStr;
                window.history.replaceState('', '', updateURLParameter(window.location.href, "next_Question", next_Question + 1));
    }    
    catch (err){console.log(err);};
};
