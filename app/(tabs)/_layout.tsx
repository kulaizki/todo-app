import { View } from 'react-native';
import Index from './index'; 
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme'; 

export default function TabLayout() {
  const colorScheme = useColorScheme(); 

  return (
    <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <Index />
    </View>
  );
}
