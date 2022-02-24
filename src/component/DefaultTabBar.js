import React, {useState} from 'react';
import {Text, Dimensions, StyleSheet, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const DefaultTabBar = props => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(props.routes);

  const renderScene = ({route, jumpTo}) => {
    return props.screen[index];
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={item => (
        <TabBar
          {...item}
          indicatorStyle={{backgroundColor: 'black'}}
          style={{
            backgroundColor: 'white',
          }}
          renderLabel={({route, focused, color}) => (
            <View style={{flex: 1}}>
              <Text style={{alignSelf: 'center'}}>{route.title}</Text>
            </View>
          )}
        />
      )}
    />
  );
};

export default DefaultTabBar;
