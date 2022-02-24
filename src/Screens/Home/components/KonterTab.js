import React, {useState, useEffect} from 'react';
import {
  Select,
  Box,
  CheckIcon,
  View,
  FormControl,
  Input,
  useToast,
} from 'native-base';
import {Dimensions, TouchableOpacity, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DefaultModal from '../../../component/Modal/DefaultModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  postSaveKonter,
  setSaveKonter,
} from '../../../Redux/Konter/KonterAction';

import {Row, Col} from 'react-native-responsive-grid-system';
const KonterTab = props => {
  const {status, onChange, konter} = props;
  const dispatch = useDispatch();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState('');

  return (
    <>
      <Box
        bg={'white'}
        padding={5}
        borderRadius={10}
        shadow={3}
        minHeight={Dimensions.get('screen').height / 3.3}
        flex={1}>
        <Select
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          selectedValue={status}
          defaultValue="active"
          onValueChange={val => onChange(val)}>
          <Select.Item label="Aktif" value="active" />
          <Select.Item label="Tidak Aktif" value="inactive" />
        </Select>

        <Row>
          {konter?.map(el => (
            <Col
              xs={6}
              key={'konterId' + el.konterId}
              sm={6}
              md={6}
              lg={6}
              colStyles={{
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: Dimensions.get('screen').width / 2.9,
                  height: Dimensions.get('screen').width / 2.9,
                }}>
                <Box
                  marginX={3}
                  marginTop={3}
                  marginBottom={1}
                  bg={'white'}
                  shadow={7}
                  borderRadius={8}
                  padding={1}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: Dimensions.get('screen').width / 3.7,
                    height: Dimensions.get('screen').width / 3.7,
                  }}>
                  <Box
                    style={{
                      width: Dimensions.get('screen').width / 4.5,
                      height: Dimensions.get('screen').width / 4.5,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 2,
                    }}
                    shadow={2}
                    bg={'tertiary.300'}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'center',
                      }}>
                      {el.nama}
                    </Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            </Col>
          ))}
          {status === 'active' && (
            <Col
              xs={6}
              sm={6}
              md={6}
              lg={6}
              colStyles={{
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setShowModal(true);
                  setNama('');
                }}
                style={{
                  padding: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: Dimensions.get('screen').width / 2.9,
                  height: Dimensions.get('screen').width / 2.9,
                }}>
                <Box
                  marginX={3}
                  marginTop={3}
                  marginBottom={1}
                  bg={'white'}
                  shadow={7}
                  borderRadius={8}
                  padding={5}
                  style={{
                    alignItems: 'center',
                    width: Dimensions.get('screen').width / 3.7,
                    height: Dimensions.get('screen').width / 3.7,
                  }}>
                  <Icon
                    name="plus"
                    size={Dimensions.get('screen').width / 5.5}
                  />
                </Box>
              </TouchableOpacity>
            </Col>
          )}
        </Row>
      </Box>
      <DefaultModal
        title="Tambah Konter"
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => {
          setShowModal(false);
          dispatch(postSaveKonter(nama))
            .then(() => {
              toast.show({
                title: 'Berhasil',
                status: 'success',
                description: 'Data Berhasil Ditambahkan',
                placement: 'top',
                width: '70%',
              });
            })
            .catch(err => {
              if (err.response.data.nama) {
                toast.show({
                  title: 'Gagal',
                  status: 'error',
                  description: err.response.data.nama[0],
                  placement: 'top',
                  width: '70%',
                });
              }
            });
        }}>
        <FormControl>
          <FormControl.Label>Nama Konter</FormControl.Label>
          <Input onChangeText={val => setNama(val)} />
        </FormControl>
      </DefaultModal>
    </>
  );
};

export default KonterTab;
