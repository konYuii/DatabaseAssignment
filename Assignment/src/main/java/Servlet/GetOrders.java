package Servlet;

import BLL.orderBLL;
import BLL.storeBLL;
import BLL.userBLL;
import Model.*;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.Vector;

@WebServlet(name = "GetOrders", value = "/GetOrders")
public class GetOrders extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int user = Integer.parseInt(request.getParameter("user"));
        int type = Integer.parseInt(request.getParameter("type"));

        Gson gson = new Gson();
        if(type == 0)
        {
            userBLL userbll = new userBLL();
            Vector<ordersModel> orders = userbll.GetUserOrder(user);
            String s1 = gson.toJson(orders);

            storeBLL storebll = new storeBLL();
            Vector<storeModel> storeInfo = new Vector<>();
            for(ordersModel order : orders)
            {
                storeModel store = storebll.GetModel(order.getStore());
                //System.out.println(store);
                storeInfo.add(store);
            }
            String s2 = gson.toJson(storeInfo);

            response.getWriter().append(s1+"&"+s2);
        }
        if(type == 1)
        {
            storeBLL storebll = new storeBLL();
            Vector<ordersModel> orders = storebll.GetStoreOrder(user);
            String s1 = gson.toJson(orders);

            userBLL userbll = new userBLL();
            Vector<userModel> users = new Vector<>();
            for(ordersModel order : orders)
            {
                userModel model = userbll.GetModel(order.getUser());
                users.add(model);
            }
            String s2 = gson.toJson(users);

            orderBLL orderbll = new orderBLL();
            Vector<foodOrderedModel> foods = new Vector<>();
            for(ordersModel order : orders)
            {
                Vector<foodOrderedModel> fo = orderbll.GetFoodsInOrder(order.getID());
                foods.addAll(fo);
            }
            String s3 = gson.toJson(foods);

            Vector<foodModel> foodInfo = storebll.GetFoods(user);
            String s4 = gson.toJson(foodInfo);

            response.getWriter().append(s1+"&"+s2+"&"+s3+"&"+s4);
        }
    }
}
