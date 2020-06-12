import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Quotation from './pages/Quotation'

//vai controlar a pilha de páginas
const AppStack = createStackNavigator()

 const Routes = () => {
     return (
         <NavigationContainer>
             <AppStack.Navigator
                headerMode='none'
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    }
                }}
                >
                 <AppStack.Screen name='Home' component={Home} />
                 <AppStack.Screen name='Quotation' component={Quotation} />
             </AppStack.Navigator>
         </NavigationContainer>
     )
 }

 export default Routes