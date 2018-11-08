import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { api } from '../Utils/api';
import Notes from './Notes';
import Profile from './Profile';
import Repos from './Repos';

const styles = StyleSheet.create({
  contianer: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends Component {
  makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }

  goToProfile = () => {
    const { userInfo } = this.props;
    this.props.navigator.push({
      title: 'Profile Page',
      component: Profile,
      passProps: { userInfo }
    });
  };

  goToRepos = () => {
    api.getRepos(this.props.userInfo.login).then(res => {
      this.props.navigator.push({
        title: 'Repositories Page',
        component: Repos,
        passProps: {
          userInfo: this.props.userInfo,
          repos: res
        }
      });
    });
  };

  goToNotes = () => {
    const { userInfo } = this.props;
    api.getNotes(userInfo.login).then(res => {
      const data = res || {};
      this.props.navigator.push({
        title: 'Notes',
        component: Notes,
        passProps: {
          userInfo,
          notes: data
        }
      });
    });
  };

  render() {
    return (
      <View style={styles.contianer}>
        <Image
          source={{ uri: this.props.userInfo.avatar_url }}
          style={styles.image}
        />

        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile}
          underlayColor="#88D45F"
        >
          <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos}
          underlayColor="#88D45F"
        >
          <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes}
          underlayColor="#88D45F"
        >
          <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Dashboard;
