import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@/constants/theme';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/authContext';

interface Errors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
}

export default function Register() {
    const router = useRouter();
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [errors, setErrors] = useState<Errors>({});
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    useEffect(() => {
        setIsFormFilled(
            name !== '' &&
            email !== '' &&
            phone !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            isCheckboxChecked
        );
        if (name != "") setErrors({...errors, name: ''});
        if (email != "") setErrors({...errors, email: ''});
        if (phone != "") setErrors({...errors, phone: ''});
        if (password != "") setErrors({...errors, password: ''});
        if (confirmPassword != "") setErrors({...errors, confirmPassword: ''});

    }, [name, email, phone, password, confirmPassword, isCheckboxChecked]);

    const handleRegister = async () => {
        let newErrors: Errors = {};
        if (!name) newErrors.name = 'Nama harus diisi';
        if (!email) newErrors.email = 'Email harus diisi';
        if (!phone) newErrors.phone = 'No. Handphone harus diisi';
        if (!password) newErrors.password = 'Password harus diisi';
        if (!confirmPassword) newErrors.confirmPassword = 'Konfirmasi password harus diisi';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Alert.alert("Peringatan", "Semua field wajib diisi");
            return;
        }

        const response = await register(name, email, phone, password, "");
        console.log("got result: ", response);

        if (!response.success) {
            Alert.alert("Register", response.msg);
            return;
        }
    };

    return (
        <ScrollView className='bg-white h-full' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className='justify-center items-center mt-10 mb-2'>
                <Text className='text-primary-2 font-jos_bold text-3xl' style={{ textAlign: 'center', marginTop: 60 }}>
                    Register
                </Text>
            </View>

            <View className="px-5">

                <View className="mb-2">
                    <Text className="text-primary-1 text-base font-nun_bold mb-2">Nama</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-2 font-nun_light rounded-xl"
                        placeholder="Masukkan email atau nomor handphone"
                        value={name}
                        onChangeText={setName}
                    />
                    {errors.name && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.name}</Text>}
                </View>

                <View className="mb-2">
                    <Text className="text-primary-1 text-base font-nun_bold mb-2">Email</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-2 font-nun_light rounded-xl"
                        placeholder="Masukkan email atau nomor handphone"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.email}</Text>}
                </View>

                <View className="mb-2">
                    <Text className="text-primary-1 text-base font-nun_bold mb-2">No. Handphone</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-2 font-nun_light rounded-xl"
                        placeholder="Masukkan email atau nomor handphone"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    {errors.phone && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.phone}</Text>}
                </View>

                <View className="mb-2">
                    <Text className="text-primary-1 text-base font-nun_bold mb-2">Password</Text>
                    <View className="bg-gray-200 px-4 py-2 font-nun_light rounded-xl flex-row items-center">
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

                <View className="mb-2">
                    <Text className="text-primary-1 text-base font-nun_bold mb-2">Konfirmasi Password</Text>
                    <View className="bg-gray-200 px-4 py-2 font-nun_light rounded-xl flex-row items-center">
                        <TextInput
                            className="flex-1 font-nun_light"
                            placeholder="Masukkan password"
                            value={confirmPassword}
                            secureTextEntry={!isConfirmPasswordVisible}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                            <Octicons name={isConfirmPasswordVisible ? "eye" : "eye-closed"} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
                </View>

                <View className='flex-row items-center mt-1 mb-2 ml-2'>
                    <TouchableOpacity onPress={() => setIsCheckboxChecked(!isCheckboxChecked)}>
                        <View>
                            {isCheckboxChecked && <Ionicons name="checkbox" size={24} color={COLORS.primary_2} />}
                            {!isCheckboxChecked && <Ionicons name="checkbox-outline" size={24} color={COLORS.primary_2} />}
                        </View>
                    </TouchableOpacity>
                    <Text className='font-nun_light text-xs ml-2 mr-4'>
                        <Text className='text-gray-500'>Saya setuju dengan </Text>
                        <Text className='text-primary-2 '>Ketentuan Layanan </Text>
                        <Text className='text-gray-500'>dan </Text>
                        <Text className='text-primary-2'>Kebijakan Privasi</Text>
                    </Text>
                </View>

                <TouchableOpacity onPress={handleRegister}>
                    <View className="bg-primary-2 my-4 px-4 py-2 rounded-full flex-row justify-center items-center"
                    style={{ backgroundColor: isFormFilled ? COLORS.primary_2 : 'gray' }}>
                        <Text className="text-white text-lg font-nun_semibold mr-2">Register</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity >
                    <View className="bg-white px-4 py-2 rounded-full flex-row justify-center items-center"
                    style={{ borderWidth: 4, borderColor: COLORS.primary_2 }}
                    >
                        <Image source={require("@/assets/google_icon.png")} className="w-5 h-5 mr-2" />
                        <Text className="text-primary-2 text-lg font-nun_semibold mr-2">Daftar dengan Google</Text>
                    </View>
                </TouchableOpacity>

                <View className="mt-4 flex-row justify-center">
                    <Text>
                        <Text className="font-nun_regular text-black">Sudah punya akun? </Text>
                        <Text className="font-nun_bold text-primary-2" onPress={() => router.push("login")}> 
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
