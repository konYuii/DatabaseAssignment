package DAL;

import Model.foodModel;
import Model.ridersModel;

import java.sql.*;

public class ridersDAL {
    private static String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static String URL = "jdbc:mysql://localhost:3306/assignment";
    private static String USER = "root";
    private static String PASSWORD = "SQL.wcj74;";

    private Connection connection;

    public ridersDAL()
    {
        try {
            Class.forName(DRIVER);
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
        catch (ClassNotFoundException e)
        {
            e.printStackTrace();
        }
    }

    public ridersModel GetModelFree()
    {
        String sql = "select id,name,phone from riders where status=0";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                ridersModel rider = new ridersModel();
                rider.setId(rs.getInt("id"));
                rider.setName(rs.getString("name"));
                rider.setPhone(rs.getString("phone"));
                rider.setStatus(0);
                return rider;
            }

        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    public ridersModel GetModel(int id)
    {
        String sql = "select name,phone,status from riders where id=?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                ridersModel rider = new ridersModel();
                rider.setId(id);
                rider.setName(rs.getString("name"));
                rider.setPhone(rs.getString("phone"));
                rider.setStatus(rs.getInt("status"));
                return rider;
            }

        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
}
