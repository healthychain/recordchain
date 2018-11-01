package eu.mhutti1.healthchain.server.create;

/**
 * Created by jedraz on 01/11/2018.
 */
public class CreateRequestPatientHandler extends CreateRequestHandler {
  @Override
  public String getApproveEndpoint() {
    return "create_patient_approve";
  }

  @Override
  public String getDismissEndpoint() {
    return "";
  }
}
