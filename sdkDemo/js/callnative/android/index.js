import { NativeModules } from 'react-native';

const MyModule = NativeModules.MyModule;
function callToNative(message) {
  MyModule.rnCallNative(message);
}

function connectedSuccess(data) {
  console.log('============ [传输层]  =====  data = ', data);
  MyModule.connectSuccessed(data);
}

module.exports = {
  callToNative,
  connectedSuccess,
};
