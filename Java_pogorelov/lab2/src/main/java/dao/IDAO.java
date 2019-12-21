package dao;

import java.util.ArrayList;
import java.util.List;

public interface IDAO<T> {
    T getEntity(Integer id);
    ArrayList<T> getEntityList();
//    boolean CreateEntity();
}
