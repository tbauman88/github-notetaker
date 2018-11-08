import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { api } from '../Utils/api';
import Badge from './Badge';
import Separator from './Helpers/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class Notes extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    };
  }

  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired
  };

  handleChange = event => {
    this.setState({
      note: event.nativeEvent.text
    });
  };

  handleSubmit = () => {
    const { login } = this.props.userInfo;
    const { note } = this.state;
    this.setState({ note: '' });
    api
      .addNote(login, note)
      .then(() => {
        api.getNotes(login).then(res => {
          this.setState({
            dataSource: this.ds.cloneWithRows(res)
          });
        });
      })
      .catch(error => {
        console.warning('Error on note submit: ', error);
        this.setState({ error });
      });
  };

  footer = () => (
    <View style={styles.footerContainer}>
      <TextInput
        style={styles.searchInput}
        value={this.state.note}
        onChange={this.handleChange}
        placeholder="New note"
      />
      <TouchableHighlight
        style={styles.button}
        onPress={this.handleSubmit}
        underlayColor="#88D4A5"
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableHighlight>
    </View>
  );

  renderRow = rowData => (
    <View>
      <View style={styles.rowContainer}>
        <Text>{rowData}</Text>
      </View>
      <Separator />
    </View>
  );

  render() {
    const { userInfo } = this.props;
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={userInfo} />}
        />

        {this.footer()}
      </View>
    );
  }
}

export default Notes;
