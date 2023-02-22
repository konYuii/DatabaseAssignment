package BLL;

import DAL.ordersDAL;
import DAL.storeDAL;
import DAL.foodDAL;
import Model.ordersModel;
import Model.storeModel;
import Model.foodModel;

import java.util.Vector;

public class storeBLL {
    private final storeDAL storedal = new storeDAL();
    private final ordersDAL orderdal = new ordersDAL();
    private final foodDAL fooddal = new foodDAL();

    public boolean Exist(storeModel store)
    {
        return storedal.Exist(store);
    }

    public int Add(storeModel store)
    {
        return storedal.AddModel(store);
    }

    public storeModel GetModel(int id)
    {
        return  storedal.GetModel(id);
    }
    public Vector<storeModel> GetModels(String word,int label) {
        Vector<Integer> ids = new Vector<>();
        if(label!=-1)
            ids = storedal.GetSomeStores(word, label);
        else
        {
            Vector<Integer> labels = storedal.GetLabels();
            for(int lab : labels)
            {
                ids.addAll(storedal.GetSomeStores(word,lab));
            }
        }
        Vector<storeModel> stores = new Vector<>();
        for(int i:ids)
        {
            stores.add(GetModel(i));
        }
        return stores;
    }

    public Vector<ordersModel> GetStoreOrder(int store)
    {
        return orderdal.GetModelByStore(store);
    }

    public Vector<foodModel> GetFoods(int store) {return fooddal.GetModels(store);}

    public void ModifyFood(foodModel model) { fooddal.ChangeModel(model);}
    public void AddFood(foodModel model) { fooddal.AddModel(model); }

    public void UpdateInfo(int id, String word, String value) { storedal.Update(id,word,value);}
    public void UpdateInfo(int id, String word, int value) { storedal.Update(id,word,value);}
}
