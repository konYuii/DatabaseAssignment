package DAL;

import Model.storeModel;
import Model.userModel;

import java.sql.*;
import java.util.Vector;

public class storeDAL {
    private static String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static String URL = "jdbc:mysql://localhost:3306/assignment";
    private static String USER = "root";
    private static String PASSWORD = "SQL.wcj74;";

    private Connection connection;

    public storeDAL()
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

    public boolean Exist(storeModel store)
    {
        String sql = "select count(1) from store where id = ? and password = ?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,store.getId());
            ps.setString(2,store.getPassword());
            ResultSet rs = ps.executeQuery();
            if(rs==null)
                return false;
            return true;

        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public storeModel GetModel(int id)
    {
        String sql = "select name,introduction,label,password from store where id=?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            rs.next();
            storeModel model = new storeModel();
            model.setName(rs.getString("name"));
            model.setId(id);
            model.setIntroduction(rs.getString("introduction"));
            model.setLabel(rs.getInt("label"));
            model.setPassword(rs.getString("password"));
            return model;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    public boolean Update(int id, String word, String value)
    {
        String sql = "update store set "+word + "=? where id=?";
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
    public boolean Update(int id, String word, int value)
    {
        String sql = "update store set "+word + "=? where id=?";
        try{
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,value);
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

    public int AddModel(storeModel store)
    {
        String sql = "insert into store (name,introduction,label,password) values(?,?,?,?)";
        try {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1,store.getName());
            ps.setString(2,store.getIntroduction());
            ps.setInt(3,store.getLabel());
            ps.setString(4,store.getPassword());

            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if(rs.next())
                return rs.getInt(1);
            return -1;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return -1;
    }

    public Vector<Integer> GetSomeStores(String word, int label)
    {
        Vector<Integer> stores = new Vector<>();
        String sql = "select id from store where label=? and name like ?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,label);

            ps.setString(2,"%" + word + "%");
            ResultSet rs = ps.executeQuery();
            while(rs.next())
            {
                stores.add(rs.getInt("id"));
            }

            return stores;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    public Vector<Integer> GetLabels()
    {
        Vector<Integer> labels= new Vector<>();
        String sql = "select distinct label from store";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ResultSet rs = ps.executeQuery(sql);
            while(rs.next())
            {
                labels.add(rs.getInt("label"));
            }
            return labels;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
}
