package Servlet;

import BLL.storeBLL;
import Model.foodModel;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLDecoder;

@WebServlet(name = "ModifyStoreFoods", value = "/ModifyStoreFoods")
public class ModifyStoreFoods extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/html;charset=utf-8");

        int storeID = Integer.parseInt(request.getParameter("id"));
        String info = request.getParameter("info") ;
        String newFoods = request.getParameter("news") ;

        storeBLL storebll = new storeBLL();
        if(info != "")
        {
            info = URLDecoder.decode(info);

            String[] foods = info.split("},");
            for(String food : foods)
            {
                String[] s = food.split(",");
                int id = Integer.parseInt(s[0].substring(s[0].indexOf(':')+1));
                String name = s[1].substring(8,s[1].lastIndexOf('"'));
                float price = 0.0f;
                if(s[2].indexOf('}') != -1)
                {
                    price = Float.parseFloat(s[2].substring(s[2].indexOf(':')+1,s[2].indexOf('}')));
                }
                else {
                    price = Float.parseFloat(s[2].substring(s[2].indexOf(':')+1));
                }
                foodModel model = new foodModel();
                model.setId(id);
                model.setStore(storeID);
                model.setName(name);
                model.setPrice(new BigDecimal(price));
                storebll.ModifyFood(model);
            }
        }


        if(newFoods != "")
        {
            newFoods = URLDecoder.decode(newFoods);
            String[] foods = newFoods.split("},");
            for(String food : foods)
            {
                String[] s = food.split(",");
                String name = s[0].substring(9,s[0].lastIndexOf('"'));
                float price = 0.0f;
                if(s[1].indexOf('}') != -1)
                {
                    price = Float.parseFloat(s[1].substring(s[1].indexOf(':')+1,s[1].indexOf('}')));
                }
                else {
                    price = Float.parseFloat(s[1].substring(s[1].indexOf(':')+1));
                }
                foodModel model = new foodModel();
                model.setStore(storeID);
                model.setName(name);
                model.setPrice(new BigDecimal(price));
                storebll.AddFood(model);
            }
        }



    }
}
