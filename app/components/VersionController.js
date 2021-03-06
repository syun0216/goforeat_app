import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ProgressBarAndroid,
  ProgressViewIOS,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import CodePush from "react-native-code-push";
import {isNil} from 'lodash';
//component
import Text from "./UnScalingText";
import CommonBottomBtn from "./CommonBottomBtn";
//utils
import GLOBAL_PARAMS, { em } from "../utils/global_params";
import * as ViewStatus from "../utils/ViewStatus";
import ToastUtils from "../utils/ToastUtil";
import Colors from "../utils/Colors";
import { getVersion } from "../utils/DeviceInfo";

const styles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    backgroundColor: '#fff',
    borderBottomLeftRadius: em(8),borderBottomRightRadius: em(8),
  },
  topContainer: {
    justifyContent: "center",
    borderTopLeftRadius: em(8),
    borderTopRightRadius: em(8),
    paddingLeft: em(20),
    paddingTop: em(60),
    paddingBottom: em(80),
    overflow: "hidden",
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
  },
  topText1: {
    color: "#fff",
    fontSize: em(25),
    marginBottom: em(5),
    fontWeight: "500"
  },
  topText2: {
    color: "#fff",
    fontSize: em(18)
  },
  topImg: {
    width: em(160),
    height: em(160),
    position: "absolute",
    top: em(-70),
    right: -10,
    zIndex: 3
  },
  mediumImg: {
    width: "100%",
  },
  bottomContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: em(100),
    bottom: 100,
    left: 0,
    right: 0,
    paddingLeft: em(30),
  },
  bottomText: {
    fontSize: em(18),
    lineHeight: em(30)
  },
  btnContainer:{
    alignSelf: "center",
    backgroundColor: '#fff',
    position: 'absolute',
    height: em(100),
    bottom: 30,
    left: 0,
    right: 0,
  },
  bottomBtn: {
    height: em(10),
    borderRadius: em(15),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#68B0F7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    backgroundColor: "#68B0F7",
    width: em(100),
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: em(20),
  }
});

export default class VersionController extends Component {
  
  static defaultProps = {
    remotePackage: null
  }

  state = {
    isVisible: false,
    progress: 0.0,
    viewStatus:  ViewStatus.VIEW_STATUS_INITIAL
  };

  //logic
  setModalVisible = status => {
    this.setState({ isVisible: status });
  }

  _startDownload() {
    const { remotePackage } = this.props;
    if(isNil(remotePackage)) {
      ToastUtils.showWithMessage("找不到安裝包...");
      this.setModalVisible(false);
      return;
    }
    this.setState({
      progress: 0.0,
      viewStatus: ViewStatus.VIEW_STATUS_DATA
    });

    remotePackage.download(progress => this._downloadProgressHasChange(progress))
    .then(localPackage => {
      if(localPackage) {
        if(Platform.OS == 'ios') {
          localPackage.install(CodePush.InstallMode.IMMEDIATE)
        }else if(Platform.OS == 'android') {
          this.setState({
            isVisible: false //隐藏更新框再安装更新包 否则会导致卡死(安卓)
          },() => {
            setTimeout(() => {
              localPackage.install(CodePush.InstallMode.IMMEDIATE)
            }, 600)
          })
        }        
      }else {
        this.setState({
          viewStatus: ViewStatus.VIEW_STATUS_REQUEST_NETWORK_ERROR
        })
      }
    }).catch(error => {
      this.setState({
        viewStatus: ViewStatus.VIEW_STATUS_REQUEST_NETWORK_ERROR
      });
    });
  }

  _downloadProgressHasChange(progress) {
    let progressValue = (progress.receivedBytes * 1.0) / progress.totalBytes;
    this.setState({ progress: progressValue });
  }

  //render
  _renderLoadingProgressView() {
    return (
      <View style={{justifyContent: 'center',paddingTop: em(20)}}>
        {Platform.OS == "ios" ? (
          <ProgressViewIOS
            progressTintColor="#FF312F"
            style={{ width: GLOBAL_PARAMS._winWidth*0.75,transform: [{ scaleX: 1.0 }, { scaleY: 4 }], }}
            progress={this.state.progress}
          />
        ) : null}
        {Platform.OS == "android" ? (
          <ProgressBarAndroid
            style={{ width: GLOBAL_PARAMS._winWidth*0.75,transform: [{ scaleX: 1.0 }, { scaleY: 4 }], }}
            color="#FF312F"
            styleAttr="Horizontal"
            indeterminate={false}
            progress={this.state.progress}
          />
        ) : null}
        <Text style={[styles.bottomText, {marginTop: em(8),}]}>更新中,請稍候...</Text>
      </View>
    );
  }

  _renderUpdateStatusView() {
    const { remotePackage } = this.props;
    let _descrition = ['提高了應用程式的穩定性'];
    if(remotePackage && remotePackage.description) {
      let _formatDes = remotePackage.description.replace(/[；、;，\/\\]/g, ",");
      _descrition = _formatDes.split(",");
    }
    switch(this.state.viewStatus) {
      case ViewStatus.VIEW_STATUS_INITIAL:{
        return (
          <View>
            {
              _descrition.map((item, idx) => (
                <Text key={idx} style={styles.bottomText}>{item}</Text>
              ))
            }
          </View>
        )
      };
      case ViewStatus.VIEW_STATUS_DATA: {
        return this._renderLoadingProgressView()
      };
      case ViewStatus.VIEW_STATUS_REQUEST_NETWORK_ERROR: {
        return (
          <Text style={[styles.bottomText,{marginTop: em(10), fontSize: em(20), color: Colors.main_red}]}>更新失敗,請重試</Text>
        )
      }
    }
  }

  _renderModalContent() {
    const { viewStatus } = this.state;
    return (
      <View style={styles.modalContainer}>
        <Image
          style={styles.topImg}
          source={require("../asset/1.3.7/rocket.png")}
          resizeMode="contain"
        />
        <LinearGradient
          colors={["#FF881D", "#FF312F"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.topContainer}
        >
          <Text style={styles.topText1}>發現新版本更新</Text>
          <Text style={styles.topText2}>V{getVersion()}</Text>
        </LinearGradient>
          <Image
            style={styles.mediumImg}
            resizeMode="contain"
            source={require("../asset/1.3.7/cloud.png")}
          />
        <ScrollView style={styles.bottomContainer}>
          {this._renderUpdateStatusView()}
        </ScrollView>
        <CommonBottomBtn loading={viewStatus == ViewStatus.VIEW_STATUS_DATA} containerStyle={{position: 'absolute',left: 0,right: 0, bottom: -20,backgroundColor: '#fff',paddingTop: em(30),paddingBottom: em(30),borderBottomLeftRadius: em(8),borderBottomRightRadius: em(8),}} style={{height: em(50),borderRadius: em(25), width: GLOBAL_PARAMS._winWidth*0.75,alignSelf: 'center',overflow: 'hidden'}} colors={['#FF881D', '#FF312F']} clickFunc={() => this._startDownload()}>
          <Text style={styles.btnText}>
            {
              viewStatus == ViewStatus.VIEW_STATUS_INITIAL ? '立即升級' : viewStatus == ViewStatus.VIEW_STATUS_REQUEST_NETWORK_ERROR ? '點擊重試': null
            }
          </Text>
        </CommonBottomBtn>

      </View>
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.state.isVisible}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={200}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        {this._renderModalContent()}
      </Modal>
    );
  }
}
