import React, {useCallback, useState} from 'react';
import {
  Heading,
  View,
  Box,
  ScrollView,
  Center,
  Avatar,
  Spinner,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getKonter} from '../../Redux/Konter/KonterAction';
import KonterTab from './components/KonterTab';
import BigHeader from '../../component/headers/BigHeader';
import {RefreshControl, Text} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {login} = useSelector(state => state.AuthReducer);
  const {konter} = useSelector(state => state.KonterReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState('active');
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500)
      .then(() => setStatus('active'))
      .then(() => dispatch(getKonter('active')))
      .then(() => setRefreshing(false));
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch(getKonter(status));
    }, []),
  );

  function capitalizeFirstLetter(string) {
    return string.replace(/^./, string[0].toUpperCase());
  }

  const initial = () => {
    return login.data.user.nama
      .match(/\b(\w)/g)
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <Box
        bg={{
          linearGradient: {
            colors: ['tertiary.300', 'tertiary.200', 'white'],
            start: [0, 0],
            end: [0, 0.9],
          },
        }}
        style={{flex: 1}}>
        <Heading marginTop={5} color={'black'} marginX={5}>
          {capitalizeFirstLetter(login.data.user.role)}
        </Heading>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <BigHeader login={login}>
            <Center>
              <Avatar
                marginTop={-30}
                size={75}
                shadow={8}
                marginBottom={2}
                bg="cyan.500">
                {initial()}
              </Avatar>
              <Text>{login.data.user.nama}</Text>
            </Center>
          </BigHeader>
          {konter.loading ? (
            <Center marginTop={10} flex={1}>
              <Spinner size={50} />
            </Center>
          ) : (
            <View paddingX={10} mt={5} mb={5} flex={1}>
              <Heading alignSelf={'center'} color={'black'} mb={3}>
                Konter Saya
              </Heading>
              <KonterTab
                konter={konter.data?.data}
                status={status}
                onChange={val => {
                  setStatus(val);
                  dispatch(getKonter(val));
                }}
              />
            </View>
          )}
        </ScrollView>
      </Box>
    </>
  );
};

export default HomeScreen;
