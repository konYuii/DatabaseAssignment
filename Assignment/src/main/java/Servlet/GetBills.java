package Servlet;

import BLL.storeBLL;
import BLL.userBLL;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "GetBills", value = "/GetBills")
public class GetBills extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");
        System.out.println("Bill Post");

        int type = Integer.parseInt(request.getParameter("type"));
        int id = Integer.parseInt(request.getParameter("id"));

        Gson gson = new Gson();
        if(type == 0)
        {
            userBLL user = new userBLL();
            String rs = gson.toJson(user.GetUserOrder(id));
            response.getWriter().append(rs);
        }
        if(type == 1)
        {
            storeBLL store = new storeBLL();
            String rs = gson.toJson(store.GetStoreOrder(id));
            response.getWriter().append(rs);
        }
    }
}
