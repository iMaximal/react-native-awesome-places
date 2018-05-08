import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
  ])
    .then((sources) => {
      Navigation.startTabBasedApp({
        tabs: [
          {
            screen: 'awesome-places.FindPlaceScreen',
            label: 'Find Place',
            title: 'Find Place',
            icon: sources[0],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: sources[2],
                  title: 'Menu',
                  id: 'sideDrawerToggle',
                }
              ]
            }
          },
          {
            screen: 'awesome-places.SharePlaceScreen',
            label: 'Share Place',
            title: 'Share Place',
            icon: sources[1],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: sources[2],
                  title: 'Menu',
                  id: 'sideDrawerToggle',
                }
              ]
            }
          },
        ],
        tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
          tabBarSelectedButtonColor: 'orange', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
        },
        appStyle: {
          tabBarSelectedButtonColor: 'orange',
        },
        drawer: {
          left: {
            screen: 'awesome-places.SideDrawer',
          }
        },
      });
    });
};

export default startTabs;
