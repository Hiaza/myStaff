import sys  # sys нужен для передачи argv в QApplication
from PyQt5 import QtWidgets
import design
import pygame
import datetime
import time
import myGlobals

from enum import Enum
from pydub import AudioSegment
from converter import *
from player import *
from playList import *
from checkKey import *
from threadChanging import *
from music import *
from coder import *
class ChoosedStatus(Enum):
        Non = 1
        Cut = 2
        Hide = 3
        Concat = 4
        Cut_Begin = 5
        Cut_End = 6
        Hide_Begin = 7
        Hide_End = 8


def setTime(t):
    myGlobals.cur_time = t
    myGlobals.l_curr_time.setText(str(datetime.timedelta(seconds=myGlobals.cur_time)))   

class ExampleApp(QtWidgets.QMainWindow, design.Ui_MainWindow):
    def __init__(self):
        

        super().__init__()
        self.setupUi(self)
       
        myGlobals.l_curr_time = self.timeEdit_2
       
        self.chain = ConcreteHandler1()
        more = ConcreteHandler2()
        self.chain.setSuccessor(more)
        
        self.init_main()
        self.sound_wav = None
        self.music_player = Player()
        self.playlist = PlayList()
        self.playlist.load(self.listWidget);
        self.listWidget.setCurrentRow(0);
        self.init_player()
        self.init_AllowedUsers()
        self.choosed_ability = ChoosedStatus.Non
        self.choosed_property = ChoosedStatus.Non
        self.currentMusicFile = None
        self.currentMusicFile_copy = None
        self.pushButton_14.setEnabled(False)
        self.pushButton_15.setEnabled(False)
        self.prototype = Prototype()
        self.saver = Saver()
    

    def init_main(self):
        pygame.mixer.init()
        self.horizontalSlider.valueChanged[int].connect(self.onValueChanged)
        self.tabWidget.currentChanged.connect(self.onTab2Clicked)
        self.frame.hide();
        self.frame_2.hide();
        self.frame_3.hide();
        self.radioButton.toggled.connect(self.radio1_clicked)
        self.radioButton_2.toggled.connect(self.radio2_clicked)
        self.radioButton_3.toggled.connect(self.radio3_clicked)
        self.radioButton_4.toggled.connect(self.radio5_clicked)
        self.radioButton_5.toggled.connect(self.radio4_clicked)
        self.radioButton_6.toggled.connect(self.radio6_clicked)
        self.radioButton_7.toggled.connect(self.radio7_clicked)
        self.pushButton.setEnabled(False)
        self.pushButton_2.setEnabled(False)
        self.pushButton_3.setEnabled(False)
        self.pushButton_10.clicked.connect(self.onCutClicked);
        self.pushButton_11.clicked.connect(self.onHideClicked);
        self.pushButton_12.clicked.connect(self.onConcatClicked);
        self.pushButton_13.clicked.connect(self.onChooseSongToConcatClicked);
        self.pushButton_14.clicked.connect(self.onSave);
        self.pushButton_15.clicked.connect(self.onDiscard);
    
    def init_player(self):
        
        self.pushButton.clicked.connect(self.onPlayButton);
        self.pushButton_2.clicked.connect(self.onPauseButton);
        self.pushButton_3.clicked.connect(self.onStopButton);
        self.pushButton_4.clicked.connect(self.openFile);
        self.pushButton_5.clicked.connect(self.onPlayClicked);
        self.listWidget.itemDoubleClicked.connect(self.onPlayClicked);
        self.pushButton_6.clicked.connect(self.onDeleteClicked);
        self.pushButton_7.clicked.connect(self.onSortByNameInOrderClicked);
        self.pushButton_8.clicked.connect(self.onSortByNameInReverseOrderClicked);
        self.pushButton_9.clicked.connect(self.onSortByDurationClicked);
        
    def init_AllowedUsers(self):
        user1 = AuthorizationData()
        user1.setLogin("Artem")
        user1.setKey("Artem100")
        user2 = AuthorizationData()
        user2.setLogin("Ann")
        user2.setKey("Ann10000")
        allowedUsers = [user1,user2]
        self.fullVersionIsOpened = False
        self.check_FullVersion = Check_FullVersion(allowedUsers)

    def onPlayButton(self):

        self.music_player.setState(AllStates.Playing)
        self.music_player.execute();
        self.pushButton_2.setEnabled(True)
        self.pushButton_3.setEnabled(True)

        if myGlobals.cur_time!=myGlobals.durality: 
            flags = self.chain.startWorking(myGlobals.thread1,myGlobals.thread2)
            myGlobals.thread1 = flags[0]
            myGlobals.thread2 = flags[1]
        else:
            myGlobals.cur_time = 0;
            self.timeEdit_2.setText(str(datetime.timedelta(seconds=myGlobals.cur_time))) 
            myGlobals.scroll.setValue(myGlobals.cur_time)
            flags = self.chain.startWorking(myGlobals.thread1,myGlobals.thread2)
            myGlobals.thread1 = flags[0]
            myGlobals.thread2 = flags[1]
       
    def stopThread(self):
        PState = False
        myThread.join(0.01)
        aStopEvent.set()   #ask(signal) the child thread to stop
        myThread.join(0.01)
      
    def onPauseButton(self):
        
        flags = self.chain.stopWorking(myGlobals.thread1,myGlobals.thread2)
        myGlobals.thread1 = flags[0]
        myGlobals.thread2 = flags[1]
        print("here")
        print(AllStates.Pause)
        self.music_player.setState(AllStates.Pause)
        self.music_player.execute();

    def onStopButton(self):
        if(self.currentMusicFile!=None):
            flags = self.chain.stopWorking(myGlobals.thread1,myGlobals.thread2)
            myGlobals.thread1 = flags[0]
            myGlobals.thread2 = flags[1]
            self.music_player.setState(AllStates.Stop)
            self.music_player.execute();
            myGlobals.cur_time = 0;
            self.timeEdit_2.setText(str(datetime.timedelta(seconds=myGlobals.cur_time))) 
            myGlobals.scroll.setValue(myGlobals.cur_time)
            self.pushButton_2.setEnabled(False)

    def openFile(self):  
       
        f = QtWidgets.QFileDialog.getOpenFileName(self, 'Open file', '/home/artem/Downloads',"Audio files (*.ogg *.wav *.mp3 *.mp4)")
        f=f[0]    

        if(f!="" and self.playlist.add(f,self.listWidget)):
            if(self.currentMusicFile!=None):
                self.onStopButton()
            if(self.currentMusicFile_copy!=None):
                self.deleteCopyTempFiles()
                self.saveClose();
            filepath = convertor(f);
            self.sound_wav = self.music_player.upload(filepath)
            self.currentMusicFile = MusicFile(get_fileName(f)) 
            self.preSet(get_fileName(f))
            self.playlist.add(filepath,self.listWidget)
        elif(f==""): 
            QMessageBox.about(self,"Error","Track didn't choosed")
        else:
            QMessageBox.about(self,"Error","Track "+ get_fileName(f) +" is already in playlist")
    
    def onValueChanged(self,value):
        if(self.currentMusicFile!=None):   
            if(myGlobals.cur_time==myGlobals.durality and abs(value-myGlobals.cur_time)>1):
                self.onStopButton();
                self.onPlayButton();
                setTime(value)
                self.music_player.setPos(value);
            elif(abs(value-myGlobals.cur_time)>1):
                setTime(value)
                self.music_player.setPos(value);

            # if(self.fullVersionIsOpened and self.choosed_property!=ChoosedStatus.Non):
            if(self.choosed_property!=ChoosedStatus.Non): 
                if(self.choosed_property==ChoosedStatus.Cut_Begin):
                    self.spinBox.setValue(value)
                elif(self.choosed_property==ChoosedStatus.Cut_End):
                    temp = myGlobals.durality - value
                    self.spinBox_2.setValue(temp)             
                elif(self.choosed_property==ChoosedStatus.Hide_Begin):
                    self.spinBox_3.setValue(value)
                elif(self.choosed_property==ChoosedStatus.Hide_End):
                    temp = myGlobals.durality - value
                    self.spinBox_3.setValue(temp)             
                 
    def cleanValues(self):
        self.spinBox.setValue(0)
        self.spinBox_2.setValue(0)
        self.spinBox_3.setValue(0)
        self.trackToAdd = None
        self.label_5.setText("");
        self.choosed_property = ChoosedStatus.Non
        self.radioButton_4.setChecked(False)
        self.radioButton_5.setChecked(False)
        self.radioButton_6.setChecked(False)
        self.radioButton_7.setChecked(False)
            

    def onTab2Clicked(self):
        if(self.tabWidget.currentIndex()==self.tabWidget.indexOf(self.tab_2)  and  self.fullVersionIsOpened==False):
            key, ok = QInputDialog.getText(self, 'Full version',
                'Enter your Key:')
            if ok:
                result = self.check_FullVersion.Enter(key)
                if result[1]:
                    QMessageBox.about(self,"Success",result[0])
                    self.fullVersionIsOpened = True
                else:
                    self.tabWidget.setCurrentIndex(0)
                    QMessageBox.about(self,"Error",result[0]) 
            else: 
                self.tabWidget.setCurrentIndex(0)
               
    def radio1_clicked(self,enabled):
        if enabled:
            self.choosed_ability = ChoosedStatus.Cut
            self.cleanValues();
            self.frame.show();
            self.frame_2.hide();
            self.frame_3.hide();
    
    def radio2_clicked(self,enabled):
        if enabled:
            self.choosed_ability = ChoosedStatus.Hide
            self.cleanValues();
            self.frame.hide();
            self.frame_2.show();
            self.frame_3.hide();
    
    def radio3_clicked(self,enabled):
        if enabled:
            self.choosed_ability = ChoosedStatus.Concat
            self.cleanValues();
            self.frame.hide();
            self.frame_2.hide();
            self.frame_3.show();
    
    def radio6_clicked(self,enabled):
        if enabled:
            self.choosed_property = ChoosedStatus.Cut_Begin
    def radio7_clicked(self,enabled):
        if enabled:
            self.choosed_property = ChoosedStatus.Cut_End

    def radio4_clicked(self,enabled):
        if enabled:
            self.choosed_property = ChoosedStatus.Hide_Begin
    def radio5_clicked(self,enabled):
        if enabled:
            self.choosed_property = ChoosedStatus.Hide_End
       
    def preSet(self,filepath):
         
        myGlobals.cur_time = 0;
        self.label.setText(filepath);
        self.timeEdit_2.setText(str(datetime.timedelta(seconds=0)))
        self.timeEdit.setText(str(datetime.timedelta(seconds=int(self.sound_wav.get_length()))))
        myGlobals.durality = int(self.sound_wav.get_length());
        self.horizontalSlider.setMinimum(0)
        self.horizontalSlider.setMaximum(myGlobals.durality)
        self.horizontalSlider.setTickInterval(1)
        myGlobals.scroll = self.horizontalSlider    

    def onPlayClicked(self):
        filepath = str(self.listWidget.item(self.listWidget.currentRow()).text())
        
        if(self.currentMusicFile_copy!=None):
            self.deleteCopyTempFiles()
            self.saveClose();
            
        self.currentMusicFile = MusicFile(filepath)
        self.changeTrack("music/"+filepath+".ogg")
        self.onPlayButton()
         
    def changeTrack(self,filepath):
        self.pushButton.setEnabled(True)
        self.sound_wav = self.music_player.upload(filepath)
        self.preSet(get_fileName(filepath))
        self.onStopButton()
    
    def onCutClicked(self):
        if(self.currentMusicFile!=None 
        and self.choosed_ability == ChoosedStatus.Cut): 
            if( self.spinBox.value() < myGlobals.durality - self.spinBox_2.value()
            and (self.spinBox.value()>0 or self.spinBox_2.value()>0) ):
                self.prototype.register_object('music', self.currentMusicFile)
                self.currentMusicFile_copy = self.prototype.clone('music')
                seconds = (self.currentMusicFile_copy.sound.__len__() - self.spinBox_2.value()*1000)
                print(seconds)
                self.currentMusicFile_copy.sound = self.currentMusicFile_copy.sound[:seconds];
                seconds = -(self.currentMusicFile_copy.sound.__len__() - self.spinBox.value()*1000)
                self.currentMusicFile_copy.sound = self.currentMusicFile_copy.sound[seconds:];
                print(seconds)
                filepath = self.currentMusicFile_copy.getName()+"_copy"
                self.currentMusicFile_copy.sound.export("tempFiles/"+filepath+".wav", format="wav"); 
                task = Task("tempFiles/"+filepath+".wav",
                            "tempFiles/"+filepath+".ogg",
                            AllMusicFormats.WAV)
                self.saver.setExecutor(task,TerminalFFMpegExecutor_toOGG())
                self.saver.executeTask(task)
                self.changeTrack("tempFiles/"+filepath+".ogg")
                self.saveMenu()
                QMessageBox.about(self,"_","Cutted")
            else: 
                QMessageBox.about(self,"Error","Uncorrect time values")
        else: 
            QMessageBox.about(self,"Error","File hasn't been choosed")

    def saveMenu(self):
        self.pushButton_14.setEnabled(True)
        self.pushButton_15.setEnabled(True)        
        self.pushButton_10.setEnabled(False)
        self.pushButton_11.setEnabled(False)       
        self.pushButton_12.setEnabled(False)
    
    def saveClose(self):
        self.pushButton_14.setEnabled(False)
        self.pushButton_15.setEnabled(False)        
        self.pushButton_10.setEnabled(True)
        self.pushButton_11.setEnabled(True)       
        self.pushButton_12.setEnabled(True) 

    def onSave(self):
        fileName = QFileDialog.getSaveFileName(self, 'Save as', '/home/artem/projects/cursach/part1/changedFiles', filter='*.mp3')    
        if fileName and fileName[0]!="":
            print(fileName)
            fileName = fileName[0]
            self.currentMusicFile_copy.sound.export(fileName+".wav",format="wav"); 
            self.deleteCopyTempFiles()
            self.listWidget.setCurrentRow(0);
            self.changeTrack("music/"+str(self.listWidget.item(self.listWidget.currentRow()).text())+".ogg")
            self.currentMusicFile = MusicFile(self.listWidget.item(self.listWidget.currentRow()).text())
            self.saveClose()
        else:
            QMessageBox.about(self,"Error","File wasn't saved")
    def onDiscard(self):
        self.saveClose()
        self.deleteCopyTempFiles()
        self.listWidget.setCurrentRow(0);
        self.changeTrack("music/"+str(self.listWidget.item(self.listWidget.currentRow()).text())+".ogg")
        self.currentMusicFile = MusicFile(self.listWidget.item(self.listWidget.currentRow()).text())
            

    def deleteCopyTempFiles(self):
        filepath = self.currentMusicFile_copy.getName()
        self.currentMusicFile_copy = None
        command = "rm \"/home/artem/projects/cursach/part1/tempFiles/"+ filepath +"_copy.wav\""
        subprocess.call(command, shell=True)
        command = "rm \"/home/artem/projects/cursach/part1/tempFiles/"+ filepath +"_copy.ogg\""
        subprocess.call(command, shell=True)
        
    def onHideClicked(self):
        if(self.currentMusicFile!=None and self.choosed_ability == ChoosedStatus.Hide):
            if(self.spinBox_3.value() > 0 
            and (self.choosed_property == ChoosedStatus.Hide_End or self.choosed_property == ChoosedStatus.Hide_Begin)):
                self.prototype.register_object('music', self.currentMusicFile)
                self.currentMusicFile_copy = self.prototype.clone('music')
                seconds = (self.currentMusicFile_copy.sound.__len__() - self.spinBox_2.value()*1000)
                if(self.choosed_property == ChoosedStatus.Hide_Begin):
                    self.currentMusicFile_copy.sound = self.currentMusicFile_copy.sound.fade_in(seconds)
                else:
                    self.currentMusicFile_copy.sound = self.currentMusicFile_copy.sound.fade_out(seconds)
                filepath = self.currentMusicFile_copy.getName()+"_copy"
                self.currentMusicFile_copy.sound.export("tempFiles/"+filepath+".wav", format="wav"); 
                task = Task("tempFiles/"+filepath+".wav",
                            "tempFiles/"+filepath+".ogg",
                            AllMusicFormats.WAV)
                self.saver.setExecutor(task,TerminalFFMpegExecutor_toOGG())
                self.saver.executeTask(task)
                self.changeTrack("tempFiles/"+filepath+".ogg")
                self.saveMenu()
                QMessageBox.about(self,"_","Hided")
            else:
                QMessageBox.about(self,"Error","Wrong value")
        else: 
            QMessageBox.about(self,"Error","File hasn't been choosed")
    
    def onConcatClicked(self):
        if(self.currentMusicFile!=None and 
        self.choosed_ability == ChoosedStatus.Concat):
            if(self.trackToAdd != None):
                self.prototype.register_object('music', self.currentMusicFile)
                self.currentMusicFile_copy = self.prototype.clone('music')
                self.currentMusicFile_copy.sound = self.currentMusicFile_copy.sound + self.trackToAdd.sound
                filepath = self.currentMusicFile_copy.getName()+"_copy"
                self.currentMusicFile_copy.sound.export("tempFiles/"+filepath+".wav", format="wav"); 
                task = Task("tempFiles/"+filepath+".wav",
                            "tempFiles/"+filepath+".ogg",
                            AllMusicFormats.WAV)
                self.saver.setExecutor(task,TerminalFFMpegExecutor_toOGG())
                self.saver.executeTask(task)
                self.changeTrack("tempFiles/"+filepath+".ogg")
                self.saveMenu()
                self.label_5.setText("") 
                self.trackToAdd = None
                QMessageBox.about(self,"_","Concatenated") 
            else:
                QMessageBox.about(self,"_","File to add hasn't been choosed")
        else: 
            QMessageBox.about(self,"Error","File hasn't been choosed")
    
    def onChooseSongToConcatClicked(self):
        f = QtWidgets.QFileDialog.getOpenFileName(self, 'Open file', '/home/artem/projects/cursach/part1/music',"Audio files (*.ogg)")
        f=f[0]
            
        if(f!=""):
            self.trackToAdd = MusicFile(get_fileName(f)) 
            self.label_5.setText(self.trackToAdd.getName())
        elif(f==""): 
            QMessageBox.about(self,"Error","Track didn't choosed")
 
    def onDeleteClicked(self):
        
        if(self.listWidget.currentRow()>=0):
            self.playlist.delete(self.listWidget)
            self.sound_wav = self.music_player.upload("music/"+str(self.listWidget.item(self.listWidget.currentRow()).text())+".ogg")
            self.preSet(str(self.listWidget.item(self.listWidget.currentRow()).text()))
    
    def onSortByNameInOrderClicked(self):
        self.playlist.setSortStrategy(SortByNameInOrder())
        self.playlist.sortMusicList(self.listWidget)

    def onSortByNameInReverseOrderClicked(self):
        self.playlist.setSortStrategy(SortByNameInReverseOrder())
        self.playlist.sortMusicList(self.listWidget)

    def onSortByDurationClicked(self):
        self.playlist.setSortStrategy(SortByDurationInOrder())
        self.playlist.sortMusicList(self.listWidget)



def main():
    app = QtWidgets.QApplication(sys.argv)  # Новый экземпляр QApplication
    window = ExampleApp()  # Создаём объект класса ExampleApp
    window.show()  # Пок
    app.exec_()  # и запускаем приложение


if __name__ == '__main__':  # Если мы запускаем файл напрямую, а не импортируем
    main()  # то запускаем функцию main()