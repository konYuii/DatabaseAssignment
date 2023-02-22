package BLL;

import DAL.foodDAL;
import DAL.foodOrderedDAL;
import DAL.ordersDAL;
import DAL.ridersDAL;
import Model.foodModel;
import Model.foodOrderedModel;
import Model.ordersModel;

import java.util.Vector;

public class orderBLL {
    private final ordersDAL orderdal = new ordersDAL();
    private final foodOrderedDAL foodOrdereddal = new foodOrderedDAL();
    private final foodDAL fooddal = new foodDAL();
    private final ridersDAL ridersdal = new ridersDAL();
    public orderBLL(){}

    public int SubmitOrder(ordersModel order){ return orderdal.AddModel(order); }

    public void RecordFoodInOrder(foodOrderedModel foodOrdered){ foodOrdereddal.AddModel(foodOrdered); }

    public Vector<foodOrderedModel> GetFoodsInOrder(int order){ return foodOrdereddal.GetModels(order);}

    public foodModel GetFoodInfo(int food){return fooddal.GetModel(food);}

    public void ChangeOrderStatus(int id, int status)
    {
        orderdal.UpdateStatus(id, status);
        if(status == 1)
        {
            orderdal.UpdateRider(id, ridersdal.GetModelFree().getId());
        }
    }

}
