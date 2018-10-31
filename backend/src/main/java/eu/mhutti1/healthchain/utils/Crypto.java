package eu.mhutti1.healthchain.utils;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;

/**
 * Created by jedraz on 26/10/2018.
 */
public class Crypto {

  public static String hashPlainText(String plainText) {
    return DigestUtils.sha1Hex(plainText);
  }

  public static String createToken() {
    return RandomStringUtils.randomAlphanumeric(32);
  }

}
