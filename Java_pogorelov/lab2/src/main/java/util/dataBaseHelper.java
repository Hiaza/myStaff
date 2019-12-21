package util;
import java.sql.*;


public class dataBaseHelper {

    private static String url;
    private static String user;
    private static String password;

    private static final dataBaseHelper helper = new dataBaseHelper();

    static {
        url = "jdbc:postgresql://localhost:5432/lab2";
        user = "artem";
        password = "1";
    }

    public static dataBaseHelper getInstance(){
        return helper;
    }

    public Connection getConn(){
        Connection conn=null;
        try {
            conn= DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error with connecting to db");
        }
        return conn;
    }

    public void closeConn(Connection conn, PreparedStatement pstmt){
        try {
            if (conn!=null){
                conn.close();
            }
            if (pstmt!=null){
                pstmt.close();
            }
        } catch (SQLException e) {
            System.out.println("Error with disconnecting");
        }

    }
    public void closeConn(Connection conn, PreparedStatement pstmt, ResultSet rs){
        try{
            if (conn!=null){
                conn.close();
            }
            if (pstmt!=null){
                pstmt.close();
            }
            if (rs!=null){
                rs.close();
            }
        }catch (Exception e){
            System.out.println("Error with disconnecting");
        }
    }

}
