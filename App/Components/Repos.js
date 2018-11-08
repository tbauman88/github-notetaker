import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Badge from './Badge';
import RepoView from './Helpers/RepoView';
import Separator from './Helpers/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

class Repos extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired
  };

  openPage(url) {
    this.props.navigator.push({
      title: 'Repo View',
      component: RepoView,
      passProps: { url }
    });
  }

  render() {
    const { userInfo, repos } = this.props;

    const list = repos.map(repo => {
      const desc = repo.description ? (
        <Text style={styles.description}> {repo.description} </Text>
      ) : (
        <View />
      );

      return (
        <View key={repo.id}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repo.html_url)}
              underlayColor="transparent"
            >
              <Text style={styles.name}> {repo.name} </Text>
            </TouchableHighlight>
            <Text style={styles.stars}>
              Stars: {repo.strangers_count || '0'}
            </Text>
            {desc}
          </View>
          <Separator />
        </View>
      );
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    );
  }
}

export default Repos;
