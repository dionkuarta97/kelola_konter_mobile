import {View, Text} from 'native-base';
import React from 'react';
import DefaultTabBar from '../../component/DefaultTabBar';
import SmallHeader from '../../component/headers/SmallHeader';
import KategoriTab from './components/KategoriTab';

const ProdukCategoryScreen = props => {
  const {data} = props.route.params;
  return (
    <View flex={1}>
      <SmallHeader title={data.title} />
      <DefaultTabBar
        routes={[
          {key: 'active', title: 'Aktif'},
          {key: 'inactive', title: 'Tidak Aktif'},
        ]}
        screen={[
          <KategoriTab data={data} status="active" />,
          <KategoriTab data={data} status="inactive" />,
        ]}
      />
    </View>
  );
};

export default ProdukCategoryScreen;
