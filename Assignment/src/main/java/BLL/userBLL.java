package BLL;
import DAL.ordersDAL;
import Model.userModel;
import DAL.userDAL;
import Model.ordersModel;

import java.util.Vector;

public class userBLL {
    private final userDAL userdal = new userDAL();
    private final ordersDAL orderdal = new ordersDAL();

    public userBLL()
    {
    }

    public boolean Exist(userModel user)
    {
        return userdal.Exist(user);
    }

    public int Add(userModel model)
    {
        return userdal.AddModel(model);
    }

    public userModel GetModel(int id)
    {
        return  userdal.GetModel(id);
    }

    public Vector<ordersModel> GetUserOrder(int user)
    {
        return orderdal.GetModelByUser(user);
    }

    public void UpdateInfo(int id, String word, String value) { userdal.Update(id,word,value);}

}
