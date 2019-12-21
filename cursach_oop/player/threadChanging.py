from abc import ABCMeta, abstractmethod, abstractproperty
from PyQt5 import QtCore, QtGui, QtWidgets
from threading import Thread
import datetime
from threading import Event
import myGlobals
import time



class ConnectionThread(Thread):
    
    myStopEvent = 0

    def __init__(self,args):
        Thread.__init__(self)
        self.myStopEvent = args

    def run(self):
        while myGlobals.cur_time<myGlobals.durality:
            if(self.myStopEvent.wait(0)):
                print ("ChildThread:Asked to stop")
                break;
            myGlobals.cur_time += 1
            myGlobals.l_curr_time.setText(str(datetime.timedelta(seconds=myGlobals.cur_time)))    
            myGlobals.scroll.setValue(myGlobals.cur_time)
            time.sleep(1)
    
        self.myStopEvent.set()   

class IHandler(metaclass=ABCMeta):
    @abstractmethod
    def setSuccessor(self,successor):
        pass

class AbstractHandler(IHandler):
    def __init__(self):    
        self.aStopEvent = Event()
        self.thread = ConnectionThread(self.aStopEvent)           
        super().__init__()
    def setSuccessor(self,successor):
        self.successor = successor
    def startWorking(self,flag1,flag2):
        pass
    def stopWorking(self,flag1,flag2):
        pass


class ConcreteHandler1(AbstractHandler):
    def startWorking(self,flag1,flag2):
        if not flag1:
            self.thread.start()
            print("11111")
            flag1 = True
            if flag2: return self.successor.stopWorking(flag1,flag2)
            flags=[flag1,flag2]
            return flags

        elif self.successor!= None:
            flags = self.stopWorking(flag1,flag2);
            return self.successor.startWorking(flags[0],flags[1])
        else: raise Exception("All threads are busy")
    def stopWorking(self,flag1,flag2):
            if(flag1):
                self.thread.join(0.01)
                self.aStopEvent.set()   #ask(signal) the child thread to stop
                self.thread.join(0.01)
                flag1 = False;
                self.aStopEvent = Event()
                self.thread = ConnectionThread(self.aStopEvent)
            if flag2: return self.successor.stopWorking(flag1,flag2)
            flags=[flag1,flag2]
            return flags

class ConcreteHandler2(AbstractHandler):
    def startWorking(self,flag1,flag2):        
        print("222222")
        self.thread.start()
        flag2 = True
        flags=[flag1,flag2]
        return flags
    def stopWorking(self,flag1,flag2): 
        if(flag2):
            self.thread.join(0.01)
            self.aStopEvent.set()   #ask(signal) the child thread to stop
            self.thread.join(0.01)
            self.aStopEvent = Event()
            self.thread = ConnectionThread(self.aStopEvent)
            flag2=False
        flags=[flag1,flag2]
        return flags