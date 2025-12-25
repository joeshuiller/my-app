import { useGetTaskUsersMutation } from '@/services/apiService';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import Item from '../components/item';


export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [getTaskUsers] = useGetTaskUsersMutation();
      const onSubmit = async (data: any) => {
         await getTaskUsers(data)
                  .unwrap()
                  .then((response:any) => {
                    setData(response.data);
                      console.log("Datos recibidos:", response);
                  })
                  .catch((err:any) => {
                    console.log("Datos validados:", err);
              });
      };
       useEffect(() => {
        onSubmit({"idUsers": 1});
      }, []);

    return (
            <View style={styles.container}>
              <ScrollView>
                    <FlatList
                      style={{flex:1}}
                      data={data}
                      renderItem={({ item }) => <Item item={item}/>}
                      keyExtractor={(item: any) => item.id}
                    />
              </ScrollView>
                    
            </View>
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});
