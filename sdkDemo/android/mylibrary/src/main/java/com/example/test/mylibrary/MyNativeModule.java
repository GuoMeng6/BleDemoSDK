package com.example.test.mylibrary;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static android.R.attr.data;


/**
 * Created by 9am on 2017/8/14.
 */

public class MyNativeModule extends ReactContextBaseJavaModule {
    private final String TAG = "sdkDemo";
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        //给上下文对象赋值
        Test.myContext=reactContext;
    }

    @Override
    public String getName() {
        return "MyModule";
    }

    @ReactMethod
    public void rnCallNative(String msg){
        Log.d(TAG,"======== msg = "+msg);
        new Test().connected(msg);
    }

    @ReactMethod
    public void connectSuccessed(ReadableMap options){
        String status = options.getString("status");
        Log.d(TAG,"========= status = "+status);
        if(status == "success"){
//            HashMap map = new HashMap<String,Object>();
//            map.put("status",)
//            ArrayList list = new ArrayList<>();
//            list.add(0,);
            new Test().connected("连接成功");
        }
    }
}

