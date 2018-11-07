package eu.mhutti1.healthchain.server.proof;

import eu.mhutti1.healthchain.server.events.EventConsumer;

/**
 * Created by root on 07/11/18.
 */
public class ProofRequestPatientHandler extends ProofRequestHandler {
  @Override
  protected String getDismissEndpoint() {
    return "";
  }

  @Override
  protected String getApproveEndpoint() {
    return "proof_request_patient_approve";
  }
}
