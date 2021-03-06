import { StyleSheet, Platform } from "react-native";
import GLOBAL_PARAMS, { em } from "../utils/global_params";
import Colors from "../utils/Colors";
export default StyleSheet.create({
  //_renderPopupDialogView
  CommonListItem: {
    justifyContent: "space-between"
  },
  Footer: {
    backgroundColor: Colors.main_white,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  ConfirmBtn: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#FF3348",
    marginLeft: 40,
    marginRight: 40
  },
  ConfirmBtnText: {
    color: Colors.main_white,
    fontWeight: "600",
    fontSize: em(16)
  },
  //_renderNewOrderView
  NewsInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  FoodName: {
    color: "#111111",
    fontSize: em(18),
    flex: 1,
    fontWeight: "600"
  },
  FoodMoney: {
    color: "#111111",
    fontSize: em(18)
  },
  CountView: {
    flexDirection: "row",
    alignItems: "center"
  },
  CountText: {
    color: "#999999",
    fontSize: em(16),
    marginRight: 5
  },
  FoodNum: {
    color: Colors.middle_red,
    fontSize: em(16)
  },
  TotalText: {
    flex: 1,
    fontSize: em(18),
    color: "#333333"
  },
  CouponText: {
    flex: 1,
    fontSize: em(14),
    color: "#333333"
  },
  MoneyUnit: {
    fontSize: em(20),
    color: "#111111",
    marginRight: 5
  },
  CouponUnit: {
    fontSize: em(14),
    color: "#111111",
    marginRight: 5
  },
  TotalMoney: {
    fontSize: em(22),
    color: "#ff3448",
    marginTop: -2,
    fontWeight: "600"
  },
  CouponMoney: {
    fontSize: em(16),
    color: "#ff3448",
    marginTop: -2,
    fontWeight: "600"
  },
  //renderNewDetailsVew
  Title: {
    color: "#111111",
    fontSize: em(20),
    fontWeight: "bold"
  },
  Input: {
    color: "#111",
    fontSize: em(16),
    height:
      Platform.OS == "ios"
        ? GLOBAL_PARAMS.heightAuto(30)
        : 45 * (GLOBAL_PARAMS._winHeight / 592),
    width: GLOBAL_PARAMS._winWidth * 0.85,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB"
  },
  //renderCommonDetailView
  DetailText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    paddingBottom: 10
  },
  DetailInner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  ArrowShow: {
    width: em(20),
    color: "#C8C7C7",
    marginTop: -2,
    fontSize: em(25),
    marginLeft: em(2)
  },
  //renderCouponBtnView
  CouponInput: {
    flex: 1,
    backgroundColor: "#F0EFF6",
    color: "#111111",
    fontSize: em(14),
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    paddingLeft: 5,
    height: 40
  },
  CouponBtn: {
    backgroundColor: "#E1E0EA",
    // padding: Platform.OS == 'IOS' ? 12: 11,
    height: 40,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: "center",
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3
  },
  CouponText: {
    color: "#FF3348"
  },
  footer: {
    position: 'absolute',
    bottom: GLOBAL_PARAMS.isIphoneX() ? -15 : 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: "#fff",
    height: GLOBAL_PARAMS.isIphoneX() ? em(100) : em(60),
    borderTopWidth: 1,
    borderTopColor: '#e8e9ed',
    justifyContent: 'space-between',
    alignItems: GLOBAL_PARAMS.isIphoneX() ? "flex-start" : "center",
    paddingLeft: GLOBAL_PARAMS._winWidth * .025,
    paddingRight: GLOBAL_PARAMS._winWidth * .025,
    paddingTop:  GLOBAL_PARAMS.isIphoneX() ? em(8) : 0,
  }
});
