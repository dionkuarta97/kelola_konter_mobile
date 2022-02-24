import {Heading, View} from 'native-base';
import React from 'react';
import SmallHeader from '../../component/headers/SmallHeader';
import AddProdukOneCard from './components/AddProdukOneCard';

const AddProdukOneScreen = props => {
  const {data, key} = props.route.params;

  return (
    <View flex={1}>
      <SmallHeader title="Produk" />
      <AddProdukOneCard data={data} kunci={key} />
    </View>
  );
};

export default AddProdukOneScreen;
