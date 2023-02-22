package Servlet;

import BLL.storeBLL;
import BLL.userBLL;
import Model.storeModel;
import Model.userModel;
import Token.MyCoder;
import Token.token;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "GetInfo", value = "/GetInfo")
public class GetInfo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        String info = MyCoder.Decrypt(request.getParameter("token"));
        Gson gson = new Gson();
        token t = gson.fromJson(info, token.class);

        if(t.getType() == 0)
        {
            userBLL bll = new userBLL();
            userModel user = bll.GetModel(t.getId());
            String rs = gson.toJson(user);
            response.getWriter().append(rs);
            //System.out.println(rs);
        }
        if(t.getType() == 1)
        {
            storeBLL bll = new storeBLL();
            storeModel store = bll.GetModel(t.getId());
            String rs = gson.toJson(store);
            //System.out.println(rs);
            response.getWriter().append(rs);
        }

    }
}
