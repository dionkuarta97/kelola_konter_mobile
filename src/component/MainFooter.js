import {Box} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setMenuIdx} from '../Redux/Auth/AuthAction';

const menu = [
  {
    title: 'Karyawan',
    icon: 'user',
    screen: 'KaryawanScreen',
  },
  {
    title: 'Produk',
    icon: 'shoppingcart',
  },
  {
    title: 'Home',
    icon: 'home',
    screen: 'HomeScreen',
  },
  {
    title: 'Laporan',
    icon: 'linechart',
  },
  {
    title: 'Lainnya',
    icon: 'setting',
  },
];

const MainFooter = () => {
  const dispatch = useDispatch();
  const {menuIdx} = useSelector(state => state.AuthReducer);
  const navigation = useNavigation();
  console.log(JSON.stringify(navigation, null, 2));
  return (
    <>
      <Box
        shadow={9}
        alignItems={'center'}
        bg={'tertiary.700'}
        padding={2}
        borderTopRadius={20}
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        {menu.map((el, index) => (
          <View key={'icon' + index}>
            {menuIdx === index ? (
              <Box shadow={4} style={style.menuActive}>
                <Icon name={el.icon} size={25} color={'black'} />

                <Text
                  style={{
                    marginLeft: 3,
                    color: 'black',
                    fontSize: 20,
                  }}>
                  {el.title}
                </Text>
              </Box>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setMenuIdx(index));
                  if (el.screen) navigation.navigate(el.screen);
                }}>
                <Box
                  bg={'tertiary.600'}
                  shadow={4}
                  key={'icon' + index}
                  borderRadius={10}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}>
                  <Icon name={el.icon} size={25} color={'#fafaf9'} />
                </Box>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Box>
    </>
  );
};

export default MainFooter;

const style = StyleSheet.create({
  menuActive: {
    flexDirection: 'row',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
