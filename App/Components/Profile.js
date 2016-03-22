import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Badge from './Badge';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

export default class Profile extends Component {
  getRowTitle(item) {
    return item.split(' ')
      .map( (word) => word[0].toUpperCase() + word.slice(1) )
      .join(' ');
  }

  render() {
    const userInfo = this.props.userInfo;
    console.log('userInfo');
    console.dir(userInfo);
    const topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];

    const list = topicArr.map( (item, idx) => {
      if (!userInfo[item]) return <View key={ idx } />;

      return (
        <View key={ idx }>
          <View style={ styles.rowContainer }>
            <Text style={ styles.rowTitle }>{this.getRowTitle(item) }</Text>
            <Text style={ styles.rowContent }>{ userInfo[item] }</Text>
          </View>
        </View>
      )
    });

    return (
      <ScrollView style={ styles.container }>
        <Badge userInfo={ this.props.userInfo } />
        { list }
      </ScrollView>
    );
  }
};
