package com.jin.bbs.bbsbackend.service.user.account;

import java.util.Map;

public interface VerifyService {
    Map<String,String>  verify(String reqToken);
}
