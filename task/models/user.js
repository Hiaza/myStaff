'use strict';
const fs = require('fs');
const mongoose = require('mongoose');
const extra = require('../models/extra');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;






/*
const crypto = require('crypto');

const serverSalt = "45%sAlT_";

function sha512(password, salt){
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};
*/
const User_S = new Schema({
    login: {type:String,required:true},
    password:{type:String},
    role: {type:Number,required:true},
    fullname: {type:String,required:true},
    registeredAt: {type:Date, default:Date.now },
    avaUrl: String,
    isDisabled: Boolean,
    bio: String,
    dateOfBirth: {type:Date, default:Date.now },
    tests: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Test'}],
    telegramLogin: String,
    chatId: Number
  });
  
  const UserModel = mongoose.model('User',User_S);

class User{
    constructor (login, password, role, fullname, avaUrl, isDisabled,bio,dateOfBirth) {
        this.login = login;
        this.password = password;
        this.role = role;
        this.fullname = fullname;
        this.registeredAt = Date.now();
        this.avaUrl = avaUrl;
        this.isDisabled = isDisabled;
        this.bio = bio;
        this.dateOfBirth = Date.now();
    }

    static getAll(){
       /* let user = new User("SimpleUser",1,"I am simple user","../images/images.jpeg",false,"Detract yet delight written farther his general. If in so bred at dare rose lose good. Feel and make two real miss useeasy. Celebrated delightful an especially increasing instrument am. Indulgence contrasted sufficient to unpleasantin in insensible favourable. Latter remark hunted enough vulgar say man. Sitting hearted on it without me. In no impressionassistance contrasted. Manners she wishing justice hastily new anxious. At discovery discourse departure objection we. Few extensive add delighted tolerably sincerity her. Law ought him least enjoy decay one quick court. Expect warmlyits tended garden him esteem had remove off. Effects dearest staying now sixteen nor improve. Received the likewiselaw graceful his. Nor might set along charm now equal green. Pleased yet equally correct colonel not one. Say anxiouscarried compact conduct sex general nay certain. Mrs for recommend exquisite household eagerness preserved now. Myimproved honoured he am ecstatic quitting greatest formerly.","31/12/2000");
        let userToBase = new UserModel(user);
        userToBase.save().then().catch();*/
        return UserModel.find();
    }

    static getByLogAndPass(username,password){
        return new Promise(function(resolve,reject){  
            UserModel.findOne({ 'login': username}, function(err,obj) {
                if(err) reject(err);
                else {
                    let pass = extra.getHash(password).passwordHash;
                    if(obj!=null && obj.password === pass) resolve(obj);
                    else reject(new Error("Incorrect login or password"));}
            });
        });
    }


    static getAndRegisterByTName(tname,chatId){
        return new Promise(function(resolve,reject){ 
            
            UserModel.findOne({ 'telegramLogin': tname}, function(err,obj) {
                if(err){
                    reject(err);
                }else {
                    if(obj == null) resolve(obj);
                    else{
                        obj.chatId = chatId;
                        obj.save()
                            .then((x)=>resolve(obj))
                            .catch((err)=>reject(err));
                    }
                }
            });
        });
    }

    static isConnectedWithTelegram(username,chatId){
        return new Promise(function(resolve,reject){ 
            
            UserModel.findOne({ 'telegramLogin': username}, function(err,obj) {
                if(err){
                    reject(err);
                }else {
                    if(obj == null) resolve({connected:false,found:false});
                    else{
                        if(obj.chatId!=null && obj.chatId == chatId) resolve({connected:true,found:true});
                        else resolve({connected:false,found:true});
                    }
                }
            });
        });
    }

    static getByTelegramName(username,chatId){
        return new Promise(function(resolve,reject){ 
            
            UserModel.findOne({ 'telegramLogin': username}, function(err,obj) {
                if(err){
                    reject(err);
                }else {
                    resolve(obj);
                }
            });
        });
    }

    static checkLogin(login){
        return new Promise(function(resolve,reject){ 
            
            UserModel.findOne({ 'login': login}, function(err,obj) {
                if(err||obj==null){
                    resolve(1);
                }else reject("errr");
            });
        });
    }
 
    static getById(id){
        return UserModel.findById(id);
    }

    static insert(toSave){    
        let tempQuest = new UserModel(toSave);
        return tempQuest.save();                 
    }
    static findOrCreate(username){
        username = username.substring(0,username.indexOf('@'));
        return new Promise(function(resolve,reject){  
            UserModel.findOne({ 'login': username}, function(err,obj) {
                if(err) reject(err);
                else {
                    if(obj==null){
                        let temp = {
                            login: username,
                            role: 0,
                            fullname: "Name" + " " + "Surname",
                            avaUrl: "/images/unavailablePhoto.png",
                            isDisabled: false,
                            bio: "^-^",
                            tests: []
                        }
                        let tempUser = new UserModel(temp);
                        return tempUser.save()
                                        .then((x)=>resolve(tempUser))
                                        .catch((err)=>reject(err)); 
                    }else resolve(obj);
                }
            });
        });
    }

    static update(toUpd){
        return new Promise(function(resolve,reject){
            UserModel.findById(toUpd.id)
            .exec(function(error,temp){
                if(error)reject(error);
                else{
                    if(toUpd.fullname!=null) temp.fullname = toUpd.fullname;
                    if(toUpd.bio!=null) temp.bio = toUpd.bio;
                    if(toUpd.avaUrl!=null) temp.avaUrl = toUpd.avaUrl;
                    if(toUpd.dateOfBirth!=null)temp.dateOfBirth = toUpd.dateOfBirth;
                    temp.role = toUpd.role;
                    if(temp.telegramLogin != toUpd.telegramLogin){
                        temp.telegramLogin = toUpd.telegramLogin;
                        temp.chatId = null;  
                    }
                    temp.save()
                        .then((x)=>resolve(temp._id))
                        .catch((err)=>reject(err))
                }
            })
    });}

    static disable(id){
        return new Promise(function(resolve,reject){     
            UserModel.findById(id)
                    .exec(function(error,user) {
                        if(error)reject(error);
                        else{
                            user.isDisabled=!user.isDisabled;
                            user.save()
                            .then((x)=>resolve(user._id))
                            .catch((err)=>reject(err))
                    
                        } 
                });
        });
    }
};

//module.exports = User;
module.exports = User;


/*
function User(name){
    this.name = name;
    this.printName = function(){
        console.log(this.name);
    }
}
*/
//const artem = new User("artem");
//artem.printName();