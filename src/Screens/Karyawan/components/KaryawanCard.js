import {Avatar, Box, Center, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';

const KaryawanCard = props => {
  const {data} = props;

  const initial = val => {
    return val
      .match(/\b(\w)/g)
      .join('')
      .toUpperCase();
  };

  function capitalizeFirstLetter(string) {
    return string.replace(/^./, string[0].toUpperCase());
  }
  return (
    <>
      <Box bg={'white'} mt={3} padding={3} borderRadius={15} borderWidth={0.3}>
        <HStack space={Dimensions.get('screen').width / 7}>
          <Avatar bg={'tertiary.200'} ml={4} size={75} shadow={3}>
            {initial(data.nama)}
          </Avatar>
          <VStack justifyContent={'center'}>
            <Text>{capitalizeFirstLetter(data.nama)}</Text>
            {data.konter !== null && (
              <Text fontSize={18} bold color={'amber.700'}>
                {capitalizeFirstLetter(data.konter?.nama)}
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default KaryawanCard;
