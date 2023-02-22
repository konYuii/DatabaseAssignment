package Servlet;

import BLL.storeBLL;
import Model.foodModel;
import Model.storeModel;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.Vector;

@WebServlet(name = "GetRestaurant", value = "/GetRestaurant")
public class GetRestaurant extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int id = Integer.parseInt(request.getParameter("id"));

        storeBLL store = new storeBLL();
        Vector<foodModel> foods = store.GetFoods(id);

        Gson gson = new Gson();
        String s1 = gson.toJson(foods);

        storeModel info = store.GetModel(id);
        s1 = gson.toJson(info) + "&" + s1;

        //System.out.println(s1);
        response.getWriter().write(s1);
    }
}
