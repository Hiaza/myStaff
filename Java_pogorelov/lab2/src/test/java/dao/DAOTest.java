package dao;

import models.Cat;
import models.Dog;
import models.Owner;
import org.junit.*;

import java.util.ArrayList;

import static org.junit.Assert.*;

public class DAOTest {

    @BeforeClass
    public static void beforeClass() {
        System.out.println("Before daoTest.class");
    }

    @AfterClass
    public  static void afterClass() {
        System.out.println("After daoTest.class");
    }

    @Test
    public void getEntity() throws Exception{
        Cat x = new Cat();
        Dog y = new Dog();
        Owner z = new Owner();

        DAO<Cat> daoCat = new DAO(x.getClass());
        DAO<Dog> daoDog = new DAO(y.getClass());
        DAO<Owner> daoOwner = new DAO(z.getClass());


        assertEquals(daoCat.getEntity(2).getClass(), x.getClass() );
        assertEquals(daoCat.getEntity(3),null );
        assertEquals(daoDog.getEntity(1).getClass(), y.getClass() );
        assertEquals(daoOwner.getEntity(1).getClass(), z.getClass() );
        assertEquals("9.8", daoCat.getEntity(2).getFrequency_of_mur().toString());
    }

    @Test
    public void getEntityList() throws Exception{

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

        temp2 = daoDog.getEntityList();

        temp3 = daoOwner.getEntityList();

        assertEquals(temp.get(0).getClass(), x.getClass() );
        assertEquals(temp.get(1).getClass(), x.getClass() );
        assertEquals(temp2.get(0).getClass(), y.getClass() );
        assertEquals(temp3.get(0).getClass(), z.getClass() );
        assertEquals("19", temp.get(0).getAge().toString());
    }

}