import dao.DAO;
import models.Cat;
import models.Dog;
import models.Owner;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Cat> temp = new ArrayList();
        ArrayList<Dog> temp2 = new ArrayList();
        ArrayList<Owner> temp3 = new ArrayList();

        Cat x = new Cat();
        Dog y = new Dog();
        Owner z = new Owner();

        DAO<Cat> daoCat = new DAO(x.getClass());
        DAO<Dog> daoDog = new DAO(y.getClass());
        DAO<Owner> daoOwner = new DAO(z.getClass());

        temp = daoCat.getEntityList();
        for(Cat cat:temp){
            System.out.println(cat);
        }

        temp2 = daoDog.getEntityList();
        for(Dog dog:temp2){
            System.out.println(dog);
        }

        temp3 = daoOwner.getEntityList();
        for(Owner owner:temp3){
            System.out.println(owner);
        }

        System.out.println(daoCat.getEntity(2));

        System.out.println(daoDog.getEntity(1));

        System.out.println(daoDog.getEntity(2));

        System.out.println(daoOwner.getEntity(1));

    }
}
