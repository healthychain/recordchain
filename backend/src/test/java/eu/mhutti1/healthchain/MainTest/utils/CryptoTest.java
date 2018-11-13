package eu.mhutti1.healthchain.MainTest.utils;

import com.google.common.primitives.Chars;
import eu.mhutti1.healthchain.utils.Crypto;
import org.bitcoinj.core.Base58;
import org.junit.Test;

import java.util.Arrays;
import java.util.stream.IntStream;

import static junit.framework.TestCase.assertTrue;

/**
 * Created by jedraz on 11/11/2018.
 */
public class CryptoTest {

  @Test
  public void getDidGeneratesBase58EncodedIds() {
    String username = "test_username";

    String did = Crypto.getDid(username);

    for(Character c : did.toCharArray()) {
      assertTrue(Chars.asList(Base58.ALPHABET).contains(c));
    }

  }

  @Test
  public void getDidGeneratesIdWithLength22() {

    String username = "test_username";

    String did = Crypto.getDid(username);

    assertTrue(did.length() == Crypto.DID_LENGTH);
  }

  @Test
  public void createTokenGeneratesAStringWithLength32() {

    IntStream.range(0, 10).forEachOrdered(n -> {

      String token = Crypto.createToken();
      assertTrue(token.length() == 32);
    });

  }
}
