from pydub import AudioSegment
from abc import ABCMeta, abstractmethod, abstractproperty
import soundfile as sf
import subprocess
from enum import Enum

class AllMusicFormats(Enum):
        MP3 = 1
        WAV = 2
        MP4 = 3
        OGG = 4

class Saver:
    def setExecutor(self,task, e):
        task.setExecutor(e);
    def executeTask(self,task):
        task.executeTask();

class Task:
    def __init__(self,fileName_from,fileName_to,musicFormat):
        super().__init__()
        self.executor = None
        self.fileName_from = fileName_from
        self.fileName_to = fileName_to
        self.musicFormat = musicFormat
    def setExecutor(self,e):
        self.executor = e
    def executeTask(self):
        if(self.executor!=None):
            return self.executor.convertFile(self.fileName_from, self.fileName_to, self.musicFormat)
        else: 
            raise Exception("No executor was setted")

class AbstractExecutor(metaclass=ABCMeta):
    @abstractmethod
    def convertFile(self,fileName_from,fileName_to,musicFormat):
        pass

class AudioSegmentExecutor_toWAV(AbstractExecutor):
    def convertFile(self,fileName_from,fileName_to,musicFormat):
        if(musicFormat == AllMusicFormats.MP3):
            try :
                sound = AudioSegment.from_mp3(fileName_from)
                sound.export(fileName_to, format="wav")
            except:
                raise Exception("error with Mp3 to Wav converting")
        elif musicFormat == AllMusicFormats.WAV:
            try :
                sound = AudioSegment.from_file(fileName_from,"wav")
                sound.export(fileName_to, format="wav")
            except:
                raise Exception("error with wav to wav converting")
        elif musicFormat == AllMusicFormats.OGG:
            try :
                sound = AudioSegment.from_file(fileName_from,"ogg")
                sound.export(fileName_to, format="wav")
            except:
                raise Exception("error with ogg to wav converting")
        elif musicFormat == AllMusicFormats.MP4:
            try :
                sound = AudioSegment.from_file(fileName_from,"mp4")
                sound.export(fileName_to, format="wav")
            except:
                raise Exception("error with mp4 to wav converting")
        
        return fileName_to

class TerminalFFMpegExecutor_toOGG(AbstractExecutor):
    def convertFile(self,fileName_from,fileName_to,musicFormat):
        if(musicFormat==AllMusicFormats.WAV):
            try:
                command = "ffmpeg -i \""+fileName_from+"\" -c:a libvorbis  -b:a 128k \"" + fileName_to + "\""
                subprocess.call(command, shell=True)
            except: 
                raise Exception("error with wav to ogg converting")
        else: Exception("convert to Wav firstly")

        return fileName_to
        