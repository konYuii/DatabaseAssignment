package Servlet;

import BLL.storeBLL;
import Model.foodModel;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.Vector;

@WebServlet(name = "GetStoreFoods", value = "/GetStoreFoods")
public class GetStoreFoods extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int storeID = Integer.parseInt(request.getParameter("id"));
        storeBLL storebll = new storeBLL();
        Vector<foodModel> foods = storebll.GetFoods(storeID);

        Gson gson = new Gson();
        String s = gson.toJson(foods);

        //System.out.println(s);
        response.getWriter().append(s);
    }
}
