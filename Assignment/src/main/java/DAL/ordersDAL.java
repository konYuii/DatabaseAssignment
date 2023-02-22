package DAL;

import Model.ordersModel;

import java.sql.*;
import java.util.Vector;

public class ordersDAL {
    private static String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static String URL = "jdbc:mysql://localhost:3306/assignment";
    private static String USER = "root";
    private static String PASSWORD = "SQL.wcj74;";

    private Connection connection;

    public ordersDAL()
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

    public boolean Exist(int id)
    {
        String sql = "select count(1) from orders where id = ?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            if(rs==null)
                return false;
            return true;

        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public ordersModel GetModelByID(int id)
    {
        String sql = "select user,store,dates,money,status from orders where id = ?";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            rs.next();
            ordersModel model = new ordersModel();

            model.setID(id);
            model.setUser(rs.getInt("user"));
            model.setStore(rs.getInt("store"));
            model.setDate(rs.getDate("dates").getTime());
            model.setMoney(rs.getBigDecimal("money"));
            model.setStatus(rs.getInt("status"));

            return model;

        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }

    public Vector<ordersModel> GetModelByUser(int user)
    {
        String sql = "select id,store,dates,money,status,rider from orders where user = ? order by status, dates DESC";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,user);
            ResultSet rs = ps.executeQuery();

            Vector<ordersModel> orders = new Vector<>();
            while(rs.next())
            {
                ordersModel model = new ordersModel();
                model.setID(rs.getInt("id"));
                model.setUser(user);
                model.setStore(rs.getInt("store"));
                model.setDate(rs.getDate("dates").getTime());
                model.setMoney(rs.getBigDecimal("money"));
                model.setStatus(rs.getInt("status"));
                model.setRider(rs.getInt("rider"));
                orders.add(model);
            }
            return orders;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    public Vector<ordersModel> GetModelByStore(int store)
    {
        String sql = "select id,user,dates,money,status,rider from orders where store = ? order by status, dates DESC";
        try {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1,store);
            ResultSet rs = ps.executeQuery();

            Vector<ordersModel> orders = new Vector<>();
            while(rs.next())
            {
                ordersModel model = new ordersModel();
                model.setID(rs.getInt("id"));
                model.setUser(rs.getInt("user"));
                model.setStore(store);
                model.setDate(rs.getDate("dates").getTime());
                model.setMoney(rs.getBigDecimal("money"));
                model.setStatus(rs.getInt("status"));
                model.setRider(rs.getInt("rider"));
                orders.add(model);
            }
            return orders;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }

    public int AddModel(ordersModel order)
    {
        String sql = "insert into orders (user,store,dates,money,status) value(?,?,?,?,?)";
        try {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1,order.getUser());
            ps.setInt(2,order.getStore());
            ps.setDate(3, new Date(order.getDate().getTime()));
            ps.setBigDecimal(4,order.getMoney());
            ps.setInt(5,0);

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

    public boolean UpdateStatus(int id, int status)
    {
        String sql = "update orders set status=? where id=?";
        try{
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1, status);
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
    public boolean UpdateRider(int id,int rider)
    {
        String sql = "update orders set rider=? where id=?";
        try{
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1, rider);
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
}
