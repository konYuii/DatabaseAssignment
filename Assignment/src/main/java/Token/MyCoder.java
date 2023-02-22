package Token;

import com.mysql.cj.util.Base64Decoder;

import java.util.Base64;

public class MyCoder {

    public static String Encrypt(String inStr){
        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; i++){
            a[i] = (char) (a[i] ^ 't');
        }
        String s = new String(a);
        return s;
    }

    public static String Decrypt(String s)
    {
        return Encrypt(s);
    }
}
