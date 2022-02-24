import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  useToast,
  FormControl,
  Input,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DefaultModal from '../../../component/Modal/DefaultModal';
import {
  getListProduk,
  updateCategory,
} from '../../../Redux/Produk/ProdukAction';

const AddProdukOneCard = props => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const {listProduk} = useSelector(state => state.ProdukReducer);
  const {data, kunci} = props;
  const [nama, setNama] = useState(data.nama);
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    [`${kunci}Id`]: data[`${kunci}Id`],
    status: 'active',
    statusCategory: data.status,
  });
  useEffect(() => {
    dispatch(getListProduk(kunci, params));
  }, []);
  return (
    <>
      <Box bg={'white'} margin={3} padding={5} shadow={3} borderRadius={8}>
        <Center marginBottom={4}>
          <Heading>{data.nama}</Heading>
        </Center>
        <HStack>
          <Text style={{marginEnd: 'auto'}}>Total Produk</Text>
          <Box bg={'info.600'} paddingX={2} borderRadius={5}>
            {listProduk.data !== null && (
              <Text color={'light.100'}>{listProduk.data.totalData}</Text>
            )}
          </Box>
        </HStack>
        <HStack marginTop={2}>
          <Text style={{marginEnd: 'auto'}}>Status</Text>
          {data.status === 'active' ? (
            <>
              <Box bg={'success.600'} paddingX={2} borderRadius={5}>
                <Text color={'light.100'}>{data.status}</Text>
              </Box>
            </>
          ) : (
            <>
              <Box bg={'red.600'} paddingX={2} borderRadius={5}>
                {data.status}
              </Box>
            </>
          )}
        </HStack>
        <Center>
          <HStack space={2} marginTop={8}>
            <Button
              isLoading={loading}
              disabled={loading}
              variant={'subtle'}
              colorScheme="warning"
              onPress={() => {
                setShowModal(true);
                setNama(data.nama);
              }}>
              Update
            </Button>
            <Button disabled={loading} variant={'subtle'} colorScheme="danger">
              Delete
            </Button>
            {data.status === 'active' ? (
              <Button disabled={loading} variant={'subtle'} colorScheme="dark">
                Non-active
              </Button>
            ) : (
              <Button
                disabled={loading}
                variant={'subtle'}
                colorScheme="success">
                Active
              </Button>
            )}
          </HStack>
        </Center>
      </Box>
      <DefaultModal
        showModal={showModal}
        onSave={() => {
          setloading(true);
          setShowModal(false);
          dispatch(updateCategory(kunci, data[`${kunci}Id`], {nama: nama}))
            .then(msg => {
              toast.show({
                title: 'Berhasil',
                status: 'success',
                placement: 'top',
                description: msg.message,
                width: Dimensions.get('screen').width / 1.2,
              });
              console.log(msg);
            })
            .then(() => {
              navigation.goBack();
            })
            .catch(err => {
              toast.show({
                title: 'Gagal',
                status: 'error',
                placement: 'top',
                description: err.message,
                width: Dimensions.get('screen').width / 1.2,
              });
            })
            .finally(() => {
              setloading(false);
            });
        }}
        onClose={val => setShowModal(val)}
        title="Update Data">
        <FormControl>
          <FormControl.Label>Nama</FormControl.Label>
          <Input defaultValue={nama} onChangeText={val => setNama(val)} />
        </FormControl>
      </DefaultModal>
    </>
  );
};

export default AddProdukOneCard;
