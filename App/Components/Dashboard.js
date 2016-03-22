import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Profile from './Profile';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  makeBackground(location) {
    const colorMap = {
      profile: '#48BBEC',
      repos: '#E77AAE',
      notes: '#758BF4'
    };

    return {
      alignSelf: 'stretch',
      backgroundColor: colorMap[location],
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    };
  }

  goTo(location) {
    const componentMap = {
      profile: Profile,
      repos: 'repos',
      notes: 'notes'
    };

    this.props.navigator.push({
      component: componentMap[location],
      title: `${ location[0].toUpperCase() + location.slice(1) } Page`,
      passProps: { userInfo: this.props.userInfo }
    });
  }

  render() {
    const locationBtns =  ['profile', 'repos', 'notes'].map( (location, idx) => (
      <TouchableHighlight
        key={ idx }
        onPress={ this.goTo.bind(this, location) }
        style={ this.makeBackground(location) }
        underlayColor='#88D4F5'>
      <Text key={ idx } style={ styles.buttonText }>View { location[0].toUpperCase() + location.slice(1) }</Text>
    </TouchableHighlight>
    ) );

    return (
      <View style={ styles.container }>
        <Text>Welcome to the DASH bored.</Text>
        <Image
          source={{ uri: this.props.userInfo.avatar_url }}
          style={ styles.image } />
        { locationBtns }
        <Text style={{ textAlign: 'center' }}>{ this.props.userInfo.name }  { this.props.userInfo.email }</Text>
      </View>
    )
  }
}
