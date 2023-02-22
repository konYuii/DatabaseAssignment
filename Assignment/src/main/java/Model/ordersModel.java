package Model;


import java.math.BigDecimal;
import java.util.Date;


public class ordersModel {
    private int id;
    private int user;
    private int store;
    private Date date;
    private long time;
    private BigDecimal money;
    private  int status;
    private int rider;

    public int getID() {
        return id;
    }

    public void setID(int number) {
        this.id = number;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public int getStore() {
        return store;
    }

    public void setStore(int store) {
        this.store = store;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = new Date(date);
        this.time = date;
    }
    public void setDate(Date date){
        this.date = date;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public void setStatus(int status){this.status = status;}

    public int getStatus() {
        return status;
    }

    public void setRider(int rider) {
        this.rider = rider;
    }

    public int getRider() {
        return rider;
    }
}
