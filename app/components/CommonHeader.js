import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import { withNavigation } from "react-navigation";
import { Left, Body, Right, Icon, Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import Antd from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
//utils
import Colors from "../utils/Colors";
import GLOBAL_PARAMS, { em } from "../utils/global_params";
//styles
import CommonStyles from "../styles/common.style";
import FoodDetailsStyle from "../styles/fooddetails.style";
//components
import Text from "./UnScalingText";

const HEADER_HEIGHT = 50;
const TEXT_HEIGHT = 18;

const styles = StyleSheet.create({
  linearGradient: {
    height: Platform.OS == 'android' ? HEADER_HEIGHT : 50,
    width: GLOBAL_PARAMS._winWidth,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  MenuBtn: {
    fontSize: em(25),
    color: "#fff"
  }
});

const linearDirection = Platform.select({
  ios: { x: 1.0, y: 0.0 },
  android: { x: 0.0, y: 1.0 }
});

const CommonHeader = props => (
  <LinearGradient
    colors={["#FF881D", "#FF312F"]}
    start={{ x: 0.0, y: 0.0 }}
    end={{ x: 1.0, y: 0.0 }}
    style={styles.linearGradient}
  >
    <Left>
      {props.canBack ? (
        props.leftElement !== null ? (
          props.leftElement
        ) :  (
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Entypo
              size={20}
              name="chevron-thin-left"
              style={[
                CommonStyles.common_icon_back,
                { color: props.textColor }
              ]}
            />
          </TouchableWithoutFeedback>
        )
      ) : props.hasMenu ? (
        <TouchableOpacity
          style={
            Platform.OS == "ios"
              ? FoodDetailsStyle.MenuBtn
              : FoodDetailsStyle.MenuBtnAndroid
          }
          onPress={() => {
            props.leftClickIntercept(props);
          }}
        >
          <Antd name="menu-fold" style={styles.MenuBtn} />
          {/* <Image source={require('../asset/menu.png')} style={styles.MenuBtn} resizeMode="contain"/> */}
        </TouchableOpacity>
      ) : null}
    </Left>
    <Body style={{ minWidth: 200, flex: 1 }}>
      {props.children || (
        props.subTitle ? (
          <View style={{justifyContent: 'center',}}>
            <Text
              allowFontScaling={false}
              style={[
                {
                  color: props.textColor,
                  fontSize: GLOBAL_PARAMS.em(18),
                  fontWeight: "800"
                },
                props.titleStyle
              ]}
              numberOfLines={1}>
              {props.title}
            </Text>
            <Text allowFontScaling={false} style={{color: props.textColor, fontSize: GLOBAL_PARAMS.em(14), marginTop: Platform.OS == 'ios' ? em(5) : 0,}}>
              {props.subTitle}
            </Text>
          </View>
        ) : (
          <Text
          allowFontScaling={false}
          style={[
            {
              color: props.textColor,
              fontSize: GLOBAL_PARAMS.em(18),
              fontWeight: "800"
            },
            props.titleStyle
          ]}
          numberOfLines={1}
        >
          {props.title}
        </Text>
        )
      )}
    </Body>
    <Right>
      {props.hasRight ? (
        props.rightElement !== null ? (
          <props.rightElement {...props} />
        ) : (
          <Button transparent onPress={() => props.rightClick()}>
            <Antd
              name={props.rightIcon}
              size={25}
              style={{
                fontSize: GLOBAL_PARAMS.em(23),
                color: Colors.main_white,
                paddingRight: 10
              }}
            />
          </Button>
        )
      ) : null}
    </Right>
  </LinearGradient>
);

CommonHeader.defaultProps = {
  title: "詳情",
  subTitle: null,
  canBack: false,
  hasMenu: false,
  hasTabs: false,
  hasRight: false,
  leftElement: null,
  rightElement: null,
  headerStyle: {},
  titleStyle: {},
  leftStyle: {},
  textColor: Colors.main_white,
  iosBarStyle: "light-content",
  headerHeight: 0,
  leftClickIntercept: props => {
    props.navigation.navigate("DrawerOpen");
  }
};

CommonHeader.propsType = {
  title: PropTypes.String,
  subTitle: PropTypes.String,
  hasTabs: PropTypes.bool,
  hasMenu: PropTypes.bool,
  canBack: PropTypes.bool,
  hasRight: PropTypes.bool,
  rightIcon: PropTypes.String,
  rightClick: PropTypes.func,
  leftElement: PropTypes.element, // 优先级高于前面的left right
  rightElement: PropTypes.element, // 优先级高于前面的left right
  headerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  leftStyle: PropTypes.object,
  textColor: PropTypes.String,
  iosBarStyle: PropTypes.String,
  headerHeight: PropTypes.number,
  leftClickIntercept: PropTypes.func // 左側點擊攔截器
};

export default withNavigation(CommonHeader);
