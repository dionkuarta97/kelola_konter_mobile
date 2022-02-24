import {Box, Center, Heading} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setMenuIdx} from '../Redux/Auth/AuthAction';
import HomeScreen from './Home/HomeScreen';
import KaryawanScreen from './Karyawan/KaryawanScreen';
import ProdukScreen from './Produk/ProdukScreen';

const menuAdmin = [
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

const MenuScreen = () => {
  const dispatch = useDispatch();
  const {menuIdx} = useSelector(state => state.AuthReducer);

  return (
    <>
      <View style={{flex: 1}}>
        {menuIdx === 2 ? (
          <HomeScreen />
        ) : menuIdx === 0 ? (
          <KaryawanScreen />
        ) : menuIdx === 1 ? (
          <ProdukScreen />
        ) : (
          <Box flex={1}>
            <Center>
              <Heading>Belum</Heading>
            </Center>
          </Box>
        )}
        <Box
          shadow={9}
          alignItems={'center'}
          bg={'#047857'}
          paddingTop={3}
          paddingX={3}
          paddingBottom={7}
          borderTopRadius={20}
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          {menuAdmin.map((el, index) => (
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
                <TouchableHighlight
                  style={{
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    dispatch(setMenuIdx(index));
                  }}>
                  <Box
                    bg={'tertiary.700'}
                    shadow={4}
                    key={'icon' + index}
                    borderRadius={10}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}>
                    <Icon name={el.icon} size={25} color={'#fafaf9'} />
                  </Box>
                </TouchableHighlight>
              )}
            </View>
          ))}
        </Box>
      </View>
    </>
  );
};

export default MenuScreen;

const style = StyleSheet.create({
  menuActive: {
    flexDirection: 'row',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
