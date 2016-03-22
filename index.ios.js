import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './App/Components/Main'

const styles = StyleSheet.create({
  container: {
    backgroundColor: `#111111`,
    flex: 1
  }
});

class GitHubNoteTaker extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'GitHub NoteTaker',
          component: Main
        }}
      />
    )
  }
};

AppRegistry.registerComponent('GitHubNoteTaker', () => GitHubNoteTaker);
