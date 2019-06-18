'use strict';

const fs = require('fs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Question_S = new Schema({
  type: {type:Number,required:true},
  question: {type:String,required:true},
  picUrl: String,
  authorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  created: {type:Date, default:Date.now },
  rating: Number,
  points: Number,
  trueAnswer: String,
  fakeAnswer1: String,
  fakeAnswer2: String,
  fakeAnswer3: String,
  fakeAnswer4: String,
  tests: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Test'}],  
});

const QuestionModel = mongoose.model('Question',Question_S);

class Question{

    constructor (object) {
        let today = new Date(Date.now());
        
        this.id          = -1;
        this.type        = object.type;
        this.question    = object.question;
        this.picUrl      = object.picUrl;
        this.authorId    = object.authorId;        
        
        this.created     = today.toISOString();
        this.rating      = object.rating;
        this.points      = object.points;
        this.trueAnswer  = object.trueAnswer;

        this.fakeAnswer1 = object.fakeAnswer1;

        if(object.type !== 4){
            this.fakeAnswer2 = object.fakeAnswer2;
            this.fakeAnswer3 = object.fakeAnswer3;
            this.fakeAnswer4 = object.trueAnswer;
            if(object.type !== 1){
                this.fakeAnswer5 = object.fakeAnswer5;
                this.fakeAnswer6 = object.fakeAnswer6;    
            }
        }

    }
    
    static getAll(){
        return QuestionModel.find();        
    }
    
    static delete(id){
        return new Promise(function(resolve,reject){     
            QuestionModel.findById(id)
                    .populate('tests')
                    .exec(function(error,question) {
                        if(error)reject(error);
                        else{
                            let promises = [];
                            let count = 0;
                            for(let test of question.tests){
                                let i = 0;
                                while(i<test.questions.length){
                                    if(test.questions[i].toString()==question._id.toString()) break;
                                    i++;
                                } 
                                test.questions.splice(i,1);
                                test.numOfQuestions--;
                                promises.push(test.save());
                                count++;
                            }

                            promises.push(question.remove());
                            
                            Promise.all(promises)
                                   .then((x)=>resolve(true))
                                   .catch((err)=>reject(err))

                        } 
                    });
    });
}
    static update(toUpd){
        return new Promise(function(resolve,reject){
            QuestionModel.findById(toUpd.id)
            .exec(function(error,temp){
                if(error)reject(error);
                else{
                    temp.question = toUpd.question;
                    temp.points = toUpd.points;
                    temp.trueAnswer = toUpd.trueAnswer;
                    temp.fakeAnswer1 = toUpd.fakeAnswer1;
                    temp.fakeAnswer2 = toUpd.fakeAnswer2;
                    temp.fakeAnswer3 = toUpd.fakeAnswer3;
                    temp.fakeAnswer4 = toUpd.trueAnswer;
                    temp.save()
                        .then((x)=>resolve(temp._id))
                        .catch((err)=>reject(err))
                }
            })
    });
}

    static insert(toSave){    
        let tempQuest = new QuestionModel(toSave);
        return tempQuest.save();                 
    }
    static getById(id){
        return QuestionModel.findById(id);
    }

}

module.exports = Question;
