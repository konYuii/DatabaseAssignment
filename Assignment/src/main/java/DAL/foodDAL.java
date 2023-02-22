package DAL;

import Model.foodModel;
import java.sql.*;
import java.util.Vector;

public class foodDAL {
    private static String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static String URL = "jdbc:mysql://localhost:3306/assignment";
    private static String USER = "root";
    private static String PASSWORD = "SQL.wcj74;";

    private Connection connection;

    public foodDAL()
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

    public Vector<foodModel> GetModels(int store)
    {
        String sql = "select id,name,price from food where store=?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,store);
            ResultSet rs = ps.executeQuery();
            Vector<foodModel> foods = new Vector<>();
            while(rs.next())
            {
                foodModel model = new foodModel();

                model.setId(rs.getInt("id"));
                model.setName(rs.getString("name"));
                model.setStore(store);
                model.setPrice(rs.getBigDecimal("price"));

                foods.add(model);
            }
            return foods;

        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }

    public foodModel GetModel(int id)
    {
        String sql = "select name,price,store from food where id=?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                foodModel model = new foodModel();

                model.setId(id);
                model.setName(rs.getString("name"));
                model.setStore(rs.getInt("store"));
                model.setPrice(rs.getBigDecimal("price"));

                return model;
            }

        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }


    public boolean AddModel(foodModel food)
    {
        String sql = "insert into food (name,store,price) value(?,?,?)";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setString(1,food.getName());
            ps.setInt(2,food.getStore());
            ps.setBigDecimal(3,food.getPrice());
            int line = ps.executeUpdate();
            if(line == 1)
                return true;
            return false;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public boolean ChangeModel(foodModel food)
    {
        String sql = "update food set name = ?,price = ? where id = ?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setString(1,food.getName());
            ps.setBigDecimal(2,food.getPrice());
            ps.setInt(3,food.getId());
            int line = ps.executeUpdate();
            if(line == 1)
                return true;
            return false;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
}
