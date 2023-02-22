package DAL;

import java.sql.*;
import java.util.Vector;

import Model.foodOrderedModel;

public class foodOrderedDAL {
    private static String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static String URL = "jdbc:mysql://localhost:3306/assignment";
    private static String USER = "root";
    private static String PASSWORD = "SQL.wcj74;";

    private Connection connection;

    public foodOrderedDAL()
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

    public boolean AddModel(foodOrderedModel model)
    {
        String sql = "insert into foodordered (orders,food,count) value(?,?,?)";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,model.getOrder());
            ps.setInt(2,model.getFood());
            ps.setInt(3,model.getCount());
            int line = ps.executeUpdate();
            if(line == 1)
                return true;
            return false;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public Vector<foodOrderedModel> GetModels(int order)
    {
        String sql = "select food,count from foodordered where orders=?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,order);
            ResultSet rs = ps.executeQuery();

            Vector<foodOrderedModel> models = new Vector<>();
            while (rs.next())
            {
                foodOrderedModel model = new foodOrderedModel();
                model.setOrder(order);
                model.setFood(rs.getInt("food"));
                model.setCount(rs.getInt("count"));

                models.add(model);
            }
            return models;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
}
