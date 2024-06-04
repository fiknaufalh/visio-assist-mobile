import { View, Text, TextInput, TouchableOpacity, Alert, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@/constants/theme';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/authContext';

interface Errors {
    email?: string;
    password?: string;
}

export default function Login() {
    const router = useRouter();
    const { login } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [errors, setErrors] = useState<Errors>({});
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        setIsFormFilled(email !== '' && password !== '');
        if (email != "") setErrors({...errors, email: ''});
        if (password != "") setErrors({...errors, password: ''});
    }, [email, password]);

    const handleLogin = async() => {
        let newErrors: Errors = {};
        if (!email) newErrors.email = 'Email/No. Handphone harus diisi';
        if (!password) newErrors.password = 'Password harus diisi';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Alert.alert("Peringatan", "Semua field wajib diisi");
            return;
        }

        const response = await login(email, password);

        if (!response.success) {
            Alert.alert("Login", response.msg)
        }
    };

    return (
        <ScrollView className='bg-white h-full' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-jos_bold text-3xl' style={{ textAlign: 'center', marginTop: 60 }}>
                    Login
                </Text>
            </View>
            <View className="px-5">
            <View className="mb-3">
                    <Text className="text-primary-1 text-base font-nun_bold mb-2">Email/No. Handphone</Text>
                    <View className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl flex-row items-center">
                        <Octicons name="mail" size={24} color="gray" style={{ marginRight: 10 }} />
                        <View style={{ height: '100%', width: 1, backgroundColor: 'gray', marginRight: 10 }} />
                        <TextInput
                            className="flex-1 font-nun_light"
                            placeholder="Masukkan email atau nomor handphone"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {errors.email && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.email}</Text>}
                </View>

                <View className="mb-2">
                    <Text className="text-primary-1 text-base font-nun_bold mb-2">Password</Text>
                    <View className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl flex-row items-center">
                        <Octicons name="lock" size={24} color="gray" style={{ marginRight: 13 }} />
                        <View style={{ height: '100%', width: 1, backgroundColor: 'gray', marginRight: 10 }} />
                        <TextInput
                            className="flex-1 font-nun_light"
                            placeholder="Masukkan password"
                            value={password}
                            secureTextEntry={!isPasswordVisible}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Octicons name={isPasswordVisible ? "eye" : "eye-closed"} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.password}</Text>}
                </View>

                <TouchableOpacity>
                    <View className="flex-row justify-end mr-2">
                        <Text className="font-nun_regular text-red-600">Lupa Password?</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin}>
                    <View className="bg-primary-2 my-5 px-4 py-2 rounded-full flex-row justify-center items-center"
                    style={{ backgroundColor: isFormFilled ? COLORS.primary_2 : 'gray' }}>
                        <Text className="text-white text-lg font-nun_semibold mr-2">Login</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity >
                    <View className="bg-white px-4 py-2 mb-4 rounded-full flex-row justify-center items-center"
                    style={{ borderWidth: 2, borderColor: COLORS.primary_2 }}
                    >
                        <Image source={require("@/assets/google_icon.png")} className="w-5 h-5 mr-2" />
                        <Text className="text-primary-2 text-lg font-nun_semibold mr-2">Masuk dengan Google</Text>
                    </View>
                </TouchableOpacity>

                <View className="flex-row justify-center">
                    <Text>
                    <Text className="font-nun_regular text-black">Belum punya akun? </Text>
                        <Text className="font-nun_bold text-primary-2" onPress={() => router.push("register")}>
                            Register
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
