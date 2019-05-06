import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Note from './Note';

type Props = {};
export default class Main extends Component<Props> {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            noteArray: [],
            noteText: '',
            noteTitre: '',
            update: true,
            updateTitre : '',
            updateText: '',
            dateCreation: '',
            updateId: '',
            newText: '',
            newTitre: ''
        }
    }

    componentWillMount() {
        this._allNotes()
    }
    _allNotes(){
        
        fetch(
            'http://192.168.33.10:3000/note', {
              method:'GET',
              credentials: 'same-origin',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    noteArray: response
                })
                console.log(this.state.noteArray);
            })
            .catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
                console.log('Problem with fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
        }
        
    addNote() {
        console.log(this.state.noteArray)


        fetch(
            'http://192.168.33.10:3000/note', {
                method:'POST',
                credentials: 'same-origin',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                titre: this.state.noteTitre,
                description: this.state.noteText,
                }),
            })
        .then((response) => response.json())
        .then((response) => {
            if(response.message == 'ok'){
                console.log('Note Ajoutée')
                if (this.state.noteText) {
                    var d = new Date();
                    d = new Date(d.getTime() - 3000000);
                    var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
                    this.state.noteArray.push({
                        'dateCreation' : date_format_str,
                        'titre':  this.state.noteTitre,
                        'description':  this.state.noteText
                    });
                    
                    this.setState({ noteArray: this.state.noteArray})
                    this.setState({ noteText: ''});
                    this.setState({ noteTitre: ''});
                    console.log(this.state.noteArray)
                }
            }
            else{
                alert(response.message)
            }
            
        })
        .catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
            console.log('Problem with fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });

    }

    deleteNote(key, val) {
        
        var ID = val._id;
        fetch(
            'http://192.168.33.10:3000/note/'+ ID, {
                method:'delete',
                credentials: 'same-origin',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            })
        .then((response) => response.json())
        .then((response) => {
            if(response.message == 'ok'){
                console.log('Note supprimer')
                this.state.noteArray.splice(key, 1);
                this.setState({noteArray: this.state.noteArray})
            }
            
        })
        .catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
            console.log('Problem with fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
        
        }

        readNote(val) {
            console.log(val)
            
            this.setState({update: false, 
                updateTitre : val.titre, 
                updateText: val.description,
                updateId: val._id, 
                dateCreation: val.dateCreation})

        }


        updateNote() {
            console.log(this.state.updateTitre)
            console.log(this.state.updateText)
            fetch(
                'http://192.168.33.10:3000/note/'+ this.state.updateId, {
                    method:'PUT',
                    credentials: 'same-origin',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    titre: this.state.newTitre,
                    description: this.state.newText,
                    }),
                })
            .then((response) => response.json())
            .then((response) => {
                if(response.message == 'ok'){
                    this.props.id ==
                    this.setState({
                        update: true})
                }
                else{
                    alert(response.message)
                }
                
            })
            .catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
                console.log('Problem with fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });

        }


  render() {

    let notes = this.state.noteArray.map((val, key) => {
        return <Note key={key} keyval={key} val={val} id={val._id}
            deleteMethod={ () => this.deleteNote(key, val) } 
            updateMethod={ () => this.readNote(val)}
            />
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>- AGENDA -</Text>
        </View>

        {
            (this.state.update) ? (
                <ScrollView style={styles.scrollContainer}>
                {notes}
                </ScrollView>
            ) : ( 
                <View style={styles.update}> 
                    <View style={styles.date}><Text style={styles.noteText}>{this.state.dateCreation}</Text></View>
                    <TextInput style={styles.noteText} placeholder={this.state.updateTitre} onChangeText={(titre) => this.setState ({newTitre : titre})} value={this.state.newTitre} placeholderTextColor='white'></TextInput>
                    <TextInput style={styles.noteText} 
                                placeholder={this.state.updateText} 
                                placeholderTextColor='white'
                                onChangeText={(Text) => this.setState ({newText : Text})}
                                value={this.state.updateText}>
                    </TextInput>
                    
                    <TouchableOpacity style={styles.noteDelete} onPress={()=>{this.setState({update: true});}}>
                    <Text style={styles.noteDeleteText}>X</Text>
                </TouchableOpacity>
                    <View>
                        <TouchableOpacity style={{backgroundColor: 'green'}} onPress={() => this.updateNote()}>
                            <Text style={{color: 'white'}}>Mettre à jour !</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )

        
        }

        <View style={styles.footer}>
            <TextInput 
                style={styles.textInput}
                placeholder='>titre'
                placeholderTextColor='yellow'
                underlineColorAndroid='transparent'
                onChangeText={(noteTitre) => this.setState ({noteTitre})}
                value={this.state.noteTitre}>
            
            </TextInput>

            <TextInput 
                style={styles.textInput}
                placeholder='>note'
                placeholderTextColor='white'
                underlineColorAndroid='transparent'
                onChangeText={(noteText) => this.setState ({noteText})}
                value={this.state.noteText}>
            
          </TextInput>
        </View>

        <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#E91E63",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#ddd"
  },
  headerText: {
    color: "white",
    fontSize: 18,
    padding: 26
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 20,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed"
  },
  addButton: {
    position: "absolute", 
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: "#e91e63",
    width: 90,
    height: 90,
    borderRadius: 59,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24
  },
  update:{
    backgroundColor: "black",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  noteText:{
    color: 'white'
  }
  
});