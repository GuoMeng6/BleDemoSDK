import { Platform } from 'react-native';
import BleController from './BleController';
import getUUID from './getUUID';
import bleStatusManager from '../bleStatusManager';
import { callToNative, connectedSuccess } from '../../../callnative/android';

export default class PeskController {
  constructor() {
    this.version = 2;
    this.bleController = new BleController();
    this.connId = '';
    this.serviceId = '';
    this.connectPromise = null;
    this.unit = 'cm';
    this.onHeightCallback = null;
    this.defaultHeights = [0, 0, 0, 0];
    this.cache = {};
    this.interval = setInterval(() => {
      if (this.currentAction) {
        this.currentAction();
      }
    }, 150);
  }

  reset() {
    clearInterval(this.interval);
    return this.bleController.destructor();
  }

  connect({ connId, serviceId }) {
    this.serviceId = getUUID(serviceId);

    if (this.connId === connId) {
      return this.connectPromise;
    }

    this.connId = connId;
    this.connectPromise = this.bleController.connect({
      connId,
      serviceId,
      onConnect: currentDevice => {
        console.log('[Pesk] connected', connId);
        this.retrieveServices(currentDevice).then(peripheralInfo => {
          console.log('========= peripheralInfo = ', peripheralInfo);
          this.peripheralInfo = peripheralInfo;
          bleStatusManager.setRetrieveServicesStatus();
          connectedSuccess({ status: 'success', peripheralInfo });
        });
      },
    });

    return this.connectPromise;
  }

  retrieveServices(currentDevice) {
    console.log('[Pesk]  retrieveServices');
    return this.bleController.retrieveServices(currentDevice);
  }

  moveUp() {
    console.log('============ [Pesk] move up');
    this.currentAction = () => {
      this.writeUnderPlatform(this.serviceId, getUUID('FFF4'), [0x01]);
    };

    this.currentAction();
  }

  moveDown() {
    console.log('[Pesk] move down');
    this.currentAction = () => {
      this.writeUnderPlatform(this.serviceId, getUUID('FFF4'), [0x02]);
    };

    this.currentAction();
  }

  moveStop() {
    console.log('[Pesk] move stop');
    this.currentAction = null;
    return this.writeUnderPlatform(this.serviceId, getUUID('FFF4'), [0x00]);
  }

  writeUnderPlatform(deviceUUID, characteristicUUID, data) {
    if (Platform.OS === 'ios') {
      return this.bleController
        .write(deviceUUID, characteristicUUID, data)
        .catch(console.warn);
    }
    return this.bleController
      .writeWithoutResponse(deviceUUID, characteristicUUID, data)
      .catch(console.warn);
  }
}
