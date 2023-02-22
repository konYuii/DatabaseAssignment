package Servlet;

import BLL.storeBLL;
import Model.storeModel;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Vector;

@WebServlet(name = "SearchStore", value = "/SearchStore")
public class SearchStore extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");
        System.out.println("Search Post");

        String keyWord = URLDecoder.decode(request.getParameter("word"),"utf-8");
        int label = Integer.parseInt(request.getParameter("label"));

        storeBLL bll = new storeBLL();
        Vector<storeModel> stores = bll.GetModels(keyWord,label);
        Gson gson = new Gson();
        String rs = gson.toJson(stores);

        response.getWriter().append(rs);
    }
}
