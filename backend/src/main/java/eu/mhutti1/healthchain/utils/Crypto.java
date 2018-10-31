package eu.mhutti1.healthchain.utils;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.Random;

/**
 * Created by jedraz on 26/10/2018.
 */
public class Crypto {

  public static int DID_LENGTH = 22;

  public static String hashPlainText(String plainText) {
    return DigestUtils.sha1Hex(plainText);
  }

  public static String createToken() {
    return RandomStringUtils.randomAlphanumeric(32);
  }

  private static char getCharFromRandomNumber(int number) {
    return (char) (97 + number % 25);
  }

  // Important did has to have 22 chars !!!
  public static String getDid(String username) {
    String encoded = hashPlainText(username);
    if (encoded.length() >= DID_LENGTH) {
      return encoded.substring(0, DID_LENGTH);
    }
    Random randomGenerator = new Random(encoded.hashCode());
    StringBuilder sb = new StringBuilder(encoded);
    while(sb.length() < DID_LENGTH) {
      sb.append(String.valueOf(getCharFromRandomNumber(randomGenerator.nextInt())));
    }
    return sb.toString();
  }

}
