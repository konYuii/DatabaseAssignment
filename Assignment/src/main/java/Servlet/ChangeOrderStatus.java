package Servlet;

import BLL.orderBLL;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "ChangeOrderStatus", value = "/ChangeOrderStatus")
public class ChangeOrderStatus extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int id = Integer.parseInt(request.getParameter("id"));
        int status = Integer.parseInt(request.getParameter("status"));

        orderBLL orderbll = new orderBLL();
        orderbll.ChangeOrderStatus(id, status);
    }
}
