package Servlet;

import BLL.orderBLL;
import Model.foodOrderedModel;
import Model.ordersModel;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;

@WebServlet(name = "OrderSubmit", value = "/OrderSubmit")
public class OrderSubmit extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");

        Gson gson = new Gson();
        int user = Integer.parseInt(request.getParameter("user"));
        int store = Integer.parseInt(request.getParameter("store"));
        BigDecimal money =new BigDecimal(request.getParameter("money"));

        ordersModel order = new ordersModel();
        order.setUser(user);
        order.setStore(store);
        order.setMoney(money);
        order.setDate(new Date());
        order.setStatus(0);

        orderBLL orderbll = new orderBLL();
        int orderID = orderbll.SubmitOrder(order);

        //System.out.println(orderID);
        String[] s = request.getParameter("foods").split("},");
        for(int i=0; i<s.length;i++)
        {
            String food = s[i];
            //System.out.println(food);
            String[] ss = food.split(",");
            int id = Integer.parseInt(ss[0].substring(ss[0].indexOf(':') + 1));
            int cnt = 1;
            //System.out.println(ss[1]);
            if(i==s.length-1)
                cnt = Integer.parseInt(ss[1].substring(ss[1].indexOf(':') + 1, ss[1].indexOf('}')));
            else
                cnt = Integer.parseInt(ss[1].substring(ss[1].indexOf(':') + 1));
            foodOrderedModel ordered = new foodOrderedModel();
            ordered.setOrder(orderID);
            ordered.setFood(id);
            ordered.setCount(cnt);


            //System.out.println(cnt);
            orderbll.RecordFoodInOrder(ordered);
        }

    }
}
