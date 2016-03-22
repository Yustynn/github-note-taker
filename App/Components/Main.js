import React, {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

import Dashboard from './Dashboard';

import api from '../Utils/api';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  error: {
    color: 'red',
    fontSize: 24
  }
});

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    };
  }

  handleChange(e) {
    this.setState({
      username: e.nativeEvent.text
    });
  }

  handleSubmit() {
    this.setState({
      isLoading: true
    });

    api.getBio(this.state.username)
    .then( (res) => {
      if (res.message === `Not Found`) {
        this.setState({
          error: `User not found! You liar! You fiend!`,
          isLoading: false
        })
      } else {
        this.props.navigator.push({
          title: res.name || `Choose something, dammit!`,
          component: Dashboard,
          passProps: { userInfo: res }
        });

        this.setState({
          error: false,
          isLoading: false,
          username: ``
        })
      }
    })
    console.log('SUBMIT', this.state.username);
  }

  render() {
    const showErr = this.state.error ? <Text style={styles.error}>{ this.state.error }</Text> : <View />;

    return (
      <View style={ styles.mainContainer }>
        <Text style={ styles.title }>Routing the Tester</Text>
        <TextInput
          onChange={ this.handleChange.bind(this) }
          style={ styles.searchInput }
          value={ this.state.username }
        />
        <TouchableHighlight
          style={ styles.button }
          onPress={ this.handleSubmit.bind(this) }
          underlayColor="white"
        >
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={ this.state.isLoading }
          color='#111'
          size='large'
        />
        { showErr }
      </View>
    )
  }
};
