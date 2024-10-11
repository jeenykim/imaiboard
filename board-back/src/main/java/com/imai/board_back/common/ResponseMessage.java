package com.imai.board_back.common;

public class ResponseMessage {

    public static final String SUCCESS = "Success";

    //HTTP Status 400
    public static final String VALIDATION_FAILED = "Validation_Failed";
    public static final String DUPLICATE_EMAIL = "Duplicate_Email";
    public static final String DUPLICATE_NICKNAME = "Duplicate_Nickname";
    public static final String DUPLICATE_TEL_NUMBER = "Duplicate_tel_number";
    public static final String NOT_EXISTED_USER = "This user does not_exist";
    public static final String NOT_EXISTED_BOARD = "This board does not_exist";

    //HTTP Status 401
    public static final String SIGN_IN_FAIL = "Login information mismatch";
    public static final String AUTHORIZATION_FAIL = "Authorization_Failed";

    //HTTP Status 403
    public static final String NO_PERMISSION = "Do not have permission";

    //HTTP Status 500
    public static final String DATABASE_ERROR = "Database_error";
    
}
