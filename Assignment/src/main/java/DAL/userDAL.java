package DAL;

import java.sql.*;
import java.util.Vector;

import Model.userModel;

public class userDAL {
    private static String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static String URL = "jdbc:mysql://localhost:3306/assignment";
    private static String USER = "root";
    private static String PASSWORD = "SQL.wcj74;";

    private Connection connection;

    public userDAL()
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

    public boolean Exist(userModel user)
    {
        String sql = "select 1 from user where id = ? and password = ? limit 1";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,user.getId());
            ps.setString(2,user.getPassword());
            ResultSet rs = ps.executeQuery();
            if(!rs.next())
                return false;
            return true;

        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public userModel GetModel(int id)
    {
        String sql = "select name,password from user where id = ?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            rs.next();
            userModel model = new userModel();
            model.setName(rs.getString("name"));
            model.setId(id);
            model.setPassword(rs.getString("password"));
            return model;

        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }

    public boolean Update(int id, String word, String value)
    {
        String sql = "update user set "+word + "=? where id=?";
        try{
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setString(1,value);
            ps.setInt(2,id);
            int line = ps.executeUpdate();
            if(line == 1)
                return true;
            return false;

        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public int AddModel(userModel user)
    {
        String sql = "insert into user (name,password) values(?,?)";
        try {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1,user.getName());
            ps.setString(2,user.getPassword());

            ps.execute();
            ResultSet rs = ps.getGeneratedKeys();
            if(rs.next())
                return rs.getInt(1);
            return -1;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return -1;
    }

    public Vector<Integer> GetAllUsers()
    {
        Vector<Integer> users = new Vector<>();

        String sql = "select id from user";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while(rs.next())
            {
                users.add(rs.getInt("id"));
            }

            return users;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
}
