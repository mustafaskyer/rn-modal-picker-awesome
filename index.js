/**
 * React Native Modal Picker Component ,
 * Advantages => [ single-select, multi-selecte, full-customize-component, auto-close-for-both-single-multi ]
 * this work created by @skirmustafa <mustafaskir@gmail.com> in 14,july 2018
 * usage :
 * <Modal 
    visible={this.state.visible}
    onSelectOption={(option) => console.log('@printSelectOptionFromParent ',option)}
    autoClose={false} // close auto after one selection in single selection , in multiselcetio close auto in one case after all selection checked
    modalOptions={[{ name:'Option 2', value:'200' },{ name:'Option 3', value:'300' },{ name:'Option 4', value:'400' }]}
    selectedOptions={[{ name:'Option 3', value:'300' },]} // only in multiple selection
    selectedOption={{ value:'200' }} only in single selection
    multiple={false} // if true , enabled multi selection
    animateType={'slide'} // [ 'fade', 'slide' ]
    modalBackground='#fff'
    modalHeaderBackground='#ccc'
    closeIconName='md-close' // find list if icons from here https://ionicframework.com/docs/ionicons/
    closeIconText='CLOSE'
    closeIconStyle={{ color:'#000' }}
    closeIconTextStyle={{ color:'#000' }}
    doneIconStyle={{ color:'#000' }}
    doneIconTextStyle={{ color:'#000', }}
    doneIconName='md-close'
    doneIconText='DONE'
    titleStyle={ {color:'#000',} }
    titleText='Title ...'
    optionContainerStyle={{ }}
    optionTextContainerStyle={{  }}
    optionTextStyle={{  }}
    optionCircleColor='yellow'
    optionCircleInnerColor='green'
    />
 */
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import _ from "lodash";
let { width, height } = Dimensions.get("window");

export default class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      selectedOptions: [],
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.visible) {
      this.setState({ visible: newProps.visible });
    }
  }

  componentWillMount() {
    if (this.props.selectedOptions && this.props.multiple) {
      let values = _.map(this.props.selectedOptions, option => {
        return option.value;
      });
      this.setState({
        selectedOptions: [...this.state.selectedOptions, ...values]
      });
    } else if (this.props.selectedOption && !this.props.multiple) {
      this.setState({ selectedOptions: this.props.selectedOption.value });
    }
    this.setState({ visible: this.props.visible });
  }

  _onSelecteOptionEvent(option) {
    value = option.value;
    let singleOrMulti = undefined;
    if (this.props.multiple) {
      singleOrMulti = true; // multi
    } else {
      singleOrMulti = false; // single
    }
    let isInsideArray = _.find(
      this.state.selectedOptions,
      val => val === value
    );
    if (isInsideArray) {
      let newSelectedOptions = _.filter(
        this.state.selectedOptions,
        val => val !== value
      );
      this.setState({ selectedOptions: newSelectedOptions });
      this.props.onSelectOption(newSelectedOptions);
      if (
        this.props.autoClose &&
        this.props.multiple &&
        newSelectedOptions.length === this.props.modalOptions.length
      ) {
        this.setState({ visible: false });
      }
    } else {
      let newOptions = singleOrMulti
        ? [...this.state.selectedOptions, value]
        : value;
      this.setState({ selectedOptions: newOptions });
      this.props.onSelectOption(newOptions);
      if (
        this.props.autoClose &&
        this.props.multiple &&
        newOptions.length === this.props.modalOptions.length
      ) {
        this.setState({ visible: false });
      }
    }
    if (this.props.autoClose && !this.props.multiple) {
      this.setState({ visible: false });
    }
  }
  render() {
    return (
      <SafeAreaView>
        <Modal
          animationType={this.props.animateType || "slide"}
          transparent={false}
          visible={this.state.visible}
        >
          <View
            style={{
              backgroundColor: this.props.modalBackground || "#fff",
              width,
              height,
              padding: 0,
              margin: 0
            }}
          >
            <View
              style={{
                height: "10%",
                width: "100%",
                backgroundColor: this.props.modalHeaderBackground
                  ? this.props.modalHeaderBackground
                  : this.props.modalBackground
                    ? this.props.modalBackground
                    : "#fff",
                marginTop: "5%",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  marginHorizontal: "5%"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ visible: false })}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Icon
                    name={
                      this.props.closeIconName || "ios-close-circle-outline"
                    }
                    style={[
                      {
                        color: "#bb1b3d",
                        paddingHorizontal: "3%",
                        fontSize: 21
                      },
                      this.props.closeIconStyle
                    ]}
                  />
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        paddingHorizontal: "3%",
                        color: "#bb1b3d"
                      },
                      this.props.closeIconTextStyle
                    ]}
                  >
                    {this.props.closeIconText || "Close"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={[
                    { color: "#000", fontSize: 14, fontWeight: "700" },
                    this.props.titleStyle
                  ]}
                >
                  {this.props.titleText || "Title Of Modal"}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  marginHorizontal: "5%"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ visible: false });
                  }}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Icon
                    name={
                      this.props.doneIconName || "ios-checkmark-circle-outline"
                    }
                    style={[
                      {
                        color: "#4caf50",
                        paddingHorizontal: "3%",
                        fontSize: 21
                      },
                      this.props.doneIconStyle
                    ]}
                  />
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        paddingHorizontal: "3%",
                        color: "#4caf50"
                      },
                      this.props.doneIconTextStyle
                    ]}
                  >
                    {this.props.doneIconText || "done"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0,
                height: 1,
                backgroundColor: "#ccc",
                shadowColor: "grey",
                shadowOffset: { width: 0.5, height: 0.5 },
                shadowOpacity: 0.6
              }}
            />

            <View style={{ flex: 1 }}>
              {_.map(this.props.modalOptions, (option, i) => {
                let selected = this.props.multiple
                  ? _.filter(
                      this.state.selectedOptions,
                      op => op === option.value
                    )
                  : undefined;
                if (selected) {
                  selected = selected[0];
                }
                return (
                  <TouchableOpacity
                    onPress={this._onSelecteOptionEvent.bind(this, option)}
                    key={i}
                  >
                    <View
                      style={[
                        {
                          height: 25,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginTop: "3%"
                        },
                        this.props.optionContainer
                      ]}
                    >
                      <View
                        style={[
                          {
                            flex: 2,
                            marginHorizontal: "7%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginHorizontal: "11%"
                          },
                          this.props.optionTextStyle
                        ]}
                      >
                        <Text style={[this.props.optionTextStyle]}>
                          {option.name}
                        </Text>
                      </View>
                      <View
                        style={[
                          {
                            height: 17,
                            width: 17,
                            borderRadius: 17 / 2,
                            borderColor:
                              this.props.optionCircleColor || "#4caf50",
                            flex: 0,
                            borderWidth: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: "11%"
                          }
                        ]}
                      >
                        {selected ||
                        this.state.selectedOptions === option.value ? (
                          <View
                            style={{
                              height: 7,
                              width: 7,
                              borderRadius: 7 / 2,
                              backgroundColor: this.props.optionCircleInnerColor
                                ? this.props.optionCircleInnerColor
                                : this.props.optionCircleColor
                                  ? this.props.optionCircleColor
                                  : "#4caf50"
                            }}
                          />
                        ) : (
                          <View />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}
