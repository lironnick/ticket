import { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '@/styles/colors';

import { Header } from '@/components/header';
import { Credintial } from '@/components/credintial';
import { Button } from '@/components/button';
import { QRcode } from '@/components/qrcode';

export default function Ticket() {
  const [image, setImage] = useState('');
  const [expandQRcode, setExpandQRcode] = useState(false);

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        console.log(result.assets);
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Foto', 'Não foi possivel selecionar a imagem.');
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* <Credintial image="https://github.com/lironnick.png" /> */}
        <Credintial
          image={image}
          onChangeAvatar={handleSelectImage}
          onShowQRcode={() => setExpandQRcode(true)}
        />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilha credencial
        </Text>
        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar!
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity activeOpacity={0.7} className="mt-10">
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRcode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRcode(false)}
          >
            <QRcode value="teste" size={300} />
            <Text className="ont-body text-orange-500 text-sm text-center mt-10">
              Fechar QRcode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
