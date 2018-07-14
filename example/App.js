import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Switch } from 'react-native';
import Modal from 'rn-modal-picker-awesome';
export default class ExampleModal extends Component {
  constructor(){
    super()
    this.state = {}
  }
  render() {
    return (
      <View style={{ flex:1, alignItems:'center',backgroundColor:'#fff',  }}>
        <View style={{ flex:1, marginTop:'11%', }}>
          <Text style={{ fontSize:19, fontWeight:'bold' }}>rn-modal-picke-awesome</Text>
        </View>
        <View style={{ flex:4, justifyContent:'center', alignItems:'center' }}>
        <TouchableOpacity
        onPress={() => this.setState({ visible: true })}
        >
          <Text>Open Modal</Text>
        </TouchableOpacity>
        
        <View
          style={{ flex:0, flexDirection:'row', justifyContent:'space-between', height:33, width:'100%', alignItems:'center', marginTop:'11%' }}
        >
          <View style={{ flex:1, marginLeft:'5%' }}>
          <Text>Auto Close</Text>
          </View>
          <View style={{ flex:0, marginRight:'5%' }}>
          <Switch
          onValueChange={(val) => this.setState({ autoClose: val })}
          value={this.state.autoClose}
          onTintColor='green'
          thumbTintColor={ this.state.autoClose ? '#fff' : '#eee'}
          />
          </View>
        </View>




        <View
          style={{ flex:0, flexDirection:'row', justifyContent:'space-between', height:33, width:'100%', alignItems:'center', marginTop:'11%' }}
        >
          <View style={{ flex:1, marginLeft:'5%' }}>
          <Text>Single/Multiple</Text>
          </View>
          <View style={{ flex:0, marginRight:'5%' }}>
          <Switch
          onValueChange={(val) => this.setState({ multiple: val })}
          value={this.state.multiple}
          onTintColor='green'
          thumbTintColor={ this.state.multiple ? '#fff' : '#eee'}
          />
          </View>
        </View>




        <View
          style={{ flex:0, flexDirection:'row', justifyContent:'space-between', height:33, width:'100%', alignItems:'center', marginTop:'11%' }}
        >
          <View style={{ flex:1, marginLeft:'5%' }}>
          <Text>Animate fade/slide</Text>
          </View>
          <View style={{ flex:0, marginRight:'5%' }}>
          <Switch
          onValueChange={(val) => this.setState({ animateType: val })}
          value={this.state.animateType}
          onTintColor='green'
          thumbTintColor={ this.state.animateType ? '#fff' : '#eee'}
          />
          </View>
        </View>




        





        



        


        </View>
        <Modal
          onSelectOption={(option) => console.log('@option/options', option)}
          modalOptions={[
            {name:'Option 1', value:'1'},
            {name:'Option 2', value:'2'},
            {name:'Option 3', value:'3'},
            {name:'Option 4', value:'4'},
            {name:'Option 5', value:'5'},
          ]}
          visible={this.state.visible}
          autoClose={this.state.autoClose}
          multiple={this.state.multiple}
          animateType={this.state.animateType ? 'fade' : 'slide'}
          modalBackground={this.state.backgroundColor ? '#ccc': '#fff'}
        />
      </View>
    )
  }
};
