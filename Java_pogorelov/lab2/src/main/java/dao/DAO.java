package dao;

import util.dataBaseHelper;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DAO<T> implements IDAO<T>{

    Class<T> clazz;

    public DAO(Class<T> clazz){
        this.clazz = clazz;
    }

    public T getEntity(Integer id) {
        T ob = null;
        Connection conn = dataBaseHelper.getInstance().getConn();
        PreparedStatement ps = null;
        ResultSet rs = null;
        Field[] fields = clazz.getDeclaredFields();
        Field[] fieldsOfParents = clazz.getSuperclass().getDeclaredFields();
        Field idName=fields[0];
        String sql = "SELECT * FROM public.\""+ clazz.getSimpleName()+"\" where \""+idName.getName()+"\"=" + id;

        try{
            ps=conn.prepareStatement(sql);
            rs=ps.executeQuery();

            if (rs.next()){

                ob=clazz.newInstance();
                Method m;
                fillObject((T) ob, rs, fields);
                fillObject((T) ob, rs, fieldsOfParents);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            dataBaseHelper.getInstance().closeConn(conn,ps,rs);
        }
        return ob;
    }

    public ArrayList<T> getEntityList() {
        ArrayList temp= new ArrayList();
        Connection conn = dataBaseHelper.getInstance().getConn();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "SELECT * FROM public.\""+ clazz.getSimpleName()+"\"";
        Field[] fields = clazz.getDeclaredFields();
        Field[] fieldsOfParents = clazz.getSuperclass().getDeclaredFields();
        T ob = null;
        try{
            ps=conn.prepareStatement(sql);
            rs=ps.executeQuery();
            while(rs.next()){
                ob = clazz.newInstance();
                Method m;
                fillObject((T) ob, rs, fields);
                fillObject((T) ob, rs, fieldsOfParents);
                temp.add(ob);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            dataBaseHelper.getInstance().closeConn(conn,ps,rs);
        }

        return temp;

    }
//
//    public boolean CreateEntity(){
//        Connection conn = dataBaseHelper.getInstance().getConn();
//        PreparedStatement ps = null;
//        ResultSet rs = null;
//        String sql = "INSERT INTO public.\""+ clazz.getSimpleName()+"\"";
//    }

    private void fillObject(T ob, ResultSet rs, Field[] fields) throws NoSuchMethodException, SQLException, IllegalAccessException, InvocationTargetException {
        Method m;
        for (Field f:fields){
            String fieldName = f.getName();
            String nameSetter = "set"+ fieldName.substring(0,1).toUpperCase()+fieldName.substring(1);
            m = clazz.getMethod(nameSetter,rs.getObject(f.getName()).getClass());
            m.invoke(ob,rs.getObject(f.getName()));
        }
    }
}

//                for (Field f:fields){
//
//                    f.setAccessible(true);
//                    f.set(ob,rs.getObject(f.getName()));
//                }
//                for (Field f:fieldsOfParents){
//                    f.setAccessible(true);
//                    f.set(ob,rs.getObject(f.getName()));
//                }