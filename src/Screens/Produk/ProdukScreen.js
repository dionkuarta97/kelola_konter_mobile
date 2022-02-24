import {useNavigation} from '@react-navigation/native';
import {View, Text, ScrollView, Box, VStack, HStack} from 'native-base';
import React from 'react';
import {TouchableHighlight} from 'react-native';
import IconAws from 'react-native-vector-icons/FontAwesome';

const category = [
  {title: 'Pulsa', key: 'pulsa', icon: 'wifi', color: 'primary.400'},
  {title: 'Vocher', key: 'vocher', icon: 'credit-card', color: 'tertiary.400'},
  {title: 'Bri link', key: 'bri', icon: 'bank', color: 'danger.400'},
  {title: 'Top Up', key: 'topup', icon: 'money', color: 'warning.400'},
  {title: 'Higgs Domino', key: 'chip', icon: 'gamepad', color: 'info.400'},
  {title: 'Produk Lain', key: 'chip', icon: 'list-ul', color: 'fuchsia.400'},
];

const ProdukScreen = () => {
  const navigation = useNavigation();
  return (
    <View flex={1}>
      <ScrollView padding={8}>
        <VStack space={4}>
          {category.map((el, index) => (
            <TouchableHighlight
              style={{
                borderRadius: 10,
                marginBottom: index === category.length - 1 ? 50 : 0,
              }}
              key={index + el.key}
              onPress={() =>
                navigation.navigate('ProdukCategoryScreen', {data: el})
              }>
              <Box bg={'white'} borderRadius={10} padding={5} shadow={3}>
                <HStack>
                  <Box
                    bg={el.color}
                    padding={3}
                    borderRadius={10}
                    style={{marginEnd: 10}}>
                    <IconAws name={el.icon} size={40} />
                  </Box>
                  <Box justifyContent={'center'} style={{marginEnd: 'auto'}}>
                    <Text fontSize={20}>{el.title}</Text>
                  </Box>
                  <Box justifyContent={'center'}>
                    <IconAws name="angle-right" size={35} />
                  </Box>
                </HStack>
              </Box>
            </TouchableHighlight>
          ))}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default ProdukScreen;
