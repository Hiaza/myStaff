'use strict';

const fs = require('fs');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const Test_S = new Schema({

  name: { type:String,required:true }, 
  
  questions:[{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question'
  }],
  
  picUrl: String,

  authorID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  
  created: {type:Date, default:Date.now },
  rating: Number,
  subject: { type:String,required:true },
  numOfpeopleWhoPassed: Number,
  numOfQuestions: Number
});

const TestModel = mongoose.model('Test',Test_S);

class Test{

    constructor (name, questions, picUrl, authorID,subject,rating,numOfpeopleWhoPassed,numOfQuestions) {
        this.id = -1;
        this.name = name;
        this.questions = questions;
        this.picUrl = picUrl;
        this.authorID = authorID;
        let today = new Date(Date.now());
        this.created = today.toISOString();
        this.rating = rating;
        this.subject = subject;
        this.numOfpeopleWhoPassed = numOfpeopleWhoPassed;
        this.numOfQuestions = numOfQuestions;
    }

    static getAll(callback){
        return TestModel.find();

    }

    static delete(id){
        return new Promise(function(resolve,reject){     
        TestModel.findById(id)
            .populate('questions')
            .populate('authorID')
            .exec(function(error,test) {
                if(error)throw error;
                else{
                    let promises = [];
                    let i = 0;
                    for(let question of test.questions){
                        i = 0;
                        while(i<question.tests.length){
                            if(question.tests[i].toString()==test._id.toString()) break;
                            i++;
                        } 
                        question.tests.splice(i,1);
                        promises.push(question.save());
                    }
                    
                    i = 0;                    
                    
                    while(i<test.authorID.tests.length){
                        if(test.authorID.tests[i].toString()==test._id.toString()) break;
                        i++;
                    } 
                    test.authorID.tests.splice(i,1);

                    promises.push(test.authorID.save());
                    promises.push(test.remove());
                    
                    Promise.all(promises)
                           .then((x)=>resolve(true))
                           .catch((err)=>reject(err))
                }
            
            }); 
    });
}
    static update(toUpd){
        return new Promise(function(resolve,reject){
            TestModel.findById(toUpd.id)
            .exec(function(error,temp){
                if(error)reject(error);
                else{
                    temp.rating = toUpd.rating;
                    temp.name = toUpd.name;
                    temp.subject = toUpd.subject;
                    if(toUpd.numOfpeopleWhoPassed!=null &&
                        temp.numOfpeopleWhoPassed!=toUpd.numOfpeopleWhoPassed)
                        temp.numOfpeopleWhoPassed = toUpd.numOfpeopleWhoPassed;
                    temp.save()
                        .then((x)=>resolve(temp._id))
                        .catch((err)=>reject(err))
                }
            })
    });
}
    static insert(toSave){
        return new Promise(function(resolve,reject){  
        if(toSave.name!==null ){
            let test = new TestModel(toSave);
            test.save()
                .then(()=>{ 
                    TestModel.findById(test._id)
                         .populate('questions')
                         .populate('authorID')
                         .exec(function(error,test) {
                            let promises = [];
                            if(test.questions instanceof Array){
                                for(let quest of test.questions){
                                    quest.tests.push(test.id);
                                    promises.push(quest.save());
                                }
                            }
                            else {
                                quest.tests.push(test.id);
                                promises.push(quest.save());
                            }
                            test.authorID.tests.push(test.id);
                            promises.push(test.authorID.save())
                            return(Promise.all(promises));                   
                          });
                        })
                .then((x)=>resolve(test))        
                .catch((err)=>{reject(err)})

        }else reject(err);

    });
    }

    static getById(id){
        
        return TestModel.findById(id);
        
    }

}


module.exports = Test;