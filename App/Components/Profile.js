import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Badge from './Badge';
import Separator from './Helpers/Separator';

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

class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  };

  getRowTitle = item => {
    var item = item === 'public_repos' ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  };

  render() {
    const { userInfo } = this.props;
    const topicArr = [
      'company',
      'location',
      'followers',
      'following',
      'email',
      'bio',
      'public_repos'
    ];

    const list = topicArr.map((item, index) => {
      if (!userInfo[item]) {
        return <View key={index} />;
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
            <Separator />
          </View>
        );
      }
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    );
  }
}

export default Profile;
