package com.jin.bbs.bbsbackend.service.impl.account;

import com.jin.bbs.bbsbackend.service.user.account.VerifyService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class VerifyServiceImpl implements VerifyService {
    @Value("${turnstile.secret}")
    private String secretKey;

    @Override
    public Map<String, String> verify(String reqToken) {
        String url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> params = new HashMap<>();
        params.put("secret", secretKey);
        params.put("response", reqToken);

        ResponseEntity<Map> turnstileResponseEntity = restTemplate.postForEntity(url, params, Map.class);
        Map turnstileResult = turnstileResponseEntity.getBody();
        System.out.println(turnstileResult);
        Map<String,String> map = new HashMap<>();
        if (turnstileResult == null || !(Boolean) turnstileResult.get("success")) {
            map.put("error_message","error");
        }else{
            map.put("error_message","success");
        }
        return map;
    }
}
