
from abc import ABCMeta, abstractmethod, abstractproperty

class AuthorizationData:    
    def __init__(self):    
        super().__init__()
        self.key=""
        self.login=""
    def setLogin(self,login):
        self.login = login
    def getLogin(self):
        return self.login
    def setKey(self,key):
        self.key = key
    def getKey(self):
        return self.key


class Abstract_ExtraFeatures(metaclass=ABCMeta):
    @abstractmethod
    def Enter(self,data):
        pass
        
class FullVersion(Abstract_ExtraFeatures):
    def Enter(self,data):
        result = ["Welcome "+ data.getLogin(),True]
        return result

class Check_FullVersion(Abstract_ExtraFeatures):
    def __init__(self,listOfAllowedKeys):   
        self.fullVersion = FullVersion() 
        self.listOfAllowedKeys = listOfAllowedKeys
        super().__init__()
    def Enter(self,data):
        if(data!=None and len(data) == 8):
            for temp in self.listOfAllowedKeys:
                print(temp.key)
                if(temp.getKey()==data):
                    return self.fullVersion.Enter(temp)
            result = ["Incorrect key",False]
            return result;
        else: 
            result = ["Incorrect input",False]
            return result;
        

    