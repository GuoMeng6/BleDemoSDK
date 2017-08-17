import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  DeviceEventEmitter,
  View,
} from 'react-native';

import ble from './services/ble/';
// import ble from './services2';

export default class sdkDemo extends Component {
  componentWillMount() {
    console.log('========= componentWillMount ========');
    // 监听事件名为EventName的事件
    DeviceEventEmitter.addListener('ble', msg => {
      // this.showState();
      // alert("send success");
      console.log('======= msg = ', msg);
      switch (msg) {
        case 'connect':
          ble.connect({ ssid: 'Officewell#1000016', connId: 'FFF1' });
          break;
        case 'moveUp':
          ble.getPeskController().moveUp();
          break;
        case 'moveDown':
          ble.getPeskController().moveDown();
          break;
        case 'moveStop':
          ble.getPeskController().moveStop();
          break;
        default:
      }

      // this.timer = setTimeout(() => {
      //   console.log('========== 暂停三秒结束 =====');
      // NativeModules.BleNativeMoudle.testCallNative('连接成功');
      // }, 3000);
    });
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  constructor(props) {
    super(props);
    this.state = {
      content: '这个是预定的接受信息',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.callNative.bind(this)}>
          当你点我的时候会调用原生方法，原生方法延迟3s后会向前端发送事件。 前端一直在监听该事件，如果收到，则给出alert提示!
        </Text>

        <Text style={styles.welcome}>
          {this.state.content}
        </Text>
      </View>
    );
  }

  callNative() {
    // NativeModules.MyModule.NativeMethod();
    ble.connect({ ssid: 'Officewell#1000016', connId: 'FFF1' });
  }

  showState() {
    this.setState({ content: '已经收到了原生模块发送来的事件' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('sdkDemo', () => sdkDemo);
