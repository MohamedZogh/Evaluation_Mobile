import React, {Component} from 'react';
import { Container, Header, Content, SwipeRow, Icon, Button } from 'native-base';
import {
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

type Props = {};
export default class Note extends Component<Props> {
  render() {
    return (
        <Content scrollEnabled={false}>
          <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button success onPress={this.props.updateMethod}>
                <Icon active name="refresh" />
              </Button>
            }
            body={
                <View key={this.props.keyval} style={styles.note}>

                <View style={styles.date}><Text style={styles.noteText}>{this.props.val.dateCreation}</Text></View>
                <Text style={styles.noteText}>{this.props.val.titre}</Text>
                <Text style={styles.noteText}>{this.props.val.description}</Text>
        
              </View>
            }
            right={
              <Button danger onPress={this.props.deleteMethod}>
                <Icon active name="trash" />
              </Button>
            }
          />
        </Content>
      
    );
  }
}

const styles = StyleSheet.create({
  note: { 
    position: 'relative', 
    padding: 20, 
    paddingRight:100, 
    borderBottomWidth: 2, 
    borderBottomColor: '#ededed', 
  }, 
  noteText: { 
    paddingLeft: 20, 
    borderLeftWidth: 10, 
    borderLeftColor: '#e91e63', 
  }, 
  noteDelete: { 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'red', 
    padding: 5, 
    top: 5, 
    bottom: 5, 
    right: 5 
  }, 
  noteDeleteText: { 
    color: 'white', 
  },
  noteUpdate: { 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#2980b9', 
    padding: 5, 
    top: 5, 
    bottom: 5, 
    right: 5 
  },
  date: {
      flexDirection: 'row'
  },
  buttons: {
    justifyContent: 'space-between', 
  }
  
});