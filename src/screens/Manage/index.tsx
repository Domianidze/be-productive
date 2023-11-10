import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@root/App';
import DeleteButton from './components/DeleteButton';
import ManageForm from './components/ManageForm';

type TProps = NativeStackScreenProps<StackParamList, 'manage'>;

const ManageScreen: React.FC<TProps> = ({navigation, route}) => {
  const id = route?.params?.id;

  React.useLayoutEffect(() => {
    const headerRight: React.FC = () => {
      return <DeleteButton id={id} />;
    };

    navigation.setOptions({
      title: id ? 'Edit' : 'Add',
      headerRight,
    });
  }, [id, navigation]);

  return <ManageForm id={id} />;
};

export default ManageScreen;
