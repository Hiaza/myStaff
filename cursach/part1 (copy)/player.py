import pygame
from abc import ABCMeta, abstractmethod, abstractproperty
from enum import Enum

class State(metaclass=ABCMeta):
    def __init__(self,name):
        self.name = name;
        super(State, self).__init__()
    @abstractmethod
    def execute(self,pi):
        pass

class PlayingState(State):
    def __init__(self):
        self.name = "Playing";
    def execute(self,pi):
        if(pi==2):
            return
        if pi==0:
            pygame.mixer.music.play()
        else:
            pygame.mixer.music.unpause()
            

class PauseState(State):
    def __init__(self):
        self.name = "Pause";
    def execute(self,pi):
        pygame.mixer.music.pause()
        print("pause")

class StopState(State):
    def __init__(self):
        self.name = "Stop";
    def execute(self,pi):
        pygame.mixer.music.pause() 


class AllStates(Enum):
        Playing = 1
        Pause = 2
        Stop = 3

class Player:
    def __init__(self):
        self.playing = PlayingState()
        self.pause = PauseState()
        self.stop = StopState()
        self.currState = self.stop;

        self.pi = 0;
    
    def setState(self, newState):
        print(self.currState)
        if(newState==AllStates.Playing and self.currState == self.playing):
            self.pi = 2;
            print("hello")
        elif(newState==AllStates.Playing):
            self.currState = self.playing 
        elif(newState==AllStates.Pause):
            self.currState = self.pause 
            self.pi = 1;
        elif(newState==AllStates.Stop):
            self.currState = self.stop 
            self.pi = 0;
    
    def execute(self):
        self.currState.execute(self.pi); 
        
    def upload(self,filepath):
        pygame.mixer.music.load(filepath);
        self.pi = 0;
        sound_wav = pygame.mixer.Sound(filepath)
        return sound_wav;
    def setPos(self,value):
        pygame.mixer.music.set_pos(value)
    
    