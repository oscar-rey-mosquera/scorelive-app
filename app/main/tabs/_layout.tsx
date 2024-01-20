import { Tabs } from 'expo-router';
import {Icon} from "@/src/shared/components/Icon";
import {Header} from "@/src/matches/components/Header";
import {useTheme} from "@/src/shared/hooks";




export default function TabLayout() {
  const {tint, cardColor} = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
          tabBarStyle : {
            backgroundColor : cardColor
          }
      }}>
      <Tabs.Screen
        name="matches"
        options={{
          header: () => <Header />,
          tabBarIcon: ({ color }) => <Icon name="soccer-ball-o" color={color} />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
