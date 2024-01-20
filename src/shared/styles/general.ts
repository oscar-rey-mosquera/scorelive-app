import {NativeWindStyleSheet} from "nativewind";
import colors, {primaryColor} from "@/constants/Colors";

 const general = NativeWindStyleSheet.create({
    styles: {
        "light-primary-bg" : {
            backgroundColor : colors.light.background
        },
        "dark-primary-bg" : {
            backgroundColor : colors.dark.background
        },
      "pink-color" : {
          color : primaryColor
      },
      "pink-bg" : {
          backgroundColor : primaryColor
      },
        "onlive-bg" : {
            backgroundColor : "#ECFDF3"
        }
    },
    atRules: {},
    topics : {},

})

export default general