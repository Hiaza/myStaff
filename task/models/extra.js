'use strict';
const express = require('express');
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}


let extra = {
    getSize(pack){
        let counter = 0;
        for(let temp of pack){
            counter++;
        }
        return counter;
    },
    
    getHash(password){
        const serverSalt = "45fd1&%b#$#!T_";
        
                const hash = crypto.createHmac('sha256', serverSalt)
                                .update(password)
                                .digest('hex');
                return {
                    salt: serverSalt,
                    passwordHash: hash
                };
    },

    checkAdmin(req) {
        if (req.user.role !== 1) return; // 'Forbidden'
        else return 1;  // пропускати далі тільки аутентифікованих із роллю 'admin'
    },
    pagination (res,req,nameOfEnteties,data,EntetiesOnPage){
        let curPage = 0;
        let Next =  "visibility: visible";
        let Prev =  "visibility: hidden";
        let show_pages = "visibility: visible";        
        if(req.query.page){
            curPage = parseInt(req.query.page);
            if (curPage != 0){
                Prev = "visibility: visible";
            }
        }        
        let isSearch = false;
        let searchData = [];
        if(req.query.search){
            isSearch = true;
            let counter = 0;
            for(let temp of data){
                if(temp.name!== undefined){
                    if (~temp.name.indexOf(req.query.search)) {
                        searchData[counter] = temp;
                        counter++;
                    }
                }else if(temp.question!== undefined){
                    if (~temp.question.indexOf(req.query.search)) {
                        searchData[counter] = temp;
                        counter++;
                    }
                }
            }
        }
    
        let pageCount;  
        if(isSearch){
            pageCount = this.getSize(searchData);
        }else{
            pageCount = this.getSize(data);     
        }
        
        let err = "";
        if(pageCount == 0 && isSearch){
            err = "Not found";
            show_pages = "visibility: hidden";
        }else if(pageCount == 0){
            err = "Empty list";
            show_pages = "visibility: hidden";
        }
        if(pageCount >=curPage*EntetiesOnPage){
        
                let arr;
                
                    if(pageCount <= (curPage+1)*EntetiesOnPage){
                          
                        if(!isSearch) arr = data.slice(curPage * EntetiesOnPage, pageCount);    
                        else arr = searchData.slice(curPage * EntetiesOnPage, pageCount);  
                        Next = "visibility: hidden";
                      
                    }else{
    
                        if(!isSearch) arr = data.slice(curPage * EntetiesOnPage, (curPage+1)*EntetiesOnPage);                     
                        else arr = searchData.slice(curPage * EntetiesOnPage, (curPage+1)*EntetiesOnPage);
                              
                    }           
                let findField = "";
                let findParam = "";
    
                if(isSearch){
                    findField = req.query.search;
                    findParam = "&search="+findField;
                }
                let pageAmont = parseInt(((pageCount*0.1) /(EntetiesOnPage*0.1))+0.8);
                
                if(pageAmont == 0) pageAmont = 1;

                if(pageAmont == 1){
                    show_pages = "visibility: hidden";
                }
    
                const Data = {
                    "all_items":    arr,
                    "prev":         Prev,
                    "next":         Next,
                    "nextPage":     curPage+1,
                    "prevPage":     curPage-1,
                    "curPage":      curPage+1,
                    "pageCount":    pageAmont,
                    "findField":    findField,
                    "findParam":    findParam,
                    "err":          err,
                    "show_pages":   show_pages,
                    "user":         req.user,
                    "admin":        this.checkAdmin(req)
                };
    
                res.setHeader('Content-Type', 'text/html');
                res.render(nameOfEnteties, Data);
                //res.send("yep");
        }
        else{
            res.status(404).send("Error");  
        }
    }
    
};


module.exports = extra;


//" nodemon ./bin/www --ignore ./data app.js --delay 1500ms"