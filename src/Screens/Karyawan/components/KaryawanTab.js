import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Select,
  View,
  CheckIcon,
  Center,
  Spinner,
  Button,
  FormControl,
  Input,
  InputRightAddon,
  InputGroup,
  Text,
  useToast,
  ScrollView,
  HStack,
} from 'native-base';
import {Dimensions, TouchableOpacity, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  getKaryawan,
  saveKaryawan,
  setSelect,
} from '../../../Redux/Karyawan/KaryawanAction';
import DefaultModal from '../../../component/Modal/DefaultModal';
import Icon from 'react-native-vector-icons/Entypo';
import KaryawanCard from './KaryawanCard';
import Pagination from '../../../component/Pagination';
import {getKonter} from '../../../Redux/Konter/KonterAction';
const KaryawanTab = props => {
  const {status} = props;
  const toast = useToast();
  const scrollY = new Animated.Value(0);
  const diffclamp = Animated.diffClamp(scrollY, 0, 185);
  const translateY = diffclamp.interpolate({
    inputRange: [0, 185],
    outputRange: [0, -185],
  });
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {konter} = useSelector(state => state.KonterReducer);
  const {karyawan, select} = useSelector(state => state.KaryawanReducer);
  const [selectDua, setSelectDua] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordDua, setShowPasswordDua] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [errPass, setErrPass] = useState();
  const [body, setBody] = useState({
    nama: '',
    username: '',
    password: '',
    konterId: null,
  });
  const [error, setError] = useState();

  useEffect(() => {
    if (konter.data === null) {
      dispatch(getKonter('active'));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getKaryawan({
          status: status,
          konterId: select,
        }),
      );
    }, [status]),
  );
  return (
    <>
      <Box bg={'grey.100'} flex={1} paddingBottom={89}>
        {konter.data !== null && (
          <>
            <View>
              <Box bg={'white'} padding={5}>
                <Select
                  onValueChange={val => {
                    dispatch(setSelect(val));
                    let konterId = null;
                    if (val !== 0) {
                      konterId = val;
                    }
                    dispatch(
                      getKaryawan({
                        status,
                        konterId: konterId,
                      }),
                    );
                  }}
                  selectedValue={select}
                  defaultValue=""
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  placeholder="Semua Konter">
                  {konter.data?.data.map(el => (
                    <Select.Item
                      key={el.konterId + 'konter'}
                      label={el.nama}
                      value={el.konterId}
                    />
                  ))}
                  <Select.Item label="Semua Konter" value={0} />
                </Select>
              </Box>

              <Animated.View
                style={{
                  transform: [{translateY: translateY}],
                  position: 'absolute',
                  top: 75,
                  left: 0,
                  right: 0,
                  zIndex: 50,
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <HStack mt={3} justifyContent={'center'} space={3}>
                  {status === 'active' && (
                    <Button
                      bg={'tertiary.600'}
                      onPress={() => {
                        if (konter.data?.totalData === 0) {
                          toast.show({
                            title: 'Warning',
                            status: 'error',
                            description:
                              'Konter anda belum ada, silahkan tambah Konter terlebih dahulu',
                            placement: 'top',
                            width: '70%',
                          });
                        } else {
                          setShowModal(true);
                        }
                      }}>
                      Tambah Karyawan
                    </Button>
                  )}
                  <Center>
                    <Text fontSize={15}>
                      Total Karyawan : {karyawan.data?.totalData}
                    </Text>
                  </Center>
                </HStack>

                {!karyawan.loading && (
                  <Center my={4}>
                    <Pagination
                      totalData={karyawan.data?.totalData}
                      currentPage={karyawan.data?.currentPage}
                      totalPage={karyawan.data?.totalPage}
                      setCurrentPage={val => {
                        dispatch(
                          getKaryawan({
                            status: status,
                            konterId: select,
                            page: val,
                          }),
                        );
                      }}
                    />
                  </Center>
                )}
              </Animated.View>

              <ScrollView
                style={{
                  paddingTop: 105,
                  paddingHorizontal: 20,
                }}
                onScroll={e => {
                  scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}>
                {karyawan.data?.data.map((el, idx) => (
                  <TouchableOpacity
                    style={{
                      padding: 3,
                      marginBottom:
                        karyawan.data.data.length - 1 === idx ? 120 : 0,
                    }}
                    onPress={() => console.log('press')}
                    key={el.userId + 'user'}>
                    <KaryawanCard data={el} />
                  </TouchableOpacity>
                ))}

                {karyawan.loading && (
                  <Center mt={Dimensions.get('screen').height / 3.7}>
                    <Spinner size={40} />
                  </Center>
                )}
              </ScrollView>
            </View>
            <DefaultModal
              onSave={() => {
                if (!rePassword) {
                  setErrPass('ulangi password tidak boleh kosong');
                } else if (rePassword !== body.password) {
                  setErrPass('password tidak sama');
                } else {
                  dispatch(saveKaryawan(body))
                    .then(() => {
                      dispatch(getKaryawan({status: 'active'}));
                    })
                    .then(() => {
                      toast.show({
                        title: 'Berhasil',
                        status: 'success',
                        description: 'Data Berhasil Ditambahkan',
                        placement: 'top',
                        width: '70%',
                      });
                    })
                    .then(() => {
                      setShowModal(false);
                      setErrPass(null);
                      setError('');
                      setBody({
                        nama: '',
                        username: '',
                        password: '',
                        konterId: null,
                      });
                      setSelectDua('');
                    })
                    .catch(err => {
                      setError(err);
                    });
                }
              }}
              title="Tambah Karyawan"
              showModal={showModal}
              onClose={val => {
                setSelectDua('');
                setErrPass(null);
                setShowModal(val);
                setError('');
                setBody({
                  nama: '',
                  username: '',
                  password: '',
                  konterId: null,
                });
              }}>
              <FormControl>
                <FormControl.Label>Nama</FormControl.Label>

                <Input onChangeText={val => setBody({...body, nama: val})} />
                {error?.nama &&
                  error.nama.map((el, index) => (
                    <Text color={'red.400'} mt={1} key={index + 'nama'}>
                      * {el} *
                    </Text>
                  ))}
              </FormControl>
              <FormControl mt={3}>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  onChangeText={val => setBody({...body, username: val})}
                />
                {error?.username &&
                  error.username.map((el, index) => (
                    <Text color={'red.400'} mt={1} key={index + 'username'}>
                      * {el} *
                    </Text>
                  ))}
              </FormControl>
              <FormControl mt={3}>
                <FormControl.Label>Password</FormControl.Label>
                <InputGroup>
                  <Input
                    onChangeText={val => setBody({...body, password: val})}
                    w={{
                      base: '87%',
                    }}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightAddon
                    children={
                      <TouchableOpacity
                        onPress={() => {
                          if (showPassword) {
                            setShowPassword(false);
                          } else {
                            setShowPassword(true);
                          }
                        }}>
                        <Icon
                          name="eye-with-line"
                          size={20}
                          color={showPassword ? '#34d399' : 'black'}
                        />
                      </TouchableOpacity>
                    }
                  />
                </InputGroup>
                {error?.password &&
                  error.password.map((el, index) => (
                    <Text color={'red.400'} mt={1} key={index + 'password'}>
                      * {el} *
                    </Text>
                  ))}
              </FormControl>
              <FormControl mt={3}>
                <FormControl.Label>Ulangi Password</FormControl.Label>
                <InputGroup>
                  <Input
                    onChangeText={val => setRePassword(val)}
                    w={{
                      base: '87%',
                    }}
                    type={showPasswordDua ? 'text' : 'password'}
                  />
                  <InputRightAddon
                    children={
                      <TouchableOpacity
                        onPress={() => {
                          if (showPasswordDua) {
                            setShowPasswordDua(false);
                          } else {
                            setShowPasswordDua(true);
                          }
                        }}>
                        <Icon
                          name="eye-with-line"
                          size={20}
                          color={showPasswordDua ? '#34d399' : 'black'}
                        />
                      </TouchableOpacity>
                    }
                  />
                </InputGroup>
                {errPass && (
                  <Text color={'red.400'} mt={1}>
                    * {errPass} *
                  </Text>
                )}
              </FormControl>
              <FormControl mt={3} mb={3}>
                <FormControl.Label>Pilih Konter</FormControl.Label>
                <Select
                  onValueChange={val => {
                    setSelectDua(val);
                    setBody({
                      ...body,
                      konterId: val,
                    });
                  }}
                  selectedValue={selectDua}
                  defaultValue=""
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  placeholder="--PILIH KONTER--">
                  {konter.data?.data.map(el => (
                    <Select.Item
                      key={el.konterId + 'konterDua'}
                      label={el.nama}
                      value={el.konterId}
                    />
                  ))}
                </Select>
                {error?.konterId &&
                  error.konterId.map((el, index) => (
                    <Text color={'red.400'} mt={1} key={index + 'konterId'}>
                      * {el} *
                    </Text>
                  ))}
              </FormControl>
            </DefaultModal>
          </>
        )}
      </Box>
    </>
  );
};

export default KaryawanTab;
