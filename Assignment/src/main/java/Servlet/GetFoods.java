package Servlet;

import BLL.orderBLL;
import Model.foodModel;
import Model.foodOrderedModel;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.Vector;

@WebServlet(name = "GetFoods", value = "/GetFoods")
public class GetFoods extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int orderID = Integer.parseInt(request.getParameter("id"));
        orderBLL orderbll = new orderBLL();

        Vector<foodOrderedModel> orders = orderbll.GetFoodsInOrder(orderID);
        Vector<foodModel> foods = new Vector<>();
        for(foodOrderedModel model: orders)
        {
            foods.add(orderbll.GetFoodInfo(model.getFood()));
        }

        Gson gson = new Gson();
        String s1 = gson.toJson(foods);
        String s2 = gson.toJson(orders);
        response.getWriter().append(s1+"&"+s2);
    }
}
