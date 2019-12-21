from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from abc import ABCMeta, abstractmethod, abstractproperty
from pydub import AudioSegment
import subprocess
import os
import operator

def get_fileName(x):
    str = "/";
    place = x.rfind(str)
    point = x.rfind(".")
    return x[place+1:point]


class Music:
    def __init__(self,name):
        super().__init__()
        self.name = name
        sound = AudioSegment.from_wav("/home/artem/projects/cursach/part1/music/" + name+".wav")
        self.duration = sound.__len__()

    def getName(self):return self.name
    def getDuration(self):return self.duration


class ISortStrategy(metaclass=ABCMeta):
    @abstractmethod
    def sortList(self,listMusic):
        pass


def sortByAlphabet(music):
    return music.getName()[0]

def sortByDuration(music):
    return music.getDuration()

class SortByNameInOrder(ISortStrategy):
    def __init__(self):
            super().__init__()
    def sortList(self,listMusic):
        listMusic.sort(key=operator.attrgetter('name'));
        return listMusic

class SortByNameInReverseOrder(ISortStrategy):
    def __init__(self):
            super().__init__()
    def sortList(self,listMusic):
        listMusic.sort(key=sortByAlphabet,reverse = True);
        return listMusic


class SortByDurationInOrder(ISortStrategy):
    def __init__(self):
            super().__init__()
    def sortList(self,listMusic):
        listMusic.sort(key=sortByDuration);
        return listMusic


class SortByDurationInReverseOrder(ISortStrategy):
    def __init__(self):
            super().__init__()
    def sortList(self,listMusic):
        listMusic.sort(key=sortByDuration,reverse = True);
        return listMusic

class PlayList:
    def __init__(self):
        super().__init__()
        
    def setSortStrategy(self,strategy: ISortStrategy):
        self.sortStrategy = strategy;

    def getAllElements(self,itemList):
        musicList = list();
        i = 0;
        count = itemList.count()
        while i < count:
            music = Music(str(itemList.takeItem(0).text()))
            musicList.append(music)
            i=i+1
        return musicList
    
    def fillElements(self,itemList,musicList):
        for music in musicList:
            item = QtWidgets.QListWidgetItem(music.getName())
            itemList.addItem(item)

    def sortMusicList(self,itemList):
        musicList = self.getAllElements(itemList);
        musicList = self.sortStrategy.sortList(musicList);
        self.fillElements(itemList,musicList);
        
    def add(self,f,itemList):
        fileName = get_fileName(f);
        i = 0
        flag = True
        while (i<itemList.count()):
            tempItem = itemList.item(i);
            if(str(tempItem.text())==fileName):
                flag = False
                break
            i=i+1

        if flag:
            item = QtWidgets.QListWidgetItem(fileName)
            itemList.addItem(item)
        return flag

    def load(self,itemList):
        directory = 'music'
        files = os.listdir(directory)
        tracks = filter(lambda x: x.endswith('.ogg'), files)
        for track in tracks:
            item = QtWidgets.QListWidgetItem(get_fileName(track))
            itemList.addItem(item)
    
    def delete(self,itemList):
        try: 
            fileName = str(itemList.takeItem(itemList.currentRow()).text())
            command = "rm \"/home/artem/projects/cursach/part1/music/"+ fileName +".wav\""
            subprocess.call(command, shell=True)
            command = "rm \"/home/artem/projects/cursach/part1/music/"+ fileName +".ogg\""
            subprocess.call(command, shell=True)
        except:
            return False
        return True;