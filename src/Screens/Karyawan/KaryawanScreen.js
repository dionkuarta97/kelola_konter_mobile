import {View} from 'native-base';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import DefaultTabBar from '../../component/DefaultTabBar';
import {setSelect} from '../../Redux/Karyawan/KaryawanAction';
import KaryawanTab from './components/KaryawanTab';

const KaryawanScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelect(0));
  }, []);
  return (
    <>
      <View style={{flex: 1}}>
        <View flex={1}>
          <DefaultTabBar
            routes={[
              {key: 'active', title: 'Aktif'},
              {key: 'inactive', title: 'Tidak Aktif'},
            ]}
            screen={[
              <KaryawanTab status="active" />,
              <KaryawanTab status="inactive" />,
            ]}
          />
        </View>
      </View>
    </>
  );
};

export default KaryawanScreen;
