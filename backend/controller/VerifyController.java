package com.jin.bbs.bbsbackend.controller.user.account;

import com.jin.bbs.bbsbackend.service.user.account.VerifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class VerifyController {
    @Autowired
    private VerifyService verifyService;

    @PostMapping("/api/user/account/verify/")
    public Map<String,String>  Verify(@RequestParam Map<String,String> map){
        String turnstileResponse = map.get("turnstileResponse");

        return verifyService.verify(turnstileResponse);
    }
}
