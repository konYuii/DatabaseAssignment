package Servlet;

import BLL.storeBLL;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.net.URLDecoder;

@WebServlet(name = "UpdatePath", value = "/UpdatePath")
public class UpdatePath extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/plain");
        response.setCharacterEncoding("utf-8");

        String path = URLDecoder.decode(request.getParameter("path"));
        String type = request.getParameter("type");
        int id = Integer.parseInt(request.getParameter("id"));
        System.out.println(path);
        if(type.equals(new String("food")))
        {
            storeBLL storebll = new storeBLL();
            storebll.ChangeFoodImage(path, id);
        }
        else if(type.equals(new String("store")))
        {
            storeBLL storebll = new storeBLL();
            //System.out.println(type);
            storebll.UpdateInfo(id, "image", path);
        }

    }
}
