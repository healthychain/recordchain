package eu.mhutti1.healthchain.utils;

import java.math.BigInteger;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by jedraz on 26/10/2018.
 */
public class Crypto {

  public static String generateWalletId(String username) throws NoSuchAlgorithmException {
    return hashPlainText(username);
  }

  public static String generateWalletKey(String password) throws NoSuchAlgorithmException {
    return hashPlainText(password);
  }

  private static String hashPlainText(String plainText) throws NoSuchAlgorithmException {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] array = md.digest(plainText.getBytes(Charset.forName("UTF-8")));
    StringBuffer sb = new StringBuffer();
    for (int i = 0; i < array.length; ++i) {
      sb.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1,3));
    }
    return sb.toString();
  }
}
