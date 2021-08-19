import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission : null,
            scanned :false,
            scannedData : '',
            buttonState : 'normal',
            scannedBookId:'',
            scannedStudId:'',
        };

    }
    getCameraPermission=async(id)=>{
          const {status}=await Permissions.askAsync(Permissions.CAMERA);
          this.setState({
            hasCameraPermission : status==='granted',
            buttonState :id,
          })
    }
    handleBarCodeScan=async({type,data})=>{
        this.setState({
            scanned:true,
          scannedData : data,
          buttonState : 'normal',
          
        })
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermission
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

       if (buttonState !== 'normal' && hasCameraPermission){
           return(
              <BarCodeScanner
            onBarCodeScanned={scanned?undefined:this.handleBarCodeScan}
            style={StyleSheet.absoluteFillObject}
            /> 
           )
       }else if(buttonState==='normal'){

       

        return(
            <View style={styles.container}>
                <View style={styles.inputView} >
                    <TextInput style={styles.inputBox} placeholder="book id"
                    value={this.state.scannedBookId}
                    />
                    <TouchableOpacity styles={styles.scanButton}>
                        <Text style={styles.buttonText}>
                            Scan
                        </Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.inputView} >
                    <TextInput style={styles.inputBox} placeholder="student id"
                    value={this.state.scannedStudId}/>
                    <TouchableOpacity styles={styles.scanButton}>
                        <Text style={styles.buttonText}>
                            Scan
                        </Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
    scanButton:{
        backgroundColor: 'blue',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0,
    },
    inputView: {
        flexDirection: 'row',
        margin:20,

    },
    buttonText:{
        fontSize:15,
        textAlign:'center',
        marginTop:10,

    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20,
    }
  });
