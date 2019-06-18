'use strict';

const fs = require('fs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Result_S = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },  
    authorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    testId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Test'
    },
    passed: {type:Date, default:Date.now },
    mark: Number,
    maxMark: Number,  
});

const ResultModel = mongoose.model('Result',Result_S);

class Result{

    constructor (object) {
        this.userId      = object.userId;
        this.authorId    = object.authorId;
        this.testId      = object.testId;
        this.mark        = object.mark;        
        this.maxMark     = object.maxMark;        
    }
    
    static getAll(){
        return ResultModel.find();        
    }

    static insert(toSave){    
        let tempRes = new ResultModel(toSave);
        return tempRes.save();                 
    }

    static getByUserId(UserId){
        return new Promise(function(resolve,reject){
            ResultModel.
            find().
            where('userId').equals(UserId).
            exec(function(error,results) {
                if(error) reject(err);
                else{
                    resolve(results);
                }
            }); 
        });
    }

    static getByAuthorId(AuthorId){
        return new Promise(function(resolve,reject){
            ResultModel.
            find().
            where('authorId').equals(AuthorId).
            exec(function(error,results) {
                if(error) reject(err);
                else{
                    resolve(results);
                }
            });
        })
    }

    static getByTestId(TestId){
        return new Promise(function(resolve,reject){ResultModel.
            find().
            where('testId').equals(TestId).
            exec(function(error,results) {
                if(error) reject(err);
                else{
                    resolve(results);
                }
            });
        })
    }

}

module.exports = Result;
