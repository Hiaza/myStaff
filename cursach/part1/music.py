from pydub import AudioSegment
from abc import ABCMeta, abstractmethod, abstractproperty
import copy

class IClonable(metaclass=ABCMeta):
    @abstractmethod
    def clone(self, name, **attr):
        pass

class Prototype(IClonable):

    def __init__(self):
        self._objects = {}

    def register_object(self, name, obj):
        self._objects[name] = obj

    def unregister_object(self, name):
         del self._objects[name]

    def clone(self, name, **attr):
        obj = copy.deepcopy(self._objects.get(name))
        obj.__dict__.update(attr)
        return obj


class MusicFile:
    def __init__(self,name):
        super().__init__()
        self.name = name
        self.sound = AudioSegment.from_wav("/home/artem/projects/cursach/part1/music/" + name+".wav")        
    def getName(self):return self.name
    def getSound(self):return self.sound



# def main():
#     a = MusicFile("Billie Eilish – when the partys over")
#     prototype = Prototype()
#     prototype.register_object('music', a)
#     b = prototype.clone('music')
#     aso = a.getSound()
#     bso = b.getSound()
#     print(a.getName() + " " + str(aso.__len__()))    
#     print(b.getName() + " " + str(bso.__len__()))

# if __name__ == '__main__':
#         main()
