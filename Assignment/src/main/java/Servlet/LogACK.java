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

@WebServlet(name = "LogACK", value = "/LogACK")
public class LogACK extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");
        System.out.println("Log POST");
        //String userName = URLDecoder.decode(request.getParameter("name"),"utf-8");
        String id = request.getParameter("id");
        String password = request.getParameter("password");

        if(id=="" || password=="")
        {
            response.getWriter().append("Failed: ID or PASSWORD is null!");
            return;
        }

        int type = Integer.parseInt(request.getParameter("type"));
        Gson gson = new Gson();
        if(type == 0)
        {
            userModel user = new userModel();
            user.setId(Integer.parseInt(id));
            user.setPassword(password);

            userBLL bll = new userBLL();
            if(bll.Exist(user))
            {
                //response.getWriter().append("Success");
                token userToken= new token();
                userToken.setId(Integer.parseInt(id));
                userToken.setType(type);


                String t = gson.toJson(userToken);
                t = MyCoder.Encrypt(t);
                response.getWriter().append(t);
                //System.out.println("Exist");
            }

            else
            {
                response.getWriter().append("Failed");
                //System.out.println("None");
            }
        }
        if(type == 1)
        {
            storeModel store = new storeModel();
            store.setId(Integer.parseInt(id));
            store.setPassword(password);

            storeBLL bll = new storeBLL();
            if(bll.Exist(store))
            {
                token storeToken = new token();
                storeToken.setId(Integer.parseInt(id));
                storeToken.setType(type);

                String t = gson.toJson(storeToken);
                t = MyCoder.Encrypt(t);
                response.getWriter().append(t);
            }

            else
                response.getWriter().append("Failed");
        }
    }
}
