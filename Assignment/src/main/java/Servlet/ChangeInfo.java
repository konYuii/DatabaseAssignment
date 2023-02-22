package Servlet;

import BLL.storeBLL;
import BLL.userBLL;
import Model.userModel;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.net.URLDecoder;

@WebServlet(name = "ChangeInfo", value = "/ChangeInfo")
public class ChangeInfo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int type = Integer.parseInt(request.getParameter("type"));
        int id = Integer.parseInt(request.getParameter("id"));
        if(type == 0)
        {
            String name = URLDecoder.decode(request.getParameter("name"));
            String password = request.getParameter("password");

            userBLL userbll = new userBLL();
            userbll.UpdateInfo(id, "name", name);
            userbll.UpdateInfo(id,"password",password);
        }
        if(type == 1)
        {
            String name = URLDecoder.decode(request.getParameter("name"));
            String introduction = URLDecoder.decode(request.getParameter("introduction"));
            String password = request.getParameter("password");
            int label = Integer.parseInt(request.getParameter("label"));
            storeBLL storebll = new storeBLL();

            storebll.UpdateInfo(id, "name", name);
            storebll.UpdateInfo(id, "password",password);
            storebll.UpdateInfo(id, "introduction",introduction);
            storebll.UpdateInfo(id, "label", label);
        }
    }
}
