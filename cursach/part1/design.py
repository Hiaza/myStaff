# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'mainwindow.ui'
#
# Created by: PyQt5 UI code generator 5.5.1
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(753, 591)
        self.centralWidget = QtWidgets.QWidget(MainWindow)
        self.centralWidget.setObjectName("centralWidget")
        self.gridLayout_2 = QtWidgets.QGridLayout(self.centralWidget)
        self.gridLayout_2.setContentsMargins(11, 11, 11, 11)
        self.gridLayout_2.setSpacing(6)
        self.gridLayout_2.setObjectName("gridLayout_2")
        self.tabWidget = QtWidgets.QTabWidget(self.centralWidget)
        self.tabWidget.setObjectName("tabWidget")
        self.tab = QtWidgets.QWidget()
        self.tab.setObjectName("tab")
        self.gridLayout = QtWidgets.QGridLayout(self.tab)
        self.gridLayout.setContentsMargins(11, 11, 11, 11)
        self.gridLayout.setSpacing(6)
        self.gridLayout.setObjectName("gridLayout")
        self.verticalLayout = QtWidgets.QVBoxLayout()
        self.verticalLayout.setContentsMargins(11, 11, 11, 11)
        self.verticalLayout.setSpacing(6)
        self.verticalLayout.setObjectName("verticalLayout")
        self.label = QtWidgets.QLabel(self.tab)
        self.label.setAlignment(QtCore.Qt.AlignCenter)
        self.label.setObjectName("label")
        self.verticalLayout.addWidget(self.label)
        self.horizontalSlider = QtWidgets.QSlider(self.tab)
        self.horizontalSlider.setOrientation(QtCore.Qt.Horizontal)
        self.horizontalSlider.setObjectName("horizontalSlider")
        self.verticalLayout.addWidget(self.horizontalSlider)  
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setContentsMargins(11, 11, 11, 11)
        self.horizontalLayout.setSpacing(6)
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.timeEdit_2 = QtWidgets.QLabel(self.tab)
        self.horizontalLayout.addWidget(self.timeEdit_2)
        self.pushButton = QtWidgets.QPushButton(self.tab)
        self.pushButton.setObjectName("pushButton")
        self.horizontalLayout.addWidget(self.pushButton)
        self.pushButton_2 = QtWidgets.QPushButton(self.tab)
        self.pushButton_2.setObjectName("pushButton_2")
        self.horizontalLayout.addWidget(self.pushButton_2)
        self.pushButton_3 = QtWidgets.QPushButton(self.tab)
        self.pushButton_3.setObjectName("pushButton_3")
        self.horizontalLayout.addWidget(self.pushButton_3)
        self.pushButton_4 = QtWidgets.QPushButton(self.tab)
        self.pushButton_4.setObjectName("pushButton_4")
        self.horizontalLayout.addWidget(self.pushButton_4)
        self.timeEdit = QtWidgets.QLabel(self.tab)
        self.timeEdit.setAlignment(QtCore.Qt.AlignRight)
        self.horizontalLayout.addWidget(self.timeEdit)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setContentsMargins(11, 11, 11, 11)
        self.horizontalLayout_2.setSpacing(6)
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        spacerItem = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout_2.addItem(spacerItem)
        self.pushButton_5 = QtWidgets.QPushButton(self.tab)
        self.pushButton_5.setObjectName("pushButton_5")
        self.horizontalLayout_2.addWidget(self.pushButton_5)
        spacerItem1 = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout_2.addItem(spacerItem1)
        self.pushButton_7 = QtWidgets.QPushButton(self.tab)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.pushButton_7.sizePolicy().hasHeightForWidth())
        self.pushButton_7.setSizePolicy(sizePolicy)
        self.pushButton_7.setMaximumSize(QtCore.QSize(45, 16777215))
        self.pushButton_7.setObjectName("pushButton_7")
        self.horizontalLayout_2.addWidget(self.pushButton_7)
        self.pushButton_8 = QtWidgets.QPushButton(self.tab)
        self.pushButton_8.setMaximumSize(QtCore.QSize(45, 16777215))
        self.pushButton_8.setObjectName("pushButton_8")
        self.horizontalLayout_2.addWidget(self.pushButton_8)
        self.pushButton_9 = QtWidgets.QPushButton(self.tab)
        self.pushButton_9.setMaximumSize(QtCore.QSize(45, 16777215))
        self.pushButton_9.setObjectName("pushButton_9")
        self.horizontalLayout_2.addWidget(self.pushButton_9)
        spacerItem2 = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout_2.addItem(spacerItem2)
        self.pushButton_6 = QtWidgets.QPushButton(self.tab)
        self.pushButton_6.setObjectName("pushButton_6")
        self.horizontalLayout_2.addWidget(self.pushButton_6)
        spacerItem3 = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout_2.addItem(spacerItem3)
        
        self.verticalLayout.addLayout(self.horizontalLayout_2)
        self.listWidget = QtWidgets.QListWidget(self.tab)
        self.listWidget.setObjectName("listWidget")
        self.verticalLayout.addWidget(self.listWidget)
        self.gridLayout.addLayout(self.verticalLayout, 0, 0, 1, 1)
        self.tabWidget.addTab(self.tab, "")
        self.tab_2 = QtWidgets.QWidget()
        self.tab_2.setObjectName("tab_2")
        
        self.gridLayout_7 = QtWidgets.QGridLayout(self.tab_2)
        self.gridLayout_7.setContentsMargins(11, 11, 11, 11)
        self.gridLayout_7.setSpacing(6)
        self.gridLayout_7.setObjectName("gridLayout_7")
        self.gridLayout_3 = QtWidgets.QGridLayout()
        self.gridLayout_3.setContentsMargins(11, 11, 11, 11)
        self.gridLayout_3.setSpacing(6)
        self.gridLayout_3.setObjectName("gridLayout_3")
        spacerItem4 = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.gridLayout_3.addItem(spacerItem4, 0, 1, 1, 1)
        self.formLayout = QtWidgets.QFormLayout()
        self.formLayout.setContentsMargins(11, 11, 11, 11)
        self.formLayout.setSpacing(6)
        self.formLayout.setObjectName("formLayout")
        self.radioButton = QtWidgets.QRadioButton(self.tab_2)
        self.radioButton.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.radioButton.setText("")
        self.radioButton.setObjectName("radioButton")
        self.formLayout.setWidget(1, QtWidgets.QFormLayout.LabelRole, self.radioButton)
        self.pushButton_10 = QtWidgets.QPushButton(self.tab_2)
        self.pushButton_10.setObjectName("pushButton_10")
        self.formLayout.setWidget(1, QtWidgets.QFormLayout.FieldRole, self.pushButton_10)
        spacerItem5 = QtWidgets.QSpacerItem(20, 150, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.formLayout.setItem(2, QtWidgets.QFormLayout.LabelRole, spacerItem5)
        self.radioButton_2 = QtWidgets.QRadioButton(self.tab_2)
        self.radioButton_2.setText("")
        self.radioButton_2.setObjectName("radioButton_2")
        self.formLayout.setWidget(3, QtWidgets.QFormLayout.LabelRole, self.radioButton_2)
        self.pushButton_11 = QtWidgets.QPushButton(self.tab_2)
        self.pushButton_11.setObjectName("pushButton_11")
        self.formLayout.setWidget(3, QtWidgets.QFormLayout.FieldRole, self.pushButton_11)
        spacerItem6 = QtWidgets.QSpacerItem(20, 140, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.formLayout.setItem(4, QtWidgets.QFormLayout.LabelRole, spacerItem6)
        self.radioButton_3 = QtWidgets.QRadioButton(self.tab_2)
        self.radioButton_3.setText("")
        self.radioButton_3.setObjectName("radioButton_3")
        self.formLayout.setWidget(5, QtWidgets.QFormLayout.LabelRole, self.radioButton_3)
        self.pushButton_12 = QtWidgets.QPushButton(self.tab_2)
        self.pushButton_12.setObjectName("pushButton_12")
        self.formLayout.setWidget(5, QtWidgets.QFormLayout.FieldRole, self.pushButton_12)
        self.pushButton_14 = QtWidgets.QPushButton(self.tab_2)
        self.pushButton_14.setObjectName("pushButton_14")
        self.formLayout.setWidget(6, QtWidgets.QFormLayout.FieldRole, self.pushButton_14)
        self.pushButton_15 = QtWidgets.QPushButton(self.tab_2)
        self.pushButton_15.setObjectName("pushButton_15")
        self.formLayout.setWidget(7, QtWidgets.QFormLayout.FieldRole, self.pushButton_15)

        spacerItem7 = QtWidgets.QSpacerItem(20, 40, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.formLayout.setItem(0, QtWidgets.QFormLayout.LabelRole, spacerItem7)
        self.gridLayout_3.addLayout(self.formLayout, 0, 0, 1, 1)
        self.verticalLayout_3 = QtWidgets.QVBoxLayout()
        self.verticalLayout_3.setContentsMargins(11, 11, 11, 11)
        self.verticalLayout_3.setSpacing(6)
        self.verticalLayout_3.setObjectName("verticalLayout_3")
        self.frame = QtWidgets.QFrame(self.tab_2)
        self.frame.setMinimumSize(QtCore.QSize(100, 100))
        self.frame.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.frame.setFrameShadow(QtWidgets.QFrame.Raised)
        self.frame.setObjectName("frame")
        self.gridLayout_4 = QtWidgets.QGridLayout(self.frame)
        self.gridLayout_4.setContentsMargins(11, 11, 11, 11)
        self.gridLayout_4.setSpacing(6)
        self.gridLayout_4.setObjectName("gridLayout_4")
        self.formLayout_2 = QtWidgets.QFormLayout()
        self.formLayout_2.setSizeConstraint(QtWidgets.QLayout.SetDefaultConstraint)
        self.formLayout_2.setRowWrapPolicy(QtWidgets.QFormLayout.DontWrapRows)
        self.formLayout_2.setLabelAlignment(QtCore.Qt.AlignJustify|QtCore.Qt.AlignVCenter)
        self.formLayout_2.setFormAlignment(QtCore.Qt.AlignHCenter|QtCore.Qt.AlignTop)
        self.formLayout_2.setContentsMargins(11, 11, 11, 11)
        self.formLayout_2.setSpacing(6)
        self.formLayout_2.setObjectName("formLayout_2")
        self.formLayout_2.setObjectName("formLayout_2")
        self.radioButton_6 = QtWidgets.QRadioButton(self.frame)
        self.radioButton_6.setMinimumSize(QtCore.QSize(110, 0))
        self.radioButton_6.setObjectName("radioButton_6")
        self.formLayout_2.setWidget(1, QtWidgets.QFormLayout.LabelRole, self.radioButton_6)
        self.radioButton_7 = QtWidgets.QRadioButton(self.frame)
        self.radioButton_7.setObjectName("radioButton_7")
        self.formLayout_2.setWidget(1, QtWidgets.QFormLayout.FieldRole, self.radioButton_7)
        
        self.spinBox = QtWidgets.QSpinBox(self.frame)
        self.spinBox.setMaximum(2000)
        self.spinBox.setMinimumSize(QtCore.QSize(72, 0))
        self.spinBox.setObjectName("spinBox")
        self.formLayout_2.setWidget(2, QtWidgets.QFormLayout.LabelRole, self.spinBox)
        self.spinBox_2 = QtWidgets.QSpinBox(self.frame)
        self.spinBox_2.setMinimumSize(QtCore.QSize(72, 0))
        self.spinBox_2.setMaximum(2000)
        self.spinBox_2.setObjectName("spinBox_2")
        self.formLayout_2.setWidget(2, QtWidgets.QFormLayout.FieldRole, self.spinBox_2)
        self.gridLayout_4.addLayout(self.formLayout_2, 0, 0, 1, 1)
        self.verticalLayout_3.addWidget(self.frame)
        spacerItem8 = QtWidgets.QSpacerItem(20, 40, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.verticalLayout_3.addItem(spacerItem8)
        self.frame_2 = QtWidgets.QFrame(self.tab_2)
        self.frame_2.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.frame_2.setFrameShadow(QtWidgets.QFrame.Raised)
        self.frame_2.setObjectName("frame_2")
        self.gridLayout_5 = QtWidgets.QGridLayout(self.frame_2)
        self.gridLayout_5.setContentsMargins(11, 11, 11, 11)
        self.gridLayout_5.setSpacing(6)
        self.gridLayout_5.setObjectName("gridLayout_5")
        self.formLayout_3 = QtWidgets.QFormLayout()
        self.formLayout_3.setContentsMargins(11, 11, 11, 11)
        self.formLayout_3.setSpacing(6)
        self.formLayout_3.setObjectName("formLayout_3")
        self.horizontalLayout_3 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_3.setContentsMargins(11, 11, 11, 11)
        self.horizontalLayout_3.setSpacing(6)
        self.horizontalLayout_3.setObjectName("horizontalLayout_3")
        self.formLayout_3.setLayout(1, QtWidgets.QFormLayout.LabelRole, self.horizontalLayout_3)
        self.radioButton_4 = QtWidgets.QRadioButton(self.frame_2)
        self.radioButton_4.setObjectName("radioButton_4")
        self.formLayout_3.setWidget(1, QtWidgets.QFormLayout.FieldRole, self.radioButton_4)
        self.label_4 = QtWidgets.QLabel(self.frame_2)
        self.label_4.setAlignment(QtCore.Qt.AlignCenter)
        self.label_4.setObjectName("label_4")
        self.formLayout_3.setWidget(2, QtWidgets.QFormLayout.SpanningRole, self.label_4)
        self.spinBox_3 = QtWidgets.QSpinBox(self.frame_2)
        self.spinBox_3.setObjectName("spinBox_3")
        self.formLayout_3.setWidget(3, QtWidgets.QFormLayout.SpanningRole, self.spinBox_3)
        self.radioButton_5 = QtWidgets.QRadioButton(self.frame_2)
        self.radioButton_5.setObjectName("radioButton_5")
        self.formLayout_3.setWidget(0, QtWidgets.QFormLayout.FieldRole, self.radioButton_5)
        self.gridLayout_5.addLayout(self.formLayout_3, 0, 0, 1, 1)
        self.verticalLayout_3.addWidget(self.frame_2)
        spacerItem9 = QtWidgets.QSpacerItem(20, 40, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.verticalLayout_3.addItem(spacerItem9)
        self.frame_3 = QtWidgets.QFrame(self.tab_2)
        self.frame_3.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.frame_3.setFrameShadow(QtWidgets.QFrame.Raised)
        self.frame_3.setObjectName("frame_3")
        self.gridLayout_6 = QtWidgets.QGridLayout(self.frame_3)
        self.gridLayout_6.setContentsMargins(11, 11, 11, 11)
        self.gridLayout_6.setSpacing(6)
        self.gridLayout_6.setObjectName("gridLayout_6")
        self.formLayout_4 = QtWidgets.QFormLayout()
        self.formLayout_4.setContentsMargins(11, 11, 11, 11)
        self.formLayout_4.setSpacing(6)
        self.formLayout_4.setObjectName("formLayout_4")
        self.pushButton_13 = QtWidgets.QPushButton(self.frame_3)
        self.pushButton_13.setObjectName("pushButton_13")
        self.formLayout_4.setWidget(1, QtWidgets.QFormLayout.LabelRole, self.pushButton_13)
        self.label_5 = QtWidgets.QLabel(self.frame_3)
        self.label_5.setObjectName("label_5")
        self.formLayout_4.setWidget(1, QtWidgets.QFormLayout.FieldRole, self.label_5)
        self.label_6 = QtWidgets.QLabel(self.frame_3)
        self.label_6.setAlignment(QtCore.Qt.AlignCenter)
        self.label_6.setObjectName("label_6")
        self.formLayout_4.setWidget(0, QtWidgets.QFormLayout.SpanningRole, self.label_6)
        self.gridLayout_6.addLayout(self.formLayout_4, 0, 0, 1, 1)
        spacerItem10 = QtWidgets.QSpacerItem(20, 40, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.gridLayout_6.addItem(spacerItem10, 1, 0, 1, 1)
        self.verticalLayout_3.addWidget(self.frame_3)
        self.gridLayout_3.addLayout(self.verticalLayout_3, 0, 4, 1, 1)
        self.gridLayout_7.addLayout(self.gridLayout_3, 0, 0, 1, 1)
        self.tabWidget.addTab(self.tab_2, "")
        self.gridLayout_2.addWidget(self.tabWidget, 0, 1, 1, 1)
        MainWindow.setCentralWidget(self.centralWidget)
        self.statusBar = QtWidgets.QStatusBar(MainWindow)
        self.statusBar.setObjectName("statusBar")
        MainWindow.setStatusBar(self.statusBar)


        self.retranslateUi(MainWindow)
        self.tabWidget.setCurrentIndex(0)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "Muskus"))
        self.label.setText(_translate("MainWindow", ""))
        self.pushButton.setText(_translate("MainWindow", ">"))
        self.pushButton_2.setText(_translate("MainWindow", "||"))
        self.pushButton_3.setText(_translate("MainWindow", "STOP"))
        self.pushButton_4.setText(_translate("MainWindow", "Add"))
        self.pushButton_5.setText(_translate("MainWindow", "Play"))
        self.pushButton_6.setText(_translate("MainWindow", "Delete"))
        self.pushButton_7.setText(_translate("MainWindow", "^A"))
        self.pushButton_8.setText(_translate("MainWindow", "^Z"))
        self.pushButton_9.setText(_translate("MainWindow", "^Dur"))
       
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab), _translate("MainWindow", "Player"))
        
        self.pushButton_10.setText(_translate("MainWindow", "Сut"))
        self.pushButton_11.setText(_translate("MainWindow", "Hide"))
        self.pushButton_12.setText(_translate("MainWindow", "Concatinate"))
        self.radioButton_6.setText(_translate("MainWindow", "Begin"))
        self.radioButton_7.setText(_translate("MainWindow", "End"))
        self.radioButton.setText(_translate("MainWindow", "ability1"))
        self.radioButton_2.setText(_translate("MainWindow", "ability2"))
        self.radioButton_3.setText(_translate("MainWindow", "ability3"))
      
        self.radioButton_5.setText(_translate("MainWindow", "from beginning"))
        self.radioButton_4.setText(_translate("MainWindow", "from end"))
        self.label_4.setText(_translate("MainWindow", "Duration in sec"))
        self.pushButton_13.setText(_translate("MainWindow", "Choose"))
        self.pushButton_14.setText(_translate("MainWindow", "Save"))
        self.pushButton_15.setText(_translate("MainWindow", "Discard Changes"))
        self.label_5.setText(_translate("MainWindow", ""))
        self.label_6.setText(_translate("MainWindow", "Choose song"))
        
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab_2), _translate("MainWindow", "Editor"))

