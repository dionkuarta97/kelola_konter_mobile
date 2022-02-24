import {
  Button,
  HStack,
  ArrowBackIcon,
  ArrowForwardIcon,
  Text,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native';
import noData from '../../assets/images/not_found.png';

const Pagination = props => {
  const {totalPage, currentPage, setCurrentPage, totalData} = props;
  const [page, setPage] = useState([]);
  useEffect(() => {
    let temp = [];
    for (let i = 0; i < totalPage; i++) {
      temp.push(i);
    }
    setPage(temp);
  }, [totalPage]);

  return (
    <>
      {totalData ? (
        <HStack space={1}>
          {currentPage > 3 && (
            <Button
              size={'sm'}
              bg={'light.200'}
              onPress={() => {
                setCurrentPage(1);
              }}>
              FIRST
            </Button>
          )}
          {currentPage !== 1 && (
            <Button
              size={'sm'}
              bg={'light.200'}
              onPress={() => {
                setCurrentPage(currentPage - 1);
              }}>
              <ArrowBackIcon size="4" />
            </Button>
          )}
          {page
            ?.slice(
              currentPage <= 3 ? 0 : currentPage - 3,
              currentPage <= 3 ? 5 : currentPage + 2,
            )
            .map(el => (
              <Button
                size={'sm'}
                onPress={() => {
                  setCurrentPage(el + 1);
                }}
                key={el + 'page'}
                disabled={currentPage === el + 1 ? true : false}
                bg={currentPage === el + 1 ? 'primary.500' : 'light.200'}>
                {el + 1}
              </Button>
            ))}
          {currentPage !== totalPage && (
            <Button
              size={'sm'}
              bg={'light.200'}
              onPress={() => {
                setCurrentPage(currentPage + 1);
              }}>
              <ArrowForwardIcon size="4" />
            </Button>
          )}
          {currentPage !== totalPage && (
            <Button
              size={'sm'}
              bg={'light.200'}
              onPress={() => {
                setCurrentPage(totalPage);
              }}>
              LAST
            </Button>
          )}
        </HStack>
      ) : (
        <>
          <Image
            source={noData}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height / 2,
            }}
          />
          <Text>Data Tidak Ditemukan</Text>
        </>
      )}
    </>
  );
};

export default Pagination;
