import React from 'react';
import { Image,StyleSheet, View } from 'react-native';
import {DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { useLogin } from '../context/LoginProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from '../api/user';
export function DrawerContent(props){
    const {setIsLoggedIn,profile,setLoginPending}=useLogin()
    const [isDarkTheme,setIsDarkTheme]=React.useState(false);
    const toggleTheme=()=>{
        setIsDarkTheme(!isDarkTheme);
    }
    //console.log('profile',profile)
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop:15}}>
                        <Avatar.Image
                            source={{
                            uri:profile.avatar
                            }}
                            size={50}
                        />
                            <View style={{marginLeft:20,flexDirection:'column'}}>
                                <Title style={styles.title}>{profile.name}
                                </Title>
                                <Caption style={styles.caption}>{profile.email}
                                </Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section styles={styles.DrawerSection}>
                    <DrawerItem
                    icon={({color,size})=>(
                        <Icon
                        name="home-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Home"
                    onPress={()=>{props.navigation.navigate('Home')}}
                    />
                    <DrawerItem
                    icon={({color,size})=>(
                        <Icon
                        name="account-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Profile"
                    onPress={()=>{props.navigation.navigate('Profile')}}
                    />
                    <DrawerItem
                    icon={({color,size})=>(
                        <Icon
                        name="bookmark-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Bookmarks"
                    onPress={()=>{}}
                    />
                    <DrawerItem
                    icon={({color,size})=>(
                        <Icon
                        name="cog-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Settings"
                    onPress={()=>{}}
                    />
                    <DrawerItem
                    icon={({color,size})=>(
                        <Icon
                        name="account-check-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Support"
                    onPress={()=>{}}
                    />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={()=>{toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                <Switch value={isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={StyleSheet.bottomDrawerSection}>
                <DrawerItem
                icon={({color,size})=>(
                    <Icon
                    name="exit-to-app"
                    color={color}
                    size={size}
                    />
                )}
                label="Sign Out"
                onPress={async()=>{
                    setLoginPending(true)
                    const isLoggedOut=await signOut()
                    if(isLoggedOut){
                        setIsLoggedIn(false)
                    }
                    setLoginPending(false)
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 1,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });