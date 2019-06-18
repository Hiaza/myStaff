from pydub import AudioSegment
from abc import ABCMeta, abstractmethod, abstractproperty
import subprocess
from coder import *


def change_path(x,specificEnd):
    str = "/";
    place = x.rfind(str)
    point = x.rfind(".")
    return "music/"+x[place+1:point]+"."+specificEnd

class IMusicFile:
    __metaclass__=ABCMeta

    @abstractmethod
    def convert_to_wav(self):
        pass

class AbstractMusicFile:
    def __init__(self,file):
        self.file = file;
    def convert_to_wav(self):
        return self.file.convert_to_wav();
    
class MP3File(IMusicFile):
    def __init__(self,file_path):
        self.file_path = file_path;
        self.saver = Saver()
    
    def convert_to_wav(self):
        path = change_path(self.file_path,"wav")

        try:
            task = Task(self.file_path,
                        path,
                        AllMusicFormats.MP3)
            
            self.saver.setExecutor(task,AudioSegmentExecutor_toWAV())
            self.saver.executeTask(task)
            
            path_to_ogg = change_path(self.file_path,"ogg")

            task = Task(path,
                        path_to_ogg,
                        AllMusicFormats.WAV)
            
            self.saver.setExecutor(task,TerminalFFMpegExecutor_toOGG())
            self.saver.executeTask(task)
            
            path = path_to_ogg
        except:
            raise Exception("error with converting")
        return path;

assert issubclass(MP3File, IMusicFile)

class WavFile(IMusicFile):
    def __init__(self,file_path):
        self.file_path = file_path;
        self.saver = Saver()
    
    def convert_to_wav(self):
        path = change_path(self.file_path,"wav")
        
        try:
            if(self.file_path != "/home/artem/projects/cursach/part1/"+path):
                task = Task(self.file_path,
                            path,
                            AllMusicFormats.WAV)
                self.saver.setExecutor(task,AudioSegmentExecutor_toWAV())
                self.saver.executeTask(task)
                
            path_to_ogg = change_path(self.file_path,"ogg")

            task = Task(path,
                        path_to_ogg,
                        AllMusicFormats.WAV)
            
            self.saver.setExecutor(task,TerminalFFMpegExecutor_toOGG())
            self.saver.executeTask(task)

            path = path_to_ogg
        except:
            raise Exception("error with converting")
        
        return path;

assert issubclass(WavFile, IMusicFile)

class MP4File(IMusicFile):
    def __init__(self,file_path):
        self.file_path = file_path;
        self.saver = Saver()
    
    def convert_to_wav(self):
        
        path = change_path(self.file_path,"wav")

        try:
            task = Task(self.file_path,
                        path,
                        AllMusicFormats.MP4)
            
            self.saver.setExecutor(task,AudioSegmentExecutor_toWAV())
            self.saver.executeTask(task)
            
            path_to_ogg = change_path(self.file_path,"ogg")

            task = Task(path,
                        path_to_ogg,
                        AllMusicFormats.WAV)
            
            self.saver.setExecutor(task,TerminalFFMpegExecutor_toOGG())
            self.saver.executeTask(task)
            
            path = path_to_ogg
        except:
            raise Exception("error with converting")
        return path;

assert issubclass(MP4File, IMusicFile)


def convertor(file_path):
    point = file_path.rfind(".")
    ending =  file_path[point+1:]
    if(ending == "mp3"):
        return AbstractMusicFile(MP3File(file_path)).convert_to_wav()
    else: 
        if(ending == "wav"):
            return AbstractMusicFile(WavFile(file_path)).convert_to_wav() 
        else: 
            if(ending == "mp4"):
                return AbstractMusicFile(MP4File(file_path)).convert_to_wav()
            else: raise Exception("Unsupported type")


if (__name__== "__main__"): 
    file1 = AbstractMusicFile(MP3File("/home/artem/Downloads/1531214157_09-one-love.mp3"));
    file2 = AbstractMusicFile(WavFile("1531214157_09-one-love.wav"));  
    print(convertor("/home/artem/Downloads/1531214157_09-one-love.mp3"));
    print(convertor("1531214157_09-one-love.wav"));