package Servlet;

import BLL.storeBLL;
import BLL.userBLL;
import Model.storeModel;
import Model.userModel;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.net.URLDecoder;

@WebServlet(name = "Register", value = "/Register")
public class Register extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int type = Integer.parseInt(request.getParameter("type"));
        if(type == 0)
        {
            String name = URLDecoder.decode(request.getParameter("name"));
            String password = request.getParameter("password");

            userBLL userbll = new userBLL();
            userModel model = new userModel();
            model.setName(name);
            model.setPassword(password);

            int id = userbll.Add(model);

            response.getWriter().append(Integer.toString(id));
        }
        else if(type == 1)
        {
            String name = URLDecoder.decode(request.getParameter("name"));
            String introduction = URLDecoder.decode(request.getParameter("introduction"));
            String password = request.getParameter("password");
            int label = Integer.parseInt(request.getParameter("label"));

            storeBLL storebll = new storeBLL();
            storeModel model = new storeModel();
            model.setIntroduction(introduction);
            model.setName(name);
            model.setPassword(password);
            model.setLabel(label);

            //System.out.println(name);
            int id =storebll.Add(model);
            response.getWriter().append(Integer.toString(id));
        }

    }
}
