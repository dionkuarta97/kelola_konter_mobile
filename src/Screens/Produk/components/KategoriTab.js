import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  FlatList,
  Text,
  View,
  FormControl,
  Input,
  useToast,
  Center,
  Heading,
  ScrollView,
  Spinner,
} from 'native-base';
import React, {useCallback, useState} from 'react';
import {Dimensions, TouchableHighlight} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DefaultModal from '../../../component/Modal/DefaultModal';
import {createKategory, getKategori} from '../../../Redux/Produk/ProdukAction';
import {Row, Col} from 'react-native-responsive-grid-system';
import IconAws from 'react-native-vector-icons/FontAwesome';

const KategoriTab = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {kategori} = useSelector(state => state.ProdukReducer);
  const {status, data} = props;
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState('');
  const toast = useToast();
  useFocusEffect(
    useCallback(() => {
      dispatch(
        getKategori(
          {
            status: status,
            limit: 100,
          },
          data.key,
        ),
      );
    }, [status]),
  );

  console.log(JSON.stringify(kategori.data, null, 2));

  return (
    <View style={{flex: 1}}>
      {status === 'active' && (
        <View paddingX={10} paddingY={5}>
          <Button
            colorScheme="green"
            onPress={() => {
              setShowModal(true);
              setNama('');
            }}>
            Tambah
          </Button>
        </View>
      )}
      {kategori.loading && (
        <Center mt={Dimensions.get('screen').height / 3.7}>
          <Spinner size={40} />
        </Center>
      )}
      {kategori.data !== null && (
        <ScrollView>
          <Row rowStyles={{paddingHorizontal: 25}}>
            {data.key === 'pulsa' ? (
              <>
                {kategori.data.data?.map((el, idx) => (
                  <Col
                    key={idx + data.key}
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    colStyles={{
                      alignItems: 'center',
                    }}>
                    <TouchableHighlight
                      onPress={() => {
                        navigation.navigate('AddProdukOneScreen', {
                          data: el,
                          key: data.key,
                        });
                      }}
                      style={{
                        width: Dimensions.get('screen').width / 3.7,
                        alignItems: 'center',
                        margin: 5,
                        height: 100,
                        borderRadius: 10,
                      }}>
                      <Box
                        bg={'white'}
                        shadow={3}
                        style={{
                          width: Dimensions.get('screen').width / 3.7,
                          alignItems: 'center',
                          height: 100,
                          borderRadius: 10,
                          paddingVertical: 8,
                        }}>
                        <Box bg={data.color} padding={3} borderRadius={10}>
                          <IconAws name={data.icon} size={40} />
                        </Box>
                        <Text bold>{el.nama}</Text>
                      </Box>
                    </TouchableHighlight>
                  </Col>
                ))}
              </>
            ) : data.key === 'vocher' ? (
              <>
                {kategori.data.data?.map((el, idx) => (
                  <Col
                    key={idx + data.key}
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    colStyles={{
                      alignItems: 'center',
                    }}>
                    <TouchableHighlight
                      onPress={() => console.log('mantap')}
                      style={{
                        width: Dimensions.get('screen').width / 3.7,
                        alignItems: 'center',
                        margin: 5,
                        height: 100,
                        borderRadius: 10,
                      }}>
                      <Box
                        bg={'white'}
                        shadow={3}
                        style={{
                          width: Dimensions.get('screen').width / 3.7,
                          alignItems: 'center',
                          height: 100,
                          borderRadius: 10,
                          paddingVertical: 8,
                        }}>
                        <Box bg={data.color} padding={3} borderRadius={10}>
                          <IconAws name={data.icon} size={40} />
                        </Box>
                        <Text bold>{el.nama}</Text>
                      </Box>
                    </TouchableHighlight>
                  </Col>
                ))}
              </>
            ) : (
              <>
                {kategori.data.length > 0 && (
                  <>
                    {kategori.data?.map((el, idx) => (
                      <Col
                        key={idx + data.key}
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        colStyles={{
                          alignItems: 'center',
                        }}>
                        <TouchableHighlight
                          onPress={() => console.log('mantap')}
                          style={{
                            width: Dimensions.get('screen').width / 3.7,
                            alignItems: 'center',
                            margin: 5,
                            height: 100,
                            borderRadius: 10,
                          }}>
                          <Box
                            bg={'white'}
                            shadow={3}
                            style={{
                              width: Dimensions.get('screen').width / 3.7,
                              alignItems: 'center',
                              height: 100,
                              borderRadius: 10,
                              paddingVertical: 8,
                            }}>
                            <Box bg={data.color} padding={3} borderRadius={10}>
                              <IconAws name={data.icon} size={40} />
                            </Box>
                            <Text bold>{el.nama}</Text>
                          </Box>
                        </TouchableHighlight>
                      </Col>
                    ))}
                  </>
                )}
              </>
            )}
          </Row>
        </ScrollView>
      )}

      <DefaultModal
        showModal={showModal}
        onClose={val => setShowModal(val)}
        onSave={() => {
          setShowModal(false);
          dispatch(createKategory({nama: nama}, data.key))
            .then(msg => {
              toast.show({
                title: 'Berhasil',
                status: 'success',
                placement: 'top',
                description: msg.message,
                width: Dimensions.get('screen').width / 1.2,
              });
            })
            .catch(err => {
              console.log(JSON.stringify(err, null, 2));
              toast.show({
                title: 'Gagal !!',
                status: 'error',
                placement: 'top',
                description:
                  data.key === 'pulsa'
                    ? err.nama[0]
                    : data.key === 'vocher'
                    ? err.nama[0]
                    : err.message,
                width: Dimensions.get('screen').width / 1.2,
              });
            });
        }}
        title="Tambah Data">
        <FormControl>
          <FormControl.Label>Nama</FormControl.Label>
          <Input onChangeText={val => setNama(val)} />
        </FormControl>
      </DefaultModal>
    </View>
  );
};

export default KategoriTab;
